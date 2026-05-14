'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { LayoutDashboard, UtensilsCrossed, Receipt, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
  { name: 'Menu', href: '/admin/menu', icon: <UtensilsCrossed size={20} /> },
  { name: 'Pesanan', href: '/admin/orders', icon: <Receipt size={20} /> },
  { name: 'Pengaturan', href: '/admin/settings', icon: <Settings size={20} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#130f0f] border-r border-white/5 w-64 shadow-2xl">
      <div className="p-6 border-b border-white/5">
        <h2 className="font-display font-bold text-xl text-[#ede0d3] tracking-wide">GG Kitchen</h2>
        <p className="text-[10px] text-[#c9a96e] mt-1.5 uppercase tracking-widest font-semibold">Admin Workspace</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {TABS.map(tab => {
          const isActive = pathname === tab.href || (tab.href !== '/admin' && pathname?.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={closeMobile}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-white/10 text-[#ede0d3] shadow-[inset_0_0_0_1px_rgba(201,169,110,0.2)]' 
                  : 'text-[#7a6558] hover:bg-white/5 hover:text-[#b8a090]'
              }`}
            >
              <div className={isActive ? 'text-[#c9a96e]' : ''}>{tab.icon}</div>
              <span className="font-medium text-sm">{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3.5 w-full text-left rounded-xl text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center bg-[#c8612a] text-white shadow-xl"
      >
        <Menu size={20} />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-64 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
