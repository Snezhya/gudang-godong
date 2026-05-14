'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { adminLogin, adminLogout, isAdminAuthenticated } from '@/lib/storage';
import { useRouter } from 'next/navigation';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  isLoaded: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    setIsLoaded(true);
  }, []);

  const login = useCallback((u: string, p: string) => {
    const success = adminLogin(u, p);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  }, []);

  const logout = useCallback(() => {
    adminLogout();
    setIsAuthenticated(false);
    router.push('/admin');
  }, [router]);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, isLoaded }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
