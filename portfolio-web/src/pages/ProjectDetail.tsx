import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/site';
import { ProjectPreview } from '../components/ui/ProjectPreview';
import { ProjectLinks } from '../components/ui/ProjectLinks';
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
  const gallery =
    project.gallery ||
    (project.image
      ? [
          {
            src: project.image,
            alt: project.imageAlt || project.title,
            caption: 'Mobile interface',
          },
        ]
      : []);
  const hasLinks =
    project.website ||
    project.source ||
    project.playStore ||
    project.appStore ||
    project.github;
  return (
    <main id="main" className="container section case-study">
      <Link className="text-link" to="/#projects">
        ← Back to selected work
      </Link>
      <header className="case-heading">
        <p className="eyebrow">{project.category} / PROJECT OVERVIEW</p>
        <h1>{project.title}</h1>
        <p className="case-intro">{project.description}</p>
        <a className="button outline" href="#project-contact">
          Discuss a similar project ↗
        </a>
      </header>
      <div
        className={`case-banner ${project.color} ${project.image ? `has-screenshot ${project.imageType}` : ''}`}
      >
        <ProjectPreview project={project} />
      </div>
      {gallery.length > 0 && (
        <section
          className="screenshot-section"
          aria-labelledby="screenshots-title"
        >
          <h2 id="screenshots-title">Screenshots</h2>
          <div className="screenshot-gallery">
            {gallery.map(image => (
              <figure key={image.src}>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <div className="case-grid">
        <section>
          <h2>Overview</h2>
          <p>{project.description}</p>
        </section>
        <section>
          <h2>Client / user problem</h2>
          <p>{project.problem}</p>
          <p>{project.userNeed}</p>
        </section>
        <section>
          <h2>My role</h2>
          <p>{project.role}</p>
        </section>
        <section>
          <h2>Solution</h2>
          <p>{project.solution}</p>
        </section>
        <section>
          <h2>Key features</h2>
          <ul>
            {project.features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Tech stack</h2>
          <div className="tags">
            {project.tech.map(tech => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>
        <section>
          <h2>Platforms</h2>
          <p>
            {project.platforms?.length
              ? project.platforms.join(' / ')
              : 'Mobile app. Platform and release details available on request.'}
          </p>
        </section>
        <section>
          <h2>Result</h2>
          <p>{project.result}</p>
        </section>
        {hasLinks && (
          <section>
            <h2>Links</h2>
            <ProjectLinks project={project} />
          </section>
        )}
      </div>
      <div id="project-contact" className="case-cta">
        <h2>Have a similar app in mind?</h2>
        <p>
          Let’s discuss the features, scope, and next step for your business.
        </p>
        <a href="/#contact" className="button">
          Start a Project ↗
        </a>
      </div>
    </main>
  );
}
