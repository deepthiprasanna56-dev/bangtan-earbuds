import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Star, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';

export default function ProductList() {
  const { addToCart, showToast } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceMax, setPriceMax] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState({});
  const pageSize = 3;

  const toggleWishlist = (id, name, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      showToast(!prev[id] ? `Added ${name} to Wishlist` : `Removed ${name} from Wishlist`);
      return updated;
    });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        const matchesPrice = p.price <= priceMax;
        const matchesRating = p.rating >= minRating;

        return matchesCategory && matchesSearch && matchesPrice && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.id - b.id; // recommended
      });
  }, [selectedCategory, searchQuery, priceMax, minRating, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = (update) => {
    update();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#07070b] pt-24 pb-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header & Search Bar matching design */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              All Earbuds
            </h1>
            <p className="text-xs text-gray-400 mt-1">Find your perfect sound</p>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search earbuds..."
              value={searchQuery}
              onChange={(e) => resetFilters(() => setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#111118] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 2-Column Layout: Left Filters + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8 bg-[#0a0a10] border border-white/5 rounded-3xl p-6">
            
            {/* 1. Categories Checkboxes */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 font-display">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat.id}
                      onChange={() => resetFilters(() => setSelectedCategory(cat.id))}
                      className="rounded accent-[#7c3aed] cursor-pointer"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-300 font-display">
                  Price Range
                </span>
                <span className="text-purple-300 font-mono">₹ 0 – ₹ {priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="10000"
                step="500"
                value={priceMax}
                onChange={(e) => resetFilters(() => setPriceMax(Number(e.target.value)))}
                className="w-full accent-[#7c3aed] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>₹ 0</span>
                <span>₹ 10,000</span>
              </div>
            </div>

            {/* 3. Rating Checkboxes */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 font-display">
                Rating
              </h3>
              <div className="space-y-2">
                {[
                  { val: 4.5, label: "4.5 & above" },
                  { val: 4.0, label: "4.0 & above" },
                  { val: 3.0, label: "3.0 & above" }
                ].map((r) => (
                  <label
                    key={r.val}
                    className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={minRating === r.val}
                      onChange={() => resetFilters(() => setMinRating(minRating === r.val ? 0 : r.val))}
                      className="rounded accent-[#7c3aed] cursor-pointer"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Sort By Dropdown */}
            <div className="space-y-2 pt-6 border-t border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 font-display block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => resetFilters(() => setSortBy(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#14141e] border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => {
                const isWishlisted = !!wishlist[product.id];
                return (
                  <div
                    key={product.id}
                    className="group rounded-3xl bg-[#0d0d14] border border-white/5 hover:border-purple-500/40 transition-all duration-300 p-4 flex flex-col justify-between relative shadow-lg"
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

                    {/* Image */}
                    <Link
                      to={`/product/${product.id}`}
                      className="block relative aspect-square rounded-2xl overflow-hidden bg-[#07070c] mb-4"
                    >
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

                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-white font-bold">{product.rating}</span>
                        <span className="text-[10px] text-gray-500">({product.reviewCount})</span>
                      </div>

                      <div className="pt-2">
                        <span className="text-lg font-extrabold text-white font-display">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product, product.colors[0], 1)}
                      className="w-full py-2.5 rounded-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.4)] btn-shine"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <p className="py-16 text-center text-sm text-gray-400">No collections match these filters.</p>
            )}

            <div className="flex items-center justify-center gap-2 pt-6" aria-label="Product pages">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setCurrentPage(num);
                    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  aria-current={currentPage === num ? 'page' : undefined}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === num
                      ? 'bg-[#7c3aed] text-white'
                      : 'bg-[#111118] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {num}
                </button>
              ))}
              {pageCount > 1 && <>
                <button
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl text-xs font-bold bg-[#111118] text-gray-400 hover:text-white border border-white/5 flex items-center justify-center disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                  disabled={currentPage === pageCount}
                  className="w-9 h-9 rounded-xl text-xs font-bold bg-[#111118] text-gray-400 hover:text-white border border-white/5 flex items-center justify-center disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>}
            </div>
          </main>

        </div>

      </div>
    </div>
  );
}
