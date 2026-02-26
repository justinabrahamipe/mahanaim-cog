'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { YouTubeVideo } from '@/types/youtube';

interface ShortsViewerProps {
  shorts: YouTubeVideo[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ShortsViewer({
  shorts,
  currentIndex,
  open,
  onClose,
  onNavigate,
}: ShortsViewerProps) {
  const current = shorts[currentIndex];
  if (!current) return null;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < shorts.length - 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          backgroundColor: '#000',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
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

        <Box sx={{ position: 'relative', paddingTop: '177.78%', backgroundColor: '#000' }}>
          <iframe
            src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1`}
            title={current.title}
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

        {/* Navigation arrows */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            px: 1,
            pointerEvents: 'none',
          }}
        >
          {hasPrev && (
            <IconButton
              onClick={() => onNavigate(currentIndex - 1)}
              sx={{
                pointerEvents: 'auto',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box sx={{ flex: 1 }} />
          {hasNext && (
            <IconButton
              onClick={() => onNavigate(currentIndex + 1)}
              sx={{
                pointerEvents: 'auto',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}
        </Box>

        {/* Title */}
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
            {current.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {currentIndex + 1} / {shorts.length}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
