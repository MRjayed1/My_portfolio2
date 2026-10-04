'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Research & Projects', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Teaching', href: '#teaching' },
  { label: 'Talks', href: '#talks' },
  { label: 'News', href: '#news' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="nav-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '58px',
          background: 'rgba(250, 248, 244, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '0.5px solid var(--border)',
          padding: '0 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#about"
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '19px',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            fontWeight: 500,
          }}
        >
          Your Name
        </a>

        <nav aria-label="Main navigation">
          <ul
            className="nav-links"
            style={{
              display: 'flex',
              gap: '2rem',
              listStyle: 'none',
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isContact = id === 'contact';
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isContact ? 'nav-cta' : 'nav-link'}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <style>{`
        @media (max-width: 768px) {
          .nav-header { padding: 0 1.2rem !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
