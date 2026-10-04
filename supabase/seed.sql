insert into site_meta (site_title, og_description, copyright_name, contact_intro)
values (
  'Your Name — Researcher & Developer',
  'Personal academic portfolio of [Your Name] — researcher, developer, and educator.',
  'Your Full Name',
  'I am always open to research collaborations, speaking opportunities, and mentoring. Let''s connect and see what we can build together.'
);

insert into profile (full_name, role, affiliation, bio, profile_image_url, email, linkedin_url, scholar_url, github_url, cv_url, keywords, tags)
values (
  'Your Full Name',
  'Researcher & Developer',
  'PhD Candidate · Your University',
  'I am a doctoral candidate in [Your Department] at [Your University]. I am passionate about [Your Research Area] and the reliability of AI systems. My research interests include [Topic 1], [Topic 2], [Topic 3], and [Topic 4]. I am also interested in the intersection of AI and education.',
  '',
  'you@university.edu',
  'https://linkedin.com/in/yourhandle',
  'https://scholar.google.com/citations?user=YOURID',
  'https://github.com/yourhandle',
  '/cv.pdf',
  ARRAY['AI Safety', 'Cyber-Physical Systems', 'Reinforcement Learning', 'Trustworthy AI'],
  ARRAY['AI Safety', 'ML', 'CPS', 'Research', 'Education']
);

insert into research_projects (title, description, status, institution, supervisor, start_date, end_date, badge, link_url, link_label, sort_order) values
(
  'Your Primary Research Project',
  'A brief description of your primary ongoing research project. Explain the core problem, your approach, and the expected impact of this work.',
  'current',
  'Your University',
  'Prof. Your Supervisor',
  'Aug 2024',
  'Present',
  null,
  null,
  null,
  1
),
(
  'Award-Winning Side Project',
  'Description of a project that won a prize or received recognition. Explain what it does and why it matters.',
  'completed',
  'Your Institution',
  '',
  'Jan 2025',
  'Jun 2025',
  '1st Place',
  'https://github.com/yourhandle/project',
  'GitHub →',
  2
),
(
  'Collaborative Research Project',
  'Description of a completed collaborative project. What did you build? What framework or methodology did you use? What were the results?',
  'completed',
  'Your University',
  'Prof. Collaborator',
  'Sep 2023',
  'May 2024',
  null,
  null,
  null,
  3
),
(
  'Applied ML Project',
  'Description of an applied machine learning project. What problem did you solve? What dataset or simulation environment did you use? What was the outcome?',
  'completed',
  'Your Lab',
  '',
  'Jan 2023',
  'Aug 2023',
  null,
  null,
  null,
  4
);

insert into publications (title, authors, venue, year, status, tags, link_url, sort_order) values
(
  'Your Most Recent Conference Paper Title',
  'Your Name, Co-Author A, Co-Author B',
  'ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA ''26)',
  2026,
  'accepted',
  ARRAY['AI Safety', 'Verification'],
  null,
  1
),
(
  'Your Second Conference Paper Title',
  'Co-Author A, Your Name, Co-Author B',
  'IEEE International Conference on Software Testing, Verification and Validation (ICST 2026)',
  2026,
  'published',
  ARRAY['CPS', 'Debugging'],
  null,
  2
),
(
  'Your Workshop or Short Paper Title',
  'Your Name, Co-Author A',
  'IEEE/ACM International Conference on AI Engineering (CAIN 2025)',
  2025,
  'published',
  ARRAY['AI Engineering', 'Survey'],
  null,
  3
),
(
  'Your Journal Paper Title',
  'Co-Author A, Co-Author B, Your Name, et al.',
  'Journal of [Your Field], vol(X), 000001',
  2025,
  'published',
  ARRAY['Journal', 'Applied ML'],
  null,
  4
),
(
  'Your Earlier Conference Paper',
  'Your Name, Co-Author A, Co-Author B',
  'International Congress on Information and Communication Technology (ICICT 2024)',
  2024,
  'published',
  ARRAY['TinyML', 'Embedded Systems'],
  null,
  5
);

