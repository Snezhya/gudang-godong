'use client';

import { useState, useRef } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: hover
          ? `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(4px)`
          : 'perspective(600px) rotateX(0) rotateY(0)',
        transition: hover ? 'transform 0.1s ease' : 'transform 0.4s ease',
      }}
      className="glass-card overflow-hidden group cursor-default"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-[#211919]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=211919&color=c9a96e&size=200&bold=true&font-size=0.3`;
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'linear-gradient(to top, #211919 0%, transparent 60%)' }}
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {item.popular && (
            <span className="badge-popular">
              <Star size={9} fill="white" /> Populer
            </span>
          )}
        </div>
        {/* Category chip top-right */}
        <span
          className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-medium rounded-full capitalize"
          style={{
            background: 'rgba(0,0,0,0.5)',
            color: '#c9a96e',
            border: '1px solid rgba(201,169,110,0.2)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-[#ede0d3] text-sm leading-snug mb-1 truncate">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-[#7a6558] text-xs leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="font-display font-bold text-base"
            style={{ color: '#c9a96e' }}
          >
            {formatRupiah(item.price)}
          </span>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: added
                ? 'linear-gradient(135deg, #2d6a4f, #4ade80)'
                : 'linear-gradient(135deg, #7a1e1e, #c8612a)',
              color: 'white',
              boxShadow: added ? '0 4px 12px rgba(74,222,128,0.3)' : '0 4px 12px rgba(200,97,42,0.25)',
            }}
          >
            {added
              ? <><span>✓</span> Ditambah</>
              : <><Plus size={12} /> Tambah</>
            }
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
