# BANGTAN AUDIO — Luxury 3D Earbuds E-Commerce Website

> **"Feel every beat."**  
> A luxury, futuristic e-commerce web application for **BANGTAN AUDIO**, featuring real-time WebGL 3D interactive earbuds, studio acoustic engineering showcases, spatial soundstage audio simulations, and an audiophile shopping experience.

---

## 🌟 Highlights & Key Features

### 🎧 Real 3D Interactive Earbuds (Three.js WebGL)
- **Precision 3D Sculpted Earbuds**: Dual sculpted acoustic body with aerospace titanium & anodized violet physical PBR shaders, mirror chrome stems, magnetic charging contacts, capacitive touch rims, and glowing breathing LED halo.
- **Interactive 360° Orbit Drag**: Users can click/touch and orbit 360° around the earbuds in real-time.
- **Dynamic Colorway Customization**: Switch between *Obsidian Violet*, *Midnight Black*, *Chrome Mirror*, and *Phantom Rose* with instant PBR material updates.
- **Exploded Acoustic Architecture**: Interactive 3D exploded view separating the acoustic nozzle, 11mm dynamic planar transducer, and chassis.
- **Feel the Beat Simulator**: Soundwave pulse mode that syncs physical 3D vibration and rhythmic LED halo flashing to the music.

### 🌌 Luxury Aesthetic & Visual Direction
- **Palette**: Deep Obsidian Black (`#07070b`), Royal & Electric Violet (`#8b5cf6`, `#6d28d9`), and Polished Liquid Chrome (`#e2e8f0`).
- **Translucent Glassmorphism**: Tailored backdrop filters and subtle laser-etched borders reminiscent of Nothing's industrial aesthetic.
- **Cinematic Vignette & Studio Lighting**: 3-point key/fill/rim neon purple studio lighting.

### 🛍️ Comprehensive E-Commerce Functionality
1. **Interactive Hero Section**: 3D earbuds canvas, colorway selector, live tech stats (52h, -48dB ANC, 192kHz LDAC), and direct buy triggers.
2. **Sound Experience Stage**: Real-time soundstage mode switcher (360° Spatial Audio, -48dB ANC, Acoustic Transparency, Hi-Fi Lossless) with animated audio frequency spectrum visualizer.
3. **Product Catalog (`/products`)**:
   - Filter by categories (*Studio ANC*, *Daily Wireless*, *Sport & Fitness*, *Hi-Fi Planar*, *Gaming & VR*).
   - Real-time search by keyword, model, and transducer type.
   - Price range slider & sorting (Price Low/High, Rating, Featured).
   - Quick View preview modal.
4. **Dedicated Product Detail Page (`/product/:id`)**:
   - Toggle between interactive 3D orbit inspection and high-resolution multi-angle photography.
   - Technical specifications matrix (THD, latency, codecs, battery, IPX rating).
   - "In the Box" unboxing ritual items.
   - Verified customer ratings and interactive "Write a Review" evaluation modal.
   - Colorway selector and express checkout.
5. **Slide-Over Drawer & Dedicated Cart Page (`/cart`)**:
   - Quantity increment/decrement steppers and instant remove.
   - Promo coupon engine (try `BANGTAN25` for 25% off or `VIPBEAT` for $50 off).
   - Free worldwide shipping calculator.
   - Simulated Express Checkout with Apple Pay / credit card and real-time order confirmation tracking modal.
6. **VIP Account / Login UI (`/login`, `/signup`)**:
   - Glassmorphic modal & dedicated page.
   - Switch between VIP Sign In and VIP Registration.
   - Social authentication (Apple ID, Google).
7. **Brand Story (`/about`) & Concierge Support (`/contact`)**:
   - Seoul cleanroom acoustic manifesto.
   - Global listening showrooms (Seoul, Tokyo, New York, London).
   - Direct concierge inquiry form with instant submission feedback.
   - Interactive FAQ accordion.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism Theme
- **3D Graphics**: Three.js WebGL with PBR `MeshPhysicalMaterial`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Deployment Ready**: Netlify (`netlify.toml`, `_redirects`) & Vercel (`vercel.json`)

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---



## 💎 Design Philosophy: BANGTAN AUDIO
Designed for audiophiles and luxury design aficionados.
*“Zero distortion. Unadulterated musical truth.”*