insert into teaching (emoji, course, institution, term, description, sort_order) values
('🎓', 'Your Graduate Course', 'Your University · Fall 2024', 'Graduate Teaching Assistant', 'Held weekly recitations, graded assignments, and provided academic support for graduate students.', 1),
('📐', 'Mathematics & Applied Statistics', 'Your University · Spring 2023', 'Teaching Assistant', 'Supported undergraduate students with synchronous and asynchronous tutoring sessions. Average student rating: 4.5/5.', 2),
('💻', 'Programming & Web Development', 'Your Institution · 2022–2023', 'Instructor', 'Taught programming fundamentals and web development to students. Guided hands-on project-based learning.', 3),
('🤖', 'AI Systems Design', 'Your Lab / University · Summer 2023', 'Graduate Intern Instructor', 'Developed and enhanced course labs for an AI systems design module.', 4);

insert into talks (month, year, role, title, venue, link_url, link_label, sort_order) values
('Oct', 2025, 'Invited Speaker', 'Your Invited Talk Title Here', 'Conference Name, Organiser', 'https://example.com/event', 'Event Page', 1),
('Jul', 2025, 'Session Speaker', 'Your Second Talk Title', 'Workshop or Symposium Name', 'https://example.com/profile', 'Speaker Profile', 2),
('Mar', 2024, 'Webinar Presenter', 'Navigating Graduate School Applications', 'Your Research Academy Webinar', 'https://youtube.com/watch?v=example', 'Watch Video', 3);

insert into news (date, emoji, content, sort_order) values
('2026-06-01', '🏆', '**Your Project Name** won 1st Place at the [Your Prize Competition 2026](https://example.com/competition), out of over 100 submissions — a competition focused on [competition focus area].', 1),
('2026-05-15', '🎉', 'Paper accepted at **ISSTA 2026** (ACM SIGSOFT International Symposium on Software Testing and Analysis).', 2),
('2026-04-10', '🎓', 'Advanced to **PhD Candidate** status in [Your Department] at [Your University].', 3),
('2025-12-01', '✅', 'Passed my **PhD qualifying exams** in [Your Department] at [Your University].', 4),
('2025-10-20', '🤝', 'Served as a **Student Volunteer** at a major international conference in your field — one of the premier venues for research in [your area].', 5),
('2025-09-01', '🎤', 'Invited as **Session Speaker** at an international conference — presenting on [your research topic].', 6),
('2025-08-01', '🎓', 'Began my **PhD** in [Department] at [University], joining [Your Lab] under the supervision of [Prof. Supervisor]. Research funded by [Funding Agency].', 7);

insert into newsletter_meta (intro_text, subscribe_url) values
(
  'I write [Your Newsletter Name]; a weekly newsletter on [your newsletter topic]. The letter discusses different research papers, articles and developments to spark curiosity and open up ideas for those seeking direction in [your field].',
  'https://www.linkedin.com/newsletters/your-newsletter-id/'
);

insert into newsletter_posts (series, title, summary, status, link_url, sort_order) values
(
  'Your Newsletter Name',
  'Your First Newsletter Issue Title',
  'A one-sentence summary of what this issue covers and why it matters to your readers.',
  'Published',
  'https://www.linkedin.com/pulse/your-first-article-link/',
  1
),
(
  'Your Newsletter Name',
  'Your Second Newsletter Issue Title',
  'A one-sentence summary of what this second issue covers. Keep it compelling and relevant.',
  'Published',
  'https://www.linkedin.com/pulse/your-second-article-link/',
  2
),
(
  'Your Newsletter Name',
  'Your Third Newsletter Issue Title',
  'Building trust in AI systems involves more than algorithms — it requires transparency and accountability.',
  'Published',
  'https://www.linkedin.com/newsletters/your-newsletter-id/',
  3
);

insert into contact_links (icon, label, value, url, sort_order) values
('✉', 'Email', 'you@university.edu', 'mailto:you@university.edu', 1),
('in', 'LinkedIn', 'linkedin.com/in/yourhandle', 'https://linkedin.com/in/yourhandle', 2),
('⌥', 'GitHub', 'yourhandle', 'https://github.com/yourhandle', 3),
('🎓', 'Google Scholar', 'Your Name', 'https://scholar.google.com/citations?user=YOURID', 4);
