/**
 * Central place for personal info — edit this file to customize the portfolio.
 * - Set `avatarUri` to a remote image URL or local require() for profile photo.
 * - Set `resumeUri` to a remote PDF URL to enable resume viewing/download.
 */
export const PROFILE = {
  name: 'Ankit Kumar',
  role: 'React Native Developer',
  email: 'officialankit2306@gmail.com',
  company: 'Radoms Digital Pvt Ltd.',
  githubUrl: 'https://github.com/Prajapatigithe',
  linkedinUrl: 'https://www.linkedin.com/in/ankit-kumar-01603b2b8/',
  /**
   * Profile photo — set to a remote URL string to show your photo.
   * e.g. 'https://avatars.githubusercontent.com/u/YOUR_ID'
   * Leave as undefined to show initials instead.
   */
  avatarUri: undefined as string | undefined,
  /**
   * Resume PDF — set to a remote URL to enable the resume section.
   * e.g. 'https://your-cdn.com/resume.pdf'
   * Leave as undefined to hide the resume section.
   */
  resumeUri: undefined as string | undefined,
  introShort:
    'I build polished cross-platform mobile experiences with React Native, focusing on performance, maintainable architecture, and thoughtful UI.',
  introLong:
    "I'm Ankit Kumar, a React Native developer at Radoms Digital Pvt Ltd. I enjoy turning product ideas into reliable apps — from navigation and state management to animations and native integrations. I care about clean code, accessible layouts, and shipping features that feel fast and intentional.",
  initials: 'AK',
} as const;

export const SKILLS = [
  'React Native',
  'JavaScript',
  'TypeScript',
  'React Navigation',
  'REST APIs',
  'Git',
  'UI / UX',
  'Performance',
] as const;

export const EXPERIENCE = [
  {
    title: 'React Native Developer',
    company: 'Radoms Digital Pvt Ltd.',
    period: 'Present',
    description:
      'Building and maintaining production mobile apps, collaborating on features, and improving app quality across iOS and Android.',
  },
] as const;

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'Portfolio App',
    description:
      'This app — tab navigation, theming, and a structured codebase ready to extend.',
    link: 'https://github.com/Prajapatigithe',
  },
  {
    id: '2',
    title: 'Habit Tracker (sample)',
    description:
      'Sample concept: streaks, reminders, and offline-first local storage patterns.',
    link: 'https://github.com/Prajapatigithe',
  },
  {
    id: '3',
    title: 'Weather Dashboard (sample)',
    description:
      'Sample concept: location permissions, API integration, and responsive cards.',
    link: 'https://github.com/Prajapatigithe',
  },
];