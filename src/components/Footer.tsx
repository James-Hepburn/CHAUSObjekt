import React from 'react';

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="footer" role="contentinfo">
    <div className="container footer__inner">
      <nav className="footer__links" aria-label="Footer navigation">
        <a href="#services" className="footer__link">Services</a>
        <a href="#who-we-are" className="footer__link">Who We Are</a>
        <a href="#shop" className="footer__link">Shop</a>
        <a href="#contact" className="footer__link">Contact</a>
      </nav>

      <p className="footer__copy">
        © {new Date().getFullYear()} C.HAUS Objekt
      </p>
    </div>
  </footer>
);

export default Footer;
