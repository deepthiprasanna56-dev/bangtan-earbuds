import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Sparkles, Clock, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const { showToast } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'VIP Audition Session',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Concierge inquiry dispatched. An audio specialist will reply within 4 hours.");
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', topic: 'VIP Audition Session', message: '' });
    }, 4000);
  };

  const showrooms = [
    {
      city: 'Seoul Gangnam',
      type: 'Global Acoustic Flagship & Cleanroom',
      address: '142 Teheran-ro, Gangnam-gu, Seoul',
      hours: 'Tue – Sun, 11:00 – 20:00 KST'
    },
    {
      city: 'Tokyo Ginza',
      type: 'Private Sound Salon',
      address: '6-10-1 Ginza, Chuo-ku, Tokyo',
      hours: 'Mon – Sat, 11:00 – 19:30 JST'
    },
    {
      city: 'New York SoHo',
      type: 'Listening Room Gallery',
      address: '482 Broome Street, New York, NY',
      hours: 'Daily, 10:00 – 19:00 EST'
    },
    {
      city: 'London Mayfair',
      type: 'Bespoke Studio Lounge',
      address: '24 Mount Street, Mayfair, London',
      hours: 'Mon – Fri, 10:00 – 18:00 GMT'
    }
  ];

  const faqs = [
    {
      q: 'How does the 30-day home audition trial work?',
      a: 'We encourage you to experience BANGTAN earbuds with your favorite albums, DACs, and everyday environments. If the acoustic signature does not completely surpass your expectations, return them within 30 days in original packaging for a 100% refund with prepaid return shipping.'
    },
    {
      q: 'Do BANGTAN earbuds support lossless high-resolution audio codecs?',
      a: 'Yes. Our flagship Pro X and Horizon Studio support true 24-bit/192kHz LDAC, LHDC 5.0, and Qualcomm aptX Lossless transmission up to 990 kbps, delivering bit-perfect wireless audio on both Android and modern Hi-Fi players.'
    },
    {
      q: 'What is covered under the 2-Year VIP Warranty?',
      a: 'Every pair includes 24 months of full coverage against hardware defects, battery degradation below 80%, and accidental acoustic port obstruction. If any issue arises, our concierge dispatches a replacement pair before receiving your unit.'
    },
    {
      q: 'Can I book a private soundstage audition in your showrooms?',
      a: 'Certainly. Use the contact concierge form above to reserve a private 45-minute audition slot in any of our listening rooms in Seoul, Tokyo, New York, or London, accompanied by high-res master tape recordings.'
    }
  ];

  return (
    <div className="bg-[#07070b] text-white pt-20 pb-24 overflow-hidden">
      
      {/* Header */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-purple-500/20 text-xs text-primary-light uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>VIP Audio Concierge</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight uppercase">
          Connect with <span className="text-gradient">Acoustic Experts</span>
        </h1>
        <p className="text-base sm:text-lg text-chrome-dark max-w-2xl mx-auto leading-relaxed">
          Whether inquiring about custom ear tips, private studio auditions, or order dispatches, our dedicated sound specialists are at your disposal.
        </p>
      </section>

      {/* Main Grid: Form + Showrooms */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl glass-strong border border-purple-500/25 shadow-2xl">
            <h2 className="text-2xl font-bold font-display uppercase mb-2">Direct Inquiry</h2>
            <p className="text-xs text-gray-400 mb-8">Dispatched directly to the Seoul engineering & support headquarters.</p>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-display">Inquiry Transmitted</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Your message has reached our senior acoustic concierge. Expect a personalized response in your inbox shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase tracking-widest block mb-1 font-mono">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Henrik Lindqvist"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/20 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 uppercase tracking-widest block mb-1 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/20 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase tracking-widest block mb-1 font-mono">
                    Subject / Concierge Request
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/20 text-white text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="VIP Audition Session">Book Private Audition Session</option>
                    <option value="Acoustic Tuning Advice">Acoustic Tuning & Model Recommendation</option>
                    <option value="Order Dispatch Status">Order Dispatch & VIP Tracking</option>
                    <option value="Press / Studio Mastering">Studio Mastering / Press Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 uppercase tracking-widest block mb-1 font-mono">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your audio equipment, music preferences, or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/20 text-white text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center gap-2 btn-shine"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Concierge Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Showrooms Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold font-display uppercase">Global Listening Rooms</h2>
            
            <div className="space-y-4">
              {showrooms.map((room, i) => (
                <div key={i} className="p-6 rounded-2xl glass border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white font-display text-lg">{room.city}</h3>
                    <span className="text-[10px] text-primary-light font-mono px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30">
                      BY APPOINTMENT
                    </span>
                  </div>
                  <div className="text-xs text-purple-200 font-medium">{room.type}</div>
                  <p className="text-xs text-gray-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{room.address}</span>
                  </p>
                  <p className="text-[11px] text-gray-500 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{room.hours}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary-light font-mono font-bold">
            FREQUENTLY CLARIFIED
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
            Client Inquiries & Guarantees
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl glass-strong border border-purple-500/20 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-base text-white font-display">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
