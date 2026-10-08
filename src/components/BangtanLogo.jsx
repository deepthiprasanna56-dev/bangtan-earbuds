import React from 'react';

export default function BangtanLogo({ className = "w-6 h-6", glow = false }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${glow ? 'filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`}
      fill="currentColor"
    >
      {/* Left Door */}
      <polygon points="24,16 46,24 46,76 24,84" />
      {/* Right Door */}
      <polygon points="54,24 76,16 76,84 54,76" />
    </svg>
  );
}
