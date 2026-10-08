import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowUpRight, Zap, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : { name: "Default", hex: "#6d28d9" }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-3xl bg-[#0d0d16] border border-purple-900/25 hover:border-primary/60 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(139,92,246,0.22)]"
    >
      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-purple-950/80 border border-primary/40 text-purple-200 backdrop-blur-md">
          {product.badge || 'VIP'}
        </span>
        {product.discount && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md">
            SAVE {product.discount}%
          </span>
        )}
      </div>

      {/* Product Image Frame with Hover Zoom */}
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3.4] overflow-hidden bg-[#07070c]">
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 filter blur-2xl"
          style={{ backgroundColor: selectedColor.hex }}
        />

        <EarbudsCanvas3D
          colorHex={selectedColor.hex}
          modelStyle={product.modelStyle}
          interactive={false}
          autoRotate={false}
          staticRender
          showHint={false}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <BangtanProductStamp />

        {/* Quick View Button overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full glass hover:bg-white/20 text-white text-[11px] font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 z-10 backdrop-blur-md border border-white/20"
        >
          <span>Preview</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </Link>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="uppercase tracking-widest font-mono text-[11px] text-primary-light">
              {product.categoryLabel || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-white text-xs">{product.rating}</span>
              <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary-light transition-colors">
            <h3 className="text-xl font-bold text-white font-display tracking-tight leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Colorway Selection Swatches */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">FINISH:</span>
            <div className="flex items-center gap-1.5">
              {product.colors &&
                product.colors.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(c);
                    }}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-primary scale-110 border-white'
                        : 'border-white/30 opacity-75 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
            </div>
            <span className="text-[10px] text-gray-300 font-medium ml-1 truncate max-w-[100px]">
              {selectedColor.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white font-display">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium block">
              In Stock • Free Courier
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 btn-shine ${
              addedAnimation
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-primary hover:bg-primary-light text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]'
            }`}
            title="Add to shopping bag"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
