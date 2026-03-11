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
        <pattern id="zebraBody" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(-42)">
          <rect width="24" height="24" fill="#f5f3ee"/>
          <rect width="12" height="24" fill="#1a1a1a"/>
        </pattern>
        <pattern id="zebraLid" patternUnits="userSpaceOnUse" width="18" height="18" patternTransform="rotate(-42)">
          <rect width="18" height="18" fill="#f5f3ee"/>
          <rect width="9" height="18" fill="#1a1a1a"/>
        </pattern>
        <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#a27b42"/>
          <stop offset="30%"  stopColor="#c8a96f"/>
          <stop offset="55%"  stopColor="#e9d7a4"/>
          <stop offset="75%"  stopColor="#c8a96f"/>
          <stop offset="100%" stopColor="#b89456"/>
        </linearGradient>
        <linearGradient id="goldBow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#e9d7a4"/>
          <stop offset="45%"  stopColor="#c8a96f"/>
          <stop offset="100%" stopColor="#a27b42"/>
        </linearGradient>
        <linearGradient id="goldWash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#e9d7a4" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#a27b42" stopOpacity="0.10"/>
        </linearGradient>
        <linearGradient id="lidShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id="bodyShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)"/>
        </linearGradient>
        <clipPath id="bodyClip">
          <rect x="16" y="118" width="208" height="130" rx="8"/>
        </clipPath>
        <clipPath id="lidClip">
          <rect x="8" y="98" width="224" height="32" rx="5"/>
        </clipPath>
      </defs>

      {/* Left bow loop */}
      <path d="M120 100 C105 88 72 62 38 58 C20 56 12 70 22 80 C34 92 80 96 120 100Z" fill="url(#goldBow)"/>
      <path d="M120 100 C105 88 72 62 38 58 C20 56 12 70 22 80 C34 92 80 96 120 100Z" fill="rgba(0,0,0,0.08)"/>
      <path d="M120 99 C108 90 82 70 55 64 C44 61 36 66 40 72" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>

      {/* Right bow loop */}
      <path d="M120 100 C135 88 168 62 202 58 C220 56 228 70 218 80 C206 92 160 96 120 100Z" fill="url(#goldBow)"/>
      <path d="M120 100 C135 88 168 62 202 58 C220 56 228 70 218 80 C206 92 160 96 120 100Z" fill="rgba(0,0,0,0.08)"/>
      <path d="M120 99 C132 90 158 70 185 64 C196 61 204 66 200 72" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>

      {/* Box body */}
      <rect x="16" y="118" width="208" height="130" rx="8" fill="#f5f3ee"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#zebraBody)" clipPath="url(#bodyClip)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#goldWash)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="url(#bodyShine)"/>
      <rect x="16" y="118" width="208" height="130" rx="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>

      {/* Lid */}
      <rect x="8" y="98" width="224" height="32" rx="5" fill="#f5f3ee"/>
      <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#zebraLid)" clipPath="url(#lidClip)"/>
      <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#goldWash)"/>
      <rect x="8" y="98" width="224" height="32" rx="5" fill="url(#lidShine)"/>
      <rect x="8" y="98" width="224" height="32" rx="5" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>

      {/* Vertical ribbon */}
      <rect x="106" y="98" width="28" height="150" fill="url(#goldRibbon)"/>
      <rect x="114" y="98" width="7" height="150" fill="rgba(255,255,255,0.2)"/>

      {/* Horizontal ribbon on lid */}
      <rect x="8" y="110" width="224" height="12" fill="url(#goldRibbon)"/>
      <rect x="8" y="113" width="224" height="4" fill="rgba(255,255,255,0.2)"/>

      {/* Bottom shadow */}
      <rect x="20" y="243" width="200" height="5" rx="3" fill="rgba(0,0,0,0.1)"/>
    </svg>
  );
};

export default GiftBox;
