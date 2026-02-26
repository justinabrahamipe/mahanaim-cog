import { NextResponse } from 'next/server';
import type { CalendarEvent } from '@/types';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

let cache: { events: CalendarEvent[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  if (!GOOGLE_API_KEY || !GOOGLE_CALENDAR_ID) {
    return NextResponse.json(
      { events: [], error: 'Google Calendar API key or calendar ID not configured' },
      { status: 200 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({ events: cache.events, cached: true });
  }

  try {
    const now = new Date().toISOString();
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(GOOGLE_CALENDAR_ID) + '/events');
    url.searchParams.set('key', GOOGLE_API_KEY);
    url.searchParams.set('timeMin', now);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Google Calendar API error: ${res.status}`);
    const data = await res.json();

    const events: CalendarEvent[] = (data.items || []).map((item: {
      id: string;
      summary?: string;
      description?: string;
      location?: string;
      start?: { dateTime?: string; date?: string };
      end?: { dateTime?: string; date?: string };
    }) => ({
      id: item.id,
      title: item.summary || 'Untitled Event',
      description: item.description || '',
      location: item.location || '',
      start: item.start?.dateTime || item.start?.date || '',
      end: item.end?.dateTime || item.end?.date || '',
      allDay: !item.start?.dateTime,
    }));

    // For recurring events, only keep the next upcoming occurrence
    const seen = new Set<string>();
    const dedupedEvents = events.filter((event) => {
      if (seen.has(event.title)) return false;
      seen.add(event.title);
      return true;
    });

    cache = { events: dedupedEvents, timestamp: Date.now() };
    return NextResponse.json({ events: dedupedEvents, cached: false });
  } catch (error) {
    console.error('Google Calendar API error:', error);
    if (cache) {
      return NextResponse.json({ events: cache.events, cached: true });
    }
    return NextResponse.json(
      { events: [], error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
