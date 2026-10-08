import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  Sliders,
  Activity,
  Headphones,
  Compass,
  Cpu,
  Radio,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { products } from '../data/products';

export default function SoundExperience() {
  const [activeMode, setActiveMode] = useState('spatial'); // 'anc', 'spatial', 'transparency', 'hifi'
  const [selectedEqBand, setSelectedEqBand] = useState(0);

  const flagship = products[0];

  const modes = [
    {
      id: 'spatial',
      label: '360° Spatial Audio',
      icon: Compass,
      tag: 'IMMERSIVE HOLOGRAPHY',
      desc: 'Binaural dynamic head-tracking places instruments in 3D spheres around your head. Experience stadium scale sound.'
    },
    {
      id: 'anc',
      label: 'Ultra -48dB ANC',
      icon: Headphones,
      tag: 'ABSOLUTE SILENCE',
      desc: 'Dual acoustic microphones calculate inverted waveforms 40,000 times/sec to erase aircraft engines and urban commotion.'
    },
    {
      id: 'transparency',
      label: 'Acoustic Transparency',
      icon: Radio,
      tag: 'NATURAL PASSTHROUGH',
      desc: 'Natural, un-amplified speech pass-through. Converse with baristas and colleagues without ever removing your earbuds.'
    },
    {
      id: 'hifi',
      label: 'Pure LDAC Lossless',
      icon: Activity,
      tag: '24-BIT / 192KHZ',
      desc: 'Bit-perfect wireless transmission streaming up to 990 kbps. Every cymbal decay and acoustic string scrape remains intact.'
    }
  ];

  return (
    <section id="sound-experience" className="relative py-28 bg-[#09090f] overflow-hidden border-t border-purple-900/20">
      {/* Background Lighting Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-purple-700/10 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-purple-500/20 text-xs text-primary-light uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Acoustic Engineering</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-display">
            Sculpted by Science. <span className="text-gradient">Felt by Soul.</span>
          </h2>
          <p className="text-base sm:text-lg text-chrome-dark">
            Inside the titanium unibody lies an uncompromising acoustic chamber designed in collaboration with world-class mastering engineers.
          </p>
        </div>

        {/* Interactive Soundstage Mode Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Mode Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isCurrent = activeMode === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isCurrent
                      ? 'bg-purple-950/40 border-primary shadow-[0_0_25px_rgba(139,92,246,0.25)] translate-x-2'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isCurrent ? 'bg-primary text-white shadow-lg shadow-purple-500/40' : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest text-primary-light font-semibold uppercase">
                        {mode.tag}
                      </div>
                      <h4 className="text-lg font-bold text-white font-display">{mode.label}</h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-sm text-gray-400 pl-12 leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Soundstage Visualizer Display */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-strong border border-purple-500/30 relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold">
                    Realtime Soundstage Simulator
                  </span>
                </div>
                <span className="text-xs font-mono text-primary-light bg-purple-900/40 px-3 py-1 rounded-full border border-purple-500/20">
                  MODE: {activeMode.toUpperCase()}
                </span>
              </div>

              {/* Dynamic Sound Wave Frequency Visualizer Bars */}
              <div className="py-12 flex items-center justify-center gap-1.5 sm:gap-2 h-44 overflow-hidden">
                {[45, 68, 92, 35, 80, 100, 60, 42, 85, 95, 70, 50, 90, 75, 40, 88, 65, 95, 80, 55, 30, 82, 94, 60].map(
                  (val, idx) => {
                    const dynamicHeight = activeMode === 'anc' ? Math.max(12, val * 0.25) : activeMode === 'spatial' ? val : val * 0.85;
                    return (
                      <motion.div
                        key={idx}
                        animate={{
                          height: [`${dynamicHeight * 0.4}%`, `${dynamicHeight}%`, `${dynamicHeight * 0.6}%`],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9 + (idx % 5) * 0.2,
                          ease: "easeInOut"
                        }}
                        className={`w-1.5 sm:w-2.5 rounded-full ${
                          idx % 3 === 0
                            ? 'bg-gradient-to-t from-primary to-accent'
                            : 'bg-gradient-to-t from-purple-900 to-primary-light'
                        }`}
                        style={{ height: `${dynamicHeight}%` }}
                      />
                    );
                  }
                )}
              </div>

              {/* Frequency Curve Points */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>20Hz SUB-BASS</span>
                  <span>1kHz HARMONICS</span>
                  <span>40kHz AIR & SPARKLE</span>
                </div>
                
                {/* Acoustic Specifications Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Total THD</span>
                    <span className="text-sm font-bold text-white font-mono">&lt; 0.05%</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Latency</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">28ms</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bitrate</span>
                    <span className="text-sm font-bold text-primary-light font-mono">990 kbps</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Dynamic Range</span>
                    <span className="text-sm font-bold text-white font-mono">128 dB</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Exploded Engineering Architecture Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl glass border border-purple-500/20 relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <div className="p-3 w-fit rounded-2xl bg-purple-900/40 text-primary-light mb-6 border border-purple-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Acoustic Neuro-Chip</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Custom dual-core DSP running proprietary neural models that tailor acoustic equalization to the microscopic shape of your ear canal.
            </p>
            <div className="text-xs font-mono text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 40,000 Realtime Calibrations/Sec
            </div>
          </div>

          <div className="p-8 rounded-3xl glass border border-purple-500/20 relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <div className="p-3 w-fit rounded-2xl bg-purple-900/40 text-primary-light mb-6 border border-purple-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Beryllium Diaphragm</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Rigid yet featherlight rare beryllium composite prevents driver deformation under heavy transient loads, ensuring zero muddying.
            </p>
            <div className="text-xs font-mono text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 11mm Custom Planar Hybrid
            </div>
          </div>

          <div className="p-8 rounded-3xl glass border border-purple-500/20 relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <div className="p-3 w-fit rounded-2xl bg-purple-900/40 text-primary-light mb-6 border border-purple-500/30">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Acoustic Air Vents</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Laser-micro-perforated stainless steel equalizes air pressure between inner and outer ear, eradicating occlusion pressure fatigue.
            </p>
            <div className="text-xs font-mono text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Fatigue-Free All-Day Wear
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
