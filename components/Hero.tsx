import type { Profile } from '@/lib/types';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const bioWords = profile.bio.split(' ');

  function renderBioWithBold(bio: string, keywords: string[]) {
    if (!keywords || keywords.length === 0) return bio;
    const pattern = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = bio.split(regex);
    return parts.map((part, i) => {
      const isKeyword = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
      return isKeyword ? (
        <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          {part}
        </strong>
      ) : (
        part
      );
    });
  }

  return (
    <section
      id="about"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div className="hero-grid">
        {/* Left Column: Image Card */}
        <AnimatedSection delay={0} className="hero-card">
          <div className="hero-avatar">
            <Image
              src={profile.profile_image_url || "/photo.jpeg"}
              alt={`${profile.full_name} profile photo`}
              width={320}
              height={320}
              style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
              priority
            />
          </div>
          <p className="hero-card-name">{profile.full_name}</p>
          <p className="hero-card-role">{profile.role}</p>

          <div className="hero-card-links">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="chip-link">✉ Email</a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="chip-link">LinkedIn</a>
            )}
            {profile.scholar_url && (
              <a href={profile.scholar_url} target="_blank" rel="noreferrer" className="chip-link">Scholar</a>
            )}
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="chip-link">GitHub</a>
            )}
          </div>
        </AnimatedSection>

        {/* Right Column: Text & Bio */}
        <div className="hero-left">
          <AnimatedSection delay={60}>
            <p className="hero-eyebrow">{profile.affiliation}</p>
          </AnimatedSection>
          
          <AnimatedSection delay={120}>
            <h1
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '1.2rem',
              }}
            >
              {profile.full_name}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={180}>
            <p className="hero-tagline">
              {renderBioWithBold(profile.bio, profile.keywords)}
            </p>
          </AnimatedSection>

          {profile.tags && profile.tags.length > 0 && (
            <AnimatedSection delay={240}>
              <div className="hero-tags">
                {profile.tags.map((tag, i) => (
                  <span key={tag} className={`tag ${i < 2 ? 'accent' : ''}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={300}>
            <div className="hero-actions">
              <a href="#research" className="btn-primary">View My Research</a>
              <a href="/SheikhJayed_CV.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
                Download CV
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 100px 2.5rem 80px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
        }

        .hero-card {
          background: var(--bg-secondary);
          border: 0.5px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .hero-card::before {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 120px; height: 120px;
          background: var(--accent-light);
          border-radius: 0 20px 0 120px;
        }

        .hero-avatar {
          width: 320px; height: 320px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-light), var(--accent-mid));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.2rem;
          position: relative; z-index: 1;
          overflow: hidden;
        }

        .hero-card-name {
          font-family: 'Lora', serif;
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 4px;
          position: relative; z-index: 1;
        }

        .hero-card-role {
          font-size: 13px;
          color: var(--accent);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
          position: relative; z-index: 1;
        }

        .hero-card-links {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
          position: relative; z-index: 1;
        }

        .chip-link {
          font-size: 11px;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 6px 12px;
          border: 0.5px solid var(--border);
          border-radius: 20px;
          transition: background 0.2s;
        }
        .chip-link:hover {
          background: var(--accent-light);
          color: var(--accent);
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.2rem;
          display: flex; align-items: center; gap: 10px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block; width: 28px; height: 1px; background: var(--accent);
        }

        .hero-tagline {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 520px;
          margin-bottom: 1.8rem;
          line-height: 1.75;
          text-align: justify;
        }

        .hero-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 2.2rem;
        }
        .tag {
          font-size: 12px;
          letter-spacing: 0.05em;
          padding: 5px 12px;
          border-radius: 20px;
          border: 0.5px solid var(--border);
          color: var(--text-secondary);
          background: var(--bg-primary);
        }
        .tag.accent {
          background: var(--accent-light);
          color: var(--accent);
          border-color: var(--accent-mid);
        }

        .hero-actions {
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          font-size: 13px;
          padding: 11px 24px;
          border-radius: 25px;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #a0501f; transform: translateY(-1px); }
        
        .btn-secondary {
          display: inline-block;
          background: transparent;
          color: var(--text-primary);
          font-size: 13px;
          padding: 11px 24px;
          border-radius: 25px;
          border: 0.5px solid var(--border);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: border-color 0.2s, transform 0.15s;
        }
        .btn-secondary:hover { border-color: var(--text-primary); transform: translateY(-1px); }

        @media (max-width: 1024px) {
          .hero-section { padding: 80px 1.2rem 60px; }
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-avatar { width: 240px; height: 240px; }
        }
      `}</style>
    </section>
  );
}
