'use client';

import { useState } from 'react';
import { AdminShell, useAdminAuth, type SectionKey } from '@/components/admin/AdminShell';
import ProfileManager from '@/components/admin/ProfileManager';
import CrudManager from '@/components/admin/CrudManager';
import NewsletterManager from '@/components/admin/NewsletterManager';
import SettingsManager from '@/components/admin/SettingsManager';

const RESEARCH_FIELDS = [
  { key: 'title', label: 'Title', type: 'text' as const, placeholder: 'Project title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Describe the project...' },
  { key: 'status', label: 'Status', type: 'select' as const, options: [
    { value: 'current', label: 'Current' },
    { value: 'completed', label: 'Completed' },
  ]},
  { key: 'institution', label: 'Institution', type: 'text' as const, placeholder: 'University name' },
  { key: 'supervisor', label: 'Supervisor', type: 'text' as const, placeholder: 'Prof. Name' },
  { key: 'start_date', label: 'Start Date', type: 'text' as const, placeholder: 'Aug 2024' },
  { key: 'end_date', label: 'End Date', type: 'text' as const, placeholder: 'Present' },
  { key: 'badge', label: 'Badge (e.g. "1st Place")', type: 'text' as const, placeholder: 'Optional badge' },
  { key: 'link_url', label: 'Link URL', type: 'text' as const, placeholder: 'https://...' },
  { key: 'link_label', label: 'Link Label', type: 'text' as const, placeholder: 'GitHub →' },
];

const PUBLICATION_FIELDS = [
  { key: 'title', label: 'Title', type: 'text' as const, placeholder: 'Paper title', required: true },
  { key: 'authors', label: 'Authors', type: 'text' as const, placeholder: 'Author 1, Author 2' },
  { key: 'venue', label: 'Venue / Journal', type: 'text' as const, placeholder: 'Conference Name 2026' },
  { key: 'year', label: 'Year', type: 'number' as const, placeholder: '2026' },
  { key: 'status', label: 'Status', type: 'select' as const, options: [
    { value: 'published', label: 'Published' },
    { value: 'accepted', label: 'Accepted' },
  ]},
  { key: 'tags', label: 'Tags', type: 'tags' as const },
  { key: 'link_url', label: 'Paper Link', type: 'text' as const, placeholder: 'https://...' },
];

const TEACHING_FIELDS = [
  { key: 'emoji', label: 'Icon / Emoji', type: 'text' as const, placeholder: '🎓' },
  { key: 'course', label: 'Course Name', type: 'text' as const, placeholder: 'Course title', required: true },
  { key: 'institution', label: 'Institution & Term', type: 'text' as const, placeholder: 'University · Fall 2024' },
  { key: 'term', label: 'Role', type: 'text' as const, placeholder: 'Teaching Assistant' },
  { key: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Describe your responsibilities...' },
];

const TALKS_FIELDS = [
  { key: 'month', label: 'Month', type: 'text' as const, placeholder: 'Oct' },
  { key: 'year', label: 'Year', type: 'number' as const, placeholder: '2025' },
  { key: 'role', label: 'Role', type: 'text' as const, placeholder: 'Invited Speaker' },
  { key: 'title', label: 'Talk Title', type: 'text' as const, placeholder: 'Title of talk', required: true },
  { key: 'venue', label: 'Venue', type: 'text' as const, placeholder: 'Conference Name' },
  { key: 'link_url', label: 'Link URL', type: 'text' as const, placeholder: 'https://...' },
  { key: 'link_label', label: 'Link Label', type: 'text' as const, placeholder: 'Watch Video' },
];

const NEWS_FIELDS = [
  { key: 'date', label: 'Date', type: 'date' as const, required: true },
  { key: 'emoji', label: 'Emoji', type: 'text' as const, placeholder: '🎉' },
  { key: 'content', label: 'Content (supports **bold** and [links](url))', type: 'textarea' as const, placeholder: 'Write news content...' },
];

function SectionContent({ section }: { section: SectionKey }) {
  switch (section) {
    case 'profile':
      return <ProfileManager />;
    case 'research':
      return (
        <CrudManager
          table="research_projects"
          sectionAnchor="research"
          titleField="title"
          subtitleField="institution"
          defaultValues={{ title: '', description: '', status: 'current', institution: '', supervisor: '', start_date: '', end_date: '', badge: null, link_url: null, link_label: null }}
          fields={RESEARCH_FIELDS}
          searchFields={['title', 'institution']}
        />
      );
    case 'publications':
      return (
        <CrudManager
          table="publications"
          sectionAnchor="publications"
          titleField="title"
          subtitleField="venue"
          defaultValues={{ title: '', authors: '', venue: '', year: new Date().getFullYear(), status: 'published', tags: [], link_url: null }}
          fields={PUBLICATION_FIELDS}
          searchFields={['title', 'authors', 'venue']}
        />
      );
    case 'teaching':
      return (
        <CrudManager
          table="teaching"
          sectionAnchor="teaching"
          titleField="course"
          subtitleField="institution"
          defaultValues={{ emoji: '🎓', course: '', institution: '', term: '', description: '' }}
          fields={TEACHING_FIELDS}
          searchFields={['course', 'institution']}
        />
      );
    case 'talks':
      return (
        <CrudManager
          table="talks"
          sectionAnchor="talks"
          titleField="title"
          subtitleField="venue"
          defaultValues={{ month: '', year: new Date().getFullYear(), role: '', title: '', venue: '', link_url: null, link_label: null }}
          fields={TALKS_FIELDS}
          searchFields={['title', 'venue']}
        />
      );
    case 'news':
      return (
        <CrudManager
          table="news"
          sectionAnchor="news"
          titleField="content"
          subtitleField="date"
          defaultValues={{ date: new Date().toISOString().split('T')[0], emoji: '🎉', content: '' }}
          fields={NEWS_FIELDS}
          searchFields={['content']}
        />
      );
    case 'newsletter':
      return <NewsletterManager />;
    case 'settings':
      return <SettingsManager />;
    default:
      return null;
  }
}

export default function AdminDashboardPage() {
  const { user, loading } = useAdminAuth();
  const [activeSection, setActiveSection] = useState<SectionKey>('profile');

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#faf8f4',
      }}>
        <p style={{ color: '#9a9590', fontSize: '15px' }}>Loading admin panel...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <AdminShell activeSection={activeSection} onSectionChange={setActiveSection} user={user}>
      <SectionContent section={activeSection} />
    </AdminShell>
  );
}
