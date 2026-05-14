'use client';
// src/components/sections/MenuSection.tsx

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, X } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/data/menuData';
import { formatRupiah } from '@/lib/storage';
import { toast } from 'sonner';
import MenuCard from '@/components/ui/MenuCard';
import SectionTitle from '@/components/ui/SectionTitle';

type Category = 'semua' | 'makanan' | 'minuman' | 'snack';

const CATS: { key: Category; label: string; emoji: string }[] = [
  { key: 'semua',   label: 'Semua',   emoji: '🍽' },
  { key: 'makanan', label: 'Makanan', emoji: '🍛' },
  { key: 'minuman', label: 'Minuman', emoji: '🥤' },
  { key: 'snack',   label: 'Snack',   emoji: '🍟' },
];



export default function MenuSection() {
  const { menu }     = useStore();
  const { addItem, openCart } = useCart();
  const [category, setCategory] = useState<Category>('semua');
  const [search, setSearch]     = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = menu.filter(item => {
    const matchCat = category === 'semua' || item.category === category;
    const matchSrc = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrc;
  });

  const handleAdd = useCallback((item: MenuItem) => {
    addItem(item);
    toast.success(`${item.name} ditambahkan ke keranjang!`, {
      description: formatRupiah(item.price),
      action: {
        label: 'Lihat Keranjang',
        onClick: openCart,
      },
      duration: 2500,
    });
  }, [addItem, openCart]);

  return (
    <section ref={sectionRef} id="menu" className="py-20 md:py-28 relative">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(122,30,30,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionTitle 
            title="Menu Andalan Kami"
            subtitle="— Pilihan Menu —"
            align="center"
          />
          <p className="text-[#7a6558] max-w-md mx-auto text-sm leading-relaxed mt-4">
            Masakan rumahan penuh cita rasa, disiapkan segar setiap hari dengan bahan berkualitas pilihan.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6558]" />
            <input
              type="text"
              placeholder="Cari menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-dark pl-9 pr-8 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6558] hover:text-[#ede0d3]"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {CATS.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`category-chip flex-shrink-0 flex items-center gap-1.5 ${category === cat.key ? 'active' : ''}`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Result count */}
        {search && (
          <p className="text-xs text-[#7a6558] mb-5">
            {filtered.length} hasil untuk &quot;<span className="text-[#c9a96e]">{search}</span>&quot;
          </p>
        )}

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${category}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                >
                  <MenuCard item={item} onAdd={handleAdd} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🍽</div>
              <p className="text-[#7a6558] text-sm">Menu tidak ditemukan</p>
              <button
                onClick={() => { setSearch(''); setCategory('semua'); }}
                className="btn-ghost mt-4 text-xs px-4 py-2"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button onClick={openCart} className="btn-primary gap-2">
              <ShoppingCart size={16} />
              Lihat Keranjang Pesanan
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
