'use client';
// src/components/sections/HeroSection.tsx

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, MapPin, Phone, Calendar } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import AnimatedButton from '@/components/ui/AnimatedButton';


const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 8,
  duration: Math.random() * 8 + 10,
  opacity: Math.random() * 0.4 + 0.1,
  color: i % 3 === 0 ? '#c9a96e' : i % 3 === 1 ? '#c8612a' : '#7a1e1e',
}));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function HeroSection() {
  const { storeOpen, settings } = useStore();
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const badgeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });

      tl.fromTo(badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
      .fromTo(titleRef.current?.querySelectorAll('.word') ?? [],
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power4.out' },
        '-=0.2'
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(ctaRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0d0b0b]" />
        
        {/* Subtle cinematic glow */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(122,30,30,0.15) 0%, transparent 60%)'
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Large glow orbs */}
        <motion.div
          className="absolute rounded-full w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[520px] md:h-[520px]"
          style={{
            background: 'radial-gradient(circle, rgba(122,30,30,0.15) 0%, transparent 70%)',
            top: '-10%', left: '50%', transform: 'translateX(-50%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96"
          style={{
            background: 'radial-gradient(circle, rgba(200,97,42,0.08) 0%, transparent 70%)',
            bottom: '10%', right: '5%',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: '-20px',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container relative z-10 text-center px-4">
        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <div ref={badgeRef} style={{ opacity: 0 }} className="inline-flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(201,169,110,0.08)',
                border: '1px solid rgba(201,169,110,0.2)',
                color: '#c9a96e',
              }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${storeOpen ? 'status-dot-open' : 'status-dot-close'}`}
              />
              {storeOpen
                ? `Sedang Buka • Tutup ${settings.closeTime}`
                : `Sedang Tutup • Buka ${settings.openTime}`}
                 <span className="text-white hidden sm:inline">• Warung Makan Autentik</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display font-bold leading-[1.05] mb-6 overflow-hidden"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)' }}
        >
          {'Warung Makan GG.'.split(' ').map((word, i) => (
            <span key={i} className="word inline-block" style={{ opacity: 0 }}>
              {word}&nbsp;
            </span>
          ))}
          <br className="hidden sm:block" />
          {'Gudang Godong'.split(' ').map((word, i) => (
            <span key={i + 10} className="word inline-block gradient-text" style={{ opacity: 0 }}>
              {word}&nbsp;
            </span>
          ))}
        </h1>

        <motion.p
          ref={subtitleRef}
          className="text-[#b8a090] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Menyajikan hidangan rumahan autentik Indonesia dengan cita rasa premium, dalam suasana hangat yang elegan. Pesan antar, ambil sendiri, atau reservasi meja Anda sekarang.
        </motion.p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 px-4">
          <div style={{ opacity: 0 }} className="w-full sm:w-auto">
            <AnimatedButton onClick={() => scrollTo('menu')} variant="primary" className="w-full sm:w-auto px-8 py-3 text-lg">
              <span>🍽</span> Pesan Sekarang
            </AnimatedButton>
          </div>
          <div style={{ opacity: 0 }} className="w-full sm:w-auto">
            <AnimatedButton onClick={() => scrollTo('booking')} variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg">
              <Calendar size={18} /> Booking Tempat
            </AnimatedButton>
          </div>
        </div>

        {/* Quick info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#7a6558]"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#c8612a]" />
            <span>Karanganyar, Jawa Tengah</span>
          </div>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Phone size={12} className="text-[#c8612a]" />
            <span>{settings.waNumber}</span>
          </div>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <span>🕐</span>
            <span>{settings.openTime} – {settings.closeTime} WIB</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2 }}
        onClick={() => scrollTo('menu')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#7a6558] hover:text-[#c9a96e] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
