import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/site';
import { PhoneMockup } from '../ui/PhoneMockup';
export function Projects() {
  return (
    <section id="projects" className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2>
            Ideas turned into
            <br />
            <span>mobile experiences.</span>
          </h2>
        </div>
        <p>
          A closer look at the apps I build — and the everyday problems they’re
          designed to solve.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <article className="project-card" key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              className={`project-visual ${project.color}`}
              aria-label={`View ${project.title} case study`}
            >
              <span className="project-number">
                0{i + 1} / {project.category}
              </span>
              <div className="project-phone">
                <PhoneMockup variant={project.color} />
              </div>
              <span className="concept-label">Illustrative interface</span>
              <span className="project-arrow">
                <ArrowUpRight size={21} />
              </span>
            </Link>
            <div className="project-content">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-summary">
                <p>
                  <b>Problem</b> {project.problem}
                </p>
                <p>
                  <b>Solution</b> {project.solution}
                </p>
                <p>
                  <b>Role</b> React Native development
                </p>
                <p>
                  <b>Features</b> {project.features.join(' · ')}
                </p>
              </div>
              <div className="tags">
                {project.tech.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Link className="case-link" to={`/projects/${project.slug}`}>
                View Case Study <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className="section-note">
        Project summaries are based on the existing portfolio. Interfaces are
        illustrative; verified screenshots and results will be added when
        available.
      </p>
    </section>
  );
}
