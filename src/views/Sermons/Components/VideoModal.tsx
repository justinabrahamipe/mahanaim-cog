'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { YouTubeVideo } from '@/types/youtube';

interface VideoModalProps {
  video: YouTubeVideo | null;
  open: boolean;
  onClose: () => void;
  videos: YouTubeVideo[];
  onSelectVideo: (video: YouTubeVideo) => void;
}

export default function VideoModal({ video, open, onClose, videos, onSelectVideo }: VideoModalProps) {
  if (!video) return null;

  const otherVideos = videos.filter((v) => v.videoId !== video.videoId).slice(0, 6);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: '90vh' },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 0,
            }}
          >
            {/* Main video */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {new Date(video.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
              </Box>
            </Box>

            {/* Sidebar with more videos */}
            {otherVideos.length > 0 && (
              <Box
                sx={{
                  width: { xs: '100%', md: 300 },
                  maxHeight: { md: 500 },
                  overflowY: 'auto',
                  borderLeft: { md: 1 },
                  borderTop: { xs: 1, md: 0 },
                  borderColor: 'divider',
                  p: 1,
                }}
              >
                <Typography variant="subtitle2" sx={{ px: 1, py: 0.5, fontWeight: 600 }}>
                  More Videos
                </Typography>
                {otherVideos.map((v) => (
                  <Box
                    key={v.videoId}
                    onClick={() => onSelectVideo(v)}
                    sx={{
                      display: 'flex',
                      gap: 1,
                      p: 1,
                      cursor: 'pointer',
                      borderRadius: 1,
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <Box
                      component="img"
                      src={v.thumbnailUrl}
                      alt={v.title}
                      sx={{
                        width: 100,
                        height: 56,
                        objectFit: 'cover',
                        borderRadius: 0.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 500,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {v.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
