'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Lock, User, LogIn } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) setError(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: '#0d0b0b' }}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, #c8612a 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #7a1e1e, #c9a96e)' }} />
          
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-[#ede0d3] mb-2">Admin Panel</h1>
            <p className="text-sm text-[#7a6558]">Masuk untuk mengelola warung</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6558]" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(false); }}
                className="input-dark pl-12 w-full rounded-xl transition-all focus:ring-1 focus:ring-[#c9a96e]"
              />
            </div>
            
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a6558]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                className="input-dark pl-12 w-full rounded-xl transition-all focus:ring-1 focus:ring-[#c9a96e]"
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ef4444] text-center">
                Username atau password salah.
              </motion.p>
            )}

            <AnimatedButton type="submit" fullWidth variant="primary" className="mt-2 flex items-center justify-center gap-2 py-3.5">
              <LogIn size={18} />
              Login
            </AnimatedButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
