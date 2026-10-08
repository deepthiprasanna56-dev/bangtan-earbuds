import React from 'react';
import BangtanLogo from './BangtanLogo';

export default function BangtanProductStamp({ className = '' }) {
  return (
    <span className={`pointer-events-none absolute bottom-2 left-2 z-10 inline-flex items-center gap-1.5 border border-violet-300/25 bg-black/75 px-1.5 py-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-sm ${className}`}>
      <BangtanLogo className="h-3 w-3 text-violet-300" />
      <span>BANGTAN</span>
    </span>
  );
}
