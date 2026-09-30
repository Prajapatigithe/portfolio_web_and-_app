export const availability = {
  freelance: import.meta.env.VITE_AVAILABLE_FOR_FREELANCE === 'true',
};
export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  image?: string;
};
export const testimonials: Testimonial[] = [];
export const profile = {
  name: 'Ankit Kumar',
  title: 'React Native Developer',
  image: '/Ankit.webp',
};
export const contact = {
  email: 'officialankit2306@gmail.com',
  phone: '+91 9569073981',
  whatsapp: 'https://wa.me/919569073981',
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
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  color: string;
  role: string;
  userNeed: string;
  result: string;
  image?: string;
  imageAlt?: string;
  imageType?: 'mobile' | 'composite';
  gallery?: { src: string; alt: string; caption: string }[];
  website?: string;
  source?: string;
  sourceLabel?: string;
  sourceNote?: string;
  stackLabel?: string;
  platforms?: ('Android' | 'iOS')[];
  playStore?: string;
  appStore?: string;
  github?: string;
};
export const projects: Project[] = [
  {
    slug: 'newtapri',
    title: 'NewsTapri',
    category: 'NEWS & ENTERTAINMENT',
    description:
      'A React Native mobile app that brings current affairs, sports, technology, and entertainment into one reading experience.',
    problem:
      'Helping readers follow a busy news cycle while keeping content fast and easy to explore.',
    solution:
      'A React Native mobile app with category-led navigation, live updates, and ways to discover and share stories.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
    stackLabel: 'React Native mobile app',
    features: [
      'Real-time news',
      'Personalized recommendations',
      'Social sharing',
      'Reader comments',
      'Light and dark themes',
    ],
    color: 'purple',
    role: 'Project contributor',
    userNeed:
      'Read relevant stories across devices and explore topics without losing context.',
    result:
      'A news reading experience with topic discovery, live updates, and social sharing.',
    image: '/projects/newstapri-clean.webp',
    imageAlt:
      'NewsTapri mobile preview with news categories, quiz, and featured story',
    imageType: 'mobile',
    source: 'https://www.radomsdigital.com/portfolio/newstapri',
    sourceLabel: 'View published project',
    sourceNote:
      'Project features: Radoms Digital. The published case study describes the team’s work; individual responsibilities are available on request.',
  },
  {
    slug: 'khajanchi',
    title: 'Khajanchi',
    platforms: ['Android'],
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
    role: 'React Native development',
    image: '/projects/khajanchi-account-clean.webp',
    imageAlt:
      'Khajanchi mobile app account screen with login, help, and settings',
    imageType: 'mobile',
    gallery: [
      {
        src: '/projects/khajanchi-account-clean.webp',
        alt: 'Khajanchi mobile app account screen',
        caption: 'Account',
      },
      {
        src: '/projects/khajanchi-login-clean.webp',
        alt: 'Khajanchi mobile app sign-in screen',
        caption: 'Sign in',
      },
      {
        src: '/projects/khajanchi-register-clean.webp',
        alt: 'Khajanchi mobile app create-account screen',
        caption: 'Create account',
      },
    ],
    userNeed:
      'An accessible mobile shopping experience with clear product discovery.',
    result:
      'A mobile shopping experience with account creation, sign-in, and account settings.',
  },
  {
    slug: 'achideal',
    title: 'AchiDeal',
    category: 'SHOPPING & GIFTING',
    description:
      'A mobile shopping app built with React Native for gifts, creative activities, toys, and everyday celebrations.',
    problem:
      'Helping shoppers discover a suitable gift and understand product prices and delivery availability.',
    solution:
      'A storefront with visual categories, product search, delivery-location selection, and clear paths to wishlists and the shopping cart.',
    tech: ['React Native'],
    stackLabel: 'React Native mobile app',
    features: [
      'Product search',
      'Category browsing',
      'Delivery-location selection',
      'Wishlist and cart',
      'Product catalog',
    ],
    color: 'green',
    role: 'Project contributor',
    userNeed:
      'Browse gifts and creative products comfortably from a phone, with prices and shopping controls close at hand.',
    result:
      'A React Native mobile shopping app for discovering gifts, browsing products, and managing wishlists and a shopping cart.',
    image: '/projects/achideal-mobile.webp',
    imageAlt:
      'AchiDeal preview with its logo, search bar, gift categories, and new arrivals',
    imageType: 'mobile',
    gallery: [
      {
        src: '/projects/achideal-mobile.webp',
        alt: 'AchiDeal mobile homepage',
        caption: 'Homepage',
      },
      {
        src: '/projects/achideal-shop.webp',
        alt: 'AchiDeal mobile product catalog',
        caption: 'Product catalog',
      },
    ],
    website: 'https://achideal.com/',
    source: 'https://achideal.com/',
    sourceLabel: 'Visit AchiDeal',
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
