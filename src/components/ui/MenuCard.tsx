'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '@/data/menuData';
import { formatRupiah } from '@/lib/storage';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — disable tilt effect on mobile
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouch && setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: hover && !isTouch
          ? `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(4px)`
          : 'perspective(600px) rotateX(0) rotateY(0)',
        transition: hover && !isTouch ? 'transform 0.1s ease' : 'transform 0.4s ease',
      }}
      className="glass-card overflow-hidden group cursor-default flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1c1515] flex-shrink-0 border-b border-white/5">
        {item.image && item.image.startsWith('data:') ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=1c1515&color=c9a96e&size=400&bold=true`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#7a6558] opacity-30">
            🍽
          </div>
        )}
        
        {/* Subtle gradient overlay for cinematic feel */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(13,11,11,0.8) 0%, transparent 40%)' }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.popular && (
            <span className="badge-popular text-[10px] px-2.5 py-0.5 shadow-md">
              <Star size={10} fill="white" className="mr-0.5" /> Populer
            </span>
          )}
        </div>
        
        {/* Category chip top-right */}
        <span
          className="absolute top-3 right-3 px-2.5 py-0.5 text-[10px] font-medium rounded-full capitalize z-10 shadow-md"
          style={{
            background: 'rgba(28,21,21,0.75)',
            color: '#c9a96e',
            border: '1px solid rgba(201,169,110,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-[#ede0d3] text-base sm:text-lg leading-snug mb-1.5 line-clamp-2">
          {item.name}
        </h3>
        
        {item.description && (
          <p className="text-[#b8a090] text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-4 opacity-80">
            {item.description}
          </p>
        )}
        
        <div className="flex items-end justify-between mt-auto pt-4 gap-3 border-t border-white/5">
          <span
            className="font-display font-bold text-sm sm:text-base tracking-wide flex-shrink-0"
            style={{ color: '#dfc08a' }}
          >
            {formatRupiah(item.price)}
          </span>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 min-h-[36px]"
            style={{
              background: added
                ? 'linear-gradient(135deg, #2d6a4f, #4ade80)'
                : 'linear-gradient(135deg, #7a1e1e, #c8612a)',
              color: 'white',
              boxShadow: added ? '0 4px 12px rgba(74,222,128,0.2)' : '0 4px 12px rgba(200,97,42,0.15)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {added
              ? <><span>✓</span> <span className="hidden sm:inline">Masuk Keranjang</span></>
              : <><Plus size={14} /> <span>Tambah</span></>
            }
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
