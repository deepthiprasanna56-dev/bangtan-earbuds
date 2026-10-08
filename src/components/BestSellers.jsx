import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';

export default function BestSellers() {
  const { addToCart, showToast } = useCart();
  const [wishlist, setWishlist] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const toggleWishlist = (id, name, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      showToast(!prev[id] ? `Added ${name} to Wishlist` : `Removed ${name} from Wishlist`);
      return updated;
    });
  };

  const handleAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const bestSellers = products.slice(0, 4);

  return (
    <section className="py-20 bg-[#07070b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Best Sellers
          </h2>
          <Link
            to="/products"
            className="text-xs uppercase tracking-widest font-semibold text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const isWishlisted = !!wishlist[product.id];
            const isAdded = !!addedIds[product.id];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl bg-[#0d0d14] border border-white/5 hover:border-purple-500/40 transition-all duration-300 p-4 flex flex-col justify-between relative shadow-lg hover:shadow-[0_10px_30px_rgba(124,58,237,0.18)]"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, product.name, e)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/40 hover:bg-black/70 text-gray-400 hover:text-white transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>

                {/* Product Image Frame */}
                <Link to={`/product/${product.id}`} className="block relative aspect-square rounded-2xl overflow-hidden bg-[#07070c] mb-4">
                  <div
                    className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity filter blur-xl"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <EarbudsCanvas3D
                    colorHex={product.colorHex}
                    modelStyle={product.modelStyle}
                    interactive={false}
                    autoRotate={false}
                    staticRender
                    showHint={false}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <BangtanProductStamp />
                </Link>

                {/* Info */}
                <div className="space-y-1 mb-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-white text-base font-display hover:text-purple-300 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400">{product.subtitle}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-white font-bold">{product.rating}</span>
                    <span className="text-[10px] text-gray-500">({product.reviewCount})</span>
                  </div>

                  {/* Price in INR */}
                  <div className="pt-2">
                    <span className="text-lg font-extrabold text-white font-display">
                      ₹ {product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button (Solid purple pill button) */}
                <button
                  onClick={(e) => handleAdd(product, e)}
                  className={`w-full py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 btn-shine ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#7c3aed] hover:bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
