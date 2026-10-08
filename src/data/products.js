// BANGTAN AUDIO - Official Product Catalog matching exact design reference

export const products = [
  {
    id: 1,
    name: "Purple Dreams",
    subtitle: "True Wireless Earbuds",
    tagline: "Experience the music, the moments, and the magic — with Bangtan.",
    badge: "BESTSELLER",
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    category: "true-wireless",
    categoryLabel: "True Wireless",
    rating: 4.9,
    reviewCount: 124,
    colorHex: "#7c3aed",
    colorName: "Purple Dreams",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=85",
    caseColor: "#4c1d95",
    colors: [
      { name: "Purple Dreams", hex: "#7c3aed", secondary: "#4c1d95" },
      { name: "Midnight Black", hex: "#0f0f14", secondary: "#1e1e24" },
      { name: "Moonlight Silver", hex: "#cbd5e1", secondary: "#94a3b8" }
    ],
    features: [
      "Active Noise Cancellation (ANC)",
      "Up to 36 hours battery life",
      "IPX5 water resistant",
      "Touch controls",
      "Premium sound quality with Bangtan signature tuning"
    ],
    specs: {
      driver: "11mm Custom Neodymium Dynamic Driver",
      frequency: "20Hz – 20,000Hz (Hi-Fi Tuned)",
      anc: "Hybrid Active Noise Cancellation (-35dB)",
      battery: "8h earbuds + 28h wireless charging case (36h total)",
      charging: "Type-C Fast Charge + Qi Wireless",
      waterproof: "IPX5 Sweat & Splash Proof",
      bluetooth: "Bluetooth 5.3 Low-Latency",
      microphones: "Dual AI Beamforming Mics with ENC"
    },
    description: "Experience immersive sound with Bangtan Purple Dreams. Designed for true music lovers, these earbuds deliver crystal clear audio, deep bass, and all-day comfort. Featuring the iconic Bangtan laser-engraved emblem and signature violet charging case.",
    inTheBox: [
      "Bangtan Purple Dreams Earbuds (L/R)",
      "Wireless Smart Charging Case with Bangtan Logo",
      "3 Pairs of Silicone Ear Tips (S/M/L)",
      "Type-C Fast Charging Cable",
      "Bangtan Holographic Collector Card"
    ]
  },
  {
    id: 2,
    name: "Midnight Black",
    subtitle: "True Wireless Earbuds",
    tagline: "Pure stealth. Undiluted bass power.",
    badge: "POPULAR",
    price: 5499,
    originalPrice: 7999,
    discount: 31,
    category: "noise-canceling",
    categoryLabel: "Noise Canceling",
    rating: 4.8,
    reviewCount: 98,
    colorHex: "#121217",
    colorName: "Midnight Black",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=85",
    caseColor: "#09090d",
    colors: [
      { name: "Midnight Black", hex: "#0f0f14", secondary: "#1e1e24" },
      { name: "Purple Dreams", hex: "#7c3aed", secondary: "#4c1d95" },
      { name: "Moonlight Silver", hex: "#cbd5e1", secondary: "#94a3b8" }
    ],
    features: [
      "Deep Bass Sound Architecture",
      "Up to 32 hours battery life",
      "IPX5 water resistant",
      "Environmental Noise Cancellation"
    ],
    specs: {
      driver: "10mm Dynamic Bass Transducer",
      frequency: "20Hz – 20,000Hz",
      anc: "Passive Acoustic Isolation + ENC",
      battery: "7h + 25h with case (32h total)",
      charging: "USB-C Fast Charging",
      waterproof: "IPX5",
      bluetooth: "Bluetooth 5.3",
      microphones: "Dual AI Noise Canceling Mics"
    },
    description: "Sophisticated matte black texture paired with punchy acoustic resonance. Crafted for understated elegance and powerful everyday audio.",
    inTheBox: [
      "Bangtan Midnight Black Earbuds",
      "Charging Case",
      "3 Sets Ear Tips",
      "USB-C Cable"
    ]
  },
  {
    id: 3,
    name: "Moonlight Silver",
    subtitle: "True Wireless Earbuds",
    tagline: "Liquid chrome metallic brilliance.",
    badge: "LUXURY",
    price: 5999,
    originalPrice: 8499,
    discount: 29,
    category: "true-wireless",
    categoryLabel: "True Wireless",
    rating: 4.6,
    reviewCount: 76,
    colorHex: "#cbd5e1",
    colorName: "Moonlight Silver",
    image: "https://images.unsplash.com/photo-1631176093617-63490a3d785a?auto=format&fit=crop&w=800&q=85",
    caseColor: "#94a3b8",
    colors: [
      { name: "Moonlight Silver", hex: "#cbd5e1", secondary: "#94a3b8" },
      { name: "Purple Dreams", hex: "#7c3aed", secondary: "#4c1d95" },
      { name: "Midnight Black", hex: "#0f0f14", secondary: "#1e1e24" }
    ],
    features: [
      "Liquid Metal Brushed Finish",
      "Spatial Audio 360",
      "Up to 36 hours total battery",
      "Touch Gesture Controls"
    ],
    specs: {
      driver: "10mm Titanium Composite Driver",
      frequency: "20Hz – 22,000Hz",
      anc: "Smart Hybrid ANC (-32dB)",
      battery: "8h + 28h with case (36h total)",
      charging: "Wireless Qi + Type-C",
      waterproof: "IPX5",
      bluetooth: "Bluetooth 5.3",
      microphones: "Triple Mic Array"
    },
    description: "Polished liquid chrome aesthetic catching ambient reflections. Crystalline highs and acoustic precision in every note.",
    inTheBox: [
      "Moonlight Silver Earbuds",
      "Chrome Charging Capsule",
      "Silicone Tips",
      "Charging Cable"
    ]
  },
  {
    id: 4,
    name: "Crystal White",
    subtitle: "True Wireless Earbuds",
    tagline: "Pure porcelain acoustic clarity.",
    badge: "CLASSIC",
    price: 5499,
    originalPrice: 7499,
    discount: 26,
    category: "true-wireless",
    categoryLabel: "True Wireless",
    rating: 4.5,
    reviewCount: 82,
    colorHex: "#f8fafc",
    colorName: "Crystal White",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85",
    caseColor: "#e2e8f0",
    colors: [
      { name: "Crystal White", hex: "#f8fafc", secondary: "#e2e8f0" },
      { name: "Purple Dreams", hex: "#7c3aed", secondary: "#4c1d95" },
      { name: "Midnight Black", hex: "#0f0f14", secondary: "#1e1e24" }
    ],
    features: [
      "High-Gloss Ceramic White Shell",
      "Ultra-Lightweight 3.8g Fit",
      "Up to 30 hours battery",
      "Instant Auto-Pairing"
    ],
    specs: {
      driver: "9mm Dynamic Driver",
      frequency: "20Hz – 20,000Hz",
      anc: "Environmental Noise Cancellation",
      battery: "7h + 23h case (30h total)",
      charging: "USB-C",
      waterproof: "IPX4",
      bluetooth: "Bluetooth 5.2",
      microphones: "Dual Clear Voice Mics"
    },
    description: "Immaculate pearl white finish with glossy protective coating. Lightweight comfort designed for non-stop listening sessions.",
    inTheBox: [
      "Crystal White Earbuds",
      "Pocket Case",
      "3 Pairs Ear Tips",
      "USB-C Cable"
    ]
  },
  {
    id: 5,
    name: "Galaxy Blue",
    subtitle: "True Wireless Earbuds",
    tagline: "Cosmic depths of sound.",
    badge: "LIMITED",
    price: 6499,
    originalPrice: 8999,
    discount: 27,
    category: "gaming",
    categoryLabel: "Gaming",
    rating: 4.7,
    reviewCount: 65,
    colorHex: "#1e3a8a",
    colorName: "Galaxy Blue",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=85",
    caseColor: "#172554",
    colors: [
      { name: "Galaxy Blue", hex: "#1e3a8a", secondary: "#172554" },
      { name: "Purple Dreams", hex: "#7c3aed", secondary: "#4c1d95" }
    ],
    features: [
      "Ultra-Low 35ms Gaming Mode",
      "Deep Cosmic Blue Anodized Finish",
      "38 hours battery life",
      "Dual Device Sync"
    ],
    specs: {
      driver: "11mm Graphene Coated Driver",
      frequency: "15Hz – 22,000Hz",
      anc: "Gaming ANC -38dB",
      battery: "9h + 29h case (38h total)",
      charging: "Type-C Fast Charge",
      waterproof: "IPX5",
      bluetooth: "Bluetooth 5.3 Low-Latency",
      microphones: "Quad AI Noise Reduction Mics"
    },
    description: "Inspired by cosmic nebulae. Deep metallic galaxy blue with lightning fast response times for games, videos, and music.",
    inTheBox: [
      "Galaxy Blue Earbuds",
      "Cyber Charging Case",
      "Grip Tips",
      "Type-C Cord"
    ]
  },
  {
    id: 6,
    name: "Rose Gold",
    subtitle: "True Wireless Earbuds",
    tagline: "Romantic luxury in every note.",
    badge: "SPECIAL EDITION",
    price: 5999,
    originalPrice: 8499,
    discount: 29,
    category: "sport",
    categoryLabel: "Sport",
    rating: 4.8,
    reviewCount: 91,
    colorHex: "#f43f5e",
    colorName: "Rose Gold",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
    caseColor: "#9f1239",
    colors: [
      { name: "Rose Gold", hex: "#f43f5e", secondary: "#9f1239" },
      { name: "Purple Dreams", hex: "#7c3aed", secondary: "#4c1d95" }
    ],
    features: [
      "Blush Rose Gold Brushed Alloy",
      "Secure Fit for Workouts",
      "Up to 34 hours battery",
      "Voice Assistant Support"
    ],
    specs: {
      driver: "10mm Dynamic Audio Driver",
      frequency: "20Hz – 20,000Hz",
      anc: "Active Ambient Cancellation",
      battery: "8h + 26h case (34h total)",
      charging: "USB-C",
      waterproof: "IPX5",
      bluetooth: "Bluetooth 5.3",
      microphones: "Dual Microphones"
    },
    description: "Warm rose gold metallic sheen with sweat-resistant comfort. Elevates everyday fashion while pumping high-energy audio.",
    inTheBox: [
      "Rose Gold Earbuds",
      "Case",
      "Silicone Tips",
      "USB-C Cable"
    ]
  }
];

