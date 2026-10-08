import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bangtan_cart_v2');
      return saved ? JSON.parse(saved) : [
        // Exact initial items from the design mockup
        {
          id: 1,
          name: "Purple Dreams",
          subtitle: "True Wireless Earbuds",
          price: 5999,
          originalPrice: 8999,
          image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=400&q=80",
          color: "Purple Dreams",
          colorHex: "#7c3aed",
          quantity: 1
        },
        {
          id: 2,
          name: "Midnight Black",
          subtitle: "True Wireless Earbuds",
          price: 5499,
          originalPrice: 7999,
          image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=80",
          color: "Midnight Black",
          colorHex: "#0f0f14",
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(1000); // Matching design's ₹ 1,000 promo discount!
  const [appliedPromo, setAppliedPromo] = useState('BANGTAN1000');
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [isBeatMuted, setIsBeatMuted] = useState(false);
  const audioEngineRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('bangtan_cart_v2', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  const addToCart = useCallback((product, selectedColorObj = null, qty = 1) => {
    const chosenColor = selectedColorObj || (product.colors ? product.colors[0] : { name: "Purple Dreams", hex: "#7c3aed" });
    const colorName = chosenColor.name || "Purple Dreams";
    const colorHex = chosenColor.hex || "#7c3aed";

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.color === colorName
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            subtitle: product.subtitle || "True Wireless Earbuds",
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            modelStyle: product.modelStyle || 'classic',
            color: colorName,
            colorHex: colorHex,
            quantity: qty
          }
        ];
      }
    });

    showToast(`Added ${product.name} to your cart`);
    setIsCartOpen(true);
  }, [showToast]);

  const updateQuantity = useCallback((id, color, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const removeFromCart = useCallback((id, color) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
    showToast("Item removed from cart");
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 0; // Free Shipping as shown in design!
  const effectiveDiscount = subtotal > 0 ? discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - effectiveDiscount + delivery);

  const stopBeat = useCallback(() => {
    const engine = audioEngineRef.current;
    if (engine) {
      window.clearInterval(engine.timer);
      engine.oscillators.forEach((oscillator) => {
        try { oscillator.stop(); } catch { /* Already stopped. */ }
      });
      engine.context.close().catch(() => {});
      audioEngineRef.current = null;
    }
    setIsPlayingBeat(false);
  }, []);

  const startBeat = useCallback(async () => {
    if (audioEngineRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    try {
      const context = new AudioContext();
      const master = context.createGain();
      master.gain.value = isBeatMuted ? 0 : 0.65;
      master.connect(context.destination);

      const oscillators = [146.83, 174.61, 220].map((frequency, index) => {
        const oscillator = context.createOscillator();
        const voice = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        voice.gain.value = [0.012, 0.008, 0.007][index];
        oscillator.connect(voice);
        voice.connect(master);
        oscillator.start();
        return oscillator;
      });

      const melody = [440, 587.33, 523.25, 392, 493.88, 349.23];
      let noteIndex = 0;
      const playNote = () => {
        const note = context.createOscillator();
        const envelope = context.createGain();
        const now = context.currentTime;
        note.type = 'sine';
        note.frequency.value = melody[noteIndex % melody.length];
        noteIndex += 1;
        envelope.gain.setValueAtTime(0.0001, now);
        envelope.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
        envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        note.connect(envelope);
        envelope.connect(master);
        note.start(now);
        note.stop(now + 0.92);
      };

      audioEngineRef.current = {
        context,
        master,
        oscillators,
        timer: window.setInterval(playNote, 1050)
      };
      playNote();
      await context.resume();
      setIsPlayingBeat(true);
    } catch (error) {
      console.error('Unable to start Bangtan sound experience:', error);
      stopBeat();
    }
  }, [isBeatMuted, stopBeat]);

  const toggleBeat = useCallback(() => {
    if (audioEngineRef.current) stopBeat();
    else void startBeat();
  }, [startBeat, stopBeat]);

  const setBeatMuted = useCallback((muted) => {
    setIsBeatMuted(muted);
    const engine = audioEngineRef.current;
    if (engine) {
      engine.master.gain.setTargetAtTime(muted ? 0 : 0.65, engine.context.currentTime, 0.04);
    }
  }, []);

  useEffect(() => () => {
    const engine = audioEngineRef.current;
    if (engine) {
      window.clearInterval(engine.timer);
      engine.oscillators.forEach((oscillator) => {
        try { oscillator.stop(); } catch { /* Already stopped. */ }
      });
      engine.context.close().catch(() => {});
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        discountAmount: effectiveDiscount,
        delivery,
        grandTotal,
        appliedPromo,
        toastMessage,
        showToast,
        isPlayingBeat,
        isBeatMuted,
        setBeatMuted,
        startBeat,
        stopBeat,
        toggleBeat
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
