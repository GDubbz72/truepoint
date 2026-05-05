/* global React */
const { useState: useMState, useEffect: useMEffect } = React;

function DiscoveryCallModal({ open, onClose }) {
  const [step, setStep] = useMState(0);
  const [data, setData] = useMState({
    topic: '', size: '', urgency: '',
    date: '', slot: '',
    name: '', email: '', phone: '', note: '',
  });
  const [errors, setErrors] = useMState({});
  const [weekOffset, setWeekOffset] = useMState(0);

  useMEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useMEffect(() => {
    if (open) {
      setStep(0); setErrors({}); setWeekOffset(0);
      setData({ topic: '', size: '', urgency: '', date: '', slot: '', name: '', email: '', phone: '', note: '' });
    }
  }, [open]);

  const upd = (k, v) => { setData(d => ({ ...d, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: null })); };

  const topics = [
    { v: 'HR Consulting', label: 'HR consulting', sub: 'Policies, compliance, ER, people strategy' },
    { v: 'Coaching', label: '1:1 coaching', sub: 'Leadership, transitions, confidence' },
    { v: 'Leadership Training', label: 'Leadership training', sub: 'Programmes, workshops, development' },
    { v: 'Not sure', label: "I'm not sure yet", sub: "Help me find the true point" },
  ];
  const sizes = [
    { v: 'solo', label: 'Just me', sub: 'Individual / leader' },
    { v: 'small', label: '2–25', sub: 'Small business' },
    { v: 'mid', label: '26–250', sub: 'Mid-sized business' },
    { v: 'large', label: '250+', sub: 'Larger organisation' },
  ];
  const urgencies = [
    { v: 'asap', label: 'As soon as possible', sub: 'Something is stuck right now' },
    { v: 'month', label: 'Within a month', sub: 'Moving but not urgent' },
    { v: 'explore', label: "Just exploring", sub: "Open conversation, no timeline" },
  ];

  const days = [];
  const base = new Date(); base.setHours(0, 0, 0, 0);
  for (let i = 0; i < 5; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + 1 + weekOffset * 7 + i);
    days.push(d);
  }
  const slots = ['9:00', '10:30', '13:00', '14:30', '16:00'];

  const totalSteps = 4;
  const next = () => {
    const e = {};
    if (step === 0) {
      if (!data.topic) e.topic = 1;
      if (!data.size) e.size = 1;
      if (!data.urgency) e.urgency = 1;
    } else if (step === 1) {
      if (!data.date) e.date = 1;
      if (!data.slot) e.slot = 1;
    } else if (step === 2) {
      if (!data.name.trim()) e.name = 'Your name helps us prepare.';
      if (!data.email.trim()) e.email = 'We need an email to send the invite.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "That email doesn't look right.";
    }
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => Math.min(s + 1, totalSteps));
  };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const fmtDate = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtDayNum = (d) => d.toLocaleDateString('en-GB', { day: 'numeric' });
  const fmtDayName = (d) => d.toLocaleDateString('en-GB', { weekday: 'short' });
  const fmtPhone = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };
  const weekLabel = () => {
    if (weekOffset === 0) return 'This week';
    if (weekOffset === 1) return 'Next week';
    return `In ${weekOffset + 1} weeks`;
  };

  return (
    <div className={`tp-modal-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tp-modal-head">
          <h3 className="tp-modal-title">Book a <em>discovery call</em></h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {step < totalSteps && (
          <div className="tp-modal-steps">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`tp-modal-step-dot ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`} />
            ))}
            <span style={{ marginLeft: 'auto', color: 'var(--tp-slate-500)' }}>Step {step + 1} of {totalSteps}</span>
          </div>
        )}

        <div className="tp-modal-body">
          {step === 0 && (
            <div>
              <div className="tp-modal-step-label">Step one</div>
              <h4 className="tp-modal-step-title">A few <em>quick questions</em></h4>
              <p className="tp-modal-step-sub">So we can match you with the right partner and come prepared.</p>

              <div className="tp-label" style={{ marginBottom: 8 }}>What would you like to talk about?</div>
              <div className="tp-option-grid">
                {topics.map(t => (
                  <button key={t.v} type="button"
                    className={`tp-option ${data.topic === t.v ? 'is-selected' : ''}`}
                    onClick={() => upd('topic', t.v)}>
                    <span className="tp-option-label">{t.label}</span>
                    <span className="tp-option-sub">{t.sub}</span>
                  </button>
                ))}
              </div>
              {errors.topic && <div className="tp-field-error" style={{ marginBottom: 14 }}>Pick one to continue.</div>}

              <div className="tp-label" style={{ marginTop: 20, marginBottom: 8 }}>What's the size of your organisation?</div>
              <div className="tp-option-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                {sizes.map(s => (
                  <button key={s.v} type="button"
                    className={`tp-option ${data.size === s.v ? 'is-selected' : ''}`}
                    onClick={() => upd('size', s.v)}>
                    <span className="tp-option-label">{s.label}</span>
                    <span className="tp-option-sub">{s.sub}</span>
                  </button>
                ))}
              </div>
              {errors.size && <div className="tp-field-error" style={{ marginBottom: 14 }}>Pick one to continue.</div>}

              <div className="tp-label" style={{ marginTop: 20, marginBottom: 8 }}>How urgent is this?</div>
              <div className="tp-option-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                {urgencies.map(u => (
                  <button key={u.v} type="button"
                    className={`tp-option ${data.urgency === u.v ? 'is-selected' : ''}`}
                    onClick={() => upd('urgency', u.v)}>
                    <span className="tp-option-label">{u.label}</span>
                    <span className="tp-option-sub">{u.sub}</span>
                  </button>
                ))}
              </div>
              {errors.urgency && <div className="tp-field-error">Pick one to continue.</div>}
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="tp-modal-step-label">Step two</div>
              <h4 className="tp-modal-step-title">Pick a <em>time that works</em></h4>
              <p className="tp-modal-step-sub">Thirty minutes. Video call — we'll send a link with the invite.</p>

              <div className="tp-date-head">
                <button className="tp-date-nav" onClick={() => setWeekOffset(w => Math.max(0, w - 1))} disabled={weekOffset === 0} aria-label="Previous week">‹</button>
                <div className="tp-date-label">{weekLabel()}</div>
                <button className="tp-date-nav" onClick={() => setWeekOffset(w => Math.min(4, w + 1))} disabled={weekOffset === 4} aria-label="Next week">›</button>
              </div>

              <div className="tp-slot-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {days.map((d) => {
                  const key = d.toISOString().slice(0, 10);
                  const isSel = data.date === key;
                  return (
                    <button key={key} type="button"
                      className={`tp-slot ${isSel ? 'is-selected' : ''}`}
                      onClick={() => { upd('date', key); upd('slot', ''); }}
                      style={{ padding: '12px 6px' }}>
                      <div style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.7, textTransform: 'uppercase' }}>{fmtDayName(d)}</div>
                      <div style={{ fontFamily: 'var(--tp-font-serif)', fontSize: 22, marginTop: 4, lineHeight: 1 }}>{fmtDayNum(d)}</div>
                    </button>
                  );
                })}
              </div>
              {errors.date && <div className="tp-field-error" style={{ marginTop: 8 }}>Pick a day.</div>}

              {data.date && (
                <>
                  <div className="tp-label" style={{ marginTop: 22, marginBottom: 10 }}>Times available · London GMT</div>
                  <div className="tp-slot-grid">
                    {slots.map((t, i) => {
                      const disabled = i === 2; // pretend one slot is taken
                      return (
                        <button key={t} type="button"
                          className={`tp-slot ${data.slot === t ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
                          onClick={() => !disabled && upd('slot', t)}>
                          {t}{disabled ? ' · taken' : ''}
                        </button>
                      );
                    })}
                  </div>
                  {errors.slot && <div className="tp-field-error" style={{ marginTop: 8 }}>Pick a time.</div>}
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="tp-modal-step-label">Step three</div>
              <h4 className="tp-modal-step-title">Where should we <em>send the invite?</em></h4>
              <p className="tp-modal-step-sub">We'll email a calendar invite with a video link.</p>

              <div className="tp-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div className={`tp-field ${errors.name ? 'has-error' : ''}`}>
                  <label className="tp-label">Your name</label>
                  <input type="text" value={data.name} onChange={(e) => upd('name', e.target.value)} placeholder="Jordan Mitchell" />
                  {errors.name && <div className="tp-field-error">{errors.name}</div>}
                </div>
                <div className={`tp-field ${errors.email ? 'has-error' : ''}`}>
                  <label className="tp-label">Email</label>
                  <input type="email" value={data.email} onChange={(e) => upd('email', e.target.value)} placeholder="jordan@company.com" />
                  {errors.email && <div className="tp-field-error">{errors.email}</div>}
                </div>
              </div>
              <div className="tp-field" style={{ marginBottom: 14 }}>
                <label className="tp-label">Phone (optional)</label>
                <input type="tel" value={data.phone} onChange={(e) => upd('phone', fmtPhone(e.target.value))} placeholder="(123) 456-7890" />
              </div>
              <div className="tp-field">
                <label className="tp-label">Anything you'd like us to know before the call? (optional)</label>
                <textarea rows="3" value={data.note} onChange={(e) => upd('note', e.target.value)} placeholder="A sentence or two helps us come prepared." />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="tp-modal-step-label">Almost there</div>
              <h4 className="tp-modal-step-title">Review and <em>confirm</em></h4>
              <p className="tp-modal-step-sub">Looks right? Confirm and we'll send the invite within an hour.</p>

              <div className="tp-modal-review">
                <div className="tp-modal-review-row">
                  <div className="tp-modal-review-label">Topic</div>
                  <div className="tp-modal-review-val">{topics.find(t => t.v === data.topic)?.label}</div>
                </div>
                <div className="tp-modal-review-row">
                  <div className="tp-modal-review-label">Org size</div>
                  <div className="tp-modal-review-val">{sizes.find(s => s.v === data.size)?.label} · {sizes.find(s => s.v === data.size)?.sub}</div>
                </div>
                <div className="tp-modal-review-row">
                  <div className="tp-modal-review-label">Timing</div>
                  <div className="tp-modal-review-val">{urgencies.find(u => u.v === data.urgency)?.label}</div>
                </div>
                <div className="tp-modal-review-row">
                  <div className="tp-modal-review-label">When</div>
                  <div className="tp-modal-review-val">{fmtDate(new Date(data.date))} · {data.slot} GMT</div>
                </div>
                <div className="tp-modal-review-row">
                  <div className="tp-modal-review-label">Who</div>
                  <div className="tp-modal-review-val">{data.name} · {data.email}</div>
                </div>
              </div>
            </div>
          )}

          {step === totalSteps && (
            <div className="tp-modal-success">
              <div className="tp-modal-success-mark" aria-hidden="true">✓</div>
              <div className="tp-eyebrow tp-eyebrow--amber">Booked</div>
              <h4 className="tp-modal-step-title" style={{ textAlign: 'center' }}>See you <em>soon, {data.name.split(' ')[0] || 'there'}</em></h4>
              <p className="tp-modal-step-sub" style={{ textAlign: 'center', maxWidth: 440 }}>
                Your discovery call is provisionally held for{' '}
                <strong style={{ color: 'var(--tp-midnight)' }}>{fmtDate(new Date(data.date))} at {data.slot} GMT</strong>.
                A calendar invite will arrive at <strong style={{ color: 'var(--tp-midnight)' }}>{data.email}</strong> within the hour.
              </p>
              <button className="tp-btn tp-btn-outline" onClick={onClose}>Close</button>
            </div>
          )}
        </div>

        {step < totalSteps && (
          <div className="tp-modal-foot">
            {step > 0 ? (
              <button className="tp-btn tp-btn-ghost" onClick={back}>← Back</button>
            ) : (
              <span style={{ fontSize: 11, color: 'var(--tp-slate)', letterSpacing: '0.1em' }}>30 minutes · No obligation</span>
            )}
            <button className="tp-btn tp-btn-primary" onClick={next}>
              {step === totalSteps - 1 ? 'Confirm booking →' : 'Continue →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
window.DiscoveryCallModal = DiscoveryCallModal;
