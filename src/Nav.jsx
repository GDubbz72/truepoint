/* global React */
const { useState, useEffect } = React;

function Nav({ onOpenCall }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { label: 'What we do', href: '#services' },
    { label: 'Why Truepoint', href: '#why' },
    { label: 'How we work', href: '#how' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className={`tp-nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="tp-nav">
        <a href="#top" className="tp-nav-logo" aria-label="Truepoint People Solutions home">
          <img src="assets/truepoint_logo_Stacked.svg" alt="Truepoint People Solutions" />
        </a>
        <div className="tp-nav-links">
          {items.map(it => (
            <a key={it.label} href={it.href} className="tp-nav-link">{it.label}</a>
          ))}
        </div>
        <div className="tp-nav-cta">
          <a href="#contact" className="tp-btn tp-btn-outline tp-btn-sm">Send a message</a>
          <button className="tp-btn tp-btn-primary tp-btn-sm" onClick={onOpenCall}>
            Book a Discovery Call →
          </button>
        </div>
      </nav>
    </div>
  );
}

window.Nav = Nav;
