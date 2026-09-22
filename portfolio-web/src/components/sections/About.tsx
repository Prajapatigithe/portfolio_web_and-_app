import { ArrowUpRight, Download, Check, Code2 } from 'lucide-react';
import { profile, skills, resumeFile } from '../../data/site';
const reasons = [
  'Cross-platform Android & iOS development',
  'Clean and maintainable code',
  'Scalable app architecture',
  'Regular communication',
  'API and backend integration',
  'Performance-focused development',
  'Testing before delivery',
  'Post-launch support',
];
export function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-portrait">
            <img
              src={profile.image}
              alt="Ankit Kumar, React Native developer"
              width="400"
              height="440"
              loading="lazy"
            />
            <div className="portrait-caption">
              <Code2 />
              <div>
                <b>Developer by craft.</b>
                <span>Problem solver by mindset.</span>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">THE DEVELOPER BEHIND THE APPS</p>
            <h2>
              Hi, I’m Ankit.
              <br />
              <span>Your next app partner.</span>
            </h2>
            <p>
              I’m a React Native developer building Android and iOS applications
              for startups and businesses.
            </p>
            <p>
              I focus on clean code, performance, scalable architecture, and
              user-friendly experiences — so your app is ready for what comes
              next.
            </p>
            <div className="tags skill-tags">
              {skills.map(s => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a
                className="button outline"
                href={resumeFile}
                target="_blank"
                rel="noreferrer"
              >
                View Resume <ArrowUpRight size={16} />
              </a>
              <a className="text-link" href={resumeFile} download>
                Download Resume <Download size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="why-heading">
          <p className="eyebrow">MORE THAN JUST CODE</p>
          <h3>Good apps start with a good partnership.</h3>
        </div>
        <div className="why-grid">
          {reasons.map(r => (
            <div key={r}>
              <Check size={17} />
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
