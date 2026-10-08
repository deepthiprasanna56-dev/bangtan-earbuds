import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BangtanLogo from './BangtanLogo';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast("Thank you for subscribing to Bangtan Audio!");
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050508] border-t border-white/5 text-white pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Main 4-Column Grid matching design */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand & Socials */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BangtanLogo className="w-5 h-5 text-purple-400" />
              <span className="font-extrabold text-lg tracking-[0.18em] uppercase font-display text-white">
                BANGTAN
              </span>
            </Link>

            <p className="text-xs text-gray-400 font-light">
              Feel every beat.
            </p>

          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white font-display">
              Quick Links
            </h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white font-display">
              Customer Care
            </h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Return &amp; Refund</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white font-display">
              Newsletter
            </h4>
            <p className="text-xs text-gray-400">
              Get the latest updates and offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-xl bg-[#12121c] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#8b5cf6] text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar matching design */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2025 Bangtan. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Made with</span>
            <span className="text-purple-400">💜</span>
            <span>for ARMY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
