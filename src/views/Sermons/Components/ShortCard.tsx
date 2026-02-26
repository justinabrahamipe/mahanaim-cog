'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
        cursor: 'pointer',
        position: 'relative',
        paddingTop: '177.78%', // 9:16 aspect ratio
        transition: 'all 0.3s ease',
        border: '2px solid transparent',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'primary.main',
          '& .play-overlay': { opacity: 1 },
          '& .title-overlay': { opacity: 1 },
        },
      }}
    >
      <CardMedia
        component="img"
        image={video.thumbnailUrl}
        alt={video.title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        className="play-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 30, color: 'white' }} />
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
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'white',
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
