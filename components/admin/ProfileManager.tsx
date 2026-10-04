'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowser, db } from '@/lib/supabase-browser';
import { uploadFile } from '@/lib/storage';
import type { Profile } from '@/lib/types';
import {
  FormField, TextInput, TextArea, TagInput, FileUpload,
  SaveButton, AdminCard, showToast, useUnsavedChanges,
} from './AdminUI';

export default function ProfileManager() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  useEffect(() => {
    db('profile')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }: any) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, []);

  function update(field: string, value: unknown) {
    setProfile((p) => ({ ...p, [field]: value }));
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = getSupabaseBrowser();
    const { id, updated_at, ...rest } = profile as Profile;

    if (id) {
      const { error } = await db('profile').update(rest as any).eq('id', id);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
    } else {
      const { error, data } = await db('profile').insert(rest as any).select().single();
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
      if (data) setProfile(data);
    }

    showToast('Profile saved successfully');
    setDirty(false);
    setSaving(false);
  }

  async function handlePhotoUpload(file: File) {
    try {
      const url = await uploadFile('assets', `profile/photo.${file.name.split('.').pop()}`, file);
      update('profile_image_url', url);
      showToast('Photo uploaded');
    } catch (err: unknown) {
      showToast(String(err), 'error');
    }
  }

  async function handleCvUpload(file: File) {
    try {
      const url = await uploadFile('assets', `profile/cv.${file.name.split('.').pop()}`, file);
      update('cv_url', url);
      showToast('CV uploaded');
    } catch (err: unknown) {
      showToast(String(err), 'error');
    }
  }

  if (loading) return <p style={{ color: '#9a9590' }}>Loading profile...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AdminCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormField label="Full Name">
              <TextInput value={profile.full_name || ''} onChange={(v) => update('full_name', v)} placeholder="Sheikh Jayed" />
            </FormField>
            <FormField label="Role / Title">
              <TextInput value={profile.role || ''} onChange={(v) => update('role', v)} placeholder="AI Researcher" />
            </FormField>
          </div>
          <FormField label="Affiliation">
            <TextInput value={profile.affiliation || ''} onChange={(v) => update('affiliation', v)} placeholder="PhD Candidate · University" />
          </FormField>
          <FormField label="Bio (use **bold** for emphasis)">
            <TextArea value={profile.bio || ''} onChange={(v) => update('bio', v)} rows={6} placeholder="Write your bio here..." />
          </FormField>
          <FormField label="Bold Keywords (words that get highlighted in bio)">
            <TagInput value={profile.keywords || []} onChange={(v) => update('keywords', v)} />
          </FormField>
          <FormField label="Tags (shown as pills below bio)">
            <TagInput value={profile.tags || []} onChange={(v) => update('tags', v)} />
          </FormField>
        </div>
      </AdminCard>

      <AdminCard>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1c1a17', marginBottom: '16px' }}>Social Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormField label="Email">
            <TextInput value={profile.email || ''} onChange={(v) => update('email', v)} placeholder="you@university.edu" type="email" />
          </FormField>
          <FormField label="LinkedIn URL">
            <TextInput value={profile.linkedin_url || ''} onChange={(v) => update('linkedin_url', v)} placeholder="https://linkedin.com/in/..." />
          </FormField>
          <FormField label="Google Scholar URL">
            <TextInput value={profile.scholar_url || ''} onChange={(v) => update('scholar_url', v)} placeholder="https://scholar.google.com/..." />
          </FormField>
          <FormField label="GitHub URL">
            <TextInput value={profile.github_url || ''} onChange={(v) => update('github_url', v)} placeholder="https://github.com/..." />
          </FormField>
        </div>
      </AdminCard>

      <AdminCard>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1c1a17', marginBottom: '16px' }}>Uploads</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <FileUpload
            label="Profile Photo"
            accept="image/*"
            currentUrl={profile.profile_image_url}
            onUpload={handlePhotoUpload}
            preview="image"
          />
          <FileUpload
            label="CV / Resume (PDF)"
            accept=".pdf"
            currentUrl={profile.cv_url}
            onUpload={handleCvUpload}
            preview="pdf"
          />
        </div>
      </AdminCard>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <SaveButton loading={saving} onClick={handleSave} />
        {dirty && <span style={{ fontSize: '13px', color: '#c0622a' }}>Unsaved changes</span>}
        <a href="/#about" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#5a5650', marginLeft: 'auto' }}>
          View on site →
        </a>
      </div>
    </div>
  );
}