const originalFormFactors = ["classic", "bean", "blade", "loop", "disc", "faceted"];
products.forEach((product, index) => {
  product.modelStyle = originalFormFactors[index];
});

const additionalCollections = [
  { name: "BTS Edition", colorHex: "#a855f7", colorName: "BTS Edition", category: "true-wireless", modelStyle: "clear", price: 6999, originalPrice: 9999, rating: 5.0, reviewCount: 48, tagline: "A limited signature finish, made for every encore." },
  { name: "Aurora Teal", colorHex: "#0f766e", colorName: "Aurora Teal", category: "sport", modelStyle: "display", price: 5799, originalPrice: 7999, rating: 4.7, reviewCount: 54, tagline: "A cool, luminous finish for days in motion." },
  { name: "Starlight Gold", colorHex: "#c08457", colorName: "Starlight Gold", category: "true-wireless", modelStyle: "orb", price: 6499, originalPrice: 8999, rating: 4.8, reviewCount: 39, tagline: "Warm metallic polish with a concert-night glow." },
  { name: "Onyx Pro", colorHex: "#27272a", colorName: "Onyx Pro", category: "noise-canceling", modelStyle: "angular", price: 7499, originalPrice: 10499, rating: 4.9, reviewCount: 62, tagline: "Quiet focus, shaped in deep obsidian." },
  { name: "Arctic Blue", colorHex: "#38bdf8", colorName: "Arctic Blue", category: "gaming", modelStyle: "earhook", price: 6299, originalPrice: 8799, rating: 4.6, reviewCount: 33, tagline: "Clear, quick sound in an icy blue finish." },
  { name: "Violet Stage", colorHex: "#9333ea", colorName: "Violet Stage", category: "noise-canceling", modelStyle: "pebble", price: 7299, originalPrice: 9999, rating: 4.9, reviewCount: 57, tagline: "A deeper violet made for the front row." }
];

