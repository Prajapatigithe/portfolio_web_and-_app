import {
  Smartphone,
  Layers,
  Rocket,
  Flame,
  Database,
  Braces,
  Bug,
  Wrench,
  Play,
  Apple,
  ArrowUpRight,
} from 'lucide-react';
const services = [
  {
    icon: Smartphone,
    title: 'React Native App Development',
    text: 'Fast, polished cross-platform apps built around your business and your users.',
  },
  {
    icon: Layers,
    title: 'Android & iOS App Development',
    text: 'A consistent experience on both platforms, with native capabilities where they matter.',
  },
  {
    icon: Rocket,
    title: 'MVP Development',
    text: 'Turn your core idea into a focused first release you can test with real users.',
  },
  {
    icon: Flame,
    title: 'Firebase Integration',
    text: 'Connect authentication, real-time data, and notifications to your mobile app.',
  },
  {
    icon: Database,
    title: 'Supabase Integration',
    text: 'Give your app a reliable foundation with authentication, storage, and Postgres.',
  },
  {
    icon: Braces,
    title: 'REST API Integration',
    text: 'Connect your app to the services and business data it needs.',
  },
  {
    icon: Bug,
    title: 'Bug Fixing',
    text: 'Resolve crashes, broken flows, and UI issues that get in your users’ way.',
  },
  {
    icon: Wrench,
    title: 'Existing App Maintenance',
    text: 'Keep your application stable with updates and practical improvements.',
  },
  {
    icon: Play,
    title: 'Play Store Deployment',
    text: 'Prepare your Android release and navigate the store submission process.',
  },
  {
    icon: Apple,
    title: 'App Store Deployment',
    text: 'Prepare your iOS build, release assets, and App Store submission.',
  },
];
export function Services() {
  return (
    <section id="services" className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HOW I CAN HELP</p>
          <h2>
            From first idea.
            <br />
            <span>To your next release.</span>
          </h2>
        </div>
        <p>
          Whether you’re starting from scratch or improving an existing app,
          let’s build the right solution.
        </p>
      </div>
      <div className="services-grid">
        {services.map(({ icon: Icon, title, text }, i) => (
          <article className="service-card" key={title}>
            <div className="service-top">
              <Icon size={23} />
              <span>0{i + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <a href="#contact" className="text-link service-cta">
        Not sure where to start? Let’s talk through your idea{' '}
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
