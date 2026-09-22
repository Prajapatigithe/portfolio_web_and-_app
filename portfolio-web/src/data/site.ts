export const profile = {
  name: 'Ankit Kumar',
  title: 'React Native Developer',
  image: '/Ankit.png',
};
export const contact = {
  email: 'officialankit2306@gmail.com',
  phone: '+91 9889091773',
  whatsapp: 'https://wa.me/919889091773',
  linkedin: 'https://www.linkedin.com/in/ankit-kumar-01603b2b8/',
  github: 'https://github.com/Prajapatigithe',
};
export const resumeFile = '/Resume.pdf';
export const skills = [
  'React Native',
  'React',
  'JavaScript',
  'TypeScript',
  'Redux',
  'Firebase',
  'Supabase',
  'REST APIs',
  'Git',
  'Android',
  'iOS',
];
export const projects = [
  {
    slug: 'newtapri',
    title: 'NewTapri',
    category: 'MOBILE EXPERIENCE',
    description:
      'A connected mobile experience with real-time data and intuitive navigation.',
    problem: 'Keeping changing information easy to find on a small screen.',
    solution:
      'A React Native experience built around real-time data, clear navigation, and responsive interactions.',
    tech: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    features: [
      'Real-time data handling',
      'Responsive navigation',
      'Shared application state',
    ],
    color: 'purple',
  },
  {
    slug: 'khajanchi',
    title: 'Khajanchi',
    category: 'E-COMMERCE',
    description:
      'Bringing product discovery and shopping together in one mobile experience.',
    problem:
      'Helping shoppers move from browsing products to a purchase without unnecessary friction.',
    solution:
      'An e-commerce application focused on product browsing, transaction flows, and a consistent mobile interface.',
    tech: ['React Native', 'JavaScript', 'Redux', 'REST API'],
    features: ['Product browsing', 'Shopping flows', 'API integration'],
    color: 'blue',
  },
  {
    slug: 'achideal',
    title: 'AchiDeal',
    category: 'LOCAL MARKETPLACE',
    description:
      'Connecting local buyers and sellers through an accessible mobile marketplace.',
    problem:
      'Making local products discoverable and helping buyers connect with sellers.',
    solution:
      'A marketplace application with real-time listings and straightforward buyer–seller interactions.',
    tech: ['React Native', 'TypeScript', 'Firebase', 'REST API'],
    features: [
      'Local product listings',
      'Real-time updates',
      'Buyer–seller interactions',
    ],
    color: 'green',
  },
];
export const projectTypes = [
  'New Mobile App',
  'Existing App Improvement',
  'Bug Fixing',
  'API Integration',
  'Firebase/Supabase',
  'Other',
];
export const budgets = [
  'Under $500',
  '$500–$1,000',
  '$1,000–$3,000',
  '$3,000+',
  'Not sure yet',
];
export const statuses = [
  'new',
  'contacted',
  'in_progress',
  'completed',
  'rejected',
] as const;
export type LeadStatus = (typeof statuses)[number];
export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget: string;
  timeline: string;
  message: string;
  status: LeadStatus;
  created_at: string;
};
