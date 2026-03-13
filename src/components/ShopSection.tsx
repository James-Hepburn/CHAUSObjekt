import React, { useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { GiftBox as GiftBoxType } from '../types.ts';

// ─── Colour palettes ──────────────────────────────────────────────────────────
const CONFETTI_COLORS = [
  '#cdc6b9', '#6b859c', '#a7d3cf',
  '#c8a96f', '#e9d7a4', '#1a1a1a', '#f5f3ee',
];

// ─── Animated gift box SVG (self-contained, matches Landing page style) ───────
const AnimatedGiftBox: React.FC<{ onLidDone?: () => void; play: boolean }> = ({ onLidDone, play }) => {
  const lidCtrl = useAnimation();
  const hasPlayed = useRef(false);
  const [lidVisible, setLidVisible] = React.useState(true);

  React.useEffect(() => {
    if (!play || hasPlayed.current) return;
    hasPlayed.current = true;
    const run = async () => {
      await lidCtrl.start({ x: [0, -7, 7, -5, 5, -2, 2, 0], transition: { duration: 0.45, ease: 'easeInOut' } });
      lidCtrl.start({ y: -340, rotate: -10, transition: { duration: 0.7, ease: [0.45, 0, 0.55, 1] } });
      await new Promise(r => setTimeout(r, 200));
      onLidDone?.();
      // After lid has fully flown clear, fade it out
      await new Promise(r => setTimeout(r, 600));
      await lidCtrl.start({ opacity: 0, transition: { duration: 0.25 } });
      setLidVisible(false);
    };
    run();
  }, [play]);

  return (
    <svg viewBox="0 0 240 280" style={{ width: 120, height: 'auto', overflow: 'visible' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sZebraBody" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(-42)">
          <rect width="24" height="24" fill="#f5f3ee"/><rect width="12" height="24" fill="#1a1a1a"/>
        </pattern>
        <pattern id="sZebraLid" patternUnits="userSpaceOnUse" width="18" height="18" patternTransform="rotate(-42)">
          <rect width="18" height="18" fill="#f5f3ee"/><rect width="9" height="18" fill="#1a1a1a"/>
        </pattern>
        <linearGradient id="sGoldRibbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a27b42"/><stop offset="30%" stopColor="#c8a96f"/>
          <stop offset="55%" stopColor="#e9d7a4"/><stop offset="75%" stopColor="#c8a96f"/>
          <stop offset="100%" stopColor="#b89456"/>
        </linearGradient>
        <linearGradient id="sGoldBow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9d7a4"/><stop offset="45%" stopColor="#c8a96f"/>
          <stop offset="100%" stopColor="#a27b42"/>
        </linearGradient>
        <linearGradient id="sGoldWash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9d7a4" stopOpacity="0.18"/><stop offset="100%" stopColor="#a27b42" stopOpacity="0.10"/>
        </linearGradient>
        <linearGradient id="sLidShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id="sBodyShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)"/><stop offset="100%" stopColor="rgba(0,0,0,0.12)"/>
        </linearGradient>
        <clipPath id="sBClip"><rect x="16" y="118" width="208" height="130" rx="8"/></clipPath>
        <clipPath id="sLClip"><rect x="8" y="98" width="224" height="32" rx="5"/></clipPath>
      </defs>

      {/* Box body (static) */}
      <rect x="16" y="118" width="208" height="130" rx="8" fill="#f5f3ee"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#sZebraBody)" clipPath="url(#sBClip)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#sGoldWash)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#sBodyShine)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Vertical ribbon on body */}
      <rect x="106" y="118" width="28" height="130" fill="url(#sGoldRibbon)"/>
      <rect x="114" y="118" width="7" height="130" fill="rgba(255,255,255,0.2)"/>
      {/* Shadow */}
      <rect x="20" y="243" width="200" height="5" rx="3" fill="rgba(0,0,0,0.1)"/>

      {/* Lid + bow (animated) — hidden after fade-out */}
      {lidVisible && <motion.g animate={lidCtrl} style={{ originX: '120px', originY: '109px' }}>
        {/* Left bow */}
        <path d="M120 100 C105 88 72 62 38 58 C20 56 12 70 22 80 C34 92 80 96 120 100Z" fill="url(#sGoldBow)"/>
        <path d="M120 100 C105 88 72 62 38 58 C20 56 12 70 22 80 C34 92 80 96 120 100Z" fill="rgba(0,0,0,0.08)"/>
        <path d="M120 99 C108 90 82 70 55 64 C44 61 36 66 40 72" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Right bow */}
        <path d="M120 100 C135 88 168 62 202 58 C220 56 228 70 218 80 C206 92 160 96 120 100Z" fill="url(#sGoldBow)"/>
        <path d="M120 100 C135 88 168 62 202 58 C220 56 228 70 218 80 C206 92 160 96 120 100Z" fill="rgba(0,0,0,0.08)"/>
        <path d="M120 99 C132 90 158 70 185 64 C196 61 204 66 200 72" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Lid strip */}
        <rect x="8" y="98" width="224" height="32" rx="5" fill="#f5f3ee"/>
        <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#sZebraLid)" clipPath="url(#sLClip)"/>
        <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#sGoldWash)"/>
        <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#sLidShine)"/>
        <rect x="8" y="98" width="224" height="32" rx="5" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>
        {/* Horizontal ribbon on lid */}
        <rect x="8" y="110" width="224" height="12" fill="url(#sGoldRibbon)"/>
        <rect x="8" y="113" width="224" height="4" fill="rgba(255,255,255,0.2)"/>
        {/* Vertical ribbon on lid */}
        <rect x="106" y="98" width="28" height="32" fill="url(#sGoldRibbon)"/>
      </motion.g>}
    </svg>
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