export interface Profile {
  id: string;
  full_name: string;
  role: string;
  affiliation: string;
  bio: string;
  profile_image_url: string;
  email: string;
  linkedin_url: string;
  scholar_url: string;
  github_url: string;
  cv_url: string;
  keywords: string[];
  tags: string[];
  updated_at: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  status: 'current' | 'completed';
  institution: string;
  supervisor: string;
  start_date: string;
  end_date: string;
  badge: string | null;
  link_url: string | null;
  link_label: string | null;
  sort_order: number;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  status: 'accepted' | 'published';
  tags: string[];
  link_url: string | null;
  sort_order: number;
  updated_at: string;
}

export interface Teaching {
  id: string;
  emoji: string;
  course: string;
  institution: string;
  term: string;
  description: string;
  sort_order: number;
  updated_at: string;
}

export interface Talk {
  id: string;
  month: string;
  year: number;
  role: string;
  title: string;
  venue: string;
  link_url: string | null;
  link_label: string | null;
  sort_order: number;
  updated_at: string;
}

export interface NewsEntry {
  id: string;
  date: string;
  emoji: string;
  content: string;
  sort_order: number;
  updated_at: string;
}

export interface NewsletterPost {
  id: string;
  series: string;
  title: string;
  summary: string;
  status: string;
  link_url: string;
  sort_order: number;
  updated_at: string;
}

export interface NewsletterMeta {
  id: string;
  intro_text: string;
  subscribe_url: string;
  updated_at: string;
}

export interface ContactLink {
  id: string;
  icon: string;
  label: string;
  value: string;
  url: string;
  sort_order: number;
  updated_at: string;
}

export interface SiteMeta {
  id: string;
  site_title: string;
  og_description: string;
  copyright_name: string;
  contact_intro: string;
  last_updated: string;
}
