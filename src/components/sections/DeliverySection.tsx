'use client';
// src/components/sections/DeliverySection.tsx

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Bike, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { formatRupiah } from '@/lib/storage';

const AREA_MARKERS = [
  { label: 'Pusat', angle: 0,    r: 0,   color: '#c9a96e' },
  { label: 'Ring 1', angle: 45,  r: 30,  color: '#c8612a' },
  { label: 'Ring 2', angle: 135, r: 55,  color: '#9b2828' },
  { label: 'Ring 3', angle: 225, r: 75,  color: '#7a1e1e' },
  { label: 'Ring 4', angle: 315, r: 40,  color: '#c8612a' },
];

export default function DeliverySection() {
  const { settings } = useStore();
  const sectionRef   = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const DELIVERY_AREAS = [
    { name: 'Kelurahan Sekitar',       distance: '0–2 km',  time: '15–25 mnt', fee: formatRupiah(settings.baseDeliveryFee) },
    { name: 'Kecamatan Terdekat',      distance: '2–4 km',  time: '25–35 mnt', fee: formatRupiah(settings.baseDeliveryFee + 2 * settings.feePerKm) },
    { name: 'Kabupaten Karanganyar',   distance: '4–5 km',  time: '35–45 mnt', fee: formatRupiah(Math.min(settings.baseDeliveryFee + 4 * settings.feePerKm, settings.maxDeliveryFee)) },
    { name: 'Luar Radius', distance: `>${settings.deliveryRadius} km`, time: '—', fee: 'Tidak tersedia' },
  ];

  return (
    <section ref={sectionRef} id="delivery" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(122,30,30,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#c8612a] text-sm font-semibold tracking-widest uppercase mb-3">— Pengantaran —</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#ede0d3] mb-4">
            Jangkauan Delivery
          </h2>
          <p className="text-[#7a6558] text-sm max-w-md mx-auto">
            Kami melayani pengantaran dalam radius <span className="text-[#c9a96e] font-semibold">{settings.deliveryRadius} km</span> dari lokasi restoran.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual radius map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={revealed ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Rings */}
              {[1, 0.72, 0.5, 0.28].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    transform: `scale(${scale})`,
                    borderColor: i === 0 ? 'rgba(122,30,30,0.25)' : `rgba(122,30,30,${0.12 + i * 0.05})`,
                    background: i === 3
                      ? 'radial-gradient(circle, rgba(122,30,30,0.15) 0%, transparent 70%)'
                      : 'transparent',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={revealed ? { scale, opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                />
              ))}

              {/* Animated pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#c8612a]/20"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Center point */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={revealed ? { scale: 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
                  className="relative"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative"
                    style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)' }}
                  >
                    <MapPin size={20} className="text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)' }}
                    animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Distance labels */}
              {[
                { label: `${Math.round(settings.deliveryRadius * 0.3)} km`, pos: 'top-8 left-1/2 -translate-x-1/2' },
                { label: `${Math.round(settings.deliveryRadius * 0.6)} km`, pos: 'top-1/2 right-6 -translate-y-1/2' },
                { label: `${settings.deliveryRadius} km`,                   pos: 'bottom-4 left-1/2 -translate-x-1/2' },
              ].map((d, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={revealed ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`absolute text-[10px] font-semibold text-[#7a6558] ${d.pos}`}
                >
                  {d.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="space-y-4">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 mb-6"
            >
              {[
                { icon: <MapPin size={16} />, label: 'Radius', value: `${settings.deliveryRadius} km` },
                { icon: <Clock size={16} />,  label: 'Estimasi', value: '20–45 mnt' },
                { icon: <Bike size={16} />,   label: 'Ongkir mulai', value: formatRupiah(settings.baseDeliveryFee) },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-3 text-center"
                  style={{ borderRadius: '14px' }}
                >
                  <div className="text-[#c8612a] flex justify-center mb-1.5">{stat.icon}</div>
                  <div className="font-display font-bold text-[#c9a96e] text-base">{stat.value}</div>
                  <div className="text-[#7a6558] text-[10px] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Area table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              {DELIVERY_AREAS.map((area, i) => {
                const available = area.fee !== 'Tidak tersedia';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={revealed ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    className="flex items-center justify-between p-3.5 rounded-xl"
                    style={{
                      background: available ? 'rgba(255,255,255,0.02)' : 'rgba(239,68,68,0.04)',
                      border: `1px solid ${available ? 'rgba(201,169,110,0.08)' : 'rgba(239,68,68,0.1)'}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {available
                        ? <CheckCircle size={14} className="text-[#4ade80] flex-shrink-0" />
                        : <XCircle size={14} className="text-[#ef4444] flex-shrink-0" />
                      }
                      <div>
                        <p className="text-sm font-medium text-[#ede0d3]">{area.name}</p>
                        <p className="text-xs text-[#7a6558]">{area.distance} • {area.time}</p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: available ? '#c9a96e' : '#ef4444' }}
                    >
                      {area.fee}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-xs text-[#7a6558] pt-1"
            >
              * Ongkos kirim dihitung berdasarkan jarak. Estimasi waktu bisa berubah tergantung kondisi jalan dan cuaca.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
