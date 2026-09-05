'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { panelSx } from '@/theme/motif';
import { ink, accent } from '@/theme/tokens';
import { YouTubeVideo } from '@/types/youtube';

interface SermonCardProps {
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export default function SermonCard({ video, onClick }: SermonCardProps) {
  const formattedDate = new Date(video.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card
      onClick={() => onClick(video)}
      sx={{
        ...panelSx,
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        '&:hover .play-overlay': { opacity: 1 },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
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
            backgroundColor: 'rgba(20, 16, 14, 0.35)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <Box sx={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlayArrowIcon sx={{ fontSize: 32, color: ink }} />
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: '0.98rem',
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Typography>
        <Chip label={formattedDate} size="small" variant="outlined" sx={{ borderColor: 'divider' }} />
      </CardContent>
    </Card>
  );
}
