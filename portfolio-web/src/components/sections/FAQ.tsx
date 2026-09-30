const questions = [
  [
    'How much does a React Native app cost?',
    'Cost depends on the screens, features, integrations, and release requirements. Share your brief for a scope-based estimate before work begins.',
  ],
  [
    'How long does development take?',
    'Timing depends on scope and the state of your designs and APIs. We agree on milestones and a delivery plan after discussing your requirements.',
  ],
  [
    'Can you work on an existing app?',
    'Yes. I can review your React Native codebase, fix bugs, improve flows, and add features. An initial review helps define the work.',
  ],
  [
    'Do you provide Android and iOS builds?',
    'Yes, Android and iOS builds can be included in the agreed scope. Store submission requires your developer accounts and the relevant release assets.',
  ],
  [
    'Can you integrate APIs and Firebase?',
    'Yes. I work with REST APIs, Firebase, and Supabase for features such as authentication, data, and storage.',
  ],
  [
    'Do I get the source code?',
    'Yes. Source code handover is included in the project agreement, along with the setup information needed to continue development.',
  ],
  [
    'Do you provide support after delivery?',
    'Post-delivery fixes and ongoing maintenance can be agreed as part of the scope. We define the support period and coverage before starting.',
  ],
];
export function FAQ() {
  return (
    <section id="faq" className="section container faq-section">
      <div>
        <p className="eyebrow">BEFORE WE START</p>
        <h2>
          A few useful
          <br />
          <span>answers.</span>
        </h2>
        <p>
          Have another question?{' '}
          <a className="text-link" href="#contact">
            Let’s talk.
          </a>
        </p>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
