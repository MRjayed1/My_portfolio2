import type { NewsletterPost, NewsletterMeta } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface NewsletterSectionProps {
  posts: NewsletterPost[];
  meta: NewsletterMeta | null;
  number: string;
}

export default function NewsletterSection({ posts, meta, number }: NewsletterSectionProps) {
  return (
    <SectionWrapper id="newsletter" title="Newsletter & Writing" number={number}>
      {meta && (
        <AnimatedSection>
          <div style={{ marginBottom: '36px' }}>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '640px',
                marginBottom: '16px',
              }}
            >
              {meta.intro_text}
            </p>
            {meta.subscribe_url && (
              <a
                href={meta.subscribe_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ display: 'inline-flex' }}
              >
                Subscribe on LinkedIn →
              </a>
            )}
          </div>
        </AnimatedSection>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '16px',
        }}
        className="newsletter-grid"
      >
        {posts.map((post, i) => (
          <AnimatedSection key={post.id} delay={i * 70}>
            <article
              className="card"
              style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {post.series}
              </span>

              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {post.summary}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'var(--status-published-text)',
                  }}
                >
                  {post.status}
                </span>
                <a
                  href={post.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--accent-light)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.2s',
                  }}
                >
                  Read <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .newsletter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionWrapper>
  );
}
