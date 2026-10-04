-- Run this in Supabase SQL Editor to set up storage for the admin panel

-- Create storage bucket for assets (profile photos, CVs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to assets bucket
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'assets');

-- Allow authenticated users to upload to assets bucket
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- Allow authenticated users to update files in assets bucket
CREATE POLICY "Authenticated update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files in assets bucket
CREATE POLICY "Authenticated delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- Enable RLS on all tables and allow authenticated users full access
-- (The ADMIN_EMAIL check is done client-side in the app)

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'profile', 'site_meta', 'research_projects', 'publications',
      'teaching', 'talks', 'news', 'newsletter_posts', 'newsletter_meta', 'contact_links'
    ])
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);

    EXECUTE format('
      CREATE POLICY "Public read %1$s" ON %1$I
        FOR SELECT USING (true)', tbl);

    EXECUTE format('
      CREATE POLICY "Auth write %1$s" ON %1$I
        FOR ALL USING (auth.role() = ''authenticated'')', tbl);
  END LOOP;
END $$;
