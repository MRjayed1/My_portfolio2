'use client';

import type { NewsEntry } from '@/lib/types';
import SectionWrapper from '@/components/SectionWrapper';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ReactMarkdown from 'react-markdown';

interface NewsSectionProps {
  news: NewsEntry[];
  number: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function NewsSection({ news, number }: NewsSectionProps) {
  return (
    <SectionWrapper id="news" title="News" number={number}>
      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        <div className="timeline-line" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {news.map((entry, i) => (
            <AnimatedSection key={entry.id} delay={i * 60}>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '28px',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-28px',
                    top: '6px',
                  }}
                >
                  <div className="timeline-dot" />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        fontWeight: 500,
                      }}
                    >
                      {formatDate(entry.date)}
                    </span>
                    <span aria-hidden="true" style={{ fontSize: '15px' }}>
                      {entry.emoji}
                    </span>
                  </div>
                  <div
                    className="prose-content"
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                    }}
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}
                          >
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => (
                          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            {children}
                          </strong>
                        ),
                        p: ({ children }) => <p style={{ margin: 0 }}>{children}</p>,
                      }}
                    >
                      {entry.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
