'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';

const INSTAGRAM_HANDLE = 'mahanaim__youth';

interface ReelMeta {
  url: string;
  thumbnailUrl: string;
  title: string;
}

function ReelCard({ reel }: { reel: ReelMeta }) {
  const [loaded, setLoaded] = useState(false);
  const hasThumbnail = !!reel.thumbnailUrl;

  return (
    <Card
      sx={{
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: '#E4405F',
          boxShadow: '0 12px 24px rgba(228, 64, 95, 0.15)',
        },
      }}
    >
      <CardActionArea
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          sx={{
            position: 'relative',
            paddingTop: '177.78%',
            background: hasThumbnail
              ? 'action.hover'
              : 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
          }}
        >
          {hasThumbnail && !loaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}
          {hasThumbnail && (
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
          )}
          {/* Center content for no-thumbnail cards */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
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
            {!hasThumbnail && reel.title && (
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                  px: 2,
                  textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {reel.title}
              </Typography>
            )}
          </Box>
          {/* Instagram badge */}
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <InstagramIcon sx={{ color: 'white', fontSize: 24, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
          </Box>
        </Box>
        {hasThumbnail && reel.title && (
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
  const [reels, setReels] = useState<ReelMeta[]>([]);
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
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                <ReelCard key={reel.url} reel={reel} />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <InstagramIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary">
                Reels coming soon!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Follow us on Instagram to see our latest content.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Page>
  );
}
