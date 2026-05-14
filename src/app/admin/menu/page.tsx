'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { MenuItem } from '@/data/menuData';
import { formatRupiah, fileToBase64 } from '@/lib/storage';
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Image from 'next/image';
import { toast } from 'sonner';

export default function AdminMenu() {
  const { menu, updateMenu } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState<MenuItem>({
    id: '', name: '', description: '', price: 0, image: '', category: 'makanan'
  });

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ id: '', name: '', description: '', price: 0, image: '', category: 'makanan' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setFormData(prev => ({ ...prev, image: base64 }));
    } catch (err) {
      toast.error('Gagal mengupload gambar');
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast.error('Nama dan harga wajib diisi');
      return;
    }
    
    let newMenu = [...menu];
    if (editingItem) {
      newMenu = newMenu.map(i => i.id === editingItem.id ? formData : i);
      toast.success('Menu berhasil diperbarui');
    } else {
      const newItem = { ...formData, id: `item-${Date.now()}` };
      newMenu.push(newItem);
      toast.success('Menu baru ditambahkan');
    }
    
    updateMenu(newMenu);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus menu ini?')) {
      updateMenu(menu.filter(i => i.id !== id));
      toast.success('Menu dihapus');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-[#ede0d3] mb-2">Manajemen Menu</h1>
          <p className="text-sm text-[#7a6558]">Kelola daftar makanan, minuman, dan snack.</p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Menu
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {menu.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 bg-[#211919]">
                {item.image && item.image.startsWith('data:') ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : item.image ? (
                  // Fallback for string paths
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#7a6558]">
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button onClick={() => openModal(item)} className="p-3 rounded-xl bg-white/10 text-white hover:bg-[#c9a96e] transition-colors border border-white/20 shadow-xl hover:scale-110">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-3 rounded-xl bg-white/10 text-white hover:bg-red-500 transition-colors border border-white/20 shadow-xl hover:scale-110">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#c9a96e] backdrop-blur-md shadow-lg border border-white/10">
                  {item.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-[#ede0d3] line-clamp-1">{item.name}</h3>
                <p className="text-xs text-[#7a6558] mt-1 mb-3 line-clamp-2 flex-1">{item.description || 'Tidak ada deskripsi'}</p>
                <p className="font-bold text-[#c9a96e]">{formatRupiah(item.price)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-xl rounded-3xl relative z-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #7a1e1e, #c9a96e)' }} />
              
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                <h2 className="font-display font-bold text-xl text-[#ede0d3]">
                  {editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
                </h2>
                <button onClick={closeModal} className="text-[#b8a090] hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 rounded-2xl bg-[#211919] overflow-hidden relative border border-white/10 flex-shrink-0 shadow-inner">
                    {formData.image ? (
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#7a6558]">
                        <ImageIcon size={24} className="mb-2" />
                        <span className="text-[10px]">No Image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="btn-secondary text-sm px-4 py-2 cursor-pointer inline-flex items-center gap-2 hover:bg-white/10 transition-colors rounded-xl border border-white/10 text-[#ede0d3]">
                      <ImageIcon size={16} /> Upload Gambar
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <p className="text-[10px] text-[#7a6558] mt-3 leading-relaxed max-w-[200px]">
                      Rasio 1:1, ukuran maksimal disarankan 2MB. Format JPG, PNG, atau WebP.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Nama Menu</label>
                    <input type="text" placeholder="Contoh: Nasi Pecel Spesial" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-dark w-full text-sm rounded-xl focus:ring-1 focus:ring-[#c9a96e] transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Kategori</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="input-dark w-full text-sm rounded-xl outline-none focus:ring-1 focus:ring-[#c9a96e] transition-all">
                        <option value="makanan">Makanan Utama</option>
                        <option value="minuman">Minuman</option>
                        <option value="snack">Snack / Tambahan</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Harga (Rp)</label>
                      <input type="number" placeholder="15000" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="input-dark w-full text-sm rounded-xl focus:ring-1 focus:ring-[#c9a96e] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#c9a96e] mb-2 block uppercase tracking-widest">Deskripsi</label>
                    <textarea placeholder="Penjelasan singkat mengenai menu ini..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-dark w-full text-sm min-h-[100px] resize-none rounded-xl focus:ring-1 focus:ring-[#c9a96e] transition-all" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-[#130f0f]/80">
                <button onClick={closeModal} className="px-6 py-2.5 rounded-xl text-sm font-medium text-[#b8a090] hover:text-white hover:bg-white/5 transition-colors">
                  Batal
                </button>
                <AnimatedButton onClick={handleSave} variant="primary" className="px-8 py-2.5 shadow-lg shadow-[#c8612a]/20">
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
