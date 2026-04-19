/* global React */
function Promise() {
  return (
    <section id="promise" className="tp-promise tp-reveal">
      <div className="tp-promise-rule" />
      <div className="tp-eyebrow tp-eyebrow--amber">Our promise</div>
      <p className="tp-promise-body">
        At Truepoint, we help people and businesses <em>get unstuck</em> — and move forward
        with clarity, confidence, and purpose.
      </p>
      <p className="tp-promise-sub">
        We don't believe in cookie-cutter HR or theoretical leadership advice.
        We listen first, understand the real problem, and then work hands-on
        with you to build practical, sustainable solutions that actually work
        in the real world.
      </p>
    </section>
  );
}
window.PromiseSection = Promise;

function Services() {
  const services = [
    {
      num: '01',
      title: 'HR <em>Consulting</em>',
      body: 'Strategic and practical HR support designed to protect your business and empower your people.',
      bullets: [
        'HR foundations & compliance',
        'Policies, procedures & systems',
        'Employee relations & performance management',
        'Leadership support and people strategy',
      ],
      tag: 'Clear. Compliant. People-focused.',
    },
    {
      num: '02',
      title: '<em>Coaching</em>',
      body: 'Personalized coaching for professionals and leaders ready to grow.',
      bullets: [
        'Career development & transitions',
        'Leadership confidence & decision-making',
        'Communication & influence',
        'Navigating complex workplace challenges',
      ],
      tag: 'Supportive, honest, and growth-focused.',
    },
    {
      num: '03',
      title: 'Leadership <em>Training</em>',
      body: 'Leadership development that meets people where they are — and helps them lead better.',
      bullets: [
        'Emerging and new leaders',
        'Women in leadership',
        'Practical leadership skills for real situations',
        'Custom workshops and training programs',
      ],
      tag: 'No fluff. Just real leadership skills you can use immediately.',
    },
  ];

  return (
    <section id="services" className="tp-section-services">
      <div className="tp-section-services-inner">
        <div className="tp-section-head tp-reveal">
          <div className="tp-eyebrow tp-eyebrow--amber">What we do</div>
          <h2 className="tp-section-title">
            Three practices,<br/>
            <em>one approach</em>
          </h2>
          <p className="tp-section-lead">
            Whether you need HR muscle, a thinking partner, or a training
            programme — the work starts the same way: by listening.
          </p>
        </div>
        <div className="tp-services-grid">
          {services.map((s, i) => (
            <article key={i} className="tp-service-card tp-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="tp-service-num">{s.num} —</div>
              <h3 className="tp-service-title" dangerouslySetInnerHTML={{ __html: s.title }} />
              <p className="tp-service-body">{s.body}</p>
              <ul className="tp-service-list">
                {s.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <p className="tp-service-tag">{s.tag}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Services = Services;
