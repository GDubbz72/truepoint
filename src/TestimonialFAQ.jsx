/* global React */
const { useState: useTState } = React;

function TestimonialPlaceholder() {
  const testimonials = [
    {
      quote: "We have been working with TruePoint People Solutions over the past several months on a range of Human Resources initiatives. Their support has included strategic HR advisory, employee relations, training, and the development and enhancement of our HR policies and practices. What we value most is their ability to understand our business and provide clear, practical guidance that works for our organization. They are responsive, knowledgeable, and bring a thoughtful approach to the HR challenges and opportunities we encounter. TruePoint People Solutions has become a trusted HR partner to our team. We continue to work with them on additional initiatives and value the expertise and ongoing support they bring to our organization.",
      services: "HR Advisory • Employee Relations • Training • Policies",
      company: "Space Database Inc.",
      people: [
        { name: "Greg Mounsey", title: "President/CEO" }
      ]
    },
    {
      quote: "We engaged TruePoint People Solutions to support our organization with the development of comprehensive Standard Operating Procedures, HR policies and procedures, and HR advisory services. They took the time to understand our culture, operational needs, and business goals, and developed practical solutions that aligned with our organization's long-term direction. Their work has helped strengthen our operational efficiency, compliance, employee engagement, and overall workplace practices. We have been impressed by their professionalism, attention to detail, responsiveness, and commitment to delivering quality solutions. TruePoint People Solutions has been a valued HR partner to our organization, and we would highly recommend their services.",
      services: "HR Advisory • Policies & Procedures • SOP Development • Compliance",
      company: "CLS-2009",
      people: [
        { name: "Paul Araya", title: "CEO" },
        { name: "Francis Best", title: "Operations Director" }
      ]
    },
    {
      quote: "TruePoint People Solutions worked with us to review and strengthen our internal Human Resources function. Their support included assessing our existing HR practices, implementing policies and processes, providing employee relations guidance, delivering training, and identifying opportunities to improve overall HR effectiveness. An important part of the engagement was the coaching and mentorship provided to our internal HR team. Their practical guidance helped strengthen internal capability while establishing more effective and sustainable HR practices. TruePoint People Solutions brought a strong combination of strategic HR insight and practical experience to our organization, helping us enhance both our people practices and the effectiveness of our HR function.",
      services: "HR Assessment • Employee Relations • Training • HR Coaching",
      company: "TENG Inc.",
      people: [
        { name: "Eric Wiess", title: "Operations Director" }
      ]
    }
  ];

  const [current, setCurrent] = useTState(0);
  const t = testimonials[current];

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="tp-testimonial">
      <img className="tp-testimonial-watermark" src="assets/logo-mnemonic-ivory.svg" alt="" />
      <div className="tp-testimonial-inner">
        <div className="tp-eyebrow tp-eyebrow--ivory" style={{ textAlign: 'center' }}>
          Client stories
        </div>
        <div className="tp-testimonial-placeholder">
          <blockquote className="tp-testimonial-quote">
            "{t.quote}"
          </blockquote>
          <div className="tp-testimonial-cite">
            <div className="tp-testimonial-avatar" aria-hidden="true">—</div>
            <div>
              <div className="tp-testimonial-services" style={{ fontSize: '0.875rem', color: '#999', marginBottom: '0.5rem' }}>
                {t.services}
              </div>
              <div className="tp-testimonial-company" style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                {t.company}
              </div>
              {t.people.map((person, i) => (
                <div key={i} className="tp-testimonial-name">
                  {person.name}<span style={{ fontWeight: 'normal', color: '#666' }}> · {person.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={prev} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>← Previous</button>
          <span style={{ alignSelf: 'center' }}>{current + 1} / {testimonials.length}</span>
          <button onClick={next} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Next →</button>
        </div>
        <div className="tp-logos-label">Trusted by teams and leaders — logos coming</div>
        <div className="tp-logos-row">
          {['LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO'].map((l, i) => (
            <div key={i} className="tp-logo-placeholder">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.TestimonialPlaceholder = TestimonialPlaceholder;

function FAQ() {
  const faqs = [
    {
      q: 'How quickly can we start working together?',
      a: 'After a thirty-minute discovery call we can usually begin within one to two weeks — faster for urgent employee relations situations. We\'ll always tell you, honestly, if we\'re not the right fit.',
    },
    {
      q: "Do I need to know exactly what's wrong before calling?",
      a: 'No. Most of our clients know something is off — turnover is up, a team is struggling, a leader is stuck — but can\'t yet name the real issue. Helping you find the true point of the challenge is a big part of what we do.',
    },
    {
      q: 'What size of business do you work with?',
      a: 'Small to mid-sized businesses are our sweet spot — organisations that need senior HR and leadership expertise without building it all in-house. We also work one-on-one with individual leaders, entrepreneurs, and emerging professionals.',
    },
    {
      q: 'Are engagements project-based or ongoing?',
      a: 'Both. Some clients bring us in for a focused project (policy build, team offsite, leadership programme); others work with us on a fractional or retainer basis across the year. We\'ll recommend the shape that fits your situation.',
    },
    {
      q: 'Do you work in person or remotely?',
      a: 'Both. Coaching and consulting run comfortably online; team development and workshops tend to land best in the room together. We\'ll plan the mix with you up front.',
    },
    {
      q: 'What does this cost?',
      a: 'Engagements are scoped to your situation, so pricing varies. After the discovery call we send a clear written proposal with scope, approach, and fees — no surprises, no hidden line items.',
    },
  ];
  const [open, setOpen] = useTState(0);
  return (
    <section id="faq" className="tp-section">
      <div className="tp-section-head tp-reveal">
        <div className="tp-eyebrow tp-eyebrow--amber">Frequently asked</div>
        <h2 className="tp-section-title">
          Questions we hear<br/>
          <em>before the first call</em>
        </h2>
      </div>
      <div className="tp-faq-list tp-reveal">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`tp-faq-item ${isOpen ? 'is-open' : ''}`}>
              <button
                className="tp-faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{f.q}</span>
                <span className="tp-faq-plus" aria-hidden="true" />
              </button>
              <div className="tp-faq-a" style={{ maxHeight: isOpen ? 360 : 0 }}>
                <div className="tp-faq-a-inner">{f.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
window.FAQ = FAQ;
