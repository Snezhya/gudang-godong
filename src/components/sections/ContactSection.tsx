'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import SectionTitle from '@/components/ui/SectionTitle';
import { MapPin, Phone, Clock, Camera } from 'lucide-react';

export default function ContactSection() {
  const { settings } = useStore();
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

  const CONTACT_CARDS = [
    {
      icon: <Phone size={20} />,
      title: 'WhatsApp',
      value: '+62 858-7689-4023',
      action: () => window.open(`https://wa.me/6285876894023`, '_blank'),
      color: '#25D366'
    },
    {
      icon: <Camera size={20} />,
      title: 'Instagram',
      value: '@gudang_godong',
      action: () => window.open(`https://instagram.com/`, '_blank'),
      color: '#E1306C'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Lokasi Kami',
      value: 'Buka di Google Maps',
      action: () => window.open(`https://www.google.com/maps/place/Rm.+GG.+Gudang+Godong/`, '_blank'),
      color: '#4285F4'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-28 relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: '#0d0b0b' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionTitle title="Hubungi Kami" subtitle="— Kontak & Lokasi —" align="center" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info Area */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden h-full flex flex-col justify-center"
            >
              <div className="absolute -right-10 -top-10 text-[120px] opacity-5 pointer-events-none">📍</div>
              <h3 className="font-display text-2xl font-bold text-[#ede0d3] mb-2">Warung Makan GG. Gudang Godong</h3>
              <p className="text-[#b8a090] text-sm leading-relaxed mb-8">
                Ikuti perjalanan kuliner kami atau sapa kami secara langsung. Kami siap menyambut Anda dengan kehangatan khas rumahan autentik.
              </p>

              <div className="flex items-start gap-4 p-5 rounded-xl mb-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,169,110,0.1)' }}>
                <Clock size={28} className="text-[#c9a96e] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#ede0d3] mb-1">Jam Operasional</h4>
                  <p className="text-sm text-[#7a6558]">Buka Setiap Hari</p>
                  <p className="text-xl font-display font-bold text-[#c8612a] mt-2 tracking-wide">{settings.openTime} - {settings.closeTime} WIB</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {CONTACT_CARDS.map((card, i) => (
                  <button
                    key={i}
                    onClick={card.action}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: `${card.color}15`, color: card.color }}>
                      {card.icon}
                    </div>
                    <span className="text-[11px] text-[#7a6558] mb-1 uppercase tracking-widest">{card.title}</span>
                    <span className="text-xs font-semibold text-[#ede0d3] text-center">{card.value}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Maps Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden glass-card p-2"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden relative group">
              <iframe
                src="https://maps.google.com/maps?q=Rm.+GG.+Gudang+Godong&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px', filter: 'grayscale(0.6) contrast(1.2) sepia(0.2)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-700 group-hover:filter-none"
              ></iframe>
              {/* Overlay styling for the cinematic feel */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(13,11,11,0.9)]" />
              <div className="absolute inset-0 pointer-events-none bg-[#7a1e1e] mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
