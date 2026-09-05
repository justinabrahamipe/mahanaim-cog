'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Page from '@/components/Page/Page';
import PageBanner from '@/components/Page/Components/PageBanner';
import PageTitle from '@/components/Page/Components/PageTitle';
import type { MagazineArticle as MagazineArticleType } from '@/types';

export default function MagazineArticle({ slug }: { slug: string }) {
  const [article, setArticle] = useState<MagazineArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch('/api/magazine');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const found = (data.articles as MagazineArticleType[]).find((a) => a.slug === slug);
        if (found) {
          setArticle(found);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  return (
    <Page>
      <PageBanner>
        <PageTitle title={article?.title || (loading ? 'Loading…' : 'Article')} subtitle="Mahanaim Youth Magazine" />
      </PageBanner>

      <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Container maxWidth="md">
          <Button component={Link} href="/youth/magazine" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
            Back to Magazine
          </Button>

          {loading ? (
            <Box>
              <Skeleton variant="rectangular" animation="wave" sx={{ height: 320, borderRadius: 2, mb: 3 }} />
              <Skeleton variant="text" height={40} width="60%" />
              <Skeleton variant="text" height={24} width="40%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} width="80%" />
            </Box>
          ) : notFound || !article ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Article not found.
              </Typography>
            </Box>
          ) : (
            <Box>
              {article.coverImage && (
                <Box
                  component="img"
                  src={article.coverImage}
                  alt={article.title}
                  sx={{ width: '100%', borderRadius: 2, mb: 3, aspectRatio: '16 / 9', objectFit: 'cover' }}
                />
              )}
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                {[article.author, article.date].filter(Boolean).join(' · ')}
              </Typography>
              {article.content.split('\n').filter((p) => p.trim()).map((paragraph, i) => (
                <Typography key={i} variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                  {paragraph}
                </Typography>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Page>
  );
}
