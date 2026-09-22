import {
  MessageSquare,
  Map,
  Code2,
  ShieldCheck,
  Rocket,
  HeartHandshake,
} from 'lucide-react';
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
    title: 'Develop',
    icon: Code2,
    text: 'Build your mobile application with regular progress updates.',
  },
  {
    title: 'Test',
    icon: ShieldCheck,
    text: 'Check functionality, interface, and performance across devices.',
  },
  {
    title: 'Launch',
    icon: Rocket,
    text: 'Prepare and submit your app to the Play Store and App Store.',
  },
  {
    title: 'Support',
    icon: HeartHandshake,
    text: 'Maintain your app and plan improvements as your needs grow.',
  },
];
export function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <div className="center-heading">
          <p className="eyebrow">A CLEAR PATH FROM IDEA TO APP</p>
          <h2>
            No guesswork.
            <br />
            <span>Just a thoughtful process.</span>
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
