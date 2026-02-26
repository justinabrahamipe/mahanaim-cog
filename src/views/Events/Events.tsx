'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import { CalendarEvent } from '@/types';

function isMultiDay(start: string, end: string, allDay: boolean) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (allDay) {
    // All-day end dates are exclusive, so subtract a day
    endDate.setDate(endDate.getDate() - 1);
  }
  return startDate.toDateString() !== endDate.toDateString();
}

function getDateDisplay(start: string, end: string, allDay: boolean) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (allDay) {
    endDate.setDate(endDate.getDate() - 1);
  }

  const startDay = String(startDate.getDate()).padStart(2, '0');
  const startMonth = startDate.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endMonth = endDate.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();

  if (!isMultiDay(start, end, allDay)) {
    return {
      day: String(startDay).padStart(2, '0'),
      month: startMonth,
      weekday: startDate.toLocaleDateString('en-GB', { weekday: 'long' }),
    };
  }

  const startWeekday = startDate.toLocaleDateString('en-GB', { weekday: 'short' });
  const endWeekday = endDate.toLocaleDateString('en-GB', { weekday: 'short' });

  if (startMonth === endMonth) {
    return {
      day: `${startDay} - ${endDay}`,
      month: startMonth,
      weekday: `${startWeekday} to ${endWeekday}`,
    };
  }

  return {
    day: `${startDay} ${startMonth}`,
    month: `- ${endDay} ${endMonth}`,
    weekday: `${startWeekday} to ${endWeekday}`,
  };
}

function formatTime(start: string, end: string, allDay: boolean) {
  if (allDay) return 'All Day';
  const startTime = new Date(start).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = new Date(end).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${startTime} - ${endTime}`;
}

function isToday(dateStr: string) {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

function isTomorrow(dateStr: string) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(dateStr).toDateString() === tomorrow.toDateString();
}

function isThisWeek(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  const endOfWeek = new Date();
  endOfWeek.setDate(today.getDate() + 7);
  return date >= today && date <= endOfWeek;
}

export default function Events() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data.events);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const getLabel = (dateStr: string) => {
    if (isToday(dateStr)) return 'Today';
    if (isTomorrow(dateStr)) return 'Tomorrow';
    if (isThisWeek(dateStr)) return 'This Week';
    return null;
  };

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Events" subtitle="Upcoming events and programmes" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Unable to load events
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error}
              </Typography>
            </Box>
          ) : events.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CalendarMonthIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary">
                No upcoming events
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Check back soon for new events and programmes.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {events.map((event) => {
                const label = getLabel(event.start);
                const today = isToday(event.start);
                const dateDisplay = getDateDisplay(event.start, event.end, event.allDay);
                return (
                  <Card
                    key={event.id}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent',
                      overflow: 'visible',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: today ? 'secondary.main' : 'primary.main',
                        boxShadow: (theme) =>
                          theme.palette.mode === 'light'
                            ? '0 12px 24px rgba(27, 73, 101, 0.15)'
                            : '0 12px 24px rgba(91, 163, 207, 0.15)',
                      },
                    }}
                  >
                    {/* Date badge */}
                    <Box
                      sx={{
                        backgroundColor: today ? 'secondary.main' : 'primary.main',
                        color: 'white',
                        textAlign: 'center',
                        py: 2,
                        px: 3,
                        borderRadius: '8px 8px 0 0',
                      }}
                    >
                      <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>
                        {dateDisplay.day}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: 1, opacity: 0.9 }}>
                        {dateDisplay.month}
                      </Typography>
                      {dateDisplay.weekday && (
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {dateDisplay.weekday}
                        </Typography>
                      )}
                    </Box>

                    {/* Label chip */}
                    {label && (
                      <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                        <Chip
                          label={label}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            backgroundColor: today ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.2)',
                            color: 'white',
                          }}
                        />
                      </Box>
                    )}

                    {/* Content */}
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        {event.title}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AccessTimeIcon fontSize="small" color="secondary" />
                        <Typography variant="body2" color="text.primary" fontWeight={500}>
                          {formatTime(event.start, event.end, event.allDay)}
                        </Typography>
                      </Box>

                      {event.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                          <LocationOnIcon fontSize="small" color="secondary" />
                          <Typography variant="body2" color="text.primary" fontWeight={500}>
                            {event.location}
                          </Typography>
                        </Box>
                      )}

                      {event.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {event.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          )}
        </Container>
      </Box>
    </Page>
  );
}
