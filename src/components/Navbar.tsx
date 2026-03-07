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
    >
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
              <a href={link.href} className="navbar__link">
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
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile-menu" role="menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              role="menuitem"
              onClick={closeMobile}
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