additionalCollections.forEach((collection, index) => {
  const source = products[index % products.length];
  products.push({
    ...source,
    ...collection,
    id: source.id + 6,
    badge: "NEW COLLECTION",
    discount: Math.round((1 - collection.price / collection.originalPrice) * 100),
    caseColor: collection.colorHex,
    colors: [
      { name: collection.colorName, hex: collection.colorHex, secondary: collection.colorHex },
      ...source.colors.slice(0, 2)
    ],
    description: `${collection.tagline} Finished with the Bangtan emblem and tuned for signature sound.`,
    image: ""
  });
});

const atelierSeries = [
  { name: "Prism Fin", colorHex: "#7f1d5a", colorName: "Prism Fin", category: "gaming", modelStyle: "fin", price: 6799, originalPrice: 9299, rating: 4.8, reviewCount: 41, tagline: "A sculpted fin profile with concert-grade clarity." },
  { name: "Ribbon Air", colorHex: "#a78bfa", colorName: "Ribbon Air", category: "sport", modelStyle: "ribbon", price: 6299, originalPrice: 8499, rating: 4.7, reviewCount: 36, tagline: "An open arc, featherweight in form and feel." },
  { name: "Shell No. 7", colorHex: "#be185d", colorName: "Shell No. 7", category: "true-wireless", modelStyle: "shell", price: 7199, originalPrice: 9799, rating: 4.9, reviewCount: 52, tagline: "Layered, nacreous contours with a soft-touch finish." },
  { name: "Open Horizon", colorHex: "#0891b2", colorName: "Open Horizon", category: "sport", modelStyle: "openfit", price: 5999, originalPrice: 7999, rating: 4.6, reviewCount: 29, tagline: "An airy open-fit silhouette for all-day listening." },
  { name: "Halo Studio", colorHex: "#d4a574", colorName: "Halo Studio", category: "noise-canceling", modelStyle: "stud", price: 7699, originalPrice: 10499, rating: 4.9, reviewCount: 44, tagline: "A luminous ear-stud profile, tuned for quiet focus." },
  { name: "Violet Fusion", colorHex: "#6d28d9", colorName: "Violet Fusion", category: "gaming", modelStyle: "fusion", price: 8299, originalPrice: 11299, rating: 5.0, reviewCount: 31, tagline: "Faceted precision with a vivid violet pulse." }
];

atelierSeries.forEach((collection, index) => {
  const source = products[(index + 2) % 6];
  products.push({
    ...source,
    ...collection,
    id: index + 13,
    badge: "ATELIER SERIES",
    discount: Math.round((1 - collection.price / collection.originalPrice) * 100),
    caseColor: collection.colorHex,
    colors: [
      { name: collection.colorName, hex: collection.colorHex, secondary: collection.colorHex },
      ...source.colors.slice(0, 2)
    ],
    description: `${collection.tagline} Finished with the Bangtan emblem and signature audio tuning.`,
    image: ""
  });
});

export const categories = [
  { id: "all", label: "All" },
  { id: "true-wireless", label: "True Wireless" },
  { id: "noise-canceling", label: "Noise Canceling" },
  { id: "gaming", label: "Gaming" },
  { id: "sport", label: "Sport" }
];
