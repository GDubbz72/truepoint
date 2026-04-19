/* global React */
const { useState: useTState } = React;

function TestimonialPlaceholder() {
  return (
    <section className="tp-testimonial">
      <img className="tp-testimonial-watermark" src="assets/logo-mnemonic-ivory.svg" alt="" />
      <div className="tp-testimonial-inner">
        <div className="tp-eyebrow tp-eyebrow--ivory" style={{ textAlign: 'center' }}>
          Client stories
        </div>
        <div className="tp-testimonial-placeholder">
          <blockquote className="tp-testimonial-quote">
            "A quote from a real client will live here — a sentence about
            getting unstuck, finding clarity, or leading with more confidence
            after working with Truepoint."
          </blockquote>
          <div className="tp-testimonial-cite">
            <div className="tp-testimonial-avatar" aria-hidden="true">—</div>
            <div>
              <div className="tp-testimonial-name">Client name</div>
              <div className="tp-testimonial-role">Role · Company</div>
            </div>
          </div>
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
