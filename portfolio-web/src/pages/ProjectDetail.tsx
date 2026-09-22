import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/site';
import { PhoneMockup } from '../components/ui/PhoneMockup';
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project)
    return (
      <main id="main" className="container section">
        <h1>Project not found</h1>
        <Link className="button" to="/#projects">
          Explore projects
        </Link>
      </main>
    );
  return (
    <main id="main" className="container section case-study">
      <Link className="text-link" to="/#projects">
        ← Back to selected work
      </Link>
      <p className="eyebrow">{project.category} / PROJECT OVERVIEW</p>
      <h1>{project.title}</h1>
      <p className="case-intro">{project.description}</p>
      <div className="tags">
        {project.tech.map(t => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className={`case-banner ${project.color}`}>
        <PhoneMockup variant={project.color} />
        <p>
          Illustrative interface
          <br />
          Verified project screenshots are not yet available.
        </p>
      </div>
      <div className="case-grid">
        {[
          ['The problem', project.problem],
          [
            'Client / user need',
            project.slug === 'achideal'
              ? 'A simple way to discover local listings and connect with sellers.'
              : project.slug === 'khajanchi'
                ? 'An accessible mobile shopping experience with clear product discovery.'
                : 'An accessible mobile experience that keeps changing information up to date.',
          ],
          ['The solution', project.solution],
          [
            'My role',
            'React Native development. A detailed breakdown of responsibilities is pending verification.',
          ],
          [
            'Challenges',
            'Reliable data updates, consistent cross-platform interactions, and maintainable state are key considerations for this type of application. Project-specific challenges are pending documentation.',
          ],
          [
            'Result',
            'This project is included in the existing portfolio. Verified release links, client feedback, and measured outcomes have not yet been supplied.',
          ],
          [
            'Lessons learned',
            'A project retrospective has not yet been supplied. This section will be updated with verified lessons rather than assumed outcomes.',
          ],
        ].map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <section>
          <h2>Main features</h2>
          <ul>
            {project.features.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="case-cta">
        <h2>Need a similar app? Let’s talk.</h2>
        <a href="/#contact" className="button">
          Start a Project ↗
        </a>
      </div>
    </main>
  );
}
