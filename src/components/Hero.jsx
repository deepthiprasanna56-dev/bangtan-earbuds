import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, Shield, BatteryCharging, Droplets, ArrowRight } from 'lucide-react';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function Hero() {
  const { addToCart, isPlayingBeat } = useCart();
  const flagship = products[0]; // Purple Dreams

  const features = [
    {
      icon: Volume2,
      title: "Hi-Fi Sound",
      desc: "Crystal clear audio"
    },
    {
      icon: Shield,
      title: "Active Noise Cancellation",
      desc: "Block the world, keep the music"
    },
    {
      icon: BatteryCharging,
      title: "Long Battery Life",
      desc: "Up to 36 hours"
    },
    {
      icon: Droplets,
      title: "Water Resistant",
      desc: "IPX5 certified"
    }
  ];

  return (
    <section className="relative min-h-[calc(100svh-5rem)] bg-[#07070b] pt-24 pb-10 flex flex-col justify-between overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(ellipse_at_72%_42%,rgba(91,33,182,0.22),transparent_38%),linear-gradient(115deg,transparent_35%,rgba(124,58,237,0.06)_63%,transparent_78%)]">
        <div className="cinematic-vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07070b] to-transparent" />
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-10 max-w-7xl relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-0 items-center">
          
          {/* Left Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 lg:col-span-5 space-y-5 text-left py-8"
          >
            {/* Tag Badge */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-purple-500/20 text-[11px] font-semibold tracking-[0.2em] uppercase text-purple-300">
              <span className="mr-2 inline-block h-px w-7 align-middle bg-violet-400" /> BANGTAN AUDIO · SEOUL
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-[1.02] tracking-normal">
              BANGTAN<br />
              <span className="text-gradient">AUDIO</span>
            </h1>

            {/* Subtitle */}
            <p className="font-display text-xl sm:text-2xl text-white/90 tracking-normal">
              Feel every beat<span className="text-violet-300">.</span>
            </p>
            <p className="text-sm text-gray-400 max-w-sm leading-7">
              Precision-tuned wireless sound, sculpted in a signature midnight violet finish.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => addToCart(flagship, flagship.colors[0], 1)}
                className="px-7 py-3.5 bg-violet-500 hover:bg-violet-400 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_8px_32px_rgba(124,58,237,0.24)] btn-shine"
              >
                Shop Purple Dreams <ArrowRight className="w-4 h-4" />
              </button>
              
              <Link
                to="/products"
                className="px-7 py-3.5 border border-white/15 hover:border-violet-300/60 text-white font-medium text-xs tracking-wider uppercase transition-all hover:bg-white/[0.04]"
              >
                Explore
              </Link>
            </div>
          </motion.div>

          {/* Right Hero: Real 3D Bangtan Earbuds Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 lg:order-2 lg:col-span-7 relative flex items-center justify-center min-h-[300px] sm:min-h-[390px] lg:min-h-[570px]"
          >
            <EarbudsCanvas3D
              colorHex="#7c3aed"
              isBeating={isPlayingBeat}
              autoRotate={true}
              interactive={true}
              className="w-full h-[320px] sm:h-[420px] lg:h-[570px]"
            />
            <div className="pointer-events-none absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-white/10 pt-3 text-[9px] uppercase tracking-[0.2em] text-gray-400">
              <span>01 / Purple Dreams</span>
              <span>₹ {flagship.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="pointer-events-none absolute right-5 top-12 hidden sm:block text-right text-[9px] uppercase tracking-[0.2em] text-gray-400">
              <span className="block text-violet-300">36 hours</span>
              Immersive listening
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4 Feature Badges Strip (Under Hero, matching reference) */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 max-w-7xl relative z-10 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-white/10">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} className="flex items-center gap-3 py-2">
                <Icon className="w-4 h-4 text-violet-300 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{feat.title}</h4>
                  <p className="text-[11px] text-gray-400">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
