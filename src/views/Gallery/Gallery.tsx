'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';

interface GalleryImage {
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  createdTime: string;
}

const IMAGES_PER_PAGE = 20;

function GalleryTile({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % IMAGES_PER_PAGE) * 0.05 }}
    >
      <Box
        onClick={!errored ? onClick : undefined}
        sx={{
          position: 'relative',
          paddingTop: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          cursor: errored ? 'default' : 'pointer',
          backgroundColor: 'action.hover',
          '&:hover img': {
            transform: errored ? 'none' : 'scale(1.1)',
          },
          '&:hover .overlay': {
            opacity: errored ? 0 : 1,
          },
        }}
      >
        {/* Skeleton shown while loading */}
        {!loaded && !errored && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 2,
            }}
          />
        )}

        {/* Error state */}
        {errored && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            <BrokenImageIcon sx={{ fontSize: 32, color: 'text.secondary', opacity: 0.4 }} />
            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
              Unable to load
            </Typography>
          </Box>
        )}

        {/* Actual image */}
        {!errored && (
          <Box
            component="img"
            src={image.thumbnail}
            alt={image.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              opacity: loaded ? 1 : 0,
            }}
          />
        )}

        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
            {image.title}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(false);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) throw new Error('Failed to fetch gallery');
        const data = await res.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  const sortedImages = useMemo(() => {
    const sorted = [...images];
    sorted.sort((a, b) => {
      const timeA = new Date(a.createdTime).getTime();
      const timeB = new Date(b.createdTime).getTime();
      return sortAsc ? timeA - timeB : timeB - timeA;
    });
    return sorted;
  }, [images, sortAsc]);

  const visibleImages = sortedImages.slice(0, visibleCount);
  const hasMore = visibleCount < sortedImages.length;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setVisibleCount((prev) => Math.min(prev + IMAGES_PER_PAGE, sortedImages.length));
      }
    },
    [hasMore, sortedImages.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  const lightboxSlides = sortedImages.map((img) => ({
    src: img.src,
    alt: img.title,
    title: img.title,
  }));

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Gallery" subtitle="Photos and memories from our church" />
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
                Unable to load gallery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error}
              </Typography>
            </Box>
          ) : images.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Gallery images coming soon!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Check back later for photos from our church events.
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Tooltip title={sortAsc ? 'Oldest first' : 'Newest first'}>
                  <IconButton
                    onClick={() => {
                      setSortAsc(!sortAsc);
                      setVisibleCount(IMAGES_PER_PAGE);
                    }}
                    size="small"
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      px: 1.5,
                      gap: 0.5,
                    }}
                  >
                    {sortAsc ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {sortAsc ? 'Oldest' : 'Newest'}
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {visibleImages.map((image, index) => (
                  <GalleryTile
                    key={image.src}
                    image={image}
                    index={index}
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  />
                ))}
              </Box>

              {hasMore && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Box ref={loaderRef} sx={{ height: 1 }} />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setVisibleCount((prev) => Math.min(prev + IMAGES_PER_PAGE, sortedImages.length))}
                    sx={{ fontWeight: 600 }}
                  >
                    Load More ({sortedImages.length - visibleCount} remaining)
                  </Button>
                </Box>
              )}

              <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={lightboxSlides}
                plugins={[Zoom]}
              />
            </>
          )}
        </Container>
      </Box>
    </Page>
  );
}
