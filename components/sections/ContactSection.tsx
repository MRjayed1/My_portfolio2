import type { ContactLink, SiteMeta } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ContactSectionProps {
  links: ContactLink[];
  meta: SiteMeta | null;
  number: string;
}

export default function ContactSection({ links, meta, number }: ContactSectionProps) {
  return (
    <SectionWrapper id="contact" title="Get in Touch" number={number}>
      {meta?.contact_intro && (
        <AnimatedSection>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: '560px',
              marginBottom: '40px',
            }}
          >
            {meta.contact_intro}
          </p>
        </AnimatedSection>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))',
          gap: '14px',
        }}
        className="contact-grid"
      >
        {links.map((link, i) => (
          <AnimatedSection key={link.id} delay={i * 60}>
            <a
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--chip-bg)',
                  border: '1px solid var(--chip-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--accent-light)',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {link.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {link.label}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {link.value}
                </span>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionWrapper>
  );
}
