import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BestSellers from './components/BestSellers';
import MoreThanMusic from './components/MoreThanMusic';
import OfficialVideoPlayer from './components/OfficialVideoPlayer';
import MoreThanEarbuds from './components/MoreThanEarbuds';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';
import SearchModal from './components/SearchModal';
import { useCart } from './context/CartContext';
import WelcomePage from './components/WelcomePage';
import { useAuth } from './context/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Toast notification banner
function GlobalToast() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="px-5 py-3 rounded-2xl bg-[#0f0f18] border border-purple-500/60 text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <MoreThanMusic />
      <OfficialVideoPlayer />
      <MoreThanEarbuds />
    </main>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/" replace state={{ from: location }} />;
}

function SignInRoute({ initialTab = 'login' }) {
  const { isAuthenticated, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <LoginModal
      isStandalone
      initialTab={initialTab}
      onAuthenticated={(rememberMe) => {
        signIn(rememberMe);
        navigate(location.state?.from?.pathname || '/', { replace: true });
      }}
    />
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#07070b] text-[#e2e8f0] flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      <ScrollToTop />

      {isAuthenticated && <>
        <Navbar onSignOut={signOut} onOpenSearch={() => setIsSearchOpen(true)} />
        <Cart isStandalone={false} />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </>}
      <GlobalToast />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <WelcomePage />} />
          <Route path="/login" element={<SignInRoute />} />
          <Route path="/signup" element={<SignInRoute initialTab="signup" />} />
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart isStandalone /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {isAuthenticated && <Footer />}
    </div>
  );
}
