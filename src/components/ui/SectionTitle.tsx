'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionTitleProps {
  title: string;
  subtitle: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.reveal-text'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      el.querySelector('.title-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger === el && t.kill());
    };
  }, []);

  const getAlignClass = () => {
    if (align === 'left') return 'items-start text-left';
    if (align === 'right') return 'items-end text-right';
    return 'items-center text-center';
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-3 ${getAlignClass()} ${className}`}>
      <span className="reveal-text text-sm md:text-base font-medium tracking-[0.2em] uppercase text-[#c8a96e]">
        {subtitle}
      </span>
      
      <h2 className="reveal-text text-3xl md:text-5xl font-display font-bold text-[#e8d5c4]">
        {title}
      </h2>

      <div className={`title-line w-24 h-px mt-2 origin-${align === 'center' ? 'center' : align}`} 
           style={{ background: 'linear-gradient(90deg, #7a1e1e, #c8612a)' }} />
    </div>
  );
}
