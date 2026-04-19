/* global React */
const { useState: useTwState, useEffect: useTwEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryCta": "Let's find the true point of your people challenge",
  "tagline": "Where people challenges meet practical solutions",
  "theme": "jade",
  "darkHero": true,
  "sectionOrder": "standard"
}/*EDITMODE-END*/;

const CTA_OPTIONS = [
  "Let's find the true point of your people challenge",
  "Ready for practical HR and leadership support?",
  "Let's build confident leaders and strong workplaces",
];
const TAGLINE_OPTIONS = [
  "Where people challenges meet practical solutions",
  "Practical HR and leadership for real workplaces",
  "Clarity, confidence, and people solutions that work",
  "Practical HR. Confident Leadership. Real Results.",
];
const THEMES = [
  { v: 'jade', label: 'Jade' },
  { v: 'amber', label: 'Amber' },
  { v: 'midnight', label: 'Midnight' },
];
const ORDERS = [
  { v: 'standard', label: 'Promise → Services → Why → Who → How' },
  { v: 'credibility', label: 'Why → Services → How → Who' },
  { v: 'process', label: 'How → Services → Why → Who' },
];

function TweaksPanel({ state, setState, visible }) {
  const save = (edits) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };
  const set = (k, v) => { setState(s => ({ ...s, [k]: v })); save({ [k]: v }); };
  const cycle = (arr, cur) => {
    const i = arr.indexOf(cur);
    return arr[(i + 1) % arr.length];
  };

  return (
    <div className={`tp-tweaks ${visible ? 'is-open' : ''}`}>
      <h4>Tweaks</h4>
      <div className="tp-tweaks-sub">Truepoint Landing</div>

      <div className="tp-tweaks-group">
        <div className="tp-tweaks-label">Primary CTA</div>
        <div className="tp-tweaks-pills">
          {CTA_OPTIONS.map(c => (
            <button key={c}
              className={`tp-tweaks-pill ${state.primaryCta === c ? 'is-active' : ''}`}
              onClick={() => set('primaryCta', c)}
              title={c}>
              {c.length > 28 ? c.slice(0, 26) + '…' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-tweaks-group">
        <div className="tp-tweaks-label">Tagline</div>
        <div className="tp-tweaks-pills">
          {TAGLINE_OPTIONS.map(t => (
            <button key={t}
              className={`tp-tweaks-pill ${state.tagline === t ? 'is-active' : ''}`}
              onClick={() => set('tagline', t)}
              title={t}>
              {t.length > 30 ? t.slice(0, 28) + '…' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-tweaks-group">
        <div className="tp-tweaks-label">Colour emphasis</div>
        <div className="tp-tweaks-pills">
          {THEMES.map(t => (
            <button key={t.v}
              className={`tp-tweaks-pill ${state.theme === t.v ? 'is-active' : ''}`}
              onClick={() => set('theme', t.v)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-tweaks-group">
        <div className="tp-tweaks-label">Section order</div>
        <div className="tp-tweaks-pills" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {ORDERS.map(o => (
            <button key={o.v}
              className={`tp-tweaks-pill ${state.sectionOrder === o.v ? 'is-active' : ''}`}
              onClick={() => set('sectionOrder', o.v)}
              style={{ textAlign: 'left' }}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tp-tweaks-group">
        <div className={`tp-tweaks-toggle ${state.darkHero ? 'is-on' : ''}`} onClick={() => set('darkHero', !state.darkHero)}>
          <div className="tp-tweaks-switch" />
          <span>Dark hero</span>
        </div>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
window.LANDING_DEFAULTS = DEFAULTS;
