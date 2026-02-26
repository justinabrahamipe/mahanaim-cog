import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const YOUTH_SHEET_ID = '1NZFNzdurvh83T-UXe-0UzrAxNeN__iwDy98gjeKuoUQ';

interface ReelMeta {
  url: string;
  thumbnailUrl: string;
  title: string;
}

let cache: { reels: ReelMeta[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

async function scrapeInstagramTitle(reelUrl: string): Promise<string> {
  try {
    const res = await fetch(reelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return '';
    const html = await res.text();

    // Try og:title first
    const ogMatch = html.match(/<meta\s+(?:property|name)="og:title"\s+content="([^"]*)"/)
      || html.match(/content="([^"]*)"\s+(?:property|name)="og:title"/);
    if (ogMatch?.[1]) {
      return cleanTitle(ogMatch[1]);
    }

    // Fallback to <title> tag
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch?.[1]) {
      return cleanTitle(titleMatch[1]);
    }

    return '';
  } catch {
    return '';
  }
}

function cleanTitle(raw: string): string {
  // Decode HTML entities
  let title = raw
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Remove common Instagram suffixes like "| Instagram" or "on Instagram"
  title = title.replace(/\s*\|\s*Instagram.*$/i, '').replace(/\s+on Instagram.*$/i, '');

  return title.trim();
}

export async function GET() {
  if (!GOOGLE_API_KEY) {
    return NextResponse.json(
      { reels: [], error: 'Google API key not configured' },
      { status: 200 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({ reels: cache.reels, cached: true });
  }

  try {
    // Fetch columns A (URL), B (title), C (thumbnail from Drive)
    const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${YOUTH_SHEET_ID}/values/A:C`);
    url.searchParams.set('key', GOOGLE_API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Google Sheets API error: ${res.status}`);
    const data = await res.json();

    const rows: string[][] = data.values || [];
    // Skip header row if present
    const startIndex = rows[0]?.[0]?.toLowerCase().includes('url') ? 1 : 0;

    const rawReels = rows.slice(startIndex)
      .filter((row) => row[0] && row[0].includes('instagram.com'))
      .map((row) => ({
        url: row[0].trim(),
        title: row[1]?.trim() || '',
        thumbnailUrl: row[2]?.trim() || '',
      }));

    // Scrape titles for reels that don't have one in the sheet
    const reels: ReelMeta[] = await Promise.all(
      rawReels.map(async (reel) => {
        if (!reel.title) {
          const scraped = await scrapeInstagramTitle(reel.url);
          return { ...reel, title: scraped };
        }
        return reel;
      })
    );

    cache = { reels, timestamp: Date.now() };
    return NextResponse.json({ reels, cached: false });
  } catch (error) {
    console.error('Youth API error:', error);
    if (cache) {
      return NextResponse.json({ reels: cache.reels, cached: true });
    }
    return NextResponse.json(
      { reels: [], error: 'Failed to fetch reels' },
      { status: 500 }
    );
  }
}
