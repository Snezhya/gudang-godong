'use client';
// src/components/sections/AboutSection.tsx

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fakeReviews } from '@/data/menuData';

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const step = () => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (frame < totalFrames) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const STATS = [
  { target: 1200, suffix: '+', label: 'Pelanggan Puas' },
  { target: 4,    suffix: '+', label: 'Tahun Beroperasi' },
  { target: 20,   suffix: '+', label: 'Pilihan Menu' },
  { target: 98,   suffix: '%', label: 'Rating Kepuasan' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'text-[#c9a96e]' : 'text-[#7a6558]'}
          fill={i <= rating ? '#c9a96e' : 'none'}
        />
      ))}
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle reviews
  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % fakeReviews.length), 4000);
    return () => clearInterval(t);
  }, []);

  const c0 = useCounter(STATS[0].target, 2, revealed);
  const c1 = useCounter(STATS[1].target, 1.5, revealed);
  const c2 = useCounter(STATS[2].target, 1.2, revealed);
  const c3 = useCounter(STATS[3].target, 1.8, revealed);
  const counts = [c0, c1, c2, c3];

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(200,97,42,0.06) 0%, transparent 70%),
            linear-gradient(to bottom, transparent, rgba(122,30,30,0.04), transparent)
          `,
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
          <p className="text-[#c8612a] text-sm font-semibold tracking-widest uppercase mb-3">— Tentang Kami —</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#ede0d3] mb-4">
            Rasa Rumahan, Kualitas Premium
          </h2>
          <p className="text-[#7a6558] text-sm max-w-lg mx-auto leading-relaxed">
            Gudang Godong Kitchen hadir dengan misi sederhana: menyajikan masakan rumahan Jawa yang hangat, lezat, dan terjangkau — di tempat yang nyaman untuk semua kalangan.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — about text + pillars */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6 mb-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)' }}
                >
                  🍃
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#ede0d3] mb-2">Cerita Kami</h3>
                  <p className="text-[#7a6558] text-sm leading-relaxed">
                    Berawal dari dapur rumahan yang penuh kehangatan, Gudang Godong Kitchen kini melayani ratusan pelanggan setiap harinya. Kami percaya bahwa makanan terbaik lahir dari tangan yang memasak dengan hati.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pillars */}
            {[
              { emoji: '🏡', title: 'Nuansa Hangat', desc: 'Tempat makan yang nyaman, terasa seperti di rumah sendiri.' },
              { emoji: '👨‍🍳', title: 'Masakan Rumahan', desc: 'Resep tradisional Jawa yang diwariskan turun-temurun.' },
              { emoji: '👨‍👩‍👧', title: 'Cocok Semua Usia', desc: 'Dari anak-anak hingga orang tua, semua menu cocok untuk keluarga.' },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={revealed ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3 mb-4"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{p.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-[#ede0d3]">{p.title}</p>
                  <p className="text-xs text-[#7a6558] mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — stats + reviews */}
          <div>
            {/* Stats counter grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-3 mb-6"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-4 text-center"
                  style={{ borderRadius: '16px' }}
                >
                  <div className="font-display text-2xl font-bold gradient-text">
                    {counts[i]}{stat.suffix}
                  </div>
                  <div className="text-[#7a6558] text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Review carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xs text-[#7a6558] mb-3 flex items-center gap-2">
                <Star size={11} className="text-[#c9a96e]" fill="#c9a96e" />
                Ulasan Pelanggan
              </p>

              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,169,110,0.1)',
                  minHeight: 140,
                }}
              >
                <motion.div
                  key={reviewIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)', color: 'white' }}
                    >
                      {fakeReviews[reviewIdx].avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#ede0d3]">{fakeReviews[reviewIdx].name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={fakeReviews[reviewIdx].rating} />
                        <span className="text-[10px] text-[#7a6558]">{fakeReviews[reviewIdx].date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#b8a090] leading-relaxed">
                    &quot;{fakeReviews[reviewIdx].comment}&quot;
                  </p>
                </motion.div>

                {/* Dots */}
                <div className="flex justify-center gap-1.5 pb-3">
                  {fakeReviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIdx(i)}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{
                        background: i === reviewIdx ? '#c9a96e' : 'rgba(201,169,110,0.2)',
                        transform: i === reviewIdx ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
