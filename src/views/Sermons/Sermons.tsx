'use client';
import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import SermonCard from './Components/SermonCard';
import ShortCard from './Components/ShortCard';
import VideoModal from './Components/VideoModal';
import ShortsViewer from './Components/ShortsViewer';
import { YouTubeVideo, SermonsApiResponse } from '@/types/youtube';

type SortOption = 'newest' | 'oldest' | 'alphabetical';

export default function Sermons() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shortsViewerOpen, setShortsViewerOpen] = useState(false);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [showAllShorts, setShowAllShorts] = useState(false);

  useEffect(() => {
    async function fetchSermons() {
      try {
        const res = await fetch('/api/sermons/youtube');
        if (!res.ok) throw new Error('Failed to fetch sermons');
        const data: SermonsApiResponse = await res.json();
        setVideos(data.videos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchSermons();
  }, []);

  const shorts = useMemo(() => videos.filter((v) => v.isShort), [videos]);
  const sermons = useMemo(() => videos.filter((v) => !v.isShort), [videos]);

  const filteredSermons = useMemo(() => {
    const filtered = sermons.filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return filtered;
  }, [sermons, search, sort]);

  const handleSermonClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleShortClick = (video: YouTubeVideo) => {
    const index = shorts.findIndex((s) => s.videoId === video.videoId);
    setCurrentShortIndex(index >= 0 ? index : 0);
    setShortsViewerOpen(true);
  };

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Messages" subtitle="Watch sermons and messages from our church" />
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
                Unable to load messages
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error}
              </Typography>
            </Box>
          ) : (
            <>
              {/* Shorts section */}
              {shorts.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}
                  >
                    Shorts
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(4, 1fr)',
                        lg: 'repeat(6, 1fr)',
                      },
                      gap: 2,
                    }}
                  >
                    {(showAllShorts ? shorts : shorts.slice(0, 12)).map((video) => (
                      <ShortCard key={video.videoId} video={video} onClick={handleShortClick} />
                    ))}
                  </Box>
                  {shorts.length > 12 && (
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setShowAllShorts(!showAllShorts)}
                        sx={{ fontWeight: 600 }}
                      >
                        {showAllShorts ? 'Show Less' : `View All Shorts (${shorts.length})`}
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

              {/* Videos section */}
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}
              >
                Videos
              </Typography>

              {/* Search and sort */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 4,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
                <TextField
                  select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  size="small"
                  sx={{ minWidth: 180 }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="alphabetical">A - Z</MenuItem>
                </TextField>
              </Box>

              {filteredSermons.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="body1" color="text.secondary">
                    {search ? 'No messages found matching your search.' : 'No messages available.'}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  {filteredSermons.map((video) => (
                    <SermonCard
                      key={video.videoId}
                      video={video}
                      onClick={handleSermonClick}
                    />
                  ))}
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      <VideoModal
        video={selectedVideo}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        videos={sermons}
        onSelectVideo={(v) => setSelectedVideo(v)}
      />

      <ShortsViewer
        shorts={shorts}
        currentIndex={currentShortIndex}
        open={shortsViewerOpen}
        onClose={() => setShortsViewerOpen(false)}
        onNavigate={setCurrentShortIndex}
      />
    </Page>
  );
}
