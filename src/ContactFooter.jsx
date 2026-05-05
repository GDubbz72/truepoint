/* global React */
const { useState: useFState } = React;

function ContactForm({ onOpenCall }) {
  const [form, setForm] = useFState({ name: '', email: '', company: '', topic: 'HR Consulting', note: '', website: '' });
  const [errors, setErrors] = useFState({});
  const [sent, setSent] = useFState(false);
  const upd = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Your name helps us reply personally.';
    if (!form.email.trim()) e.email = 'We need an email to reach you.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email doesn\'t look right.';
    if (!form.note.trim() || form.note.trim().length < 10) e.note = 'A sentence or two is plenty — tell us what\'s on your mind.';
    return e;
  };
  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (form.website) return setSent(true); // honeypot triggered, silently succeed
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      const { error } = await supabaseClient.from('contact_submissions').insert([{
        name: form.name,
        email: form.email,
        company: form.company || null,
        topic: form.topic,
        note: form.note,
      }]);
      if (error) throw error;
      setSent(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ submit: 'Failed to send. Please try again.' });
    }
  };

  return (
    <section id="contact" className="tp-section-contact">
      <div className="tp-contact-grid">
        <div className="tp-contact-left tp-reveal">
          <div className="tp-eyebrow tp-eyebrow--amber">Get in touch</div>
          <h2 className="tp-section-title" style={{ textAlign: 'left' }}>
            Let's find the true point<br/>of your <em>people challenge</em>
          </h2>
          <p className="tp-contact-body">
            Drop us a line, or book a thirty-minute discovery call. No
            agenda, no pitch — tell us what you're working through, and
            we'll tell you honestly whether we're the right people to help.
          </p>
          <button className="tp-btn tp-btn-primary tp-btn-lg" onClick={onOpenCall}>
            Book a Discovery Call →
          </button>
          <div className="tp-contact-meta" style={{ marginTop: 40 }}>
            <div className="tp-contact-meta-item">
              <span className="tp-label">Email</span>
              <a href="mailto:w.barrington@truepointps.com">w.barrington@truepointps.com</a>
            </div>
            <div className="tp-contact-meta-item">
              <span className="tp-label">Phone</span>
              <a href="tel:+15555551111">(555) 555-1111</a>
            </div>
            <div className="tp-contact-meta-item">
              <span className="tp-label">Web</span>
              <a href="https://www.truepointps.com">www.truepointps.com</a>
            </div>
            <div className="tp-contact-meta-item">
              <span className="tp-label">Hours</span>
              <span>Mon–Fri · Replies within one working day</span>
            </div>
          </div>
        </div>
        <div className="tp-contact-right tp-reveal">
          {!sent ? (
            <form className="tp-form" onSubmit={onSubmit} noValidate>
              <div className="tp-field-row">
                <div className={`tp-field ${errors.name ? 'has-error' : ''}`}>
                  <label className="tp-label" htmlFor="f-name">Your name</label>
                  <input id="f-name" type="text" value={form.name} onChange={upd('name')} placeholder="Jordan Mitchell" />
                  {errors.name && <div className="tp-field-error">{errors.name}</div>}
                </div>
                <div className={`tp-field ${errors.email ? 'has-error' : ''}`}>
                  <label className="tp-label" htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" value={form.email} onChange={upd('email')} placeholder="jordan@company.com" />
                  {errors.email && <div className="tp-field-error">{errors.email}</div>}
                </div>
              </div>
              <div className="tp-field">
                <label className="tp-label" htmlFor="f-company">Company (optional)</label>
                <input id="f-company" type="text" value={form.company} onChange={upd('company')} placeholder="Company or organisation" />
              </div>
              <div className="tp-field">
                <label className="tp-label" htmlFor="f-topic">What can we help with?</label>
                <select id="f-topic" value={form.topic} onChange={upd('topic')}>
                  <option>HR Consulting</option>
                  <option>Coaching (1:1)</option>
                  <option>Leadership Training</option>
                  <option>Team development</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className={`tp-field ${errors.note ? 'has-error' : ''}`}>
                <label className="tp-label" htmlFor="f-note">Tell us what you're working through</label>
                <textarea id="f-note" rows="4" value={form.note} onChange={upd('note')} placeholder="A sentence or two is plenty." />
                {errors.note && <div className="tp-field-error">{errors.note}</div>}
              </div>
              <input type="text" name="website" value={form.website} onChange={upd('website')} style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} tabIndex="-1" autoComplete="off" />
              <button type="submit" className="tp-btn tp-btn-primary tp-btn-full tp-btn-lg">Send message →</button>
              <p className="tp-form-note">Your note goes straight to a Truepoint partner. We'll reply within one working day.</p>
            </form>
          ) : (
            <div className="tp-form-sent">
              <div className="tp-eyebrow tp-eyebrow--amber">Message received</div>
              <h3 className="tp-form-sent-title">We'll be in touch<br/><em>very soon</em></h3>
              <p className="tp-contact-body">Thanks, {form.name.split(' ')[0] || 'there'}. Your note is with us. Expect a personal reply from a Truepoint partner within one working day.</p>
              <button className="tp-btn tp-btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', topic: 'HR Consulting', note: '', website: '' }); }}>Send another</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
window.ContactForm = ContactForm;

function FinalCTA({ ctaText, onOpenCall }) {
  return (
    <section className="tp-final-cta">
      <div className="tp-final-cta-inner tp-reveal">
        <div className="tp-eyebrow tp-eyebrow--amber" style={{ color: 'var(--tp-amber)' }}>Ready when you are</div>
        <h2 className="tp-final-cta-title">
          Clarity, confidence,<br/>
          and <em>people solutions that work</em>
        </h2>
        <p className="tp-final-cta-body">
          Thirty minutes. No agenda, no pitch. We'll listen, ask a few sharp
          questions, and tell you honestly whether we're the right people to
          help you move forward.
        </p>
        <div className="tp-final-cta-ctas">
          <button className="tp-btn tp-btn-primary tp-btn-lg" onClick={onOpenCall}>
            {ctaText} →
          </button>
          <a href="#contact" className="tp-btn tp-btn-outline-dark tp-btn-lg">Send a message instead</a>
        </div>
        <div className="tp-final-cta-meta">
          w.barrington@truepointps.com · (555) 555-1111
        </div>
      </div>
    </section>
  );
}
window.FinalCTA = FinalCTA;

function Footer() {
  const cols = [
    { title: 'What we do', items: ['HR Consulting', 'Coaching', 'Leadership Training', 'Team development'] },
    { title: 'Company', items: ['Our approach', 'Who we serve', 'How we work', 'FAQ'] },
    { title: 'Contact', items: ['w.barrington@truepointps.com', '(555) 555-1111', 'www.truepointps.com', 'LinkedIn'] },
  ];
  return (
    <footer className="tp-footer">
      <div className="tp-footer-inner">
        <div className="tp-footer-brand">
          <img className="tp-footer-logo" src="assets/truepoint_logo_Stacked.svg" alt="Truepoint" />
          <p className="tp-footer-tag">
            Where people challenges meet <em>practical solutions</em>.
          </p>
        </div>
        <div className="tp-footer-cols">
          {cols.map(c => (
            <div key={c.title} className="tp-footer-col">
              <div className="tp-label tp-label--ivory">{c.title}</div>
              <ul>{c.items.map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="tp-footer-base">
        <span>© 2026 Truepoint People Solutions. All rights reserved.</span>
        <span>Helping people and businesses get unstuck.</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
