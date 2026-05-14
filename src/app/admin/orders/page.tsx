'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '@/data/menuData';
import { getOrders, updateOrderStatus, formatRupiah } from '@/lib/storage';
import { Package, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusUpdate = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    setOrders(getOrders());
    toast.success(`Status pesanan ${id} diperbarui`);
  };

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-[#ede0d3] mb-2">Manajemen Pesanan</h1>
        <p className="text-sm text-[#7a6558]">Pantau dan perbarui status pesanan masuk.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#130f0f]/50">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'Semua Pesanan' },
              { id: 'pending', label: 'Pending' },
              { id: 'processing', label: 'Diproses' },
              { id: 'completed', label: 'Selesai' },
              { id: 'cancelled', label: 'Batal' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border
                  ${filter === f.id ? 'bg-[#c9a96e]/10 text-[#c9a96e] border-[#c9a96e]/30' : 'bg-white/5 text-[#7a6558] border-transparent hover:bg-white/10 hover:text-[#b8a090]'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#7a6558] mb-5">
                <Package size={36} />
              </div>
              <p className="text-[#ede0d3] font-display font-semibold text-lg">Tidak ada pesanan</p>
              <p className="text-sm text-[#7a6558] mt-2 max-w-sm">
                Riwayat pesanan yang menggunakan database lokal akan muncul di sini. Jika Anda menggunakan sistem order via WhatsApp secara langsung, data pesanan lokal mungkin kosong.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredOrders.map(order => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98, height: 0 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col lg:flex-row gap-8 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-[#c8612a]/10 border border-[#c8612a]/20 text-[#c9a96e] font-display font-bold rounded-lg tracking-wider">{order.id}</span>
                        <span className="text-xs font-medium text-[#7a6558] flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6 text-sm mb-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[#7a6558] text-[10px] font-bold uppercase tracking-widest mb-2">Detail Pelanggan</p>
                          <p className="text-[#ede0d3] font-semibold text-base mb-0.5">{order.customerName}</p>
                          <p className="text-[#b8a090] font-medium">{order.customerPhone}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[#7a6558] text-[10px] font-bold uppercase tracking-widest mb-2">Pengiriman</p>
                          <p className="text-[#ede0d3] capitalize font-medium mb-0.5">{order.type}</p>
                          {order.address ? (
                            <p className="text-[#b8a090] text-xs line-clamp-2 leading-relaxed">{order.address}</p>
                          ) : (
                            <p className="text-[#b8a090] text-xs">-</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-[#7a6558] text-[10px] font-bold uppercase tracking-widest mb-3">Item Pesanan</p>
                        <ul className="space-y-2">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="text-sm text-[#ede0d3] flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                              <span className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold text-[#c9a96e]">{item.qty}x</span> 
                                {item.item.name}
                              </span>
                              <span className="text-[#b8a090] font-medium">{formatRupiah(item.item.price * item.qty)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 font-bold">
                          <span className="text-[#ede0d3] tracking-wide uppercase text-xs">Total Pembayaran</span>
                          <span className="text-[#c8612a] text-xl font-display">{formatRupiah(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-56 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                      <p className="text-[10px] text-[#7a6558] font-bold uppercase tracking-widest mb-2">Aksi Status</p>
                      
                      {order.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusUpdate(order.id, 'processing')} className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all border border-blue-500/20 w-full text-center shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">
                            Proses Pesanan
                          </button>
                          <button onClick={() => handleStatusUpdate(order.id, 'cancelled')} className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#ef4444] hover:bg-red-500/10 transition-colors w-full text-center mt-1">
                            Batalkan
                          </button>
                        </>
                      )}
                      
                      {order.status === 'processing' && (
                        <>
                          <button onClick={() => handleStatusUpdate(order.id, 'completed')} className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all border border-green-500/20 w-full text-center shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
                            Selesaikan
                          </button>
                          <button onClick={() => handleStatusUpdate(order.id, 'cancelled')} className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#ef4444] hover:bg-red-500/10 transition-colors w-full text-center mt-1">
                            Batalkan
                          </button>
                        </>
                      )}

                      {order.status === 'completed' && (
                        <div className="flex flex-col items-center justify-center gap-3 text-green-500 py-6 bg-green-500/5 rounded-2xl border border-green-500/10">
                          <CheckCircle size={32} />
                          <span className="text-[11px] font-bold uppercase tracking-widest">Pesanan Selesai</span>
                        </div>
                      )}
                      
                      {order.status === 'cancelled' && (
                        <div className="flex flex-col items-center justify-center gap-3 text-red-500 py-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                          <XCircle size={32} />
                          <span className="text-[11px] font-bold uppercase tracking-widest">Dibatalkan</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
