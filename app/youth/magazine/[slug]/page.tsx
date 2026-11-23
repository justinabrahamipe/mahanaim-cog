import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { features } from '@/config/features';
import { siteMetadata } from '@/config/seo';
import MagazineArticleView from '@/views/Magazine/MagazineArticle';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = `${slug.replace(/-/g, ' ')} | Mahanaim Youth Magazine`;
  return {
    title,
    description: siteMetadata.description,
  };
}

export default async function MagazineArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!features.magazine) notFound();
  const { slug } = await params;
  return <MagazineArticleView slug={slug} />;
}
