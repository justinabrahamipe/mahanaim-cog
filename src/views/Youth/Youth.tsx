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
import { youthQuizUrl } from '@/config/youth';
import type { YouTubeVideo } from '@/types/youtube';

const INSTAGRAM_HANDLE = 'mahanaim__youth';

function ReelCard({ reel }: { reel: YouTubeVideo }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card
      sx={{
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: '#FF0000',
          boxShadow: '0 12px 24px rgba(255, 0, 0, 0.15)',
        },
      }}
    >
      <CardActionArea
        href={`https://www.youtube.com/shorts/${reel.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          sx={{
            position: 'relative',
            paddingTop: '177.78%',
            background: 'action.hover',
          }}
        >
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
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 36, color: 'white' }} />
            </Box>
          </Box>
          {/* YouTube badge */}
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <YouTubeIcon sx={{ color: 'white', fontSize: 24, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
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
        <PageTitle title="Youth" subtitle="Mahanaim Youth - Growing together in faith" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              mb: 6,
            }}
          >
            <Button
              variant="contained"
              startIcon={<InstagramIcon />}
              href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #e6683c, #dc2743, #cc2366, #bc1888, #f09433)',
                },
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
              sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: '1rem' }}
            >
              Take the Quiz
            </Button>
            <Button
              variant="outlined"
              startIcon={<MenuBookIcon />}
              component={Link}
              href="/youth/magazine"
              sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: '1rem' }}
            >
              Read the Magazine
            </Button>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2,
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  animation="wave"
                  sx={{ paddingTop: '177.78%', borderRadius: 2 }}
                />
              ))}
            </Box>
          ) : reels.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2,
              }}
            >
              {reels.map((reel) => (
                <ReelCard key={reel.videoId} reel={reel} />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <YouTubeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary">
                Reels coming soon!
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
