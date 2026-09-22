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
};
export const projects: Project[] = [
  {
    slug: 'newtapri',
    title: 'NewsTapri',
    category: 'NEWS & ENTERTAINMENT',
    description:
      'A news platform that brings current affairs, sports, technology, and entertainment into one reading experience.',
    problem:
      'Helping readers follow a busy news cycle while keeping content fast and easy to explore.',
    solution:
      'A responsive publishing platform with category-led navigation, live updates, and ways to discover and share stories.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Firebase'],
    stackLabel: 'Published web platform stack',
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
      'The project is featured in the Radoms Digital portfolio. Team-wide performance claims are not presented here as personal results.',
    image: '/projects/newstapri.png',
    imageAlt:
      'NewsTapri desktop and mobile interface showing news categories, story cards, and a quiz banner',
    imageType: 'composite',
    source: 'https://www.radomsdigital.com/portfolio/newstapri',
    sourceLabel: 'View published project',
    sourceNote:
      'Project image, features, and web stack: Radoms Digital. The published case study describes the team’s work; individual responsibilities are available on request.',
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
    role: 'React Native development',
    userNeed:
      'An accessible mobile shopping experience with clear product discovery.',
    result:
      'Included in the existing portfolio. Verified release links and measured outcomes have not yet been supplied.',
  },
  {
    slug: 'achideal',
    title: 'AchiDeal',
    category: 'SHOPPING & GIFTING',
    description:
      'A mobile-friendly shopping web app for gifts, creative activities, toys, and everyday celebrations.',
    problem:
      'Helping shoppers discover a suitable gift and understand product prices and delivery availability.',
    solution:
      'A storefront with visual categories, product search, delivery-location selection, and clear paths to wishlists and the shopping cart.',
    tech: ['Next.js', 'React', 'Responsive Web'],
    stackLabel: 'Public web interface',
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
      'A publicly accessible shopping web app. The previews show the live homepage and catalog at a mobile viewport.',
    image: '/projects/achideal-mobile.jpg',
    imageAlt:
      'AchiDeal mobile website with its logo, search bar, gift categories, and new arrivals',
    imageType: 'mobile',
    gallery: [
      {
        src: '/projects/achideal-mobile.jpg',
        alt: 'AchiDeal mobile homepage',
        caption: 'Homepage · mobile web',
      },
      {
        src: '/projects/achideal-shop.jpg',
        alt: 'AchiDeal mobile product catalog',
        caption: 'Product catalog · mobile web',
      },
    ],
    website: 'https://achideal.com/',
    source: 'https://achideal.com/',
    sourceLabel: 'Visit AchiDeal',
    sourceNote:
      'Screenshots captured from the public AchiDeal web app. They show the responsive website, not native app screens. Individual responsibilities are available on request.',
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
