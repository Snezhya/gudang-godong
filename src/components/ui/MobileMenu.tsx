'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  storeOpen: boolean;
  totalQty: number;
  onClose: () => void;
  onNavigate: (href: string) => void;
  onOpenCart: () => void;
  links: Array<{ label: string; href: string }>;
}

export default function MobileMenu({
  isOpen,
  activeSection,
  storeOpen,
  totalQty,
  onClose,
  onNavigate,
  onOpenCart,
  links
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-16 left-0 right-0 z-40 lg:hidden glass mx-3 mt-2 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(201,169,110,0.12)' }}
        >
          <div className="p-4 flex flex-col gap-1">
            {links.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.button
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    onNavigate(link.href);
                    onClose();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all hover:bg-white/5"
                  style={{ color: isActive ? '#c9a96e' : '#b8a090' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #c8612a, #c9a96e)'
                        : 'rgba(201,169,110,0.3)',
                    }}
                  />
                  {link.label}
                </motion.button>
              );
            })}

            <div className="border-t border-white/5 mt-2 pt-3 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${storeOpen ? 'status-dot-open' : 'status-dot-close'}`} />
                <span style={{ color: storeOpen ? '#4ade80' : '#ef4444' }}>
                  {storeOpen ? 'Sedang Buka' : 'Sedang Tutup'}
                </span>
              </div>
              <button
                onClick={() => {
                  onOpenCart();
                  onClose();
                }}
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
  );
}
