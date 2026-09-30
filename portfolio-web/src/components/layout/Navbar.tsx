import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { testimonials } from '../../data/site';
const links = [
  'Home',
  'Projects',
  'Services',
  'About',
  'Process',
  ...(testimonials.length ? ['Testimonials'] : []),
  'FAQ',
  'Contact',
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const toggle = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== '/') return;
    const update = () => {
      const sections = links
        .map(link => document.getElementById(link.toLowerCase()))
        .filter((node): node is HTMLElement => Boolean(node));
      const current = sections
        .filter(section => section.getBoundingClientRect().top <= 160)
        .at(-1);
      setActive(current?.id || 'home');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main navigation">
        <a href="/#home" className="brand">
          <span className="brand-icon">
            a<span>k</span>.
          </span>
          <span>
            Ankit Kumar<span className="brand-dot">.</span>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <div id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(link => (
            <a
              key={link}
              href={`/#${link.toLowerCase()}`}
              aria-current={
                pathname === '/' && active === link.toLowerCase()
                  ? 'location'
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
        <a className="button small nav-hire" href="/#contact">
          Hire Me <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}
