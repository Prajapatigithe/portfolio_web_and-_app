import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/site';
import { ProjectPreview } from '../components/ui/ProjectPreview';
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
      {project.stackLabel && (
        <p className="stack-label">{project.stackLabel}</p>
      )}
      <div className="tags">
        {project.tech.map(t => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {(project.website || project.source) && (
        <a
          className="button outline project-live-link"
          href={project.website || project.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.sourceLabel} ↗
        </a>
      )}
      <div
        className={`case-banner ${project.color} ${project.image ? `has-screenshot ${project.imageType}` : ''}`}
      >
        <ProjectPreview project={project} />
        {!project.image && (
          <p>
            Illustrative interface
            <br />
            Verified project screenshots are not yet available.
          </p>
        )}
      </div>
      {project.source && (
        <p className="section-note source-note">
          {project.sourceNote}{' '}
          <a href={project.source} target="_blank" rel="noopener noreferrer">
            View source ↗
          </a>
        </p>
      )}
      {project.gallery && (
        <section className="screenshot-section">
          <h2>A closer look on mobile</h2>
          <div className="screenshot-gallery">
            {project.gallery.map(image => (
              <figure key={image.src}>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width="780"
                    height="1688"
                    loading="lazy"
                  />
                </a>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <div className="case-grid">
        {[
          ['The problem', project.problem],
          ['Client / user need', project.userNeed],
          ['The solution', project.solution],
          [
            'My role',
            `${project.role}. A detailed breakdown of individual responsibilities is available on request.`,
          ],
          [
            'Challenges',
            'Reliable data updates, consistent cross-platform interactions, and maintainable state are key considerations for this type of application. Project-specific challenges are pending documentation.',
          ],
          ['Result', project.result],
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
