'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowser, db } from '@/lib/supabase-browser';
import type { SiteMeta, ContactLink } from '@/lib/types';
import {
  FormField, TextInput, TextArea, SaveButton, AdminCard, SortableList,
  showToast, useUnsavedChanges, DeleteButton,
} from './AdminUI';

export default function SettingsManager() {
  const [meta, setMeta] = useState<Partial<SiteMeta>>({});
  const [links, setLinks] = useState<ContactLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [editingLink, setEditingLink] = useState<Partial<ContactLink> | null>(null);

  useUnsavedChanges(dirty);

  useEffect(() => {
    Promise.all([
      db('site_meta').select('*').limit(1).single(),
      db('contact_links').select('*').order('sort_order'),
    ]).then(([metaRes, linksRes]: any[]) => {
      if (metaRes.data) setMeta(metaRes.data);
      setLinks(linksRes.data || []);
      setLoading(false);
    });
  }, []);

  function updateMeta(field: string, value: string) {
    setMeta((m) => ({ ...m, [field]: value }));
    setDirty(true);
  }

  async function handleSaveMeta() {
    setSaving(true);
    const { id, last_updated, ...rest } = meta as SiteMeta;
    if (id) {
      const { error } = await db('site_meta').update(rest as any).eq('id', id);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
    } else {
      const { error } = await db('site_meta').insert(rest as any);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
    }
    showToast('Settings saved');
    setDirty(false);
    setSaving(false);
  }

  async function handleSaveLink() {
    if (!editingLink) return;
    const payload = {
      icon: editingLink.icon || '',
      label: editingLink.label || '',
      value: editingLink.value || '',
      url: editingLink.url || '',
      sort_order: editingLink.sort_order ?? links.length + 1,
    };
    if (editingLink.id) {
      const { error } = await db('contact_links').update(payload as any).eq('id', editingLink.id);
      if (error) { showToast(error.message, 'error'); return; }
    } else {
      const { error } = await db('contact_links').insert(payload as any);
      if (error) { showToast(error.message, 'error'); return; }
    }
    showToast('Contact link saved');
    setEditingLink(null);
    const { data } = await db('contact_links').select('*').order('sort_order');
    setLinks(data || []);
  }

  async function handleDeleteLink(id: string) {
    if (!confirm('Delete this contact link?')) return;
    await db('contact_links').delete().eq('id', id);
    showToast('Link deleted');
    setLinks(links.filter((l) => l.id !== id));
    if (editingLink?.id === id) setEditingLink(null);
  }

  async function handleReorderLinks(reordered: ContactLink[]) {
    setLinks(reordered);
    await Promise.all(
      reordered.map((link, idx) =>
        db('contact_links').update({ sort_order: idx + 1 } as any).eq('id', link.id)
      )
    );
    showToast('Order saved');
  }

  if (loading) return <p style={{ color: '#9a9590' }}>Loading settings...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AdminCard>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1c1a17', marginBottom: '16px' }}>Site Metadata</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormField label="Site Title (browser tab)">
            <TextInput value={meta.site_title || ''} onChange={(v) => updateMeta('site_title', v)} placeholder="Your Name — Researcher" />
          </FormField>
          <FormField label="SEO / OG Description">
            <TextArea value={meta.og_description || ''} onChange={(v) => updateMeta('og_description', v)} rows={3} placeholder="A brief site description..." />
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormField label="Copyright Name">
              <TextInput value={meta.copyright_name || ''} onChange={(v) => updateMeta('copyright_name', v)} placeholder="Your Full Name" />
            </FormField>
          </div>
          <FormField label="Contact Section Intro Text">
            <TextArea value={meta.contact_intro || ''} onChange={(v) => updateMeta('contact_intro', v)} rows={3} placeholder="I am always open to..." />
          </FormField>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SaveButton loading={saving} onClick={handleSaveMeta} />
          {dirty && <span style={{ fontSize: '13px', color: '#c0622a' }}>Unsaved changes</span>}
        </div>
      </AdminCard>

      <AdminCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1c1a17' }}>Contact Links</h3>
          <button
            onClick={() => setEditingLink({ icon: '', label: '', value: '', url: '' })}
            style={{
              padding: '7px 14px', background: '#c0622a', color: '#fff',
              border: 'none', borderRadius: '10px', fontSize: '13px',
              fontWeight: 500, cursor: 'pointer',
            }}
          >
            + Add Link
          </button>
        </div>

        {editingLink && (
          <div style={{
            background: '#faf8f4', border: '0.5px solid #e8e4de',
            borderRadius: '12px', padding: '16px', marginBottom: '16px',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px' }}>
              <FormField label="Icon / Emoji">
                <TextInput value={editingLink.icon || ''} onChange={(v) => setEditingLink({ ...editingLink, icon: v })} placeholder="✉" />
              </FormField>
              <FormField label="Label">
                <TextInput value={editingLink.label || ''} onChange={(v) => setEditingLink({ ...editingLink, label: v })} placeholder="Email" />
              </FormField>
            </div>
            <FormField label="Display Value">
              <TextInput value={editingLink.value || ''} onChange={(v) => setEditingLink({ ...editingLink, value: v })} placeholder="you@email.com" />
            </FormField>
            <FormField label="URL">
              <TextInput value={editingLink.url || ''} onChange={(v) => setEditingLink({ ...editingLink, url: v })} placeholder="mailto:you@email.com" />
            </FormField>
            <div style={{ display: 'flex', gap: '8px' }}>
              <SaveButton loading={false} onClick={handleSaveLink} label="Save Link" />
              <button onClick={() => setEditingLink(null)} style={{
                padding: '8px 14px', background: 'transparent', color: '#5a5650',
                border: '0.5px solid #e8e4de', borderRadius: '10px', fontSize: '13px', cursor: 'pointer',
              }}>Cancel</button>
            </div>
          </div>
        )}

        <SortableList
          items={links}
          onReorder={handleReorderLinks}
          renderItem={(link) => (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#faf8f4', border: '0.5px solid #e8e4de', borderRadius: '10px', padding: '10px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>{link.icon}</span>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#1c1a17' }}>{link.label}</p>
                  <p style={{ fontSize: '12px', color: '#9a9590' }}>{link.value}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setEditingLink(link)} style={{
                  padding: '5px 10px', background: '#f5ede6', color: '#c0622a',
                  border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
                }}>Edit</button>
                <button onClick={() => handleDeleteLink(link.id)} style={{
                  padding: '5px 10px', background: '#fef2f2', color: '#dc2626',
                  border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
                }}>×</button>
              </div>
            </div>
          )}
        />
      </AdminCard>

      <a href="/#contact" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#5a5650' }}>
        View on site →
      </a>
    </div>
  );
}
