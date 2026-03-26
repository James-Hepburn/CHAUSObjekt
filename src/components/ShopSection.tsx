import React, { useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { GiftBox as GiftBoxType } from '../types.ts';
import bottomGiftBoxImg from '../assets/BottomGiftBox.png';
import topGiftBoxImg from '../assets/TopGiftBox.png';

// ─── Colour palettes ──────────────────────────────────────────────────────────
const CONFETTI_COLORS = [
  '#cdc6b9', '#6b859c', '#a7d3cf',
  '#c8a96f', '#e9d7a4', '#1a1a1a', '#f5f3ee',
];

// ─── Image-based animated gift box ───────────────────────────────────────────
// BottomGiftBox.png = static body; TopGiftBox.png (lid + bow) shakes then flies off.
const AnimatedGiftBox: React.FC<{ onLidDone?: () => void; play: boolean }> = ({ onLidDone, play }) => {
  const lidCtrl = useAnimation();
  const hasPlayed = useRef(false);
  const [lidVisible, setLidVisible] = React.useState(true);

  React.useEffect(() => {
    if (!play || hasPlayed.current) return;
    hasPlayed.current = true;
    const run = async () => {
      // Shake
      await lidCtrl.start({ x: [0, -7, 7, -5, 5, -2, 2, 0], transition: { duration: 0.45, ease: 'easeInOut' } });
      // Fly off
      lidCtrl.start({ y: -340, rotate: -10, opacity: 0, transition: { duration: 0.7, ease: [0.45, 0, 0.55, 1] } });
      await new Promise(r => setTimeout(r, 200));
      onLidDone?.();
      await new Promise(r => setTimeout(r, 700));
      setLidVisible(false);
    };
    run();
  }, [play]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: 120,
        // Height is driven by the bottom image
      }}
    >
      {/* Static body */}
      <img
        src={bottomGiftBoxImg}
        alt=""
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* Animated lid — absolutely positioned over the body */}
      {lidVisible && (
        <motion.img
          src={topGiftBoxImg}
          alt=""
          animate={lidCtrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            display: 'block',
            // Pivot from bottom-centre so the lid lifts naturally off the body
            originX: '50%',
            originY: '100%',
          }}
        />
      )}
    </div>
  );
};

// ─── Single interactive gift box with confetti ────────────────────────────────
interface ConfettiPiece { id: number; left: string; size: number; color: string; x: number; y: number; rotate: number; delay: number; }

interface GiftBoxInteractiveProps {
  box: GiftBoxType;
  revealed: boolean;
  disabled: boolean;
  onReveal: (id: number) => void;
}

const GiftBoxInteractive: React.FC<GiftBoxInteractiveProps> = ({ box, revealed, disabled, onReveal }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [playAnim, setPlayAnim] = useState(false);

  const handleReveal = () => {
    if (revealed || disabled) return;
    setPlayAnim(true);
  };

  const handleLidDone = () => {
    setConfetti(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${25 + Math.random() * 50}%`,
        size: Math.random() * 9 + 5,
        delay: Math.random() * 0.3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        x: (Math.random() - 0.5) * 180,
        y: -Math.random() * 160 - 40,
        rotate: Math.random() * 540 - 270,
      }))
    );
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
          position: 'relative',
          opacity: disabled ? 0.3 : 1,
          cursor: disabled ? 'not-allowed' : revealed ? 'default' : 'pointer',
          transition: 'opacity 0.4s ease',
          pointerEvents: disabled ? 'none' : 'auto',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        {/* Confetti burst */}
        {confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
            animate={{ opacity: [1, 0.9, 0], y: p.y, x: p.x, rotate: p.rotate }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: p.delay }}
            style={{
              position: 'absolute',
              top: '40%',
              left: p.left,
              width: p.size,
              height: p.size * 0.5,
              backgroundColor: p.color,
              borderRadius: 2,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />
        ))}
        <AnimatedGiftBox play={playAnim} onLidDone={handleLidDone} />
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="gift-interactive__reveal gift-interactive__reveal--visible"
            aria-live="polite"
          >
            <p className="gift-interactive__reveal-label">Your discount code</p>
            <p className="gift-interactive__reveal-code">{box.code}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Discounts ────────────────────────────────────────────────────────────────
const DISCOUNTS = ['HAUS10', 'OBJEKT15', 'CULTURE20'];
const shuffled = [...DISCOUNTS].sort(() => Math.random() - 0.5);
const GIFT_BOXES: GiftBoxType[] = [
  { id: 0, code: shuffled[0] },
  { id: 1, code: shuffled[1] },
  { id: 2, code: shuffled[2] },
];

// ─── Shop Section ─────────────────────────────────────────────────────────────
const ShopSection: React.FC = () => {
  const [revealedId, setRevealedId] = useState<number | null>(null);

  return (
    <section
      id="shop"
      className="shop-section"
      aria-label="Shop our collection"
      style={{ display: 'flex', flexDirection: 'column', padding: 0, margin: 0 }}
    >
      {/* Stripe — at absolute top edge, no gap */}
      <div
        aria-hidden="true"
        style={{
          height: 16,
          width: '100%',
          flexShrink: 0,
          background: 'repeating-linear-gradient(-45deg,#1a1a1a 0,#1a1a1a 10px,#f5f3ee 10px,#f5f3ee 20px)',
        }}
      />

      <div className="container shop-section__inner" style={{ flex: 1 }}>
        <p className="section-eyebrow" style={{ marginTop: 25, fontSize: '1em'}}>Coming Soon</p>

        <h2 className="section-title">
          Shop Our{' '}
          <span className="text-accent">Collection</span>
        </h2>

        <p className="shop-section__body">
          Click a gift below to reveal a surprise discount code you can use
          on future orders once our shop opens!
        </p>

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

      {/* Stripe — at absolute bottom edge, no gap */}
      <div
        aria-hidden="true"
        style={{
          height: 16,
          width: '100%',
          flexShrink: 0,
          background: 'repeating-linear-gradient(-45deg,#1a1a1a 0,#1a1a1a 10px,#f5f3ee 10px,#f5f3ee 20px)',
        }}
      />
    </section>
  );
};

export default ShopSection;