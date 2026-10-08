import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MoreThanMusic() {
  return (
    <section className="py-12 bg-[#07070b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Cinematic Purple Banner */}
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-end p-8 sm:p-14 border border-purple-500/20 shadow-2xl">
          
          {/* Background: Atmospheric Purple Sky & Silhouette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#170a2c] via-[#240e42] to-[#120724] z-0">
            {/* Ambient Radial Lights */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#a855f7]/30 to-transparent rounded-full filter blur-[100px]" />
            <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-[#6d28d9]/25 filter blur-[90px]" />
            
            {/* Atmospheric Member Silhouette Banner Graphic */}
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80"
              alt="Bangtan Journey"
              className="w-full h-full object-cover object-center opacity-30 mix-blend-screen filter saturate-150"
            />
            
            {/* Dark gradient vignette over left side */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-black/40 to-black/85" />
          </div>

          {/* Right Text Content */}
          <div className="relative z-10 max-w-md text-left sm:text-right space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display uppercase tracking-tight">
              More Than Music
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              It&apos;s a connection. It&apos;s a journey. It&apos;s Bangtan.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 hover:border-purple-400 text-white text-xs font-semibold uppercase tracking-wider glass hover:bg-white/10 transition-all"
              >
                <span>Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
