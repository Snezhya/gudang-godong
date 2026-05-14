'use client';
// src/contexts/StoreContext.tsx

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MenuItem, StoreSettings } from '@/data/menuData';
import { getMenu, getSettings, saveMenu, saveSettings, isStoreOpen } from '@/lib/storage';

interface StoreContextType {
  menu: MenuItem[];
  settings: StoreSettings;
  storeOpen: boolean;
  refreshMenu: () => void;
  refreshSettings: () => void;
  updateMenu: (items: MenuItem[]) => void;
  updateSettings: (s: StoreSettings) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu]           = useState<MenuItem[]>([]);
  const [settings, setSettings]   = useState<StoreSettings | null>(null);
  const [storeOpen, setStoreOpen] = useState(true);

  const refreshMenu = useCallback(() => {
    setMenu(getMenu());
  }, []);

  const refreshSettings = useCallback(() => {
    const s = getSettings();
    setSettings(s);
    setStoreOpen(isStoreOpen(s));
  }, []);

  useEffect(() => {
    refreshMenu();
    refreshSettings();

    // Poll store open/close status every 60s
    const interval = setInterval(refreshSettings, 60000);
    return () => clearInterval(interval);
  }, [refreshMenu, refreshSettings]);

  const updateMenu = (items: MenuItem[]) => {
    saveMenu(items);
    setMenu(items);
  };

  const updateSettings = (s: StoreSettings) => {
    saveSettings(s);
    setSettings(s);
    setStoreOpen(isStoreOpen(s));
  };

  if (!settings) return null;

  return (
    <StoreContext.Provider value={{
      menu, settings, storeOpen,
      refreshMenu, refreshSettings,
      updateMenu, updateSettings,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
