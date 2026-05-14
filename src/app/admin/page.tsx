'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/contexts/StoreContext';
import { getOrders, formatRupiah } from '@/lib/storage';
import { useEffect, useState } from 'react';
import { Package, UtensilsCrossed, TrendingUp, Clock } from 'lucide-react';
import { Order } from '@/data/menuData';

export default function AdminDashboard() {
  const { menu } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const STATS = [
    { label: 'Total Menu', value: menu.length, icon: <UtensilsCrossed size={20} />, color: '#c9a96e' },
    { label: 'Pesanan Pending', value: pendingOrders, icon: <Clock size={20} />, color: '#ef4444' },
    { label: 'Total Pesanan', value: orders.length, icon: <Package size={20} />, color: '#3b82f6' },
    { label: 'Pendapatan (Selesai)', value: formatRupiah(totalRevenue), icon: <TrendingUp size={20} />, color: '#10b981' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-[#ede0d3] mb-2">Dashboard</h1>
        <p className="text-sm text-[#7a6558]">Ringkasan aktivitas Gudang Godong Kitchen.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5" style={{ color: stat.color }}>
              <div style={{ transform: 'scale(4)' }}>{stat.icon}</div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <p className="text-xs text-[#7a6558] font-medium tracking-wide uppercase">{stat.label}</p>
            <p className="text-2xl font-bold text-[#ede0d3] mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 border border-white/5"
      >
        <h2 className="font-display text-lg font-semibold text-[#ede0d3] mb-4">Pesanan Terbaru</h2>
        {orders.length === 0 ? (
          <p className="text-[#7a6558] text-sm text-center py-8">Belum ada pesanan.</p>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#7a6558] uppercase bg-white/5">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">ID Pesanan</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 font-medium text-[#c9a96e]">{o.id}</td>
                    <td className="px-4 py-4 text-[#ede0d3]">{o.customerName}</td>
                    <td className="px-4 py-4 text-[#b8a090] capitalize">{o.type}</td>
                    <td className="px-4 py-4 text-[#ede0d3]">{formatRupiah(o.total)}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                        ${o.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                          o.status === 'processing' ? 'bg-blue-500/10 text-blue-500' : 
                          o.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                          'bg-red-500/10 text-red-500'}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
