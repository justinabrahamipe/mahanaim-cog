import type { Metadata } from 'next';
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
  const { slug } = await params;
  return <MagazineArticleView slug={slug} />;
}
