// src/data/menuData.ts

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'makanan' | 'minuman' | 'snack';
  image: string; // base64 or URL
  popular?: boolean;
  description?: string;
}

export interface StoreSettings {
  waNumber: string;
  instagramHandle: string;
  email: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  deliveryRadius: number; // km
  baseDeliveryFee: number;
  feePerKm: number;
  maxDeliveryFee: number;
  address: string;
  promoText: string;
  promoActive: boolean;
}

export interface Order {
  id: string;
  items: { item: MenuItem; qty: number }[];
  type: 'delivery' | 'pickup' | 'dine';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  customerName: string;
  customerPhone: string;
  address?: string;
  note?: string;
  paymentMethod: 'cod' | 'transfer' | 'qris';
  total: number;
  deliveryFee: number;
  createdAt: string;
}

export const defaultMenuItems: MenuItem[] = [
  // MAKANAN
  { id: 'm1', name: 'Nasi Pecel', price: 10000, category: 'makanan', image: '/images/nasi-pecel.jpg', popular: true },
  { id: 'm2', name: 'Gendar Pecel', price: 8000, category: 'makanan', image: '/images/gendar-pecel.jpg' },
  { id: 'm3', name: 'Nasi Ayam Geprek + Es Teh/Teh', price: 13000, category: 'makanan', image: '/images/ayam-geprek.jpg', popular: true },
  { id: 'm4', name: 'Nasi Ayam Krispi + Es Teh/Teh', price: 13000, category: 'makanan', image: '/images/ayam-krispi.jpg' },
  { id: 'm5', name: 'Nasi Ayam Asam Manis + Es Teh/Teh', price: 14500, category: 'makanan', image: '/images/ayam-asam-manis.jpg' },
  { id: 'm6', name: 'Nasi Ayam Goreng Original', price: 18000, category: 'makanan', image: '/images/ayam-goreng.jpg' },
  { id: 'm7', name: 'Nasi Ayam Bakar Kecap', price: 19000, category: 'makanan', image: '/images/ayam-bakar.jpg', popular: true },
  { id: 'm8', name: 'Nasi Ayam Sambal Ijo', price: 19000, category: 'makanan', image: '/images/ayam-sambal-ijo.jpg' },
  { id: 'm9', name: 'Nasi Ayam Sambal Matah', price: 19000, category: 'makanan', image: '/images/ayam-sambal-matah.jpg' },
  { id: 'm10', name: 'Nasi Ayam Kemangi', price: 15000, category: 'makanan', image: '/images/ayam-kemangi.jpg' },
  { id: 'm11', name: 'Nasi Ayam Kampung Goreng', price: 26000, category: 'makanan', image: '/images/ayam-kampung.jpg' },
  { id: 'm12', name: 'Nasi Bebek Goreng', price: 28000, category: 'makanan', image: '/images/bebek-goreng.jpg' },
  { id: 'm13', name: 'Nasi Bebek Sambal Ijo', price: 29000, category: 'makanan', image: '/images/bebek-sambal-ijo.jpg' },
  { id: 'm14', name: 'Nasi Bebek Sambal Matah', price: 29000, category: 'makanan', image: '/images/bebek-sambal-matah.jpg' },
  { id: 'm15', name: 'Nasi Nila Goreng', price: 15000, category: 'makanan', image: '/images/nila-goreng.jpg' },
  { id: 'm16', name: 'Nasi Nila Bakar', price: 16000, category: 'makanan', image: '/images/nila-bakar.jpg' },
  { id: 'm17', name: 'Nasi Nila Asam Pedas', price: 16000, category: 'makanan', image: '/images/nila-asam-pedas.jpg' },
  { id: 'm18', name: 'Nasi Nila Asam Manis', price: 16000, category: 'makanan', image: '/images/nila-asam-manis.jpg' },
  { id: 'm19', name: 'Nasi Nila Sambal Matah', price: 16000, category: 'makanan', image: '/images/nila-sambal-matah.jpg' },
  { id: 'm20', name: 'Nasi Lele Goreng + Es Teh/Teh', price: 13000, category: 'makanan', image: '/images/lele-goreng.jpg', popular: true },
  { id: 'm21', name: 'Nasi Lele Bakar + Es Teh/Teh', price: 14000, category: 'makanan', image: '/images/lele-bakar.jpg' },
  { id: 'm22', name: 'Nasi Bawal Goreng', price: 15000, category: 'makanan', image: '/images/bawal-goreng.jpg' },
  { id: 'm23', name: 'Nasi Bawal Bakar', price: 16000, category: 'makanan', image: '/images/bawal-bakar.jpg' },
  { id: 'm24', name: 'Nasi Bawal Asam Pedas', price: 16000, category: 'makanan', image: '/images/bawal-asam-pedas.jpg' },
  { id: 'm25', name: 'Nasi Bawal Asam Manis', price: 16000, category: 'makanan', image: '/images/bawal-asam-manis.jpg' },
  { id: 'm26', name: 'Nasi Bawal Sambal Matah', price: 16000, category: 'makanan', image: '/images/bawal-sambal-matah.jpg' },
  { id: 'm27', name: 'Nasi Bandeng Goreng (Presto)', price: 13500, category: 'makanan', image: '/images/bandeng-goreng.jpg' },
  { id: 'm28', name: 'Nasi Bandeng Bakar (Presto)', price: 14500, category: 'makanan', image: '/images/bandeng-bakar.jpg' },
  { id: 'm29', name: 'Nasi Telur Dadar', price: 10000, category: 'makanan', image: '/images/nasi-telur-dadar.jpg' },
  { id: 'm30', name: 'Nasi Telur Ceplok', price: 10000, category: 'makanan', image: '/images/nasi-telur-ceplok.jpg' },
  { id: 'm31', name: 'Nasi Pepes Lele', price: 16000, category: 'makanan', image: '/images/pepes-lele.jpg' },
  { id: 'm32', name: 'Nasi Pepes Ikan Nila', price: 19000, category: 'makanan', image: '/images/pepes-nila.jpg' },
  { id: 'm33', name: 'Nasi Pepes Bandeng', price: 21000, category: 'makanan', image: '/images/pepes-bandeng.jpg' },
  { id: 'm34', name: 'Nasi Pepes Jamur', price: 13000, category: 'makanan', image: '/images/pepes-jamur.jpg' },
  { id: 'm35', name: 'Nasi Putih', price: 4000, category: 'makanan', image: '/images/nasi-putih.jpg' },
  
  // SNACK
  { id: 's1', name: 'Kangkung Oseng', price: 5000, category: 'snack', image: '/images/kangkung-oseng.jpg' },
  { id: 's2', name: 'Jamur Oseng', price: 5000, category: 'snack', image: '/images/jamur-oseng.jpg' },
  { id: 's3', name: 'Tauge Oseng', price: 5000, category: 'snack', image: '/images/tauge-oseng.jpg' },
  { id: 's4', name: 'Terong Goreng', price: 5000, category: 'snack', image: '/images/terong-goreng.jpg' },
  { id: 's5', name: 'Jamur Krispy', price: 7000, category: 'snack', image: '/images/jamur-krispy.jpg', popular: true },
  { id: 's6', name: 'Telur Ceplok', price: 4000, category: 'snack', image: '/images/telur-ceplok.jpg' },
  { id: 's7', name: 'Telur Dadar', price: 4000, category: 'snack', image: '/images/telur-dadar.jpg' },
  { id: 's8', name: 'Tahu', price: 4000, category: 'snack', image: '/images/tahu.jpg' },
  { id: 's9', name: 'Tempe Mendoan', price: 5000, category: 'snack', image: '/images/tempe-mendoan.jpg', popular: true },
  
  // MINUMAN
  { id: 'd1', name: 'Teh Anget/Panas', price: 3000, category: 'minuman', image: '/images/teh-anget.jpg' },
  { id: 'd2', name: 'Es Teh', price: 3500, category: 'minuman', image: '/images/es-teh.jpg', popular: true },
  { id: 'd3', name: 'Jeruk Anget', price: 4000, category: 'minuman', image: '/images/jeruk-anget.jpg' },
  { id: 'd4', name: 'Es Jeruk', price: 4000, category: 'minuman', image: '/images/es-jeruk.jpg', popular: true },
  { id: 'd5', name: 'Jeruk Nipis Anget', price: 5000, category: 'minuman', image: '/images/jeruk-nipis-anget.jpg' },
  { id: 'd6', name: 'Es Jeruk Nipis', price: 5000, category: 'minuman', image: '/images/es-jeruk-nipis.jpg' },
  { id: 'd7', name: 'Es Teh Krampul / Panas', price: 5000, category: 'minuman', image: '/images/es-teh-krampul.jpg' },
  { id: 'd8', name: 'Es Lemon Tea / Panas', price: 5000, category: 'minuman', image: '/images/es-lemon-tea.jpg' },
  { id: 'd9', name: 'Kopi Hitam', price: 6000, category: 'minuman', image: '/images/kopi-hitam.jpg' },
  { id: 'd10', name: 'Air Mineral', price: 4000, category: 'minuman', image: '/images/air-mineral.jpg' },
];

