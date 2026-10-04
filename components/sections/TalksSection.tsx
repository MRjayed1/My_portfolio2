import type { Talk } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface TalksSectionProps {
  talks: Talk[];
  number: string;
}

export default function TalksSection({ talks, number }: TalksSectionProps) {
  return (
    <SectionWrapper id="talks" title="Talks & Presentations" number={number}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {talks.map((talk, i) => (
          <AnimatedSection key={talk.id} delay={i * 80}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '24px',
                padding: '24px 0',
                borderBottom: '1px solid var(--border)',
              }}
              className="talk-entry"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingTop: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--accent-light)',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {talk.month}
                </span>
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {talk.year}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {talk.role}
                </span>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {talk.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{talk.venue}</p>
                {talk.link_url && (
                  <a
                    href={talk.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--accent-light)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {talk.link_label ?? 'View'} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .talk-entry { grid-template-columns: 60px 1fr !important; gap: 14px !important; }
        }
      `}</style>
    </SectionWrapper>
  );
}
