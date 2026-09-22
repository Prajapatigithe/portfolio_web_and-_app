import { contact } from '../../data/site';
export function Footer() {
  return (
    <footer className="container footer">
      <div>
        <a className="brand" href="/">
          Ankit Kumar<span className="brand-dot">.</span>
        </a>
        <p>React Native Developer · Building ideas into apps.</p>
      </div>
      <div className="footer-links">
        <a href={contact.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={`mailto:${contact.email}`}>Email ↗</a>
        <a href="/#contact">Contact</a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Ankit Kumar. All rights reserved.
        </span>
        <span>Thoughtfully built with React.</span>
      </div>
    </footer>
  );
}
