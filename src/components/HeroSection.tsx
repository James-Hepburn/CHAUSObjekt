import React from 'react';
import GiftBox from './GiftBox';

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => (
  <section id="hero" className="hero" aria-label="Hero">
    {/* Subtle grain texture overlay */}
    <div className="hero__grain" aria-hidden="true" />

    <div className="container hero__inner">
      {/* ── Left: Headline ── */}
      <div className="hero__text">
        {/* Main headline — mixed weight editorial style */}
        <h1 className="hero__headline">
          <span className="hero__line hero__line--thin">Timeless</span>
          <span className="hero__line hero__line--heavy hero__line--accent">Culture.</span>
          <span className="hero__line hero__line--thin">Gifts to</span>
          <span className="hero__line hero__line--heavy">Give.</span>
          <span className="hero__line hero__line--outline">Objekts</span>
          <span className="hero__line hero__line--thin hero__line--small">to Keep.</span>
        </h1>
      </div>

      {/* ── Right: Animated gift box ── */}
      <div className="hero__image" aria-hidden="true">
        <GiftBox large />
      </div>
    </div>

    {/* Diagonal stripe divider at bottom */}
    <div className="stripe-bar" aria-hidden="true" />
  </section>
);

export default HeroSection;