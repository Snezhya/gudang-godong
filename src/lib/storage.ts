// src/lib/storage.ts
import { MenuItem, Order, StoreSettings, defaultMenuItems, defaultStoreSettings } from '@/data/menuData';

const KEYS = {
  MENU:     'gg_menu',
  SETTINGS: 'gg_settings',
  ORDERS:   'gg_orders',
  ADMIN:    'gg_admin_auth',
} as const;

// ─── Menu ────────────────────────────────────────────
export function getMenu(): MenuItem[] {
  if (typeof window === 'undefined') return defaultMenuItems;
  try {
    const raw = localStorage.getItem(KEYS.MENU);
    return raw ? JSON.parse(raw) : defaultMenuItems;
  } catch { return defaultMenuItems; }
}

export function saveMenu(items: MenuItem[]): void {
  localStorage.setItem(KEYS.MENU, JSON.stringify(items));
}

export function addMenuItem(item: MenuItem): void {
  const items = getMenu();
  saveMenu([...items, item]);
}

export function updateMenuItem(updated: MenuItem): void {
  const items = getMenu();
  saveMenu(items.map(i => i.id === updated.id ? updated : i));
}

export function deleteMenuItem(id: string): void {
  const items = getMenu();
  saveMenu(items.filter(i => i.id !== id));
}

// ─── Store Settings ───────────────────────────────────
export function getSettings(): StoreSettings {
  if (typeof window === 'undefined') return defaultStoreSettings;
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    return raw ? { ...defaultStoreSettings, ...JSON.parse(raw) } : defaultStoreSettings;
  } catch { return defaultStoreSettings; }
}

export function saveSettings(settings: StoreSettings): void {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

// ─── Orders ──────────────────────────────────────────
export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
}

export function updateOrderStatus(id: string, status: Order['status']): void {
  const orders = getOrders();
  const updated = orders.map(o => o.id === id ? { ...o, status } : o);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
}

export function generateOrderId(): string {
  return `GG-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

// ─── Admin Auth ───────────────────────────────────────
export function adminLogin(username: string, password: string): boolean {
  const valid = username === 'admin' && password === 'gudanggodong2025';
  if (valid) localStorage.setItem(KEYS.ADMIN, 'true');
  return valid;
}

export function adminLogout(): void {
  localStorage.removeItem(KEYS.ADMIN);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEYS.ADMIN) === 'true';
}

// ─── Image ───────────────────────────────────────────
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Helpers ─────────────────────────────────────────
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function calcDeliveryFee(
  distanceKm: number,
  settings: StoreSettings
): number {
  if (distanceKm > settings.deliveryRadius) return -1; // out of range
  const fee = settings.baseDeliveryFee + distanceKm * settings.feePerKm;
  return Math.min(fee, settings.maxDeliveryFee);
}

export function isStoreOpen(settings: StoreSettings): boolean {
  if (!settings.isOpen) return false;
  const now  = new Date();
  const h    = now.getHours();
  const m    = now.getMinutes();
  const cur  = h * 60 + m;
  const [oh, om] = settings.openTime.split(':').map(Number);
  const [ch, cm] = settings.closeTime.split(':').map(Number);
  return cur >= oh * 60 + om && cur <= ch * 60 + cm;
}
