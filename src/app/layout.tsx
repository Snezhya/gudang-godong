import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from 'sonner';
import { StoreProvider } from '@/contexts/StoreContext';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/ui/Navbar';
import CartSidebar from '@/components/ui/CartSidebar';
import FloatingWA from '@/components/ui/FloatingWA';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/ui/BackToTop';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  title: 'Gudang Godong Kitchen — Masakan Rumahan Premium',
  description: 'Masakan rumahan hangat dengan cita rasa premium. Pesan antar, ambil sendiri, atau booking tempat langsung.',
  keywords: ['gudang godong kitchen', 'warung makan', 'nasi pecel', 'ayam geprek', 'karanganyar'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GG Kitchen',
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0b0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#0d0b0b', color: '#ede0d3', fontFamily: "'Inter', sans-serif" }}>
        <StoreProvider>
          <CartProvider>
            <LoadingScreen />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <CartSidebar />
            <FloatingWA />
            <BackToTop />
            <CustomCursor />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#211919',
                  border: '1px solid rgba(201,169,110,0.15)',
                  color: '#ede0d3',
                },
              }}
            />
          </CartProvider>
        </StoreProvider>
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) { console.log('SW registered with scope:', registration.scope); },
                  function(err) { console.log('SW registration failed:', err); }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
