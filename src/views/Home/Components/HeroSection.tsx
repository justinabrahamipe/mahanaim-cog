'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #0a0e27 0%, #1a237e 30%, #283593 60%, #1a237e 100%)'
            : 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 40%, #16213e 70%, #0f1419 100%)',
        color: 'white',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            theme.palette.mode === 'light'
              ? `
                radial-gradient(circle 800px at 10% 20%, rgba(255, 179, 0, 0.2), transparent),
                radial-gradient(circle 600px at 90% 10%, rgba(106, 27, 154, 0.15), transparent),
                radial-gradient(circle 700px at 50% 90%, rgba(26, 35, 126, 0.3), transparent),
                radial-gradient(circle 500px at 80% 80%, rgba(255, 179, 0, 0.12), transparent),
                radial-gradient(circle 400px at 30% 60%, rgba(63, 81, 181, 0.15), transparent),
                linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)
              `
              : `
                radial-gradient(circle 800px at 10% 20%, rgba(255, 179, 0, 0.1), transparent),
                radial-gradient(circle 600px at 90% 10%, rgba(106, 27, 154, 0.08), transparent),
                radial-gradient(circle 500px at 50% 90%, rgba(26, 35, 126, 0.2), transparent)
              `,
          pointerEvents: 'none',
          animation: 'gradientShift 15s ease infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(to right, transparent 49%, rgba(255, 179, 0, 0.04) 50%, transparent 51%),
            linear-gradient(to bottom, transparent 49%, rgba(63, 81, 181, 0.04) 50%, transparent 51%)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.3,
          pointerEvents: 'none',
        },
        '@keyframes gradientShift': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      }}
    >
      {/* Decorative floating elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 179, 0, 0.25)',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
            '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
            '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 179, 0, 0.2)',
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 179, 0, 0.15), transparent)',
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
            '50%': { transform: 'scale(1.2)', opacity: 0.5 },
          },
        }}
      />
      {/* Diamond shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '80px',
          height: '80px',
          transform: 'rotate(45deg)',
          border: '1px solid rgba(255, 179, 0, 0.3)',
          animation: 'rotate 30s linear infinite',
          '@keyframes rotate': {
            from: { transform: 'rotate(45deg)' },
            to: { transform: 'rotate(405deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: '60px',
          height: '60px',
          transform: 'rotate(45deg)',
          border: '1px solid rgba(63, 81, 181, 0.25)',
          animation: 'rotate 40s linear infinite reverse',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', px: { xs: 2, md: 0 } }}>
          {/* Decorative top element */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: '60px', md: '100px' },
                height: '2px',
                background: 'linear-gradient(to right, transparent, rgba(255, 179, 0, 0.9))',
              }}
            />
            <AutoStoriesIcon sx={{ fontSize: { xs: 40, md: 50 }, color: 'secondary.main' }} />
            <Box
              sx={{
                width: { xs: '60px', md: '100px' },
                height: '2px',
                background: 'linear-gradient(to left, transparent, rgba(255, 179, 0, 0.9))',
              }}
            />
          </Box>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem', lg: '4.8rem' },
              textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
              mb: 2,
              lineHeight: 1.2,
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(to right, #ffffff, #FFD700)'
                  : 'linear-gradient(to right, #ffffff, #FFD54F)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Mahanaim Church of God
          </Typography>

          <Paper
            elevation={0}
            sx={{
              display: 'inline-block',
              px: 3,
              py: 1,
              mb: 4,
              backgroundColor: 'rgba(255, 179, 0, 0.25)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 179, 0, 0.4)',
              borderRadius: '30px',
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.3rem', md: '2rem' },
                fontWeight: 500,
                color: 'secondary.main',
              }}
            >
              Manchester
            </Typography>
          </Paper>

          <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 5 }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                opacity: 0.95,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontWeight: 400,
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              A place of worship, fellowship, and spiritual growth
            </Typography>

            {/* Feature icons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 3, md: 5 },
                mb: 4,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <FavoriteIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Faith
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <GroupsIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Community
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <AutoStoriesIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Scripture
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                opacity: 0.95,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontWeight: 300,
                fontStyle: 'italic',
                mb: 1,
              }}
            >
              &ldquo;Where faith meets community&rdquo;
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/contact"
              sx={{
                backgroundColor: 'secondary.main',
                color: '#000',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'secondary.light',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                },
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
              }}
            >
              Get In Touch
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/sermons"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'secondary.main',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
              }}
            >
              View Messages
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
