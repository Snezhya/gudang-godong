'use client';
// src/components/ui/LoadingScreen.tsx

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Glow orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="glow-orb w-96 h-96 bg-[#7a1e1e] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
            <div className="glow-orb w-80 h-80 bg-[#c8612a] bottom-1/4 right-1/4" />
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Icon */}
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #7a1e1e, #c8612a)',
                  boxShadow: '0 0 40px rgba(200,97,42,0.4)',
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                🍃
              </motion.div>
              {/* Ping effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #7a1e1e, #c8612a)' }}
                animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </div>

            {/* Title */}
            <div className="text-center">
              <motion.h1
                className="font-display text-3xl font-bold gradient-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Gudang Godong
              </motion.h1>
              <motion.p
                className="text-[#c9a96e] text-sm tracking-[0.25em] uppercase mt-1"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Kitchen
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #7a1e1e, #c8612a, #c9a96e)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
