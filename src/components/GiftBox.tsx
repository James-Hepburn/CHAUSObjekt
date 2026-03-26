import React from 'react';
import giftboxImg from '../assets/Giftbox.png';

interface GiftBoxProps {
  size?: string | number;
  large?: boolean;
  className?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({ size = 140, large = false, className }) => {
  const resolvedSize = large ? 'clamp(280px, 36vw, 480px)' : `${size}px`;

  return (
    <img
      src={giftboxImg}
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        width: resolvedSize,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );
};

export default GiftBox;