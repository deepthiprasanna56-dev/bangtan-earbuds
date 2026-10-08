import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BangtanLogo from './BangtanLogo';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';
import { useCart } from '../context/CartContext';

export default function LoginModal({ isOpen, onClose, isStandalone = false, initialTab = 'login', onAuthenticated }) {
  const [tab, setTab] = useState(initialTab);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { showToast } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthenticated?.(rememberMe);
    showToast(tab === 'login' ? "Welcome back to Bangtan Audio!" : "Account created successfully!");
    if (onClose) onClose();
  };

  const formContent = (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px] w-full rounded-3xl bg-[#0d0d16] border border-purple-500/30 overflow-hidden shadow-2xl">
      
      {/* Left Column: Visual with Bangtan Logo, Welcome Back, Earbuds */}
      <div className="md:col-span-5 bg-gradient-to-b from-[#180b2e] via-[#240e44] to-[#120722] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
        <div className="absolute top-1/3 w-48 h-48 bg-[#9333ea]/25 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300">
            <BangtanLogo className="w-9 h-9" glow={true} />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white font-display">
              Welcome Back
            </h3>
            <p className="text-xs text-purple-200 font-light">
              Listen to your world
            </p>
          </div>

          {/* Floating Earbuds Miniature */}
          <div className="relative mx-auto mt-4 h-32 w-32 overflow-hidden rounded-2xl">
            <EarbudsCanvas3D
              colorHex="#7c3aed"
              interactive={false}
              autoRotate={false}
              staticRender
              showHint={false}
              className="h-full w-full"
            />
            <BangtanProductStamp className="bottom-1 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        <div className="mt-auto pt-6 text-[10px] text-gray-500 font-mono">
          BANGTAN AUDIO • 2026
        </div>
      </div>

      {/* Right Column: Login / Signup Form matching design */}
      <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-[#0a0a10]">
        
        {/* Top Header & Tabs */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <span className="font-extrabold text-lg tracking-[0.18em] uppercase font-display text-white">
              BANGTAN
            </span>
            <div className="flex gap-4 text-xs font-semibold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`pb-1 transition-colors relative ${
                  tab === 'login' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span>Login</span>
                {tab === 'login' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" />}
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`pb-1 transition-colors relative ${
                  tab === 'signup' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span>Signup</span>
                {tab === 'signup' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] text-gray-400 block mb-1">
              Email or Phone Number
            </label>
            <input
              type="text"
              required
              placeholder="Enter your email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#14141e] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#14141e] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded accent-[#7c3aed]"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => showToast("Password reset link dispatched.")}
              className="text-purple-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] btn-shine"
          >
            {tab === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="text-[11px] text-gray-500 text-center">
          {tab === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button onClick={() => setTab('signup')} className="text-purple-400 hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setTab('login')} className="text-purple-400 hover:underline">
                Login
              </button>
            </>
          )}
        </p>

      </div>

    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-[#07070b] pt-28 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-3xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            {formContent}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
