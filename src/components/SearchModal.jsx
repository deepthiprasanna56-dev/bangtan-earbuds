import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { products } from '../data/products';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 3); // show top 3 when query is empty

  const handleSelect = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -20 }}
            className="relative w-full max-w-2xl rounded-3xl glass-strong border border-purple-500/30 overflow-hidden shadow-2xl z-10 p-6 space-y-6"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-primary absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Search models (e.g. Pro X, Studio, Planar, Sport)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-black/60 border border-purple-500/30 text-white text-base focus:border-primary focus:outline-none"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Suggestions / Results */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest px-2">
                {query.trim() ? `Search Results (${results.length})` : 'Curated Masterpieces'}
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(product.id)}
                    className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-purple-950/40 border border-white/5 hover:border-primary/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-black">
                        <EarbudsCanvas3D
                          colorHex={product.colorHex}
                          modelStyle={product.modelStyle}
                          interactive={false}
                          autoRotate={false}
                          staticRender
                          showHint={false}
                          className="h-full w-full"
                        />
                        <BangtanProductStamp className="bottom-0.5 left-0.5 gap-0 px-0.5 py-0.5 text-[4px]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-primary-light transition-colors font-display">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                          <span>{product.categoryLabel}</span>
                          <span>•</span>
                          <span className="flex items-center text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 inline mr-0.5" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white font-display">
                        ${product.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
