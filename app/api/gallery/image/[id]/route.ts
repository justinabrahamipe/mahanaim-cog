import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!GOOGLE_API_KEY) {
    return new NextResponse('Not configured', { status: 500 });
  }

  try {
    // Get the file's webContentLink
    const metaUrl = new URL(`https://www.googleapis.com/drive/v3/files/${id}`);
    metaUrl.searchParams.set('key', GOOGLE_API_KEY);
    metaUrl.searchParams.set('fields', 'mimeType,webContentLink');

    const metaRes = await fetch(metaUrl.toString());
    if (!metaRes.ok) throw new Error('File not found');
    const meta = await metaRes.json();

    // Download the file content
    const downloadUrl = new URL(`https://www.googleapis.com/drive/v3/files/${id}`);
    downloadUrl.searchParams.set('key', GOOGLE_API_KEY);
    downloadUrl.searchParams.set('alt', 'media');

    const fileRes = await fetch(downloadUrl.toString());
    if (!fileRes.ok) throw new Error('Download failed');

    const buffer = await fileRes.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': meta.mimeType || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return new NextResponse('Image not found', { status: 404 });
  }
}
