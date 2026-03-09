import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

type AnimControls = ReturnType<typeof useAnimation>;

interface ConfettiPiece {
  id: number;
  left: string;
  size: number;
  color: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
}

const CONFETTI_COLORS = ["#e63946", "#f5f3ee", "#aaaaaa", "#cc2233", "#ffffff"];

// ─── Single unified SVG — lid+bow is a <g> we animate away ──────────────────
// viewBox 0 0 300 340
// Box body:  x=20 y=160 w=260 h=160 rx=8   (bottom section)
// Lid strip: x=10 y=130 w=280 h=38  rx=6   (sits on top of body)
// Bow:       centred at x=150, sits above lid
const GiftBoxFull = ({ lidControls }: { lidControls: AnimControls }) => (
  <svg
    viewBox="0 0 300 340"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "clamp(220px, 30vw, 380px)", height: "auto", overflow: "visible" }}
  >
    <defs>
      {/* Zebra body */}
      <pattern id="zbBody" patternUnits="userSpaceOnUse" width="28" height="28" patternTransform="rotate(-42)">
        <rect width="28" height="28" fill="#1a1a1a"/>
        <rect width="14" height="28" fill="#2a2a2a"/>
      </pattern>
      {/* Zebra lid */}
      <pattern id="zbLid" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(-42)">
        <rect width="20" height="20" fill="#111"/>
        <rect width="10" height="20" fill="#1e1e1e"/>
      </pattern>
      {/* Red ribbon / bow */}
      <pattern id="zbBow" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(-45)">
        <rect width="12" height="12" fill="#c81d2b"/>
        <rect width="6" height="12" fill="#e63946"/>
      </pattern>

      <linearGradient id="bodySheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.06)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,0.28)"/>
      </linearGradient>
      <linearGradient id="lidSheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
      </linearGradient>

      <clipPath id="cpBody">
        <rect x="20" y="160" width="260" height="160" rx="8"/>
      </clipPath>
      <clipPath id="cpLid">
        <rect x="10" y="130" width="280" height="38" rx="6"/>
      </clipPath>
    </defs>

    {/* ── BOX BODY (static) ── */}
    <rect x="20" y="160" width="260" height="160" rx="8" fill="#1a1a1a"/>
    <rect x="20" y="160" width="260" height="160" rx="8" fill="url(#zbBody)" clipPath="url(#cpBody)"/>
    <rect x="20" y="160" width="260" height="160" rx="8" fill="url(#bodySheen)"/>

    {/* Vertical ribbon on body */}
    <rect x="133" y="160" width="34" height="160" fill="url(#zbBow)" opacity="0.9"/>
    <rect x="141" y="160" width="9" height="160" fill="rgba(255,255,255,0.07)"/>

    {/* Bottom shadow */}
    <rect x="30" y="315" width="240" height="6" rx="3" fill="rgba(0,0,0,0.3)"/>

    {/* ── LID + BOW (animated group) ── */}
    <motion.g animate={lidControls} style={{ originX: "150px", originY: "149px" }}>
      {/* Left bow loop — drawn first so lid sits on top */}
      <path
        d="M150 135 C132 120 95 93 58 89 C38 87 30 101 42 111 C56 122 108 125 150 135Z"
        fill="url(#zbBow)"
      />
      <path
        d="M150 135 C132 120 95 93 58 89 C38 87 30 101 42 111 C56 122 108 125 150 135Z"
        fill="rgba(0,0,0,0.15)"
      />
      <path
        d="M150 134 C136 123 104 101 72 95 C60 92 52 97 56 103"
        fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round"
      />

      {/* Right bow loop — drawn first so lid sits on top */}
      <path
        d="M150 135 C168 120 205 93 242 89 C262 87 270 101 258 111 C244 122 192 125 150 135Z"
        fill="url(#zbBow)"
      />
      <path
        d="M150 135 C168 120 205 93 242 89 C262 87 270 101 258 111 C244 122 192 125 150 135Z"
        fill="rgba(0,0,0,0.15)"
      />
      <path
        d="M150 134 C164 123 196 101 228 95 C240 92 248 97 244 103"
        fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeLinecap="round"
      />

      {/* Lid strip — drawn after bows so it covers their base */}
      <rect x="10" y="130" width="280" height="38" rx="6" fill="#111"/>
      <rect x="10" y="130" width="280" height="38" rx="6" fill="url(#zbLid)" clipPath="url(#cpLid)"/>
      <rect x="10" y="130" width="280" height="38" rx="6" fill="url(#lidSheen)"/>

      {/* Horizontal ribbon on lid */}
      <rect x="10" y="142" width="280" height="14" fill="url(#zbBow)" opacity="0.9"/>
      <rect x="10" y="146" width="280" height="5" fill="rgba(255,255,255,0.07)"/>

      {/* Vertical ribbon through lid */}
      <rect x="133" y="130" width="34" height="38" fill="url(#zbBow)" opacity="0.95"/>


    </motion.g>
  </svg>
);

