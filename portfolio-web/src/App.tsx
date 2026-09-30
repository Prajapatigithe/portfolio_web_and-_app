import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Projects } from './components/sections/Projects';
import { Process } from './components/sections/Process';
import { Testimonials } from './components/sections/Testimonials';
import { WhoIHelp } from './components/sections/WhoIHelp';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import seo from './data/seo.json';
import { contact, projects } from './data/site';
const Admin = lazy(() => import('./pages/Admin'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
function PageEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const project = projects.find(p => pathname === `/projects/${p.slug}`);
    document.title =
      pathname === '/admin'
        ? 'Admin | Ankit Kumar'
        : project
          ? `${project.title} | Ankit Kumar`
          : 'Ankit Kumar | Freelance React Native Developer';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute(
      'content',
      pathname === '/admin' ? 'noindex,nofollow' : 'index,follow',
    );
    const base = import.meta.env.VITE_SITE_URL || seo.origin;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const url = new URL(pathname, base).href;
    canonical.setAttribute('href', url);
    const description = project?.description || seo.description;
    for (const [key, value] of Object.entries({
      description,
      'og:title': document.title,
      'og:description': description,
      'og:url': url,
      'og:image': new URL('/social-card.png', base).href,
      'twitter:title': document.title,
      'twitter:description': description,
      'twitter:image': new URL('/social-card.png', base).href,
    })) {
      const attribute = key.startsWith('og:') ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', value);
    }
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
function Home() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;
    const sections = document.querySelectorAll<HTMLElement>('main > .section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px 80px 0px', threshold: 0.02 },
    );
    sections.forEach(section => {
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add('reveal-ready');
        observer.observe(section);
      }
    });
    return () => {
      observer.disconnect();
      sections.forEach(section =>
        section.classList.remove('reveal-ready', 'revealed'),
      );
    };
  }, []);
  return (
    <main id="main">
      <Hero />
      <WhoIHelp />
      <Projects />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <PageEffects />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <Suspense
        fallback={
          <main className="container section" id="main">
            Loading…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <main className="container section" id="main">
                <h1>Page not found</h1>
                <Link className="button" to="/">
                  Back home
                </Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
      <a
        className="floating-contact"
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Discuss your project on WhatsApp"
      >
        <MessageCircle size={23} />
      </a>
    </BrowserRouter>
  );
}
