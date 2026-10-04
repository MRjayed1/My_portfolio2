interface SectionWrapperProps {
  id: string;
  title: string;
  number: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ id, title, number, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      style={{
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="content-wrapper">
        <div className="section-header">
          <span className="section-index-number" aria-hidden="true">
            {number}
          </span>
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
