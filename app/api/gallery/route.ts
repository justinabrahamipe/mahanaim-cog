import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  thumbnailLink?: string;
}

let cache: { images: { src: string; thumbnail: string; title: string; description: string; createdTime: string }[]; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  if (!GOOGLE_API_KEY || !GOOGLE_DRIVE_FOLDER_ID) {
    return NextResponse.json(
      { images: [], error: 'Google Drive API key or folder ID not configured' },
      { status: 200 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({ images: cache.images, cached: true });
  }

  try {
    const allFiles: DriveFile[] = [];
    let nextPageToken: string | undefined;

    do {
      const url = new URL('https://www.googleapis.com/drive/v3/files');
      url.searchParams.set('key', GOOGLE_API_KEY);
      url.searchParams.set('q', `'${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`);
      url.searchParams.set('fields', 'nextPageToken,files(id,name,mimeType,createdTime,thumbnailLink)');
      url.searchParams.set('orderBy', 'createdTime desc');
      url.searchParams.set('pageSize', '100');
      if (nextPageToken) url.searchParams.set('pageToken', nextPageToken);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Google Drive API error: ${res.status}`);
      const data = await res.json();
      allFiles.push(...(data.files || []));
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    const images = allFiles.map((file) => {
      const title = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const thumbnail = `/api/gallery/image/${file.id}`;
      const src = `/api/gallery/image/${file.id}`;

      return {
        src,
        thumbnail,
        title,
        description: '',
        createdTime: file.createdTime,
      };
    });

    cache = { images, timestamp: Date.now() };
    return NextResponse.json({ images, cached: false });
  } catch (error) {
    console.error('Google Drive API error:', error);
    if (cache) {
      return NextResponse.json({ images: cache.images, cached: true });
    }
    return NextResponse.json(
      { images: [], error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
