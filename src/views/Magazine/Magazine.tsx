'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import type { MagazineArticle } from '@/types';

export default function Magazine() {
  const [articles, setArticles] = useState<MagazineArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/magazine');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setArticles(data.articles);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <Page>
      <PageBanner>
        <PageTitle title="Magazine" subtitle="Stories, reflections, and updates from Mahanaim Youth" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          {loading ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" animation="wave" sx={{ height: 320, borderRadius: 2 }} />
              ))}
            </Box>
          ) : articles.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {articles.map((article) => (
                <Card
                  key={article.slug}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/youth/magazine/${article.slug}`}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}
                  >
                    {article.coverImage ? (
                      <CardMedia
                        component="img"
                        image={article.coverImage}
                        alt={article.title}
                        sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          aspectRatio: '16 / 9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                        }}
                      >
                        <MenuBookIcon sx={{ fontSize: 48, color: 'white' }} />
                      </Box>
                    )}
                    <CardContent sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 1.5,
                        }}
                      >
                        {article.excerpt}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {[article.author, article.date].filter(Boolean).join(' · ')}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <MenuBookIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary">
                Articles coming soon!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Check back soon for the first issue of the Mahanaim Youth Magazine.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Page>
  );
}
