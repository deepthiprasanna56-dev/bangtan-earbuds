import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Volume2,
  VolumeX,
  Heart,
  LogOut
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import BangtanLogo from './BangtanLogo';

export default function Navbar({ onSignOut, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { totalItemCount, setIsCartOpen, isPlayingBeat, toggleBeat } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-20 flex items-center ${
          isScrolled
            ? 'glass-strong bg-[#07070b]/90 border-b border-purple-500/20 shadow-2xl backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl flex items-center justify-between">
          
          {/* Brand Logo - clean "BANGTAN" wordmark as in design */}
          <Link to="/" className="flex items-center gap-2 group">
            <BangtanLogo className="w-5 h-5 text-purple-300 group-hover:text-purple-400 transition-colors" />
            <span className="font-extrabold text-xl tracking-[0.18em] uppercase font-display text-white">
              BANGTAN
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-wider font-medium transition-colors ${
                    isActive ? 'text-purple-400 font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons Right */}
          <div className="flex items-center gap-3 sm:gap-4 text-gray-300">
            
            {/* Audio Beat Simulator Button */}
            <button
              onClick={toggleBeat}
              className={`p-2 rounded-full border transition-all ${
                isPlayingBeat
                  ? 'bg-purple-950 border-purple-500 text-purple-300'
                  : 'border-transparent hover:text-white hover:bg-white/5'
              }`}
              title={isPlayingBeat ? 'Turn sound off' : 'Turn sound on'}
              aria-label={isPlayingBeat ? 'Turn sound off' : 'Turn sound on'}
              aria-pressed={isPlayingBeat}
            >
              {isPlayingBeat ? (
                <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Account */}
            <button
              onClick={onSignOut}
              className="p-2 hover:text-white transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Shopping Cart with Purple Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-white transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#0a0a14] border-l border-purple-500/20 p-6 flex flex-col justify-between z-10 glass-strong"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-extrabold text-white tracking-widest uppercase font-display text-sm">
                    BANGTAN
                  </span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 py-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-base uppercase tracking-widest font-semibold text-gray-300 hover:text-primary transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/cart"
                    className="text-base uppercase tracking-widest font-semibold text-gray-300 hover:text-primary transition-colors py-1 flex items-center justify-between"
                  >
                    <span>Your Cart</span>
                    <span className="text-xs font-mono bg-purple-900/60 px-2 py-0.5 rounded-full text-purple-300">
                      {totalItemCount}
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full py-3 rounded-full bg-[#7c3aed] text-white text-xs uppercase tracking-wider font-bold"
                >
                  Sign Out
                </button>
                <p className="text-[10px] text-gray-500 text-center tracking-widest uppercase font-mono">
                  Feel every beat • Bangtan
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
