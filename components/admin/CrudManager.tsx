'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSupabaseBrowser, db } from '@/lib/supabase-browser';
import {
  AdminCard, SearchBar, SaveButton, DeleteButton, SortableList, showToast, useUnsavedChanges,
} from './AdminUI';

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'tags' | 'date';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  width?: string;
}

interface CrudManagerProps {
  table: string;
  sectionAnchor: string;
  fields: FieldDef[];
  titleField: string;
  subtitleField?: string;
  defaultValues: Record<string, unknown>;
  searchFields?: string[];
}

export default function CrudManager({
  table, sectionAnchor, fields, titleField, subtitleField, defaultValues, searchFields,
}: CrudManagerProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [dirty, setDirty] = useState(false);
  const [orderDirty, setOrderDirty] = useState(false);

  useUnsavedChanges(dirty || orderDirty);

  const fetchItems = useCallback(async () => {
    const { data } = await db(table)
      .select('*')
      .order('sort_order');
    setItems(data || []);
    setLoading(false);
  }, [table]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  function startAdd() {
    setEditingId('new');
    setForm({ ...defaultValues });
    setDirty(false);
  }

  function startEdit(item: Record<string, unknown>) {
    setEditingId(item.id as string);
    setForm({ ...item });
    setDirty(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({});
    setDirty(false);
  }

  function updateField(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = getSupabaseBrowser();
    const payload: Record<string, unknown> = {};
    fields.forEach((f) => { payload[f.key] = form[f.key] ?? defaultValues[f.key]; });

    if (editingId === 'new') {
      payload.sort_order = items.length + 1;
      const { error } = await db(table).insert(payload as any);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
      showToast('Item added successfully');
    } else {
      const { error } = await db(table).update(payload as any).eq('id', editingId);
      if (error) { showToast(error.message, 'error'); setSaving(false); return; }
      showToast('Item updated successfully');
    }

    setSaving(false);
    setEditingId(null);
    setForm({});
    setDirty(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await db(table).delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Item deleted');
    if (editingId === id) cancelEdit();
    fetchItems();
  }

  async function handleReorder(reordered: Record<string, unknown>[]) {
    setItems(reordered);
    setOrderDirty(true);
  }

  async function saveOrder() {
    const updates = items.map((item, idx) =>
      db(table).update({ sort_order: idx + 1 } as any).eq('id', item.id as string)
    );
    await Promise.all(updates);
    showToast('Order saved');
    setOrderDirty(false);
  }

  const filteredItems = search
    ? items.filter((item) =>
        (searchFields || [titleField]).some((f) =>
          String(item[f] || '').toLowerCase().includes(search.toLowerCase())
        )
      )
    : items;

  if (loading) return <p style={{ color: '#9a9590' }}>Loading...</p>;

  if (editingId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button
          onClick={cancelEdit}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            color: '#5a5650',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ← Back to list
        </button>

        <AdminCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {fields.map((f) => (
              <div key={f.key} style={{ width: f.width || '100%' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#5a5650', marginBottom: '4px', display: 'block' }}>
                  {f.label} {f.required && <span style={{ color: '#dc2626' }}>*</span>}
                </label>
                {f.type === 'textarea' ? (
                  <textarea
                    value={String(form[f.key] || '')}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    rows={4}
                    style={{
                      width: '100%', padding: '10px 14px', border: '0.5px solid #e8e4de',
                      borderRadius: '10px', fontSize: '14px', background: '#faf8f4',
                      outline: 'none', color: '#1c1a17', resize: 'vertical', lineHeight: 1.6,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                ) : f.type === 'select' ? (
                  <select
                    value={String(form[f.key] || '')}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', border: '0.5px solid #e8e4de',
                      borderRadius: '10px', fontSize: '14px', background: '#faf8f4',
                      outline: 'none', color: '#1c1a17', cursor: 'pointer',
                    }}
                  >
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : f.type === 'tags' ? (
                  <TagInputInline
                    value={(form[f.key] as string[]) || []}
                    onChange={(v) => updateField(f.key, v)}
                  />
                ) : f.type === 'number' ? (
                  <input
                    type="number"
                    value={String(form[f.key] || '')}
                    onChange={(e) => updateField(f.key, Number(e.target.value))}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', padding: '10px 14px', border: '0.5px solid #e8e4de',
                      borderRadius: '10px', fontSize: '14px', background: '#faf8f4',
                      outline: 'none', color: '#1c1a17',
                    }}
                  />
                ) : (
                  <input
                    type={f.type === 'date' ? 'date' : 'text'}
                    value={String(form[f.key] || '')}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', padding: '10px 14px', border: '0.5px solid #e8e4de',
                      borderRadius: '10px', fontSize: '14px', background: '#faf8f4',
                      outline: 'none', color: '#1c1a17',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </AdminCard>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SaveButton loading={saving} onClick={handleSave} />
          {editingId !== 'new' && <DeleteButton onClick={() => handleDelete(editingId)} />}
          {dirty && <span style={{ fontSize: '13px', color: '#c0622a' }}>Unsaved changes</span>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={setSearch} placeholder={`Search ${table}...`} />
        <button
          onClick={startAdd}
          style={{
            padding: '9px 18px',
            background: '#c0622a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          + Add New
        </button>
        {orderDirty && (
          <button
            onClick={saveOrder}
            style={{
              padding: '9px 18px',
              background: '#eaf2ec',
              color: '#3a6b4a',
              border: '1px solid rgba(58,107,74,0.2)',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Save Order
          </button>
        )}
        <a
          href={`/#${sectionAnchor}`}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: '13px', color: '#5a5650', marginLeft: 'auto' }}
        >
          View on site →
        </a>
      </div>

      {filteredItems.length === 0 ? (
        <AdminCard>
          <p style={{ color: '#9a9590', textAlign: 'center', padding: '20px' }}>
            {search ? 'No matching items' : 'No items yet. Click "Add New" to get started.'}
          </p>
        </AdminCard>
      ) : (
        <SortableList
          items={filteredItems as (Record<string, unknown> & { id: string })[]}
          onReorder={handleReorder}
          renderItem={(item) => (
            <AdminCard style={{ cursor: 'pointer' }}>
              <div
                onClick={() => startEdit(item)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: '15px', fontWeight: 500, color: '#1c1a17',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {String(item[titleField] || 'Untitled')}
                  </p>
                  {subtitleField && (
                    <p style={{
                      fontSize: '13px', color: '#9a9590', marginTop: '2px',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {String(item[subtitleField] || '')}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: '12px', color: '#9a9590', flexShrink: 0 }}>Edit →</span>
              </div>
            </AdminCard>
          )}
        />
      )}
    </div>
  );
}

function TagInputInline({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('');

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) onChange([...value, input.trim()]);
      setInput('');
    }
    if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div style={{
      width: '100%', padding: '8px 10px', border: '0.5px solid #e8e4de',
      borderRadius: '10px', fontSize: '14px', background: '#faf8f4',
      display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', minHeight: '42px',
    }}>
      {value.map((tag) => (
        <span key={tag} style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '3px 10px', background: '#f5ede6', color: '#c0622a',
          borderRadius: '20px', fontSize: '12px', fontWeight: 500,
        }}>
          {tag}
          <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} style={{
            background: 'none', border: 'none', color: '#c0622a', cursor: 'pointer', fontSize: '14px', padding: 0, lineHeight: 1,
          }}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? 'Type and press Enter' : ''}
        style={{
          border: 'none', outline: 'none', background: 'transparent',
          fontSize: '13px', flex: 1, minWidth: '80px', color: '#1c1a17',
        }}
      />
    </div>
  );
}
