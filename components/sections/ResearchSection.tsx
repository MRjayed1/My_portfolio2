import type { ResearchProject } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import StatusBadge from '@/components/ui/StatusBadge';
import Chip from '@/components/ui/Chip';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ResearchSectionProps {
  projects: ResearchProject[];
  number: string;
}

export default function ResearchSection({ projects, number }: ResearchSectionProps) {
  return (
    <SectionWrapper id="research" title="Research & Projects" number={number}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '20px',
        }}
        className="research-grid"
      >
        {projects.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 80}>
            <article className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <StatusBadge status={project.status} />
                {project.badge && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 10px',
                      background: 'rgba(251, 191, 36, 0.12)',
                      color: '#fbbf24',
                      border: '1px solid rgba(251, 191, 36, 0.25)',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    🏆 {project.badge}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                }}
              >
                {project.title}
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                {project.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                {project.institution && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>🏛</span> {project.institution}
                  </span>
                )}
                {project.supervisor && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>👩‍🏫</span> {project.supervisor}
                  </span>
                )}
                {project.start_date && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>📅</span> {project.start_date}
                    {project.end_date ? ` – ${project.end_date}` : ''}
                  </span>
                )}
              </div>

              {project.link_url && (
                <a
                  href={project.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--accent-light)',
                    marginTop: '4px',
                    transition: 'color 0.2s',
                  }}
                >
                  {project.link_label ?? 'View Project'}
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .research-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionWrapper>
  );
}
