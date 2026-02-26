'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { churchInfo } from '@/config/church';

export default function MeetingInfo() {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
        >
          Our Services
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{
            mb: 8,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.8,
          }}
        >
          We offer various services throughout the week to help you grow in your faith and connect
          with our community.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {churchInfo.services.map((service) => (
            <Card
              key={service.title}
              sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0 12px 24px rgba(27, 73, 101, 0.12)'
                      : '0 12px 24px rgba(91, 163, 207, 0.12)',
                  borderColor: 'primary.main',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}
                >
                  {service.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CalendarTodayIcon fontSize="small" color="secondary" />
                  <Typography variant="body2" color="text.primary" fontWeight={500}>
                    {service.day}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AccessTimeIcon fontSize="small" color="secondary" />
                  <Typography variant="body2" color="text.primary" fontWeight={500}>
                    {service.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