export const defaultStoreSettings: StoreSettings = {
  waNumber: '085876894023',
  instagramHandle: '@gudanggodong.kitchen',
  email: 'gudanggodongkitchen@gmail.com',
  isOpen: true,
  openTime: '07:00',
  closeTime: '21:00',
  deliveryRadius: 5,
  baseDeliveryFee: 5000,
  feePerKm: 2000,
  maxDeliveryFee: 15000,
  address: 'Jl. Godong Raya, Kabupaten Karanganyar, Jawa Tengah',
  promoText: '🎉 Promo Hari Ini: Beli 2 Nasi Ayam Gratis Es Teh! Berlaku sampai stok habis.',
  promoActive: true,
};

export const fakeReviews = [
  {
    id: 'r1',
    name: 'Dewi Rahayu',
    avatar: 'DR',
    rating: 5,
    comment: 'Nasi pecelnya enak banget! Bumbu pecelnya khas, tidak terlalu manis tidak terlalu pedas. Tempatnya nyaman dan bersih. Pasti balik lagi!',
    date: '2 hari lalu',
  },
  {
    id: 'r2',
    name: 'Bagas Pratama',
    avatar: 'BP',
    rating: 5,
    comment: 'Ayam gepreknya juara! Pedesnya pas, dagingnya crispy di luar lembut di dalam. Harganya sangat terjangkau untuk kualitas seperti ini.',
    date: '5 hari lalu',
  },
  {
    id: 'r3',
    name: 'Siti Nurhaliza',
    avatar: 'SN',
    rating: 5,
    comment: 'Sering order delivery ke sini, selalu cepat dan pesanan selalu lengkap. Nasi usus crispynya adiktif banget! Recommended 100%',
    date: '1 minggu lalu',
  },
  {
    id: 'r4',
    name: 'Rizky Maulana',
    avatar: 'RM',
    rating: 4,
    comment: 'Enak dan murah meriah. Porsinya generous, pelayanan ramah. Ayam bakarnya bumbunya meresap sempurna. Anak-anak juga suka.',
    date: '1 minggu lalu',
  },
  {
    id: 'r5',
    name: 'Anita Wijaya',
    avatar: 'AW',
    rating: 5,
    comment: 'Warung makan terenak di area sini! Konsisten enak dari dulu. Tempatnya cocok buat nongkrong keluarga, atmosphere-nya homey banget.',
    date: '2 minggu lalu',
  },
];
