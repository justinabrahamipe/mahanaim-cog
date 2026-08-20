import { NextResponse } from 'next/server';
import type { MagazineArticle } from '@/types';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MAGAZINE_DRIVE_FOLDER_ID = process.env.MAGAZINE_DRIVE_FOLDER_ID;

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
}

let cache: { articles: MagazineArticle[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

function formatTitle(name: string): string {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Folder names look like "Article Title -- Author Name"; the author part is optional.
function parseFolderName(name: string): { title: string; author: string } {
  const parts = name.split(/\s*--\s*/);
  const title = formatTitle(parts[0].trim());
  const author = parts.length > 1 ? formatTitle(parts.slice(1).join(' -- ').trim()) : '';
  return { title, author };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function slugify(title: string, index: number, seen: Set<string>): string {
  const base =
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `article-${index}`;

  let slug = base;
  let suffix = 1;
  while (seen.has(slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  seen.add(slug);
  return slug;
}

async function listDriveFiles(query: string, orderBy?: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let nextPageToken: string | undefined;

  do {
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('key', GOOGLE_API_KEY!);
    url.searchParams.set('q', query);
    url.searchParams.set('fields', 'nextPageToken,files(id,name,mimeType,createdTime)');
    url.searchParams.set('pageSize', '100');
    if (orderBy) url.searchParams.set('orderBy', orderBy);
    if (nextPageToken) url.searchParams.set('pageToken', nextPageToken);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Google Drive API error: ${res.status}`);
    const data = await res.json();
    files.push(...(data.files || []));
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return files;
}

const GOOGLE_DOC_MIME_TYPE = 'application/vnd.google-apps.document';

async function fetchTextFileContent(file: DriveFile): Promise<string> {
  const isGoogleDoc = file.mimeType === GOOGLE_DOC_MIME_TYPE;
  const url = new URL(
    isGoogleDoc
      ? `https://www.googleapis.com/drive/v3/files/${file.id}/export`
      : `https://www.googleapis.com/drive/v3/files/${file.id}`
  );
  url.searchParams.set('key', GOOGLE_API_KEY!);
  if (isGoogleDoc) {
    url.searchParams.set('mimeType', 'text/plain');
  } else {
    url.searchParams.set('alt', 'media');
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to download text file ${file.id}`);
  return (await res.text()).trim();
}

function excerptOf(content: string, length = 180): string {
  const flat = content.replace(/\s+/g, ' ').trim();
  return flat.length > length ? `${flat.slice(0, length).trim()}…` : flat;
}

export async function GET() {
  if (!GOOGLE_API_KEY || !MAGAZINE_DRIVE_FOLDER_ID) {
    return NextResponse.json(
      { articles: [], error: 'Google Drive API key or magazine folder ID not configured' },
      { status: 200 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({ articles: cache.articles, cached: true });
  }

  try {
    // Each article is a subfolder containing one image file and one .txt content file.
    const articleFolders = await listDriveFiles(
      `'${MAGAZINE_DRIVE_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      'createdTime desc'
    );

    const seenSlugs = new Set<string>();
    const articles: MagazineArticle[] = await Promise.all(
      articleFolders.map(async (folder, index) => {
        const contents = await listDriveFiles(`'${folder.id}' in parents and trashed = false`);
        const imageFile = contents.find((f) => f.mimeType.startsWith('image/'));
        const textFile = contents.find(
          (f) =>
            f.mimeType === 'text/plain' ||
            f.mimeType === GOOGLE_DOC_MIME_TYPE ||
            f.name.toLowerCase().endsWith('.txt')
        );

        const content = textFile ? await fetchTextFileContent(textFile) : '';
        const { title, author } = parseFolderName(folder.name);

        return {
          slug: slugify(title, index, seenSlugs),
          title,
          author,
          date: formatDate(folder.createdTime),
          coverImage: imageFile ? `/api/magazine/image/${imageFile.id}` : '',
          excerpt: excerptOf(content),
          content,
        };
      })
    );

    cache = { articles, timestamp: Date.now() };
    return NextResponse.json({ articles, cached: false });
  } catch (error) {
    console.error('Magazine Drive API error:', error);
    if (cache) {
      return NextResponse.json({ articles: cache.articles, cached: true });
    }
    return NextResponse.json(
      { articles: [], error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
