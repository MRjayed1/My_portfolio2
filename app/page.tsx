import {
  fetchProfile,
  fetchSiteMeta,
  fetchResearchProjects,
  fetchPublications,
  fetchTeaching,
  fetchTalks,
  fetchNews,
  fetchNewsletterPosts,
  fetchNewsletterMeta,
  fetchContactLinks,
} from '@/lib/supabase-server';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ResearchSection from '@/components/sections/ResearchSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import TeachingSection from '@/components/sections/TeachingSection';
import TalksSection from '@/components/sections/TalksSection';
import NewsSection from '@/components/sections/NewsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ContactSection from '@/components/sections/ContactSection';

export const revalidate = 60;

interface SectionDef {
  id: string;
  hasContent: boolean;
  render: (num: string) => React.ReactNode;
}

export default async function HomePage() {
  const [
    profile,
    siteMeta,
    research,
    publications,
    teaching,
    talks,
    news,
    newsletterPosts,
    newsletterMeta,
    contactLinks,
  ] = await Promise.all([
    fetchProfile(),
    fetchSiteMeta(),
    fetchResearchProjects(),
    fetchPublications(),
    fetchTeaching(),
    fetchTalks(),
    fetchNews(),
    fetchNewsletterPosts(),
    fetchNewsletterMeta(),
    fetchContactLinks(),
  ]);

  const sectionDefs: SectionDef[] = [
    {
      id: 'research',
      hasContent: research.length > 0,
      render: (num) => <ResearchSection key="research" projects={research} number={num} />,
    },
    {
      id: 'publications',
      hasContent: publications.length > 0,
      render: (num) => <PublicationsSection key="publications" publications={publications} number={num} />,
    },
    {
      id: 'teaching',
      hasContent: teaching.length > 0,
      render: (num) => <TeachingSection key="teaching" teaching={teaching} number={num} />,
    },
    {
      id: 'talks',
      hasContent: talks.length > 0,
      render: (num) => <TalksSection key="talks" talks={talks} number={num} />,
    },
    {
      id: 'news',
      hasContent: news.length > 0,
      render: (num) => <NewsSection key="news" news={news} number={num} />,
    },
    {
      id: 'newsletter',
      hasContent: newsletterPosts.length > 0 || !!newsletterMeta,
      render: (num) => (
        <NewsletterSection key="newsletter" posts={newsletterPosts} meta={newsletterMeta} number={num} />
      ),
    },
    {
      id: 'contact',
      hasContent: contactLinks.length > 0,
      render: (num) => (
        <ContactSection key="contact" links={contactLinks} meta={siteMeta} number={num} />
      ),
    },
  ];

  const activeSections = sectionDefs.filter((s) => s.hasContent);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
      {profile && <Hero profile={profile} />}

      {activeSections.map((section, index) => {
        const num = String(index + 1).padStart(2, '0');
        return section.render(num);
      })}

      <Footer meta={siteMeta} />
    </main>
    </>
  );
}
