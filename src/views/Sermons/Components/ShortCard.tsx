'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { panelSx } from '@/theme/motif';
import { ink, accent } from '@/theme/tokens';
import { YouTubeVideo } from '@/types/youtube';

interface ShortCardProps {
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export default function ShortCard({ video, onClick }: ShortCardProps) {
  return (
    <Card
      onClick={() => onClick(video)}
      sx={{
        ...panelSx,
        cursor: 'pointer',
        position: 'relative',
        paddingTop: '177.78%',
        overflow: 'hidden',
        '&:hover .play-overlay, &:hover .title-overlay': { opacity: 1 },
      }}
    >
      <CardMedia
        component="img"
        image={video.thumbnailUrl}
        alt={video.title}
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        className="play-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(20, 16, 14, 0.3)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <Box sx={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlayArrowIcon sx={{ fontSize: 28, color: ink }} />
        </Box>
      </Box>
      <Box
        className="title-overlay"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.5,
          background: 'linear-gradient(transparent, rgba(20,16,14,0.85))',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#F3EEE6',
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Typography>
      </Box>
    </Card>
  );
}
