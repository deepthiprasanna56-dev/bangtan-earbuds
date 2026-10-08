import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, ShieldCheck, Globe, Gem, Activity, Compass } from 'lucide-react';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';

export default function About() {
  const milestones = [
    {
      year: '2024',
      title: 'The Seoul Cleanroom Genesis',
      desc: 'Founded by acoustic physicists and mastering engineers dissatisfied with plastic consumer earbuds.'
    },
    {
      year: '2025',
      title: 'Breakthrough Beryllium Diaphragm',
      desc: 'Patented our hybrid dual-chamber acoustic lens, achieving zero measurable harmonic distortion at 100dB.'
    },
    {
      year: '2026',
      title: 'Global Audiophile Standard',
      desc: 'Adopted by Grammy-winning producers and luxury audio connoisseurs across 42 countries.'
    }
  ];

  const materials = [
    {
      title: 'Aerospace Grade 5 Titanium',
      desc: 'Precision CNC-milled from solid billets to dampen unwanted structural resonance.',
      icon: Gem
    },
    {
      title: 'Hand-Polished Chrome Stem',
      desc: 'Mirror finish treated with diamond-like carbon (DLC) for everlasting scratch resistance.',
      icon: Compass
    },
    {
      title: 'Liquid Bio-Silicone Tips',
      desc: 'Medical-grade hypoallergenic silicone that molds to your unique body temperature.',
      icon: Activity
    }
  ];

  return (
    <div className="bg-[#07070b] text-white pt-20 pb-24 overflow-hidden">
      
      {/* Hero Strip */}
      <section className="relative py-20 border-b border-purple-900/20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-purple-500/20 text-xs text-primary-light uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>The Acoustic Manifesto</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight uppercase">
            Sound is not just heard. <br />
            <span className="text-gradient">It is physically felt.</span>
          </h1>

          <p className="text-base sm:text-lg text-chrome-dark max-w-2xl mx-auto leading-relaxed">
            BANGTAN AUDIO exists to eliminate the boundary between the artist&apos;s recording console and the listener&apos;s soul. Every curve is tuned for acoustic honesty.
          </p>
        </div>
      </section>

      {/* Brand Philosophy: 2 Column */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary-light font-mono font-bold">
              PHILOSOPHY 01 / OBSESSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight uppercase">
              The Architecture of Silence.
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Mass-market earphones rely on heavy digital equalizers to artificially inflate muddy bass. BANGTAN begins where others stop: with pure physical acoustics.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              We machine our acoustic chambers with microscopic tolerances measured in microns. By treating the physical airflow inside your ear before any digital signal touches the driver, our audio remains breath-takingly natural, crisp, and tactile.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-3xl font-extrabold text-white font-display">0.05%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Total Harmonic Distortion</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white font-display">64 kHz</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Upper Frequency Ceiling</div>
              </div>
            </div>
          </div>

          {/* Atmospheric Imagery */}
          <div className="relative rounded-3xl overflow-hidden glass-strong border border-purple-500/25 aspect-[4/3] shadow-2xl">
            <EarbudsCanvas3D
              colorHex="#7c3aed"
              interactive={false}
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <span className="text-xs font-mono uppercase tracking-widest text-primary-light">
                FIG. 04 — PRECISION ANECHOIC CHAMBER TESTING, SEOUL
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Materials Engineering Bento */}
      <section className="py-20 bg-[#090912] border-y border-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-primary-light font-mono font-bold">
              METALLURGY & CRAFTSMANSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
              Materials Chosen for Acoustic Resonance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materials.map((mat, i) => {
              const Icon = mat.icon;
              return (
                <div key={i} className="p-8 rounded-3xl glass border border-purple-500/20 space-y-4">
                  <div className="p-3 w-fit rounded-2xl bg-purple-950/60 text-primary-light border border-purple-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display">{mat.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{mat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary-light font-mono font-bold">
            TIMELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
            The Pursuit of Acoustic Perfection
          </h2>
        </div>

        <div className="space-y-6">
          {milestones.map((ms, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-strong border border-purple-500/20 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-primary font-display font-mono shrink-0">
                {ms.year}
              </span>
              <div className="border-l border-white/10 sm:pl-6 space-y-1">
                <h4 className="text-lg font-bold font-display">{ms.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
