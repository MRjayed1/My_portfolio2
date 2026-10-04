'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const SECTIONS = [
  { key: 'profile', label: 'Profile & Hero', icon: '👤' },
  { key: 'research', label: 'Research & Projects', icon: '🔬' },
  { key: 'publications', label: 'Publications', icon: '📄' },
  { key: 'teaching', label: 'Teaching', icon: '🎓' },
  { key: 'talks', label: 'Talks', icon: '🎤' },
  { key: 'news', label: 'News', icon: '📰' },
  { key: 'newsletter', label: 'Newsletter', icon: '✉️' },
  { key: 'settings', label: 'Site Settings', icon: '⚙️' },
] as const;

export type SectionKey = typeof SECTIONS[number]['key'];

interface AdminShellProps {
  activeSection: SectionKey;
  onSectionChange: (key: SectionKey) => void;
  children: React.ReactNode;
  user: User;
}

export function AdminShell({ activeSection, onSectionChange, children, user }: AdminShellProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await getSupabaseBrowser().auth.signOut();
    router.push('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf8f4' }}>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
            zIndex: 40, display: 'none',
          }}
          className="admin-overlay"
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        width: '260px',
        background: '#fffefb',
        borderRight: '0.5px solid #e8e4de',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
        flexShrink: 0,
        zIndex: 50,
      }}>
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '0.5px solid #e8e4de',
        }}>
          <h2 style={{
            fontFamily: "'Lora', serif",
            fontSize: '18px',
            fontWeight: 500,
            color: '#1c1a17',
          }}>Portfolio Admin</h2>
          <p style={{ fontSize: '12px', color: '#9a9590', marginTop: '4px' }}>
            {user.email}
          </p>
        </div>

        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => { onSectionChange(s.key); setSidebarOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSection === s.key ? 500 : 400,
                color: activeSection === s.key ? '#c0622a' : '#5a5650',
                background: activeSection === s.key ? '#f5ede6' : 'transparent',
                transition: 'all 0.15s',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontSize: '16px' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '0.5px solid #e8e4de' }}>
          <a
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              fontSize: '13px',
              color: '#5a5650',
              textDecoration: 'none',
              borderRadius: '10px',
              transition: 'background 0.15s',
            }}
          >
            🌐 View Site
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              fontSize: '13px',
              color: '#dc2626',
              background: 'none',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <header style={{
          height: '56px',
          background: 'rgba(250,248,244,0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '0.5px solid #e8e4de',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          gap: '12px',
        }}>
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: '1px solid #e8e4de',
              borderRadius: '8px',
              padding: '6px 8px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'none',
            }}
          >
            ☰
          </button>
          <h1 style={{
            fontFamily: "'Lora', serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#1c1a17',
          }}>
            {SECTIONS.find((s) => s.key === activeSection)?.icon}{' '}
            {SECTIONS.find((s) => s.key === activeSection)?.label}
          </h1>
        </header>
        <div style={{ padding: '24px', maxWidth: '900px' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            left: -280px;
            transition: left 0.3s ease;
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-overlay {
            display: block !important;
          }
          .admin-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user || (ADMIN_EMAIL && data.user.email !== ADMIN_EMAIL)) {
        router.replace('/admin/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user || (ADMIN_EMAIL && session.user.email !== ADMIN_EMAIL)) {
        router.replace('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return { user, loading };
}
