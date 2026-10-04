'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '0.5px solid #e8e4de',
  borderRadius: '10px',
  fontSize: '14px',
  background: '#faf8f4',
  outline: 'none',
  color: '#1c1a17',
  fontFamily: "'DM Sans', sans-serif",
};

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  color: '#5a5650',
  marginBottom: '4px',
  display: 'block',
};

export function FormField({ label, children, error }: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '12px', color: '#dc2626' }}>{error}</span>}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, type = 'text', ...props }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  [key: string]: unknown;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputStyle}
      {...props}
    />
  );
}

export function TextArea({ value, onChange, placeholder, rows = 4 }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
    />
  );
}

export function SelectInput({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, cursor: 'pointer' }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function TagInput({ value, onChange }: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState('');

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput('');
    }
    if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div style={{
      ...inputStyle,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      padding: '8px 10px',
      alignItems: 'center',
      minHeight: '42px',
    }}>
      {value.map((tag) => (
        <span key={tag} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '3px 10px',
          background: '#f5ede6',
          color: '#c0622a',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 500,
        }}>
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            style={{
              background: 'none',
              border: 'none',
              color: '#c0622a',
              cursor: 'pointer',
              fontSize: '14px',
              padding: 0,
              lineHeight: 1,
            }}
          >×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? 'Type and press Enter' : ''}
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '13px',
          flex: 1,
          minWidth: '80px',
          color: '#1c1a17',
        }}
      />
    </div>
  );
}

export function FileUpload({ label, accept, currentUrl, onUpload, preview = 'image' }: {
  label: string;
  accept: string;
  currentUrl?: string;
  onUpload: (file: File) => Promise<void>;
  preview?: 'image' | 'pdf';
}) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
    } catch {
      // handled by parent
    }
    setUploading(false);
    if (ref.current) ref.current.value = '';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={labelStyle}>{label}</label>
      {currentUrl && preview === 'image' && (
        <img
          src={currentUrl}
          alt="Preview"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '2px solid #e8e4de',
          }}
        />
      )}
      {currentUrl && preview === 'pdf' && (
        <a
          href={currentUrl}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: '13px', color: '#c0622a' }}
        >
          📄 View current file
        </a>
      )}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          style={{
            padding: '8px 16px',
            background: '#f5ede6',
            color: '#c0622a',
            border: '0.5px solid #e8a882',
            borderRadius: '10px',
            fontSize: '13px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontWeight: 500,
          }}
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </button>
        <input ref={ref} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export function SaveButton({ loading, onClick, label = 'Save Changes' }: {
  loading: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        padding: '11px 24px',
        background: loading ? '#e8a882' : '#c0622a',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {loading ? 'Saving...' : label}
    </button>
  );
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 14px',
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca',
        borderRadius: '10px',
        fontSize: '13px',
        cursor: 'pointer',
        fontWeight: 500,
      }}
    >
      Delete
    </button>
  );
}

export function AdminCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#fffefb',
      border: '0.5px solid #e8e4de',
      borderRadius: '16px',
      padding: '24px',
      ...style,
    }}>
      {children}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        ...inputStyle,
        maxWidth: '300px',
      }}
    />
  );
}

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...attributes}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
        <div
          {...listeners}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 6px',
            cursor: 'grab',
            color: '#9a9590',
            fontSize: '16px',
            userSelect: 'none',
          }}
        >
          ⠿
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

export function SortableList<T extends { id: string }>({ items, onReorder, renderItem }: {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    onReorder(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item, idx) => (
            <SortableItem key={item.id} id={item.id}>
              {renderItem(item, idx)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function useUnsavedChanges(dirty: boolean) {
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);
}

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  const el = document.createElement('div');
  el.textContent = message;
  Object.assign(el.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '12px 20px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '9999',
    animation: 'fadeUp 0.3s ease',
    background: type === 'success' ? '#eaf2ec' : '#fef2f2',
    color: type === 'success' ? '#3a6b4a' : '#dc2626',
    border: type === 'success' ? '1px solid rgba(58,107,74,0.2)' : '1px solid #fecaca',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  });
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}