// ─── Landing page ─────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();

  const lidCtrl: AnimControls = useAnimation();
  const nameCtrl: AnimControls = useAnimation();
  const mottoCtrl: AnimControls = useAnimation();
  const promptCtrl: AnimControls = useAnimation();

  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showSkip, setShowSkip] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const trigger = async () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;

      window.removeEventListener("scroll", trigger);
      window.removeEventListener("click", trigger);

      // 1. Shake
      await lidCtrl.start({
        x: [0, -9, 9, -6, 6, -3, 3, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      });

      // 2. Spawn confetti
      setConfetti(
        Array.from({ length: 55 }).map((_, i) => ({
          id: i,
          left: `${20 + Math.random() * 60}%`,
          size: Math.random() * 12 + 7,
          delay: Math.random() * 0.4,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          x: (Math.random() - 0.5) * 300,
          y: -Math.random() * 240 - 60,
          rotate: Math.random() * 720 - 360,
        }))
      );

      // 3. Lid + bow fly upward
      lidCtrl.start({
        y: -600,
        rotate: -8,
        transition: { duration: 0.85, ease: [0.45, 0, 0.55, 1] },
      });

      // 4. Fade prompt
      promptCtrl.start({ opacity: 0, transition: { duration: 0.25 } });

      // 5. Name rises
      await new Promise((r) => setTimeout(r, 400));
      await nameCtrl.start({
        opacity: 1,
        y: 100,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      });

      // 6. Motto fades in
      await mottoCtrl.start({
        opacity: 1,
        y: 130,
        transition: { duration: 0.6, ease: "easeOut" },
      });

      setShowSkip(true);

      // 7. Navigate after hold
      await new Promise((r) => setTimeout(r, 1800));
      navigate("/home");
    };

    window.addEventListener("scroll", trigger);
    window.addEventListener("click", trigger);
    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("click", trigger);
    };
  }, [navigate, lidCtrl, nameCtrl, mottoCtrl, promptCtrl]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        cursor: "pointer",
      }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          opacity: 0.45,
        }}
      />

      {/* Top stripe */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 16,
        background: "repeating-linear-gradient(-45deg,#e63946 0,#e63946 10px,#0d0d0d 10px,#0d0d0d 20px)",
      }}/>

      {/* ── Main composition ── */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "9rem" }}>

        {/* Confetti — positioned relative to box */}
        {confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
            animate={{ opacity: [1, 0.8, 0], y: p.y, x: p.x, rotate: p.rotate }}
            transition={{ duration: 2.2, ease: "easeOut", delay: p.delay }}
            style={{
              position: "absolute",
              top: "63%",
              left: p.left,
              width: p.size,
              height: p.size * 0.55,
              backgroundColor: p.color,
              borderRadius: 2,
              pointerEvents: "none",
              zIndex: 20,
            }}
          />
        ))}

        {/* Name — starts hidden, rises up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={nameCtrl}
          style={{
            marginBottom: "0.6rem",
            textAlign: "center",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#f5f3ee",
          }}>
            C.HAUS{" "}
          </span>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#e63946",
          }}>
            Objekt
          </span>
        </motion.div>

        {/* Motto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mottoCtrl}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
            marginBottom: "2rem",
            pointerEvents: "none",
          }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(0.75rem, 1.8vw, 1.1rem)",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#666",
          }}>
            Timeless Culture
          </span>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#e63946",
          }}>
            Gifts to Give
          </span>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#f5f3ee",
          }}>
            Objekts to Keep
          </span>
        </motion.div>

        {/* Gift box — single unified SVG */}
        <GiftBoxFull lidControls={lidCtrl} />
      </div>

      {/* Scroll prompt */}
      <motion.div
        animate={promptCtrl}
        style={{
          position: "absolute",
          bottom: "clamp(50px, 7vh, 90px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#f5f3ee",
        }}>
          Scroll or Click to Open
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ fontSize: 16, color: "#f5f3ee" }}
        >
          ↓
        </motion.span>
      </motion.div>

      {/* Bottom stripe */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 16,
        background: "repeating-linear-gradient(-45deg,#e63946 0,#e63946 10px,#0d0d0d 10px,#0d0d0d 20px)",
      }}/>

      {/* Skip */}
      <button
        onClick={() => navigate("/home")}
        style={{
          position: "fixed",
          bottom: 36,
          right: 36,
          zIndex: 9999,
          padding: "0.5rem 1rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#f5f3ee",
          background: "transparent",
          border: "1px solid #2a2a2a",
          borderRadius: 3,
          cursor: "pointer",
          opacity: showSkip ? 1 : 0,
          transition: "opacity 0.5s ease, border-color 0.2s ease",
          pointerEvents: showSkip ? "auto" : "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e63946")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
      >
        Skip →
      </button>
    </motion.div>
  );
}