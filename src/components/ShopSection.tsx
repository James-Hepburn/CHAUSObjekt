import React, { useState } from 'react';
import GiftBox from './GiftBox';
import { GiftBox as GiftBoxType } from '../types.ts';

// ─── Randomly assign 10, 15, 20 discounts to the three boxes ─────────────────
const DISCOUNTS = ['HAUS10', 'OBJEKT15', 'CULTURE20'];
const shuffled = [...DISCOUNTS].sort(() => Math.random() - 0.5);

const GIFT_BOXES: GiftBoxType[] = [
  { id: 0, code: shuffled[0] },
  { id: 1, code: shuffled[1] },
  { id: 2, code: shuffled[2] },
];

// ─── Single interactive gift box ─────────────────────────────────────────────
interface GiftBoxInteractiveProps {
  box: GiftBoxType;
  revealed: boolean;
  disabled: boolean;
  onReveal: (id: number) => void;
}

const GiftBoxInteractive: React.FC<GiftBoxInteractiveProps> = ({ box, revealed, disabled, onReveal }) => {
  const handleReveal = () => {
    if (revealed || disabled) return;
    onReveal(box.id);
  };

  return (
    <div className="gift-interactive">
      <button
        className={`gift-interactive__btn ${revealed ? 'gift-interactive__btn--revealed' : ''}`}
        onClick={handleReveal}
        aria-label={revealed ? `Discount code: ${box.code}` : 'Click to reveal discount code'}
        aria-pressed={revealed}
        aria-disabled={disabled}
        style={{
          opacity: disabled ? 0.3 : 1,
          cursor: disabled ? 'not-allowed' : revealed ? 'default' : 'pointer',
          transition: 'opacity 0.4s ease',
          pointerEvents: disabled ? 'none' : 'auto',
        }}
      >
        <GiftBox size={120} />
      </button>

      {/* Code reveal */}
      <div
        className={`gift-interactive__reveal ${revealed ? 'gift-interactive__reveal--visible' : ''}`}
        aria-live="polite"
      >
        <p className="gift-interactive__reveal-label">Your discount code</p>
        <p className="gift-interactive__reveal-code">{box.code}</p>
      </div>
    </div>
  );
};

// ─── Shop Section ─────────────────────────────────────────────────────────────
const ShopSection: React.FC = () => {
  const [revealedId, setRevealedId] = useState<number | null>(null);

  return (
    <section id="shop" className="shop-section" aria-label="Shop our collection">
      <div className="stripe-bar" aria-hidden="true" />

      <div className="container shop-section__inner">
        <p className="section-eyebrow" style={{ marginTop: 25 }}>Coming Soon</p>

        <h2 className="section-title">
          Shop Our{' '}
          <span className="text-accent">Collection</span>
        </h2>

        <p className="shop-section__body">
          Click a gift below to reveal a surprise discount code you can use
          on future orders once our shop opens!
        </p>

        {/* Once one box is revealed, the others fade out and lock */}
        <div className="shop-section__boxes" role="list">
          {GIFT_BOXES.map((box) => (
            <div key={box.id} role="listitem">
              <GiftBoxInteractive
                box={box}
                revealed={revealedId === box.id}
                disabled={revealedId !== null && revealedId !== box.id}
                onReveal={(id) => setRevealedId(id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="stripe-bar" aria-hidden="true" />
    </section>
  );
};

export default ShopSection;