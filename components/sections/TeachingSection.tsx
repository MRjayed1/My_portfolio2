import type { Teaching } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface TeachingSectionProps {
  teaching: Teaching[];
  number: string;
}

export default function TeachingSection({ teaching, number }: TeachingSectionProps) {
  return (
    <SectionWrapper id="teaching" title="Teaching" number={number}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '16px',
        }}
        className="teaching-grid"
      >
        {teaching.map((item, i) => (
          <AnimatedSection key={item.id} delay={i * 70}>
            <article
              className="card"
              style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', height: '100%' }}
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
                  fontSize: '20px',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {item.emoji}
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                  }}
                >
                  {item.course}
                </h3>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--accent-light)',
                  }}
                >
                  {item.institution}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                  }}
                >
                  {item.term}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginTop: '4px',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .teaching-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionWrapper>
  );
}
