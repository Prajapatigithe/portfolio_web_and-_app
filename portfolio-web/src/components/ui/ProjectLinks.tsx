import type { Project } from '../../data/site';
export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    ['Play Store', project.playStore],
    ['App Store', project.appStore],
    ['GitHub', project.github],
    [
      project.sourceLabel || 'Project Website',
      project.website || project.source,
    ],
  ].filter(([, url]) => Boolean(url));
  if (!links.length) return null;
  return (
    <div className="project-links">
      {links.map(([label, url]) => (
        <a
          className="text-link"
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
