'use client';
// src/components/ui/CartSidebar.tsx

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/contexts/StoreContext';
import { formatRupiah } from '@/lib/storage';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function CartSidebar() {
  const pathname = usePathname();
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalQty, clearCart } = useCart();
  const { storeOpen, settings } = useStore();

  const scrollToOrder = () => {
    closeCart();
    setTimeout(() => {
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[60] w-full xs:w-[380px] max-w-full flex flex-col"
            style={{
              background: '#1a1616',
              borderLeft: '1px solid rgba(201,169,110,0.1)',
              width: 'min(100vw, 380px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#c9a96e]" />
                <h2 className="font-display text-lg font-semibold text-[#ede0d3]">Keranjang</h2>
                {totalQty > 0 && (
                  <span
                    className="px-2 py-0.5 text-xs font-bold text-white rounded-full"
                    style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)' }}
                  >
                    {totalQty}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1 text-xs text-[#7a6558] hover:text-[#ef4444] transition-colors"
                  >
                    <Trash2 size={12} />
                    Kosongkan
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X size={18} className="text-[#b8a090]" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 text-center py-16"
                  >
                    <div className="text-5xl">🛒</div>
                    <p className="text-[#7a6558] text-sm">Keranjang masih kosong</p>
                    <button
                      onClick={() => {
                        closeCart();
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-secondary text-sm px-5 py-2"
                    >
                      Lihat Menu
                    </button>
                  </motion.div>
                ) : (
                  items.map(({ item, qty }) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,169,110,0.07)' }}
                    >
                      {/* Image */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#211919]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=7a1e1e&color=ede0d3&size=56&bold=true`;
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#ede0d3] truncate">{item.name}</p>
                        <p className="text-xs text-[#c9a96e] font-semibold mt-0.5">{formatRupiah(item.price)}</p>
                        <p className="text-xs text-[#7a6558] mt-0.5">Subtotal: {formatRupiah(item.price * qty)}</p>
                      </div>

                      {/* Qty + Delete */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#7a6558] hover:text-[#ef4444] transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.id, qty - 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                            style={{ border: '1px solid rgba(201,169,110,0.15)' }}
                          >
                            <Minus size={10} className="text-[#c9a96e]" />
                          </button>
                          <span className="text-sm font-bold text-[#ede0d3] w-5 text-center">{qty}</span>
                          <button
                            onClick={() => updateQty(item.id, qty + 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
                            style={{ border: '1px solid rgba(201,169,110,0.15)' }}
                          >
                            <Plus size={10} className="text-[#c9a96e]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-4 py-4 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#b8a090] text-sm">Total ({totalQty} item)</span>
                  <span className="font-display text-lg font-bold text-[#c9a96e]">{formatRupiah(totalPrice)}</span>
                </div>

                {!storeOpen && (
                  <p className="text-xs text-[#ef4444] text-center py-1">
                    ⚠ Toko sedang tutup • Buka {settings.openTime} – {settings.closeTime}
                  </p>
                )}

                <button
                  onClick={scrollToOrder}
                  disabled={!storeOpen}
                  className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Lanjut Pesan
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
