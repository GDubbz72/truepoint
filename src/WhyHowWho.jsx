/* global React */
function WhyTruepoint() {
  const pillars = [
    { icon: '◆', title: 'Deep experience', body: 'Decades of hands-on HR and leadership expertise across industries and organisation sizes.' },
    { icon: '◈', title: 'Pragmatic approach', body: 'Practical solutions that work on Monday morning — not theory, not frameworks you file away.' },
    { icon: '◉', title: 'People-first mindset', body: 'We see the human behind the role. Culture is built person by person, conversation by conversation.' },
    { icon: '◇', title: 'Trusted partner', body: 'We work with you, not just for you. We stay in the room until the new way of working is the way you work.' },
  ];
  return (
    <section id="why" className="tp-section">
      <div className="tp-section-head tp-reveal">
        <div className="tp-eyebrow tp-eyebrow--amber">Why Truepoint</div>
        <h2 className="tp-section-title">
          When people are supported properly,<br/>
          <em>businesses thrive</em>
        </h2>
      </div>
      <div className="tp-why-grid">
        {pillars.map((p, i) => (
          <div key={p.title} className="tp-why-card tp-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="tp-why-icon" aria-hidden="true">{p.icon}</div>
            <h3 className="tp-why-title">{p.title}</h3>
            <p className="tp-why-body">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
window.WhyTruepoint = WhyTruepoint;

function WhoWeServe() {
  const groups = [
    { num: '01', title: 'Small to mid-sized businesses', body: 'Owners building something real, who need senior people expertise without a full-time CPO.' },
    { num: '02', title: 'Business owners & entrepreneurs', body: 'Founders whose people challenges are now the thing standing between them and their next stage.' },
    { num: '03', title: 'Young professionals', body: 'Early-career people navigating their first big transitions — roles, managers, confidence, direction.' },
    { num: '04', title: 'Women in business & emerging leaders', body: 'Women stepping into leadership, and emerging leaders finding their voice and their way.' },
  ];
  return (
    <section id="who" className="tp-section-serve">
      <div className="tp-section-serve-inner">
        <div className="tp-section-head tp-reveal">
          <div className="tp-eyebrow tp-eyebrow--amber">Who we serve</div>
          <h2 className="tp-section-title">
            The people and businesses<br/>
            <em>we partner with</em>
          </h2>
          <p className="tp-section-lead">
            We proudly work across all industries, because great people
            practices and strong leadership transcend sectors.
          </p>
        </div>
        <div className="tp-serve-grid">
          {groups.map((g, i) => (
            <div key={g.num} className="tp-serve-card tp-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="tp-serve-num">{g.num}</div>
              <h3 className="tp-serve-title">{g.title}</h3>
              <p className="tp-serve-body">{g.body}</p>
            </div>
          ))}
        </div>
        <p className="tp-serve-footer">Across all industries — because great people practices transcend sectors.</p>
      </div>
    </section>
  );
}
window.WhoWeServe = WhoWeServe;

function HowWeWork() {
  const steps = [
    { n: '01', t: 'We listen', b: 'Deeply — and without assumptions. The stated problem is rarely the real one.' },
    { n: '02', t: 'We diagnose', b: 'Identifying the real root of the issue, not just the loudest symptom.' },
    { n: '03', t: 'We act', b: 'Practical, hands-on solutions you can use Monday morning — not a 60-page deck.' },
    { n: '04', t: 'We support', b: 'Implementation, coaching, and follow-through until the change sticks.' },
  ];
  return (
    <section id="how" className="tp-section" style={{ paddingTop: 48 }}>
      <div className="tp-section-head tp-reveal">
        <div className="tp-eyebrow tp-eyebrow--amber">How we work</div>
        <h2 className="tp-section-title">
          A four-step method<br/>
          <em>built on listening</em>
        </h2>
      </div>
      <div className="tp-how-grid">
        {steps.map((s, i) => (
          <div key={s.n} className="tp-how-step tp-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="tp-how-num">{s.n}</div>
            <h3 className="tp-how-title">{s.t}</h3>
            <p className="tp-how-body">{s.b}</p>
          </div>
        ))}
      </div>
      <p className="tp-how-closer">
        No jargon. No overwhelm. Just <em>clarity and action</em>.
      </p>
    </section>
  );
}
window.HowWeWork = HowWeWork;
