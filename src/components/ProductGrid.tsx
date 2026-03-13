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

const ZEBRA = 'repeating-linear-gradient(-45deg, #1a1a1a 0, #1a1a1a 10px, #f5f3ee 10px, #f5f3ee 20px)';

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
        background: 'rgba(13,13,13,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      <img
        src={src}
        alt={label}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain' }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: '1px solid rgba(245,243,238,0.3)',
          color: '#f5f3ee', fontFamily: 'Helvetica,sans-serif',
          fontSize: 12, letterSpacing: 2, padding: '6px 14px',
          cursor: 'pointer',
        }}
      >
        ESC / CLOSE
      </button>
    </div>
  );
};

// Single image cell with thick black border
const Cell: React.FC<{
  img: string;
  label: string;
  style?: React.CSSProperties;
}> = ({ img, label, style }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <Lightbox src={img} label={label} onClose={() => setOpen(false)} />}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'zoom-in',
          border: '3px solid #1a1a1a',
          background: '#fff',
          ...style,
        }}
      >
        <img
          src={img}
          alt={label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </>
  );
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

const ProductGrid: React.FC = () => {
  const isMobile = useIsMobile();
  return (
  <section
    id="services"
    style={{ background: '#f5f3ee', position: 'relative' }}
  >
    {/* Top zebra stripe */}
    <div aria-hidden="true" style={{ height: 16, width: '100%', background: ZEBRA }} />

    <div style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 40, flexWrap: 'wrap', gap: 16,
        }}>
          <h2 style={{
            fontFamily: 'Helvetica, sans-serif',
            fontSize: 'clamp(40px, 5vw, 68px)',
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
              fontFamily: 'Helvetica, sans-serif', fontSize: 12, letterSpacing: 2,
              textTransform: 'uppercase', borderBottom: '1px solid #1a1a1a',
              paddingBottom: 2, color: '#1a1a1a', textDecoration: 'none',
            }}
          >
            View All →
          </a>
        </div>

          {/* ── DESKTOP GRID ── */}
          {!isMobile && (
            <div style={{ border: '3px solid #1a1a1a' }}>
              {/* Row 1: zebra | hero | zebra */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px', borderBottom: '3px solid #1a1a1a' }}>
                <div style={{ background: ZEBRA, borderRight: '3px solid #1a1a1a' }} />
                <Cell img={PRODUCTS[0].img} label={PRODUCTS[0].label} style={{ height: 420 }} />
                <div style={{ background: ZEBRA, borderLeft: '3px solid #1a1a1a' }} />
              </div>
              {/* Row 2: two equal cells */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '3px solid #1a1a1a' }}>
                <Cell img={PRODUCTS[1].img} label={PRODUCTS[1].label} style={{ height: 320, borderRight: '3px solid #1a1a1a' }} />
                <Cell img={PRODUCTS[2].img} label={PRODUCTS[2].label} style={{ height: 320 }} />
              </div>
              {/* Row 3: two images + zebra filler */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                <Cell img={PRODUCTS[3].img} label={PRODUCTS[3].label} style={{ height: 300, borderRight: '3px solid #1a1a1a' }} />
                <Cell img={PRODUCTS[4].img} label={PRODUCTS[4].label} style={{ height: 300, borderRight: '3px solid #1a1a1a' }} />
                <div style={{ height: 300, background: ZEBRA, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{
                    fontFamily: 'Helvetica, sans-serif', fontSize: 11, letterSpacing: 3,
                    textTransform: 'uppercase', color: '#1a1a1a', background: '#f5f3ee',
                    padding: '10px 18px', border: '2px solid #1a1a1a', whiteSpace: 'nowrap',
                  }}>More Coming Soon</span>
                </div>
              </div>
            </div>
          )}

          {/* ── MOBILE GRID ── */}
          {isMobile && (
            <div style={{ border: '3px solid #1a1a1a' }}>
              {/* Zebra bar top */}
              <div style={{ height: 40, background: ZEBRA, borderBottom: '3px solid #1a1a1a' }} />
              {/* Hero full width */}
              <Cell img={PRODUCTS[0].img} label={PRODUCTS[0].label} style={{ height: 260, borderBottom: '3px solid #1a1a1a' }} />
              {/* Row: two side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '3px solid #1a1a1a' }}>
                <Cell img={PRODUCTS[1].img} label={PRODUCTS[1].label} style={{ height: 190, borderRight: '3px solid #1a1a1a' }} />
                <Cell img={PRODUCTS[2].img} label={PRODUCTS[2].label} style={{ height: 190 }} />
              </div>
              {/* Row: two side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '3px solid #1a1a1a' }}>
                <Cell img={PRODUCTS[3].img} label={PRODUCTS[3].label} style={{ height: 190, borderRight: '3px solid #1a1a1a' }} />
                <Cell img={PRODUCTS[4].img} label={PRODUCTS[4].label} style={{ height: 190 }} />
              </div>
              {/* Zebra bar bottom with tag */}
              <div style={{ height: 60, background: ZEBRA, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  fontFamily: 'Helvetica, sans-serif', fontSize: 10, letterSpacing: 3,
                  textTransform: 'uppercase', color: '#1a1a1a', background: '#f5f3ee',
                  padding: '8px 16px', border: '2px solid #1a1a1a', whiteSpace: 'nowrap',
                }}>More Coming Soon</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductGrid;