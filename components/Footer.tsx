import type { SiteMeta } from '@/lib/types';

interface FooterProps {
  meta: SiteMeta | null;
}

function formatLastUpdated(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function Footer({ meta }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '32px',
        paddingBottom: '40px',
        marginTop: '0',
      }}
    >
      <div
        className="content-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          © {meta?.copyright_name ?? 'Your Name'}
        </p>
        {meta?.last_updated && (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Last updated: {formatLastUpdated(meta.last_updated)}
          </p>
        )}
      </div>
    </footer>
  );
}
