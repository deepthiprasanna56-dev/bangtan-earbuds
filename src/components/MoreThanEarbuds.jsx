import React from 'react';
import { Volume2, PhoneCall, Feather, Sparkles, Heart } from 'lucide-react';
import BangtanLogo from './BangtanLogo';

export default function MoreThanEarbuds() {
  const features = [
    {
      icon: Volume2,
      title: "Immersive Sound",
      desc: "Feel every detail"
    },
    {
      icon: PhoneCall,
      title: "Crystal Clear Calls",
      desc: "AI noise reduction"
    },
    {
      icon: Feather,
      title: "All Day Comfort",
      desc: "Lightweight design"
    },
    {
      icon: Sparkles,
      title: "Stylish & Unique",
      desc: "Inspired by Bangtan"
    }
  ];

  return (
    <section className="py-20 bg-[#07070b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            More Than Just Earbuds
          </h2>
          <p className="text-sm text-gray-400 font-light">
            A premium audio experience, inspired by Bangtan.
          </p>
        </div>

        {/* 2-Column Grid: 4 Feature Boxes (Left) + Purple Bangtan Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4 Feature Cards in 2x2 Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-[#0d0d16] border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-center items-center text-center space-y-4 shadow-lg group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Signature Bangtan 7 Hearts Card */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#180c30] via-[#240e44] to-[#120722] border border-purple-500/30 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl min-h-[340px]">
            {/* Ambient Background Aura */}
            <div className="absolute top-1/3 w-48 h-48 bg-[#9333ea]/20 rounded-full filter blur-3xl pointer-events-none" />

            {/* Glowing Bangtan Door Logo */}
            <div className="mb-6 relative z-10 text-white">
              <BangtanLogo className="w-16 h-16 text-purple-300" glow={true} />
            </div>

            {/* Handwritten Script Message matching design */}
            <div className="space-y-2 relative z-10 font-serif italic text-purple-200">
              <p className="text-2xl sm:text-3xl font-light">7 hearts,</p>
              <p className="text-2xl sm:text-3xl font-light">1 sound,</p>
              <p className="text-2xl sm:text-3xl font-normal text-white pt-1">
                BANGTAN <span className="text-pink-400 not-italic">♡</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
