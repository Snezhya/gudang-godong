import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';

// Minimal elegant skeleton for lazy-loaded sections
const SectionSkeleton = () => (
  <div className="w-full min-h-[50vh] flex flex-col items-center justify-center bg-[#0d0b0b] opacity-60">
    <div className="w-10 h-10 border-2 border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full animate-spin mb-4" />
    <div className="text-[10px] text-[#7a6558] uppercase tracking-widest animate-pulse">Memuat Bagian...</div>
  </div>
);

// Dynamically import sections for performance (Code Splitting)
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { 
  loading: () => <SectionSkeleton /> 
});
const MenuSection = dynamic(() => import('@/components/sections/MenuSection'), { 
  loading: () => <SectionSkeleton /> 
});
const DeliverySection = dynamic(() => import('@/components/sections/DeliverySection'), { 
  loading: () => <SectionSkeleton /> 
});
const BookingSection = dynamic(() => import('@/components/sections/BookingSection'), { 
  loading: () => <SectionSkeleton /> 
});
const OrderSection = dynamic(() => import('@/components/sections/OrderSection'), { 
  loading: () => <SectionSkeleton /> 
});
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { 
  loading: () => <SectionSkeleton /> 
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero is static for the fastest LCP */}
      <HeroSection />
      
      {/* Lazy loaded sections */}
      <AboutSection />
      <MenuSection />
      <DeliverySection />
      <BookingSection />
      <OrderSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center bg-[#0d0b0b]">
        <p className="text-[#7a6558] text-xs">
          &copy; {new Date().getFullYear()} Gudang Godong Kitchen. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
