'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { User, Users, Calendar, Clock, StickyNote } from 'lucide-react';

export default function BookingSection() {
  const { settings } = useStore();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    guests: 2,
    date: '',
    time: '',
    note: ''
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleBooking = () => {
    if (!formData.name || !formData.date || !formData.time) {
      alert('Mohon lengkapi nama, tanggal, dan jam reservasi.');
      return;
    }

    let text = `Halo *Gudang Godong Kitchen*, saya ingin reservasi tempat:\n\n`;
    text += `*Nama:* ${formData.name}\n`;
    text += `*Jumlah Orang:* ${formData.guests} Orang\n`;
    text += `*Tanggal:* ${formData.date}\n`;
    text += `*Jam:* ${formData.time}\n`;
    
    if (formData.note) {
      text += `*Catatan:* ${formData.note}\n`;
    }

    text += `\nMohon konfirmasi ketersediaan tempat. Terima kasih!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${settings.waNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section ref={sectionRef} id="booking" className="py-16 md:py-24 relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: '#0d0b0b' }} />
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionTitle title="Booking Tempat" subtitle="— Reservasi —" align="center" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 md:p-10 rounded-3xl max-w-2xl mx-auto relative overflow-hidden shadow-2xl"
        >
          {/* Glassmorphism modal highlight effect */}
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #7a1e1e, #c8612a, #c9a96e)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at 50% -20%, #c9a96e, transparent 60%)' }} />
          
          <div className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nama */}
              <div className="relative">
                <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Nama Pemesan</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6558]" />
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="input-dark pl-11 w-full rounded-xl transition-all focus:ring-1 focus:ring-[#c9a96e]"
                  />
                </div>
              </div>

              {/* Jumlah Orang */}
              <div className="relative">
                <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Jumlah Orang</label>
                <div className="relative flex items-center">
                  <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6558]" />
                  <div className="input-dark pl-11 pr-3 w-full rounded-xl flex items-center justify-between border border-white/5">
                    <span className="text-sm text-[#ede0d3]">{formData.guests} Orang</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-[#c8612a]/20 text-[#c9a96e] transition-colors"
                      >-</button>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, guests: prev.guests + 1 }))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-[#c8612a]/20 text-[#c9a96e] transition-colors"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tanggal */}
              <div className="relative">
                <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Tanggal</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6558]" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="input-dark pl-11 w-full rounded-xl text-sm transition-all focus:ring-1 focus:ring-[#c9a96e]"
                  />
                </div>
              </div>

              {/* Jam */}
              <div className="relative">
                <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Jam</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6558]" />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="input-dark pl-11 w-full rounded-xl text-sm transition-all focus:ring-1 focus:ring-[#c9a96e]"
                  />
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="relative">
              <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Catatan Tambahan</label>
              <div className="relative">
                <StickyNote size={16} className="absolute left-4 top-4 text-[#7a6558]" />
                <textarea
                  placeholder="Ada request khusus? (Opsional)"
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="input-dark pl-11 pt-3.5 w-full min-h-[100px] rounded-xl resize-none transition-all focus:ring-1 focus:ring-[#c9a96e]"
                />
              </div>
            </div>

            <AnimatedButton onClick={handleBooking} fullWidth variant="primary" className="mt-6 py-4 shadow-lg shadow-[#c8612a]/20">
              Konfirmasi Reservasi
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
