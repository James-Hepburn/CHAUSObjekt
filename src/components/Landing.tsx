import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bottomGiftBoxImg from "../assets/BottomGiftBox.png";
import topGiftBoxImg from "../assets/TopGiftBox.png";

type AnimControls = ReturnType<typeof useAnimation>;
interface ConfettiPiece { id: number; left: string; size: number; color: string; x: number; y: number; rotate: number; delay: number; }
const CONFETTI_COLORS = ["#cdc6b9","#6b859c","#a7d3cf","#1a1a1a","#f5f3ee","#cdc6b9","#a7d3cf"];

// ─── Image-based gift box ─────────────────────────────────────────────────────
// BottomGiftBox.png is the static body; TopGiftBox.png (lid + bow) animates.
// Both images share the same intrinsic aspect ratio from the client's assets so
// we size them to the same rendered width and stack them with absolute positioning.
// The top image origin is set to its bottom-centre so it "lifts off" naturally.

const GiftBoxFull = ({ lidControls }: { lidControls: AnimControls }) => {
  const BOX_WIDTH = "clamp(220px, 30vw, 380px)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: BOX_WIDTH,
        // The bottom image drives the container height naturally
      }}
    >
      {/* Static body */}
      <img
        src={bottomGiftBoxImg}
        alt=""
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* Animated lid — absolutely positioned over the body */}
      <motion.img
        src={topGiftBoxImg}
        alt=""
        animate={lidControls}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          display: "block",
          // Rotate/translate origin at the bottom-centre of the lid image
          originX: "50%",
          originY: "100%",
        }}
      />
    </div>
  );
};

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
      // Shake
      await lidCtrl.start({ x: [0, -9, 9, -6, 6, -3, 3, 0], transition: { duration: 0.55, ease: "easeInOut" } });
      // Spawn confetti
      setConfetti(Array.from({ length: 55 }).map((_, i) => ({
        id: i, left: `${35 + Math.random() * 30}%`, size: Math.random() * 12 + 7,
        delay: Math.random() * 0.4, color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        x: (Math.random() - 0.5) * 300, y: -Math.random() * 240 - 60, rotate: Math.random() * 720 - 360,
      })));
      // Lid flies up and fades out
      lidCtrl.start({
        y: -600,
        rotate: -8,
        opacity: 0,
        transition: { duration: 0.85, ease: [0.45, 0, 0.55, 1] },
      });
      promptCtrl.start({ opacity: 0, transition: { duration: 0.25 } });
      await new Promise((r) => setTimeout(r, 400));
      await nameCtrl.start({ opacity: 1, y: 100, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } });
      await mottoCtrl.start({ opacity: 1, y: 130, transition: { duration: 0.6, ease: "easeOut" } });
      setShowSkip(true);
      await new Promise((r) => setTimeout(r, 1800));
      navigate("/home");
    };
    window.addEventListener("scroll", trigger);
    window.addEventListener("click", trigger);
    return () => { window.removeEventListener("scroll", trigger); window.removeEventListener("click", trigger); };
  }, [navigate, lidCtrl, nameCtrl, mottoCtrl, promptCtrl]);

  // Frame thickness
  const F = 28;

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{
      position: "fixed", inset: 0, background: "#f5f3ee",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", zIndex: 9999, cursor: "pointer",
    }}>

      {/* ── Inset zebra picture-frame — four sides, cream interior ── */}
      {/* Top rail */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: F, backgroundImage: "repeating-linear-gradient(-45deg, #1a1a1a 0px, #1a1a1a 10px, #f5f3ee 10px, #f5f3ee 22px)", borderBottom: "2px solid #1a1a1a", zIndex: 0, pointerEvents: "none" }} />
      {/* Bottom rail */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: F, backgroundImage: "repeating-linear-gradient(-45deg, #1a1a1a 0px, #1a1a1a 10px, #f5f3ee 10px, #f5f3ee 22px)", borderTop: "2px solid #1a1a1a", zIndex: 0, pointerEvents: "none" }} />
      {/* Left rail */}
      <div aria-hidden="true" style={{ position: "absolute", top: F, bottom: F, left: 0, width: F, backgroundImage: "repeating-linear-gradient(-45deg, #1a1a1a 0px, #1a1a1a 10px, #f5f3ee 10px, #f5f3ee 22px)", borderRight: "2px solid #1a1a1a", zIndex: 0, pointerEvents: "none" }} />
      {/* Right rail */}
      <div aria-hidden="true" style={{ position: "absolute", top: F, bottom: F, right: 0, width: F, backgroundImage: "repeating-linear-gradient(-45deg, #1a1a1a 0px, #1a1a1a 10px, #f5f3ee 10px, #f5f3ee 22px)", borderLeft: "2px solid #1a1a1a", zIndex: 0, pointerEvents: "none" }} />

      {/* Grain */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.3 }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4rem", marginTop: "4rem" }}>
        {confetti.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
            animate={{ opacity: [1, 0.8, 0], y: p.y, x: p.x, rotate: p.rotate }}
            transition={{ duration: 2.2, ease: "easeOut", delay: p.delay }}
            style={{ position: "absolute", top: "55%", left: p.left, width: p.size, height: p.size * 0.55, backgroundColor: p.color, borderRadius: 2, pointerEvents: "none", zIndex: 20 }} />
        ))}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={nameCtrl}
          style={{ marginBottom: "0.6rem", textAlign: "center", pointerEvents: "none", lineHeight: 1 }}>
          <span style={{ fontFamily: "'Helvetica', sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 5rem)", textTransform: "uppercase", letterSpacing: "0.06em", color: "#1a1a1a" }}>C.HAUS </span>
          <span style={{ fontFamily: "'Helvetica', sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 5rem)", textTransform: "uppercase", letterSpacing: "0.06em", color: "#6b859c" }}>Objekt</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={mottoCtrl}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", marginBottom: "2rem", pointerEvents: "none", position: "relative", zIndex: 20, padding: "0.6rem 1.4rem" }}>
          <span style={{ fontFamily: "'Helvetica', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.3rem)", textTransform: "uppercase", letterSpacing: "0.18em", color: "#999" }}>Timeless Culture</span>
          <span style={{ fontFamily: "'Helvetica', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.3rem)", textTransform: "uppercase", letterSpacing: "0.18em", color: "#6b859c" }}>Gifts to Give</span>
          <span style={{ fontFamily: "'Helvetica', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.3rem)", textTransform: "uppercase", letterSpacing: "0.18em", color: "#1a1a1a" }}>Objekts to Keep</span>
        </motion.div>
        <GiftBoxFull lidControls={lidCtrl} />
      </div>

      <motion.div animate={promptCtrl} style={{ position: "absolute", bottom: "clamp(50px, 7vh, 90px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none", zIndex: 10 }}>
        <span style={{ fontFamily: "'Helvetica', sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#1a1a1a" }}>Scroll or Click to Open</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ fontSize: 16, color: "#1a1a1a" }}>↓</motion.span>
      </motion.div>

      <button onClick={() => navigate("/home")} style={{ position: "fixed", bottom: 36, right: 36, zIndex: 9999, padding: "0.5rem 1rem", fontFamily: "'Helvetica', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", background: "transparent", border: "1px solid #cdc6b9", borderRadius: 3, cursor: "pointer", opacity: showSkip ? 1 : 0, transition: "opacity 0.5s ease, border-color 0.2s ease", pointerEvents: showSkip ? "auto" : "none" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6b859c")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#cdc6b9")}>Skip →</button>
    </motion.div>
  );
}