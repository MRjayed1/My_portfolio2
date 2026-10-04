import { createClient } from '@supabase/supabase-js';
import type {
  Profile,
  ResearchProject,
  Publication,
  Teaching,
  Talk,
  NewsEntry,
  NewsletterPost,
  NewsletterMeta,
  ContactLink,
  SiteMeta,
} from './types';

function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function fetchProfile(): Promise<Profile | null> {
  const { data } = await getServerClient()
    .from('profile')
    .select('*')
    .limit(1)
    .single();
  return data;
}

export async function fetchSiteMeta(): Promise<SiteMeta | null> {
  const { data } = await getServerClient()
    .from('site_meta')
    .select('*')
    .limit(1)
    .single();
  return data;
}

export async function fetchResearchProjects(): Promise<ResearchProject[]> {
  const { data } = await getServerClient()
    .from('research_projects')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function fetchPublications(): Promise<Publication[]> {
  const { data } = await getServerClient()
    .from('publications')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function fetchTeaching(): Promise<Teaching[]> {
  const { data } = await getServerClient()
    .from('teaching')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function fetchTalks(): Promise<Talk[]> {
  const { data } = await getServerClient()
    .from('talks')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function fetchNews(): Promise<NewsEntry[]> {
  const { data } = await getServerClient()
    .from('news')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function fetchNewsletterPosts(): Promise<NewsletterPost[]> {
  const { data } = await getServerClient()
    .from('newsletter_posts')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function fetchNewsletterMeta(): Promise<NewsletterMeta | null> {
  const { data } = await getServerClient()
    .from('newsletter_meta')
    .select('*')
    .limit(1)
    .single();
  return data;
}

export async function fetchContactLinks(): Promise<ContactLink[]> {
  const { data } = await getServerClient()
    .from('contact_links')
    .select('*')
    .order('sort_order');
  return data ?? [];
}
