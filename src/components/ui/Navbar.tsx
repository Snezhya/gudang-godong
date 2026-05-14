'use client';
// src/components/ui/Navbar.tsx

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/contexts/StoreContext';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Menu',     href: '#menu' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'About',    href: '#about' },
  { label: 'Booking',  href: '#booking' },
  { label: 'Kontak',   href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalQty, openCart } = useCart();
  const { storeOpen }          = useStore();
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [active, setActive]       = useState('home');
  const prevY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      prevY.current = y;

      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobile(false);
  };

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 2.8 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(13, 11, 11, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.08)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-transform group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)' }}
              >
                <Leaf size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg md:text-xl text-[#ede0d3] leading-tight tracking-wide">
                  GG. Gudang Godong
                </span>
                <span className="text-[#c9a96e] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-semibold">
                  Warung Makan
                </span>
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
                    style={{ color: isActive ? '#c9a96e' : '#b8a090' }}
                  >
                    <span className="relative z-10 group-hover:text-[#ede0d3] transition-colors">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.1)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    {/* Hover underline */}
                    <span
                      className="absolute bottom-1 left-4 right-4 h-px rounded-full transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ background: 'linear-gradient(to right, #c8612a, #c9a96e)' }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Store status */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${storeOpen ? 'status-dot-open' : 'status-dot-close'}`}
                />
                <span style={{ color: storeOpen ? '#4ade80' : '#ef4444' }}>
                  {storeOpen ? 'Buka' : 'Tutup'}
                </span>
              </div>

              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-xl transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(201,169,110,0.1)' }}
              >
                <ShoppingCart size={18} className="text-[#c9a96e]" />
                {totalQty > 0 && (
                  <motion.span
                    key={totalQty}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="badge-pulse absolute -top-1 -right-1 w-4.5 h-4.5 text-[10px] font-bold text-white rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #7a1e1e, #c8612a)',
                      minWidth: '18px',
                      height: '18px',
                      lineHeight: 1,
                      padding: '0 4px',
                    }}
                  >
                    {totalQty}
                  </motion.span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobile(p => !p)}
                className="lg:hidden p-2 rounded-xl transition-colors hover:bg-white/5"
                style={{ border: '1px solid rgba(201,169,110,0.1)' }}
              >
                {mobileOpen
                  ? <X size={18} className="text-[#c9a96e]" />
                  : <Menu size={18} className="text-[#c9a96e]" />
                }
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden glass mx-3 mt-2 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,169,110,0.12)' }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all hover:bg-white/5"
                  style={{ color: active === link.href.slice(1) ? '#c9a96e' : '#b8a090' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: active === link.href.slice(1)
                        ? 'linear-gradient(135deg, #c8612a, #c9a96e)'
                        : 'rgba(201,169,110,0.3)',
                    }}
                  />
                  {link.label}
                </motion.button>
              ))}

              <div className="border-t border-white/5 mt-2 pt-3 flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className={`w-1.5 h-1.5 rounded-full ${storeOpen ? 'status-dot-open' : 'status-dot-close'}`} />
                  <span style={{ color: storeOpen ? '#4ade80' : '#ef4444' }}>
                    {storeOpen ? 'Sedang Buka' : 'Sedang Tutup'}
                  </span>
                </div>
                <button
                  onClick={openCart}
                  className="flex items-center gap-2 text-xs text-[#c9a96e] font-medium"
                >
                  <ShoppingCart size={14} />
                  Keranjang {totalQty > 0 && `(${totalQty})`}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
