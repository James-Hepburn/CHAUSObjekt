import React from 'react';
import GiftBox from './GiftBox';

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => (
  <section
    id="hero"
    className="hero"
    aria-label="Hero"
    style={{ position: 'relative', overflow: 'hidden' }}
  >
    {/* Subtle zebra diagonal texture */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundColor: '#000',
      }}
    />

    {/* Grain */}
    <div className="hero__grain" aria-hidden="true" />

    {/* ── Full-width stacked headline ── */}
    <div style={{ position: 'relative', width: '100%', paddingTop: 'clamp(30px, 8vw, 120px)' }}>

      {/* Row 1: Timeless Culture */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '0.45em',
        lineHeight: 0.9,
        paddingBottom: '0.05em',
      }}>
        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          Timeless
        </span>

        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          Culture
        </span>
      </div>

      {/* Row 2: Gifts to Give */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '0.45em',
        lineHeight: 0.9,
        paddingBottom: '0.05em',
      }}>
        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          Gifts
        </span>
        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          to
        </span>
        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          Give
        </span>
      </div>

      {/* Row 3: Objekts to Keep */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '0.45em',
        lineHeight: 0.9,
        position: 'relative',
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          Objekts
        </span>
        <span style={{
          fontFamily: "'Helvetica', sans-serif",
          fontSize: 'clamp(20px, 6vw, 80px)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          color: '#fff',
        }}>
          to Keep
        </span>
      </div>

      {/* Gift box — centred, negative margin pulls it up behind row 3 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        marginTop: 'clamp(-100px, -12vw, -210px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
      }}>
        <GiftBox large />
      </div>
    </div>

    {/* Black-on-white stripe divider */}
    <div className="stripe-bar" aria-hidden="true" />
  </section>
);

export default HeroSection;