import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  CreditCard,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import BangtanProductStamp from './BangtanProductStamp';

export default function Cart({ isStandalone = false }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    delivery,
    grandTotal,
    totalItemCount
  } = useCart();

  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleStartCheckout = () => {
    setOrderId(`BG-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsCheckingOut(true);
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsCheckingOut(false);
    setOrderConfirmed(true);
    clearCart();
  };

  // Reusable Cart Content
  const cartContent = (
    <div className="space-y-8">
      {cartItems.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Cart is Empty</h3>
          <p className="text-xs text-gray-400">Discover Bangtan wireless audio to get started.</p>
          <button
            onClick={() => {
              setIsCartOpen(false);
              navigate('/products');
            }}
            className="px-6 py-2.5 rounded-full bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-wider"
          >
            Explore Earbuds
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="p-5 rounded-3xl bg-[#0d0d16] border border-white/5 flex items-center justify-between gap-4"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-2xl bg-[#07070c] border border-white/10 overflow-hidden shrink-0">
                  <EarbudsCanvas3D
                    colorHex={item.colorHex}
                    modelStyle={item.modelStyle}
                    interactive={false}
                    autoRotate={false}
                    staticRender
                    showHint={false}
                    className="h-full w-full"
                  />
                  <BangtanProductStamp className="bottom-1 left-1 px-1 py-0.5 text-[5px]" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate font-display">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.subtitle || "True Wireless Earbuds"}</p>
                  
                  <div className="flex items-center gap-1 text-xs text-amber-400 pt-1">
                    <span>★ 4.8</span>
                    <span className="text-[10px] text-gray-500">(124)</span>
                  </div>

                  <div className="text-sm font-bold text-white font-display pt-1">
                    ₹ {item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Stepper & Trash Icon */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#111118] border border-white/10 rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.color, -1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.color)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0d0d16] border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-white font-display">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-gray-400 pb-4 border-b border-white/5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-mono">₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>Discount</span>
                <span className="font-mono">- ₹ {discountAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400 font-mono">₹ 0</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline text-sm font-bold text-white font-display">
              <span>Total</span>
              <span className="text-xl text-white">₹ {grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={handleStartCheckout}
              className="w-full py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] btn-shine"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}

      {/* Guarantees Bar matching design */}
      <div className="pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-gray-400">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 text-purple-400" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4 text-purple-400" />
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );

  // Standalone page
  if (isStandalone) {
    return (
      <div className="min-h-screen bg-[#07070b] pt-28 pb-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h1 className="text-3xl font-extrabold text-white font-display mb-8">
            Your Cart ({totalItemCount})
          </h1>
          {cartContent}
        </div>
        {renderCheckoutModals()}
      </div>
    );
  }

  // Slide-over drawer mode
  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a14] border-l border-purple-500/20 shadow-2xl flex flex-col z-10 glass-strong p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <h3 className="font-bold text-white text-base font-display">
                  Your Cart ({totalItemCount})
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex-1">
                {cartItems.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-12">Your cart is empty.</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.color}`} className="flex gap-3 items-center p-3 rounded-2xl bg-white/[0.02]">
                        <div className="h-14 w-14 overflow-hidden rounded-xl">
                          <EarbudsCanvas3D
                            colorHex={item.colorHex}
                            modelStyle={item.modelStyle}
                            interactive={false}
                            autoRotate={false}
                            staticRender
                            showHint={false}
                            className="h-full w-full"
                          />
                          <BangtanProductStamp className="bottom-0.5 left-0.5 gap-0 px-0.5 py-0.5 text-[4px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <span className="text-xs text-gray-400 font-mono">₹ {item.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.color, -1)} className="text-gray-400 hover:text-white">-</button>
                          <span className="text-xs font-mono">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.color, 1)} className="text-gray-400 hover:text-white">+</button>
                          <button onClick={() => removeFromCart(item.id, item.color)} className="text-gray-500 hover:text-red-400 ml-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-sm font-bold text-white">
                    <span>Total</span>
                    <span>₹ {grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={handleStartCheckout}
                    className="w-full py-3.5 rounded-full bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Checkout (₹ {grandTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {renderCheckoutModals()}
    </>
  );

  function renderCheckoutModals() {
    return (
      <AnimatePresence>
        {isCheckingOut && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckingOut(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl glass-strong border border-purple-500/30 p-8 z-10 shadow-2xl text-white space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <h3 className="text-base font-bold font-display uppercase tracking-wider">
                    Bangtan Express Checkout
                  </h3>
                </div>
                <button onClick={() => setIsCheckingOut(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Shipping Full Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    defaultValue="Tower 4, Bandra West, Mumbai 400050"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-xs flex items-center justify-between">
                  <span>Pay on Delivery / UPI Card</span>
                  <span className="font-bold text-purple-300 font-mono">₹ {grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white font-bold text-xs uppercase tracking-wider transition-all btn-shine"
                >
                  Confirm Order • ₹ {grandTotal.toLocaleString('en-IN')}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {orderConfirmed && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderConfirmed(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl glass-strong border border-purple-500/50 p-8 z-10 shadow-2xl text-center space-y-4 text-white"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold font-display">
                Order Placed!
              </h3>
              <p className="text-xs text-gray-400">
                Order Tracking ID: <span className="font-mono text-purple-300 font-bold">{orderId}</span>
              </p>
              <p className="text-xs text-gray-300">
                Your Bangtan Earbuds are packed with care. You will receive an SMS and email with live courier updates.
              </p>

              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  setIsCartOpen(false);
                  navigate('/');
                }}
                className="w-full py-3 rounded-full bg-[#7c3aed] text-white font-bold text-xs uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
}
