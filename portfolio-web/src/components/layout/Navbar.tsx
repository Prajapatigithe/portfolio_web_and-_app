import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [
  'Home',
  'About',
  'Services',
  'Projects',
  'Process',
  'Testimonials',
  'Contact',
];
export function Navbar() {
  const [open, setOpen] = useState(false);
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
