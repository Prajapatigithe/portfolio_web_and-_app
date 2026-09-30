const clients = [
  [
    'Startups',
    'Turn your core idea into a focused mobile MVP you can put in front of users.',
  ],
  [
    'Small Businesses',
    'Make it easier for customers to browse, book, or buy from their phone.',
  ],
  [
    'Agencies',
    'Add React Native development support to your team and client projects.',
  ],
  [
    'Founders',
    'Work directly with a developer to define the scope and build your first release.',
  ],
];
export function WhoIHelp() {
  return (
    <section id="clients" className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">WHO I HELP</p>
          <h2>
            Your idea.
            <br />
            <span>A practical next step.</span>
          </h2>
        </div>
        <p>
          From a first release to an app that needs attention, start with what
          your business needs.
        </p>
      </div>
      <div className="client-grid">
        {clients.map(([title, text]) => (
          <article className="client-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
