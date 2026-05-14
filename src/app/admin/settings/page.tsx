'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { StoreSettings } from '@/data/menuData';
import { Save, AlertCircle } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState<StoreSettings>(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSave = () => {
    updateSettings(formData);
    toast.success('Pengaturan berhasil disimpan');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-[#ede0d3] mb-2">Pengaturan Toko</h1>
        <p className="text-sm text-[#7a6558]">Kelola jam operasional, kontak, dan biaya pengantaran.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-8 rounded-3xl"
      >
        <div className="space-y-8">
          {/* Status & Jam */}
          <div>
            <h3 className="font-display text-lg font-semibold text-[#ede0d3] border-b border-white/5 pb-3 mb-5">Status & Jam Operasional</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  name="isOpen"
                  checked={formData.isOpen}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#c9a96e] rounded focus:ring-[#c9a96e]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#ede0d3]">Toko Buka</p>
                  <p className="text-xs text-[#7a6558]">Tampilkan status toko sebagai buka</p>
                </div>
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#c9a96e] font-semibold mb-2 block">Jam Buka</label>
                  <input type="time" name="openTime" value={formData.openTime} onChange={handleChange} className="input-dark w-full text-sm" />
                </div>
                <div>
                  <label className="text-xs text-[#c9a96e] font-semibold mb-2 block">Jam Tutup</label>
                  <input type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} className="input-dark w-full text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-display text-lg font-semibold text-[#ede0d3] border-b border-white/5 pb-3 mb-5">Kontak WhatsApp</h3>
            <div className="max-w-md relative">
              <input type="text" name="waNumber" value={formData.waNumber} onChange={handleChange} placeholder="Contoh: 085876894023" className="input-dark w-full" />
              <p className="text-[10px] text-[#7a6558] mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Gunakan format angka standar tanpa spasi.
              </p>
            </div>
          </div>

          {/* Pengantaran */}
          <div>
            <h3 className="font-display text-lg font-semibold text-[#ede0d3] border-b border-white/5 pb-3 mb-5">Pengaturan Delivery</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-[#c9a96e] font-semibold mb-2 block">Radius Maksimal (km)</label>
                <input type="number" name="deliveryRadius" value={formData.deliveryRadius} onChange={handleChange} className="input-dark w-full" />
              </div>
              <div>
                <label className="text-xs text-[#c9a96e] font-semibold mb-2 block">Ongkir Dasar (Rp)</label>
                <input type="number" name="baseDeliveryFee" value={formData.baseDeliveryFee} onChange={handleChange} className="input-dark w-full" />
              </div>
              <div>
                <label className="text-xs text-[#c9a96e] font-semibold mb-2 block">Ongkir Per Km (Rp)</label>
                <input type="number" name="feePerKm" value={formData.feePerKm} onChange={handleChange} className="input-dark w-full" />
              </div>
              <div>
                <label className="text-xs text-[#c9a96e] font-semibold mb-2 block">Ongkir Maksimal (Rp)</label>
                <input type="number" name="maxDeliveryFee" value={formData.maxDeliveryFee} onChange={handleChange} className="input-dark w-full" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <AnimatedButton onClick={handleSave} variant="primary" className="flex items-center gap-2 px-8">
              <Save size={18} /> Simpan Pengaturan
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
