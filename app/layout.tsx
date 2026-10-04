import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import { fetchSiteMeta } from '@/lib/supabase-server';

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchSiteMeta();
  return {
    title: meta?.site_title ?? 'Academic Portfolio',
    description: meta?.og_description ?? 'Personal academic portfolio',
    openGraph: {
      title: meta?.site_title ?? 'Academic Portfolio',
      description: meta?.og_description ?? 'Personal academic portfolio',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: meta?.site_title ?? 'Academic Portfolio',
      description: meta?.og_description ?? 'Personal academic portfolio',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
