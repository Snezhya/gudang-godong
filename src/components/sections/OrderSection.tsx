'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/contexts/StoreContext';
import { formatRupiah } from '@/lib/storage';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { User, Phone, MapPin, StickyNote, Truck, ShoppingBag, Calendar, Banknote, CreditCard, QrCode } from 'lucide-react';

type OrderType = 'delivery' | 'pickup' | 'booking';
type PaymentMethod = 'cod' | 'transfer' | 'qris';

export default function OrderSection() {
  const { items, totalQty, totalPrice, clearCart } = useCart();
  const { settings } = useStore();
  
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer');
  const [distance, setDistance] = useState(0); // 0, 2, 4
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    date: '',
    time: ''
  });

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

  const getDeliveryFee = () => {
    if (orderType !== 'delivery') return 0;
    if (distance === 0) return settings.baseDeliveryFee;
    if (distance === 2) return settings.baseDeliveryFee + 2 * settings.feePerKm;
    return Math.min(settings.baseDeliveryFee + 4 * settings.feePerKm, settings.maxDeliveryFee);
  };

  const deliveryFee = getDeliveryFee();
  const finalTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    if (items.length === 0 && orderType !== 'booking') {
      alert('Keranjang Anda kosong!');
      return;
    }
    if (!formData.name || !formData.phone) {
      alert('Mohon lengkapi nama dan nomor telepon Anda.');
      return;
    }
    if (orderType === 'delivery' && !formData.address) {
      alert('Mohon lengkapi alamat pengiriman Anda.');
      return;
    }

    let text = `Halo *Gudang Godong Kitchen*, saya ingin pesan:\n\n`;
    text += `*Tipe Pesanan:* ${orderType === 'delivery' ? 'Delivery' : orderType === 'pickup' ? 'Ambil Sendiri' : 'Booking Tempat'}\n`;
    text += `*Nama:* ${formData.name}\n`;
    text += `*No. HP:* ${formData.phone}\n`;
    
    if (orderType === 'booking') {
      text += `*Tanggal:* ${formData.date}\n`;
      text += `*Jam:* ${formData.time}\n`;
    } else if (orderType === 'delivery') {
      text += `*Alamat:* ${formData.address}\n`;
      text += `*Jarak:* ${distance === 0 ? '0-2 km' : distance === 2 ? '2-4 km' : distance === 4 ? '4-5 km' : distance + ' km'}\n`;
    }

    if (formData.note) {
      text += `*Catatan:* ${formData.note}\n`;
    }

    text += `\n*Detail Pesanan:*\n`;
    items.forEach(({ item, qty }) => {
      text += `- ${qty}x ${item.name} (${formatRupiah(item.price * qty)})\n`;
    });

    text += `\n*Subtotal:* ${formatRupiah(totalPrice)}\n`;
    if (orderType === 'delivery') {
      text += `*Ongkir:* ${formatRupiah(deliveryFee)}\n`;
    }
    text += `*Total Pembayaran:* ${formatRupiah(finalTotal)}\n`;
    
    const pmMap = {
      cod: 'Bayar di Tempat (COD)',
      transfer: 'Transfer Bank',
      qris: 'QRIS'
    };
    text += `*Metode Pembayaran:* ${pmMap[paymentMethod]}\n\n`;
    text += `Mohon segera diproses, terima kasih!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${settings.waNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section ref={sectionRef} id="order" className="py-20 md:py-28 relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: '#0d0b0b' }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionTitle title="Checkout Pesanan" subtitle="— Selesaikan —" align="center" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 rounded-2xl flex flex-col gap-6 lg:col-span-3"
          >
            {/* Tipe Pesanan */}
            <div>
              <label className="text-sm font-semibold text-[#c9a96e] mb-3 block">Tipe Pesanan</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'delivery', icon: <Truck size={16} />, label: 'Delivery' },
                  { id: 'pickup', icon: <ShoppingBag size={16} />, label: 'Ambil Sendiri' },
                  { id: 'booking', icon: <Calendar size={16} />, label: 'Booking' },
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id as OrderType)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${orderType === type.id ? 'border-[#c8612a] bg-[#c8612a]/10 text-[#ede0d3]' : 'border-white/10 text-[#7a6558] hover:border-white/20'}`}
                  >
                    {type.icon}
                    <span className="text-[10px] font-medium uppercase tracking-wider text-center">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Data Diri */}
            <div className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6558]" />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-dark pl-10 w-full"
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6558]" />
                <input
                  type="tel"
                  placeholder="Nomor WhatsApp"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="input-dark pl-10 w-full"
                />
              </div>

              <AnimatePresence mode="wait">
                {orderType === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-3 text-[#7a6558]" />
                      <textarea
                        placeholder="Alamat Lengkap Pengiriman"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="input-dark pl-10 pt-2.5 w-full min-h-[80px] resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#7a6558] mb-2 block">Pilih Jarak Lokasi</label>
                      <select
                        value={distance}
                        onChange={e => setDistance(Number(e.target.value))}
                        className="input-dark w-full text-sm outline-none"
                      >
                        <option value={0}>0-2 km (Kelurahan Sekitar)</option>
                        <option value={2}>2-4 km (Kecamatan Terdekat)</option>
                        <option value={4}>4-5 km (Kabupaten Karanganyar)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {orderType === 'booking' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-4 overflow-hidden"
                  >
                    <input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="input-dark w-full text-sm"
                    />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="input-dark w-full text-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <StickyNote size={16} className="absolute left-3 top-3 text-[#7a6558]" />
                <textarea
                  placeholder="Catatan Pesanan (opsional)"
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="input-dark pl-10 pt-2.5 w-full min-h-[60px] resize-none"
                />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <label className="text-sm font-semibold text-[#c9a96e] mb-3 block">Metode Pembayaran</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cod', icon: <Banknote size={16} />, label: 'COD' },
                  { id: 'transfer', icon: <CreditCard size={16} />, label: 'Transfer' },
                  { id: 'qris', icon: <QrCode size={16} />, label: 'QRIS' },
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setPaymentMethod(type.id as PaymentMethod)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${paymentMethod === type.id ? 'border-[#c8612a] bg-[#c8612a]/10 text-[#ede0d3]' : 'border-white/10 text-[#7a6558] hover:border-white/20'}`}
                  >
                    {type.icon}
                    <span className="text-[10px] font-medium uppercase tracking-wider text-center">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rincian Pesanan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 rounded-2xl flex flex-col lg:col-span-2 h-fit sticky top-24"
          >
            <h3 className="font-display font-semibold text-lg text-[#ede0d3] mb-4 border-b border-white/10 pb-3">
              Rincian Pesanan
            </h3>
            
            <div className="flex-1 overflow-y-auto max-h-[250px] pr-2 space-y-3 mb-4 hide-scrollbar">
              {items.length === 0 ? (
                <p className="text-[#7a6558] text-sm text-center py-8">Keranjang kosong</p>
              ) : (
                items.map(({ item, qty }) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">{qty}x</span>
                      <span className="text-sm text-[#ede0d3] truncate max-w-[120px]" title={item.name}>{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-[#c9a96e]">{formatRupiah(item.price * qty)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm text-[#b8a090]">
                <span>Subtotal</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-sm text-[#b8a090]">
                  <span>Ongkir</span>
                  <span>{formatRupiah(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-[#c9a96e] pt-2 border-t border-white/5 mt-2">
                <span>Total</span>
                <span>{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            <AnimatedButton onClick={handleCheckout} fullWidth variant="primary">
              Kirim Pesanan (WhatsApp)
            </AnimatedButton>
            <p className="text-[10px] text-center text-[#7a6558] mt-3">
              Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
