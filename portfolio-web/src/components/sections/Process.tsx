import { MessageSquare, Map, Code2, ShieldCheck, Rocket } from 'lucide-react';
const steps = [
  {
    title: 'Discuss',
    icon: MessageSquare,
    text: 'Understand your idea, goals, features, and requirements.',
  },
  {
    title: 'Plan',
    icon: Map,
    text: 'Map the project structure, milestones, and development plan.',
  },
  {
    title: 'Build',
    icon: Code2,
    text: 'Build your mobile application with regular progress updates.',
  },
  {
    title: 'Test',
    icon: ShieldCheck,
    text: 'Check functionality, interface, and performance across devices.',
  },
  {
    title: 'Deliver',
    icon: Rocket,
    text: 'Hand over the source code, builds, and release guidance agreed in your project scope.',
  },
];
export function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <div className="center-heading">
          <p className="eyebrow">A CLEAR PATH FROM IDEA TO APP</p>
          <h2>
            How I work.
            <br />
            <span>From discussion to delivery.</span>
          </h2>
          <p>
            You’ll know what’s happening, what’s next, and where your project
            stands.
          </p>
        </div>
        <div className="process-grid">
          {steps.map(({ title, icon: Icon, text }, i) => (
            <article key={title}>
              <div className="step-icon">
                <Icon size={22} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
