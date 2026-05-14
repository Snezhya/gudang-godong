'use client';
// src/contexts/CartContext.tsx

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MenuItem } from '@/data/menuData';
import { formatRupiah } from '@/lib/storage';

export interface CartItem {
  item: MenuItem;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalQty: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  formatTotal: () => string;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems]   = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gg_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gg_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((item: MenuItem) => {
    setItems(prev => {
      const exists = prev.find(c => c.item.id === item.id);
      if (exists) return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(c => c.item.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems(prev => prev.map(c => c.item.id === id ? { ...c, qty } : c));
  }, [removeItem]);

  const clearCart  = () => setItems([]);
  const openCart   = () => setIsOpen(true);
  const closeCart  = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(p => !p);

  const totalQty   = items.reduce((s, c) => s + c.qty, 0);
  const totalPrice = items.reduce((s, c) => s + c.item.price * c.qty, 0);
  const formatTotal = () => formatRupiah(totalPrice);

  return (
    <CartContext.Provider value={{
      items, isOpen, totalQty, totalPrice,
      addItem, removeItem, updateQty, clearCart,
      openCart, closeCart, toggleCart, formatTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
