import type { Project } from '../../data/site';
import { PhoneMockup } from './PhoneMockup';
export function ProjectPreview({ project }: { project: Project }) {
  if (!project.image) return <PhoneMockup variant={project.color} />;
  return (
    <div className={`project-screenshot ${project.imageType}`}>
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        width={project.imageType === 'mobile' ? 780 : 800}
        height={project.imageType === 'mobile' ? 1688 : 600}
      />
    </div>
  );
}
