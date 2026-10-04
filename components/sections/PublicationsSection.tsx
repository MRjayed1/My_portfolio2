import type { Publication } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import Chip from '@/components/ui/Chip';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface PublicationsSectionProps {
  publications: Publication[];
  number: string;
}

export default function PublicationsSection({ publications, number }: PublicationsSectionProps) {
  return (
    <SectionWrapper id="publications" title="Publications" number={number}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {publications.map((pub, i) => (
          <AnimatedSection key={pub.id} delay={i * 60}>
            <article
              className="card"
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.45,
                    letterSpacing: '-0.01em',
                    flex: 1,
                    minWidth: '200px',
                  }}
                >
                  {pub.title}
                </h3>
                <StatusBadge status={pub.status} />
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {pub.authors}
              </p>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
                {pub.venue} · {pub.year}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                {pub.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {pub.tags.map((tag) => (
                      <Chip key={tag} label={tag} />
                    ))}
                  </div>
                )}
                {pub.link_url && (
                  <a
                    href={pub.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--accent-light)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s',
                    }}
                  >
                    Paper <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
