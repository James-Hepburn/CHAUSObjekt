import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer" role="contentinfo">
    {/* Gold accent line at top of footer */}
    <div
      aria-hidden="true"
      style={{
        height: 3,
        background: 'linear-gradient(90deg, #a27b42 0%, #c8a96f 30%, #e9d7a4 55%, #c8a96f 75%, #b89456 100%)',
      }}
      className="footer__gold-line"
    />
    <div className="container footer__inner">
      <nav className="footer__links" aria-label="Footer navigation">
        <a href="#services" className="footer__link">Services</a>
        <a href="#who-we-are" className="footer__link">Who We Are</a>
        <a href="#shop" className="footer__link">Shop</a>
        <a href="#contact" className="footer__link">Contact</a>
      </nav>
    </div>
  </footer>
);

export default Footer;