import { NextResponse } from 'next/server';
import type {
  YouTubeVideo,
  YouTubePlaylistItemResponse,
  YouTubeVideoDetailResponse,
} from '@/types/youtube';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE;

let cache: { videos: YouTubeVideo[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}

async function getUploadsPlaylistId(): Promise<string> {
  const url = new URL('https://www.googleapis.com/youtube/v3/channels');
  url.searchParams.set('part', 'contentDetails');
  url.searchParams.set('forHandle', YOUTUBE_CHANNEL_HANDLE!);
  url.searchParams.set('key', YOUTUBE_API_KEY!);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`YouTube Channels API error: ${res.status}`);
  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('Channel not found');
  }

  return data.items[0].contentDetails.relatedPlaylists.uploads;
}

async function fetchAllPlaylistItems(playlistId: string): Promise<YouTubePlaylistItemResponse['items']> {
  const items: YouTubePlaylistItemResponse['items'] = [];
  let nextPageToken: string | undefined;

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('key', YOUTUBE_API_KEY!);
    if (nextPageToken) url.searchParams.set('pageToken', nextPageToken);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data: YouTubePlaylistItemResponse = await res.json();
    items.push(...data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return items;
}

async function fetchVideoDetails(videoIds: string[]): Promise<Map<string, { duration: number; tags: string[]; isLive: string }>> {
  const details = new Map<string, { duration: number; tags: string[]; isLive: string }>();

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'contentDetails,snippet');
    url.searchParams.set('id', batch.join(','));
    url.searchParams.set('key', YOUTUBE_API_KEY!);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json();

    for (const item of data.items) {
      details.set(item.id, {
        duration: parseISO8601Duration(item.contentDetails.duration),
        tags: item.snippet?.tags || [],
        isLive: item.snippet?.liveBroadcastContent || 'none',
      });
    }
  }

  return details;
}

export async function GET() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_HANDLE) {
    return NextResponse.json(
      { videos: [], cached: false, error: 'YouTube API key or channel handle not configured' },
      { status: 200 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({ videos: cache.videos, cached: true });
  }

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId();
    const playlistItems = await fetchAllPlaylistItems(uploadsPlaylistId);
    const videoIds = playlistItems.map((item) => item.snippet.resourceId.videoId);
    const videoDetails = await fetchVideoDetails(videoIds);

    const videos: YouTubeVideo[] = playlistItems
      .filter((item) => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
      .map((item) => {
        const videoId = item.snippet.resourceId.videoId;
        const details = videoDetails.get(videoId);
        const duration = details?.duration || 0;
        const tags = details?.tags || [];

        // YouTube Shorts are vertical videos up to 60 seconds, or explicitly tagged
        const isShort =
          duration <= 60 ||
          tags.some((tag) => tag.toLowerCase().includes('shorts')) ||
          item.snippet.title.toLowerCase().includes('#shorts') ||
          item.snippet.description.toLowerCase().includes('#shorts');

        return {
          id: videoId,
          videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url ||
            '',
          publishedAt: item.snippet.publishedAt,
          duration,
          isShort,
        };
      });

    cache = { videos, timestamp: Date.now() };
    return NextResponse.json({ videos, cached: false });
  } catch (error) {
    console.error('YouTube API error:', error);
    if (cache) {
      return NextResponse.json({ videos: cache.videos, cached: true });
    }
    return NextResponse.json(
      { videos: [], cached: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
