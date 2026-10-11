import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import tshirt01 from '../assets/WEBSITE_TSHIRTS-01.png';
import tshirt02 from '../assets/WEBSITE_TSHIRTS-02.png';
import tshirt03 from '../assets/WEBSITE_TSHIRTS-03.png';
import tshirt04 from '../assets/WEBSITE_TSHIRTS-04.png';
import businessCard from '../assets/Business-Card.png';
import rolSan1 from '../assets/RolSan1.jpg';
import rolSan2 from '../assets/RolSan2.jpg';
import rolSan3 from '../assets/RolSan3.jpg';
import rolSan4 from '../assets/RolSan4.jpg';
import rolSan5 from '../assets/RolSan5.jpg';

const PRODUCTS = [
  { img: tshirt01,     label: 'Hong Kong Tee — East Meets West', badge: '', category: 'tshirts' },
  { img: tshirt02,     label: 'Hong Kong Tee — Skyline',         badge: '', category: 'tshirts' },
  { img: tshirt03,     label: 'Catch The Tram — Crop Tee',       badge: '', category: 'tshirts' },
  { img: tshirt04,     label: 'Hong Kong Tee — Bold Edition',    badge: '', category: 'tshirts' },
  { img: businessCard, label: 'Wesley Tsang — Business Card',    badge: '', category: 'cards' },
  { img: rolSan1,       label: 'Rolsan Work 1',                   badge: '', category: 'keychains' },
  { img: rolSan2,       label: 'Rolsan Work 2',                   badge: '', category: 'keychains' },
  { img: rolSan3,       label: 'Rolsan Work 3',                   badge: '', category: 'keychains' },
  { img: rolSan4,       label: 'Rolsan Work 4',                   badge: '', category: 'keychains' },
  { img: rolSan5,       label: 'Rolsan Work 5',                   badge: '', category: 'keychains' },
];

// Mobile-only grouping: one horizontal scroll row per category
const CATEGORIES = [
  { key: 'tshirts',   title: ['Hong Kong', 'T-Shirt Designs'], cellWidth: 250, comingSoon: false },
  { key: 'cards',     title: ['Business', 'Card Design'],      cellWidth: 170, comingSoon: true },
  { key: 'keychains', title: ['Coaster', 'Keychain Design'],   cellWidth: 150, comingSoon: false },
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

// Single image cell
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
          background: '#fff',
          border: '3px solid #1a1a1a',
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

const ComingSoon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    background: '#f5f3ee',
    border: '3px solid #1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  }}>
    <span style={{
      fontFamily: 'Helvetica, sans-serif',
      fontSize: 11,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: '#1a1a1a',
      background: '#fff',
      padding: '10px 18px',
      border: '2px solid #1a1a1a',
      whiteSpace: 'nowrap',
    }}>
      More Coming Soon
    </span>
  </div>
);

const MobileWorks: React.FC<{ onViewEvents: () => void }> = ({ onViewEvents }) => {
  const height = 220;
  const stripe = <div aria-hidden="true" style={{ height: 12, width: '100%', background: ZEBRA }} />;

  return (
    <div style={{ padding: '32px 0 40px' }}>
      <h2 style={{
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 40,
        textTransform: 'uppercase',
        letterSpacing: '-0.5px',
        lineHeight: 1,
        margin: '0 0 24px',
        padding: '0 24px',
        color: '#1a1a1a',
      }}>
        Our <span style={{ color: '#6b859c' }}>Works</span>
      </h2>

      {CATEGORIES.map(cat => {
        const items = PRODUCTS.filter(p => p.category === cat.key);
        return (
          <div key={cat.key}>
            {stripe}
            <h3 style={{
              fontFamily: 'Helvetica, sans-serif',
              fontSize: 18,
              fontWeight: 400,
              letterSpacing: 1,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              color: '#1a1a1a',
              margin: '24px 24px 12px',
            }}>
              {cat.title[0]}<br />{cat.title[1]}
            </h3>
            <div style={{
              display: 'flex',
              gap: 12,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              padding: '0 24px 16px',
            }}>
              {items.map(product => (
                <Cell
                  key={product.label}
                  img={product.img}
                  label={product.label}
                  style={{ flex: `0 0 ${cat.cellWidth}px`, height, scrollSnapAlign: 'start' }}
                />
              ))}
              {cat.comingSoon && (
                <ComingSoon style={{ flex: '0 0 220px', height, background: ZEBRA }} />
              )}
            </div>
          </div>
        );
      })}
      {stripe}

      <div style={{ padding: '24px 24px 0' }}>
        <button
          onClick={onViewEvents}
          style={{
            fontFamily: 'Helvetica, sans-serif',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            border: 'none',
            background: 'none',
            borderBottom: '2px solid #1a1a1a',
            padding: '0 0 6px',
            color: '#1a1a1a',
            cursor: 'pointer',
          }}
        >
          View Events →
        </button>
      </div>
    </div>
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
  const navigate = useNavigate();

  const height = isMobile ? 220 : 320;

  return (
    <section
      id="services"
      style={{ background: '#f5f3ee', position: 'relative' }}
    >
      {/* Top zebra stripe */}
      <div aria-hidden="true" style={{ height: 16, width: '100%', background: ZEBRA }} />

      {isMobile ? (
        <MobileWorks onViewEvents={() => navigate('/events')} />
      ) : (
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
              Our <span style={{ color: '#6b859c' }}>Works</span>
            </h2>
            <button
              onClick={() => navigate('/events')} 
              style={{
                fontFamily: 'Helvetica, sans-serif', 
                fontSize: 18, 
                letterSpacing: 2,
                textTransform: 'uppercase', 
                border: 'none',
                background: 'none',
                borderBottom: '1px solid #1a1a1a',
                paddingBottom: 2, 
                color: '#1a1a1a', 
                cursor: 'pointer',
              }}
            >
              View Events →
            </button>
          </div>

          {/* ── GRID WITH ZEBRA PATTERN FILLING THE SPACES (GAPS) ── */}
          <div style={{
            background: ZEBRA,
            padding: 12,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 12,
            border: '3px solid #1a1a1a',
          }}>
            {PRODUCTS.map((product, index) => (
              <Cell 
                key={index} 
                img={product.img} 
                label={product.label} 
                style={{ height: height }} 
              />
            ))}

            {/* Row 4, Column 2: Transparent cell framed with black border so underlying zebra gap background shows continuously */}
            <div style={{
              height: height,
              border: '3px solid #1a1a1a',
              background: 'transparent',
            }} />

            {/* Row 4, Column 3: More Coming Soon Box */}
            <ComingSoon style={{ height: height }} />
          </div>

        </div>
      </div>
      )}
    </section>
  );
};

export default ProductGrid;