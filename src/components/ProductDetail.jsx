import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Minus, Plus, ShoppingBag, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();

  const product = products.find((p) => p.id === Number(id)) || products[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'specifications', 'reviews'
  const [is3DMode, setIs3DMode] = useState(false);
  const [isCaseOpen, setIsCaseOpen] = useState(false);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setIsCaseOpen(true), 450);
    return () => window.clearTimeout(openTimer);
  }, [product]);

  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedThumb(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const handleAdd = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    navigate('/cart');
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#07070b] pt-24 pb-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb matching design */}
        <div className="text-xs text-gray-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>&gt;</span>
          <span className="text-purple-300 font-medium">{product.name}</span>
        </div>

        {/* Main Stage Grid: Image Gallery Left + Product Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Thumbnails + Main View */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedThumb(idx);
                    setSelectedColor(product.colors[idx % product.colors.length]);
                  }}
                  className={`relative w-16 h-16 rounded-2xl overflow-hidden bg-[#0d0d14] border transition-all ${
                    !is3DMode && selectedThumb === idx
                      ? 'border-[#7c3aed] ring-2 ring-purple-500/40'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <EarbudsCanvas3D
                    colorHex={product.colors[idx % product.colors.length].hex}
                    modelStyle={product.modelStyle}
                    interactive={false}
                    autoRotate={false}
                    staticRender
                    showHint={false}
                    className="h-full w-full"
                  />
                  <BangtanProductStamp className="bottom-1 left-1 px-1 py-0.5 text-[5px]" />
                </button>
              ))}
              
              {/* 3D Orbit View Button */}
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`w-16 h-16 rounded-2xl border text-[10px] font-bold uppercase tracking-wider flex flex-col items-center justify-center transition-all ${
                  is3DMode
                    ? 'bg-[#7c3aed] border-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                    : 'bg-[#12121c] border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <span>3D</span>
                <span>Orbit</span>
              </button>
            </div>

            {/* Main Stage Display */}
            <div className="flex-1 aspect-square rounded-3xl bg-[#0d0d16] border border-white/10 overflow-hidden relative flex items-center justify-center p-6 shadow-2xl">
              {/* Radial Purple Glow Background */}
              <div className="absolute inset-0 bg-radial-glow filter blur-3xl opacity-60 pointer-events-none" />

              <EarbudsCanvas3D
                colorHex={selectedColor.hex}
                modelStyle={product.modelStyle}
                caseOpen={isCaseOpen}
                autoRotate={is3DMode}
                className="w-full h-full"
              />
              <BangtanProductStamp className="bottom-8 right-8 left-auto" />
              <button
                type="button"
                onClick={() => setIsCaseOpen((open) => !open)}
                className="absolute top-4 right-4 z-20 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur transition-colors hover:border-purple-400 hover:bg-purple-950/80"
                aria-pressed={isCaseOpen}
              >
                {isCaseOpen ? 'Close case' : 'Open case'}
              </button>
            </div>

          </div>

          {/* Right Column: Title, Price, Bullets, Swatches, Stepper, CTAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-white font-bold">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-extrabold text-white font-display">
                ₹ {product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹ {product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7c3aed]/25 text-purple-300 border border-purple-500/30">
                {product.discount}% OFF
              </span>
            </div>

            {/* Feature Bullets matching design */}
            <ul className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/5">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-xs text-gray-300 font-medium">
                Color: <span className="text-purple-300">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-white scale-110 ring-2 ring-purple-500/60 shadow-[0_0_10px_rgba(124,58,237,0.5)]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center bg-[#111118] border border-white/10 rounded-full px-3 py-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] btn-shine"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 rounded-full border border-white/20 hover:border-purple-400 text-white font-semibold text-xs tracking-wider uppercase transition-all glass hover:bg-white/5"
              >
                Buy Now
              </button>
            </div>

          </div>

        </div>

        {/* Tabs: Description, Specifications, Reviews */}
        <div className="mb-20 pt-8 border-t border-white/5">
          <div className="flex items-center gap-8 border-b border-white/10 pb-4 mb-6 text-sm font-bold uppercase tracking-wider font-display">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 transition-colors relative ${
                  activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                {activeTab === tab && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#7c3aed]" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="text-sm text-gray-300 leading-relaxed max-w-3xl">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 border-b border-white/5 text-xs">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-semibold text-right">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 rounded-2xl bg-[#0f0f18] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs">Aarav Sharma</span>
                  <span className="text-amber-400 text-xs">★★★★★</span>
                </div>
                <p className="text-xs text-gray-300">
                  Unbelievable sound! The bass hits deep without overpowering the vocals. Best earbuds in this price range.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* "You May Also Like" Related Products */}
        <div className="pt-10 border-t border-white/5">
          <h3 className="text-xl font-bold text-white font-display mb-6">
            You May Also Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/product/${rel.id}`}
                className="group p-4 rounded-3xl bg-[#0d0d14] border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#07070c] mb-3">
                  <EarbudsCanvas3D
                    colorHex={rel.colorHex}
                    modelStyle={rel.modelStyle}
                    interactive={false}
                    autoRotate={false}
                    staticRender
                    showHint={false}
                    className="h-full w-full transition-transform group-hover:scale-105"
                  />
                  <BangtanProductStamp className="bottom-1.5 left-1.5 px-1 py-0.5 text-[5px]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{rel.name}</h4>
                  <div className="text-[10px] text-gray-400">★ {rel.rating} ({rel.reviewCount})</div>
                  <div className="text-xs font-bold text-white mt-1">₹ {rel.price.toLocaleString('en-IN')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
