import React, { useState, useEffect } from 'react';

import tshirt01 from '../assets/WEBSITE_TSHIRTS-01.png';
import tshirt02 from '../assets/WEBSITE_TSHIRTS-02.png';
import tshirt03 from '../assets/WEBSITE_TSHIRTS-03.png';
import tshirt04 from '../assets/WEBSITE_TSHIRTS-04.png';
import businessCard from '../assets/Business-Card.png';

const PRODUCTS = [
  { img: tshirt01,     label: 'Hong Kong Tee — East Meets West', badge: '' },
  { img: tshirt02,     label: 'Hong Kong Tee — Skyline',         badge: '' },
  { img: tshirt03,     label: 'Catch The Tram — Crop Tee',       badge: '' },
  { img: tshirt04,     label: 'Hong Kong Tee — Bold Edition',    badge: '' },
  { img: businessCard, label: 'Wesley Tsang — Business Card',    badge: '' },
];

const Lightbox: React.FC<{ src: string; label: string; onClose: () => void }> = ({ src, label, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(13,13,13,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      <img
        src={src}
        alt={label}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 4 }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: '1px solid rgba(245,243,238,0.3)',
          color: '#f5f3ee', fontFamily: 'Inter,sans-serif',
          fontSize: 12, letterSpacing: 2, padding: '6px 14px',
          cursor: 'pointer', borderRadius: 2,
        }}
      >
        ESC / CLOSE
      </button>
    </div>
  );
};

const Card: React.FC<{ img: string; label: string; badge: string }> = ({ img, label, badge }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {open && <Lightbox src={img} label={label} onClose={() => setOpen(false)} />}
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: 8,
          overflow: 'hidden',
          cursor: 'zoom-in',
          border: '1px solid rgba(26,26,26,0.08)',
          boxShadow: hovered
            ? '0 20px 48px rgba(26,26,26,0.12)'
            : '0 2px 12px rgba(26,26,26,0.05)',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {badge && (
          <span style={{
            position: 'absolute', top: 12, right: 12, zIndex: 2,
            background: '#6b859c', color: '#f5f3ee',
            fontFamily: 'Inter,sans-serif', fontSize: 10,
            fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 2,
          }}>
            {badge}
          </span>
        )}
        <img
          src={img}
          alt={label}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>
    </>
  );
};

const ProductGrid: React.FC = () => (
  <section
    id="services"
    style={{
      background: '#f5f3ee',
      padding: '100px 0',
      position: 'relative',
    }}
  >
    {/* Faint zebra texture */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 38px, rgba(0,0,0,0.018) 38px, rgba(0,0,0,0.018) 40px)',
      }}
    />
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: 48, flexWrap: 'wrap', gap: 16,
      }}>
        <h2 style={{
          fontFamily: 'Anton,sans-serif',
          fontSize: 'clamp(40px,5vw,68px)',
          textTransform: 'uppercase',
          letterSpacing: '-0.5px',
          lineHeight: 1,
          margin: 0,
          color: '#1a1a1a',
        }}>
          Our <span style={{ color: '#6b859c' }}>Pieces</span>
        </h2>
        <a
          href="#shop"
          style={{
            fontFamily: 'Inter,sans-serif', fontSize: 12, letterSpacing: 2,
            textTransform: 'uppercase', borderBottom: '1px solid #1a1a1a',
            paddingBottom: 2, color: '#1a1a1a', textDecoration: 'none',
          }}
        >
          View All →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {PRODUCTS.map((p, i) => (
          <Card key={i} img={p.img} label={p.label} badge={p.badge} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductGrid;
