'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type AnimatedButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
};

export default function AnimatedButton({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: AnimatedButtonProps) {
  
  const baseClasses = "relative overflow-hidden rounded-xl font-medium transition-all flex items-center justify-center gap-2 group min-h-[44px]";
  const widthClass = fullWidth ? "w-full py-3.5" : "w-auto px-5 py-3 sm:px-7 sm:py-3.5";
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: "text-white shadow-lg",
          background: "linear-gradient(135deg, #7a1e1e, #c8612a)",
          hoverBg: "linear-gradient(135deg, #8b2525, #d4622a)"
        };
      case 'secondary':
        return {
          container: "text-[#e8d5c4]",
          background: "#1a1616",
          hoverBg: "#2a2424"
        };
      case 'outline':
        return {
          container: "text-[#c8a96e] border border-[#c8a96e]/30 hover:border-[#c8a96e]",
          background: "transparent",
          hoverBg: "rgba(200, 169, 110, 0.05)"
        };
      default:
        return {
          container: "text-white shadow-lg",
          background: "linear-gradient(135deg, #7a1e1e, #c8612a)",
          hoverBg: "linear-gradient(135deg, #8b2525, #d4622a)"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${widthClass} ${styles.container} ${className}`}
      style={{ background: styles.background }}
      {...props}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: styles.hoverBg }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 z-10 pointer-events-none" />
      )}
    </motion.button>
  );
}
