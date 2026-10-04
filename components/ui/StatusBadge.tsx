type StatusType = 'current' | 'completed' | 'accepted' | 'published';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const STATUS_MAP: Record<StatusType, { bg: string; color: string; border: string; text: string }> = {
  current: {
    bg: 'var(--status-current-bg)',
    color: 'var(--status-current-text)',
    border: 'var(--status-current-border)',
    text: 'Current',
  },
  completed: {
    bg: 'var(--status-completed-bg)',
    color: 'var(--status-completed-text)',
    border: 'var(--status-completed-border)',
    text: 'Completed',
  },
  accepted: {
    bg: 'var(--status-accepted-bg)',
    color: 'var(--status-accepted-text)',
    border: 'var(--status-accepted-border)',
    text: 'Accepted',
  },
  published: {
    bg: 'var(--status-published-bg)',
    color: 'var(--status-published-text)',
    border: 'var(--status-published-border)',
    text: 'Published',
  },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const s = STATUS_MAP[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: '9999px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: s.color,
          display: 'inline-block',
        }}
      />
      {label ?? s.text}
    </span>
  );
}
