import React, { useState, useEffect } from 'react';
import { NavLink } from '../types.ts';
import logo from '../assets/Logo-Header.png';

console.log('LOGO PATH:', logo);

const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'Shop', href: '#shop' },
  { label: 'Contact Us', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
      style={{ background: '#1a1a1a', flexDirection: 'column', display: 'flex' }}
    >
      {/* Gold ribbon accent line at very top */}
      <div
        aria-hidden="true"
        style={{
          height: 3,
          flexShrink: 0,
          background: 'linear-gradient(90deg, #a27b42 0%, #c8a96f 30%, #e9d7a4 55%, #c8a96f 75%, #b89456 100%)',
        }}
      />

      <div className="container navbar__inner">
        <a href="#hero" className="navbar__logo" aria-label="C.HAUS Objekt home">
          <img
            src={logo}
            alt="C.HAUS Objekt"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link"
                style={{ color: '#f5f3ee' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          style={{ color: '#f5f3ee' }}
        >
          <span style={{ background: '#f5f3ee' }} />
          <span style={{ background: '#f5f3ee' }} />
          <span style={{ background: '#f5f3ee' }} />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="navbar__mobile-menu"
          role="menu"
          style={{ background: '#1a1a1a', borderTop: '1px solid rgba(245,243,238,0.1)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              role="menuitem"
              onClick={closeMobile}
              style={{ color: '#f5f3ee' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;