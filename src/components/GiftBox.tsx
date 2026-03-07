import React from 'react';

interface GiftBoxProps {
  size?: string | number;
  large?: boolean;
  className?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({ size = 140, large = false, className }) => {
  const resolvedSize = large ? 'clamp(280px, 36vw, 480px)' : `${size}px`;

  return (
    <svg
      viewBox="0 0 240 280"
      style={{ width: resolvedSize, height: 'auto', filter: 'none' }}
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Bold zebra stripes — box body */}
        <pattern id="zebraBody" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(-42)">
          <rect width="24" height="24" fill="#1a1a1a"/>
          <rect width="12" height="24" fill="#2e2e2e"/>
        </pattern>

        {/* Tighter zebra — lid */}
        <pattern id="zebraLid" patternUnits="userSpaceOnUse" width="18" height="18" patternTransform="rotate(-42)">
          <rect width="18" height="18" fill="#111"/>
          <rect width="9" height="18" fill="#222"/>
        </pattern>

        {/* Zebra stripes — ribbon & bow */}
        <pattern id="zebraBow" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45)">
          <rect width="10" height="10" fill="#cc2233"/>
          <rect width="5" height="10" fill="#e63946"/>
        </pattern>

        {/* Shine on lid */}
        <linearGradient id="lidShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.13)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* Shine on body */}
        <linearGradient id="bodyShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)"/>
        </linearGradient>

        {/* Clip paths */}
        <clipPath id="bodyClip">
          <rect x="16" y="118" width="208" height="130" rx="8"/>
        </clipPath>
        <clipPath id="lidClip">
          <rect x="8" y="98" width="224" height="32" rx="5"/>
        </clipPath>
        <clipPath id="leftBowClip">
          {/* Left bow loop shape */}
          <path d="M120 100 C100 85 40 55 22 68 C10 76 18 95 40 98 C62 101 100 96 120 100Z"/>
        </clipPath>
        <clipPath id="rightBowClip">
          <path d="M120 100 C140 85 200 55 218 68 C230 76 222 95 200 98 C178 101 140 96 120 100Z"/>
        </clipPath>
      </defs>

      {/* ══ BOW — drawn first so box sits on top ══ */}

      {/* Left bow loop — sweeps from center-top out to upper-left */}
      <path
        d="M120 100 C105 88 72 62 38 58 C20 56 12 70 22 80 C34 92 80 96 120 100Z"
        fill="url(#zebraBow)"
      />
      {/* Left loop shadow edge */}
      <path
        d="M120 100 C105 88 72 62 38 58 C20 56 12 70 22 80 C34 92 80 96 120 100Z"
        fill="rgba(0,0,0,0.18)"
      />
      {/* Left loop inner crease highlight */}
      <path
        d="M120 99 C108 90 82 70 55 64 C44 61 36 66 40 72"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Right bow loop — sweeps from center-top out to upper-right */}
      <path
        d="M120 100 C135 88 168 62 202 58 C220 56 228 70 218 80 C206 92 160 96 120 100Z"
        fill="url(#zebraBow)"
      />
      {/* Right loop shadow edge */}
      <path
        d="M120 100 C135 88 168 62 202 58 C220 56 228 70 218 80 C206 92 160 96 120 100Z"
        fill="rgba(0,0,0,0.18)"
      />
      {/* Right loop inner crease highlight */}
      <path
        d="M120 99 C132 90 158 70 185 64 C196 61 204 66 200 72"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ══ BOX BODY ══ */}
      <rect x="16" y="118" width="208" height="130" rx="8" fill="#1a1a1a"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#zebraBody)" clipPath="url(#bodyClip)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#bodyShine)"/>

      {/* ══ LID ══ */}
      <rect x="8" y="98" width="224" height="32" rx="5" fill="#111"/>
      <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#zebraLid)" clipPath="url(#lidClip)"/>
      <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#lidShine)"/>

      {/* ══ VERTICAL RIBBON ══ */}
      <rect x="106" y="98" width="28" height="150" fill="url(#zebraBow)" opacity="0.95"/>
      <rect x="114" y="98" width="7" height="150" fill="rgba(255,255,255,0.09)"/>

      {/* ══ HORIZONTAL RIBBON on lid ══ */}
      <rect x="8" y="110" width="224" height="12" fill="url(#zebraBow)" opacity="0.92"/>
      <rect x="8" y="113" width="224" height="4" fill="rgba(255,255,255,0.07)"/>

      {/* ══ BOTTOM SHADOW ══ */}
      <rect x="20" y="243" width="200" height="5" rx="3" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
};

export default GiftBox;