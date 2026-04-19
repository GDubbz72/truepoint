/* global React */
function Hero({ ctaText, tagline, darkHero, onOpenCall }) {
  return (
    <section className={`tp-hero ${darkHero ? '' : 'tp-hero--light'}`} id="top">
      <div className="tp-hero-inner">
        <div className="tp-hero-left">
          <h1 className="tp-hero-title">
            Practical HR.<br />
            Confident leadership.<br />
            <em>Real results.</em>
          </h1>
          <p className="tp-hero-body">
            We help people and businesses get unstuck — and move forward with
            clarity, confidence, and purpose. No cookie-cutter HR. No
            theoretical leadership advice. Just hands-on, practical solutions
            that work in the real world.
          </p>
          <div className="tp-hero-ctas">
            <button className="tp-btn tp-btn-primary tp-btn-lg" onClick={onOpenCall}>
              {ctaText} →
            </button>
            <a href="#services" className={`tp-btn ${darkHero ? 'tp-btn-outline-dark' : 'tp-btn-outline'}`}>
              See how we help
            </a>
          </div>
          <div className="tp-hero-meta">
            <div className="tp-hero-stat">
              <div className="tp-hero-stat-num">HR</div>
              <div className="tp-hero-stat-lab">consulting that protects your business and empowers your people</div>
            </div>
            <div className="tp-hero-stat">
              <div className="tp-hero-stat-num">1:1</div>
              <div className="tp-hero-stat-lab">coaching for professionals and leaders ready to grow</div>
            </div>
            <div className="tp-hero-stat">
              <div className="tp-hero-stat-num">All</div>
              <div className="tp-hero-stat-lab">industries — great people practices transcend sectors</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
window.Hero = Hero;
