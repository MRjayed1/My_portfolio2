'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowser, db } from '@/lib/supabase-browser';
import type { NewsletterMeta } from '@/lib/types';
import {
  FormField, TextInput, TextArea, SaveButton, AdminCard, showToast, useUnsavedChanges,
} from './AdminUI';
import CrudManager from './CrudManager';

export default function NewsletterManager() {
  const [meta, setMeta] = useState<Partial<NewsletterMeta>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useUnsavedChanges(dirty);

  useEffect(() => {
    db('newsletter_meta')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }: any) => {
        if (data) setMeta(data);
        setLoading(false);
      });
  }, []);

  function update(field: string, value: string) {
    setMeta((m) => ({ ...m, [field]: value }));
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = { intro_text: meta.intro_text || '', subscribe_url: meta.subscribe_url || '' };
    if (meta.id) {
      const { error } = await db('newsletter_meta').update(payload as any).eq('id', meta.id);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
    } else {
      const { error } = await db('newsletter_meta').insert(payload as any);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
    }
    showToast('Newsletter settings saved');
    setDirty(false);
    setSaving(false);
  }

  if (loading) return <p style={{ color: '#9a9590' }}>Loading...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <AdminCard>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1c1a17', marginBottom: '16px' }}>Newsletter Intro</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormField label="Intro Text">
            <TextArea value={meta.intro_text || ''} onChange={(v) => update('intro_text', v)} rows={3} placeholder="I write a newsletter about..." />
          </FormField>
          <FormField label="Subscribe URL">
            <TextInput value={meta.subscribe_url || ''} onChange={(v) => update('subscribe_url', v)} placeholder="https://linkedin.com/newsletters/..." />
          </FormField>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SaveButton loading={saving} onClick={handleSave} />
          {dirty && <span style={{ fontSize: '13px', color: '#c0622a' }}>Unsaved changes</span>}
        </div>
      </AdminCard>

      <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1c1a17' }}>Newsletter Posts</h3>
      <CrudManager
        table="newsletter_posts"
        sectionAnchor="newsletter"
        titleField="title"
        subtitleField="series"
        defaultValues={{ series: '', title: '', summary: '', status: 'Published', link_url: '' }}
        fields={[
          { key: 'series', label: 'Series Name', type: 'text', placeholder: 'My Newsletter' },
          { key: 'title', label: 'Post Title', type: 'text', placeholder: 'Issue title', required: true },
          { key: 'summary', label: 'Summary', type: 'textarea', placeholder: 'Brief description...' },
          { key: 'status', label: 'Status', type: 'text', placeholder: 'Published' },
          { key: 'link_url', label: 'Link URL', type: 'text', placeholder: 'https://...' },
        ]}
      />
    </div>
  );
}
