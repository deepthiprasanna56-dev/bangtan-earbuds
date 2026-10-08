import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, PackageOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';

export default function OfficialVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const { isBeatMuted, setBeatMuted, startBeat, stopBeat } = useCart();

  // The player controls the shared audio experience; the case animation remains independent.
  const handlePlayToggle = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    setIsCaseOpen(nextPlaying);
    if (nextPlaying) void startBeat();
    else stopBeat();
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 45 ? 0 : prev + 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="py-16 bg-[#07070b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Cinematic Video Stage Frame */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/8] sm:aspect-[21/9] min-h-[380px] bg-gradient-to-r from-[#120824] via-[#200b3b] to-[#120824] border border-purple-500/25 shadow-2xl flex flex-col justify-between p-6 sm:p-10">
          
          {/* Ambient Purple Cloud & Cinematic Smoke Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-purple-800/30 via-primary/30 to-purple-800/30 filter blur-[100px]" />
            <EarbudsCanvas3D
              colorHex="#7c3aed"
              caseOpen={isCaseOpen}
              interactive={false}
              className="h-full w-full opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
          </div>

          {/* Top Left: Wordmark & Tagline */}
          <div className="relative z-10 space-y-1">
            <div className="text-[11px] font-mono tracking-[0.25em] text-purple-300 uppercase font-semibold">
              BANGTAN
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono">
              THE OFFICIAL EARBUDS
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-white tracking-wide font-serif pt-1">
              Feel Every Beat
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsCaseOpen((open) => !open)}
            className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur transition-colors hover:border-purple-400 hover:bg-purple-950/70 sm:right-10 sm:top-10"
            aria-pressed={isCaseOpen}
          >
            <PackageOpen className="h-3.5 w-3.5" />
            {isCaseOpen ? 'Close case' : 'Open case'}
          </button>

          {/* Center Play Button Overlay */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <button
              onClick={handlePlayToggle}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 hover:bg-[#7c3aed] text-white flex items-center justify-center backdrop-blur-md border border-white/25 hover:border-purple-400 transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(124,58,237,0.5)] group"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
              )}
            </button>
          </div>

          {/* Bottom Video Progress Bar & Controls */}
          <div className="relative z-10 space-y-2">
            {/* Progress line */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const clickX = e.clientX - rect.left;
                   const pct = clickX / rect.width;
                   setProgress(Math.floor(pct * 45));
                 }}>
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-[#c084fc] transition-all duration-300"
                style={{ width: `${(progress / 45) * 100}%` }}
              />
            </div>

            {/* Timestamps & icons */}
            <div className="flex items-center justify-between text-xs text-gray-300 font-mono pt-1">
              <div className="flex items-center gap-3">
                <button onClick={handlePlayToggle} className="hover:text-white">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span>{formatTime(progress)} / 0:45</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBeatMuted(!isBeatMuted)}
                  className="hover:text-white"
                  aria-label={isBeatMuted ? 'Unmute sound' : 'Mute sound'}
                  aria-pressed={isBeatMuted}
                >
                  {isBeatMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) el.requestFullscreen().catch(() => {});
                    else document.exitFullscreen().catch(() => {});
                  }}
                  className="hover:text-white"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
