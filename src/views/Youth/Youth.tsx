'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTubeIcon from '@mui/icons-material/YouTube';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import { panelSx } from '@/theme/motif';
import { ink, accent } from '@/theme/tokens';
import { youthQuizUrl } from '@/config/youth';
import type { YouTubeVideo } from '@/types/youtube';

const INSTAGRAM_HANDLE = 'mahanaim__youth';
const REELS_PER_PAGE = 16;

function ReelCard({ reel }: { reel: YouTubeVideo }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card sx={{ ...panelSx, overflow: 'hidden', backgroundColor: 'background.paper' }}>
      <CardActionArea href={`https://www.youtube.com/shorts/${reel.videoId}`} target="_blank" rel="noopener noreferrer">
        <Box sx={{ position: 'relative', paddingTop: '177.78%', backgroundColor: 'action.hover' }}>
          {!loaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}
          <Box
            component="img"
            src={reel.thumbnailUrl}
            alt={reel.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlayArrowIcon sx={{ fontSize: 30, color: ink }} />
            </Box>
          </Box>
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <YouTubeIcon sx={{ color: 'white', fontSize: 22, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
          </Box>
        </Box>
        {reel.title && (
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {reel.title}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
}

export default function Youth() {
  const [reels, setReels] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(REELS_PER_PAGE);

  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch('/api/youth');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setReels(data.reels);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchReels();
  }, []);

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Youth" subtitle="Mahanaim Youth — growing together in faith" />
      </PageBanner>

      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 6 }}>
            <Button
              variant="contained"
              startIcon={<InstagramIcon />}
              href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)',
                '&:hover': { background: 'linear-gradient(45deg, #dc2743, #bc1888, #f09433)' },
              }}
            >
              Follow @{INSTAGRAM_HANDLE}
            </Button>
            <Button
              variant="outlined"
              startIcon={<QuizIcon />}
              href={youthQuizUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderColor: 'text.primary', color: 'text.primary' }}
            >
              Take the quiz
            </Button>
            <Button
              variant="outlined"
              startIcon={<MenuBookIcon />}
              component={Link}
              href="/youth/magazine"
              sx={{ borderColor: 'text.primary', color: 'text.primary' }}
            >
              Read the magazine
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" animation="wave" sx={{ paddingTop: '177.78%' }} />
              ))}
            </Box>
          ) : reels.length > 0 ? (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                {reels.slice(0, visibleCount).map((reel) => (
                  <ReelCard key={reel.videoId} reel={reel} />
                ))}
              </Box>

              {visibleCount < reels.length && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setVisibleCount((prev) => prev + REELS_PER_PAGE)}
                    sx={{ fontWeight: 600 }}
                  >
                    Show more ({reels.length - visibleCount} remaining)
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <YouTubeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary">
                Reels coming soon
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Check back soon for our latest videos.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Page>
  );
}
