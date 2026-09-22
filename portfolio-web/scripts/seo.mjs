import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { loadEnv } from 'vite';
const env = loadEnv('production', process.cwd(), 'VITE_');
const base = env.VITE_SITE_URL;
const template = readFileSync('dist/index.html', 'utf8');
const routes = [
  { path: '/', title: 'Ankit Kumar | Freelance React Native Developer' },
  {
    path: '/projects/newtapri',
    title: 'NewsTapri | News Platform | Ankit Kumar',
    description:
      'Explore NewsTapri, a responsive news and entertainment platform with live updates and topic-based discovery.',
  },
  {
    path: '/projects/khajanchi',
    title: 'Khajanchi | E-commerce App | Ankit Kumar',
    description:
      'Explore Khajanchi, a React Native e-commerce app focused on product discovery and mobile shopping.',
  },
  {
    path: '/projects/achideal',
    title: 'AchiDeal | Shopping Web App | Ankit Kumar',
    description:
      'Explore AchiDeal, a mobile-friendly shopping web app for gifts, creative activities, and everyday celebrations.',
  },
  { path: '/admin', title: 'Admin | Ankit Kumar' },
];
const origin = base ? new URL(base).origin : null;
if (origin && !/^https?:\/\//.test(origin))
  throw new Error('VITE_SITE_URL must be an HTTP(S) origin.');
for (const route of routes) {
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]+/,
      `$1${route.title}`,
    );
  if (route.description)
    html = html
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]+/,
        `$1${route.description}`,
      )
      .replace(
        /(<meta\s+property="og:description"\s+content=")[^"]+/,
        `$1${route.description}`,
      );
  const metadata =
    route.path === '/admin'
      ? '<meta name="robots" content="noindex,nofollow"/>'
      : origin
        ? `<link rel="canonical" href="${origin}${route.path}"/><meta property="og:url" content="${origin}${route.path}"/><meta property="og:image" content="${origin}/social-card.png"/><meta property="og:image:alt" content="Ankit Kumar — mobile app development for your business"/>`
        : '';
  html = html.replace('</head>', `${metadata}</head>`);
  const dir = `dist${route.path === '/' ? '' : route.path}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html);
}
if (origin) {
  writeFileSync(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
      .filter(r => r.path !== '/admin')
      .map(r => `<url><loc>${origin}${r.path}</loc></url>`)
      .join('')}</urlset>`,
  );
  writeFileSync(
    'dist/robots.txt',
    `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${origin}/sitemap.xml\n`,
  );
} else
  console.info(
    'SEO: Set VITE_SITE_URL to generate production canonical URLs and sitemap.',
  );
