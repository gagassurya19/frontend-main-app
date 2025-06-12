import { FoodData, DailyFood, HistoryData, PeriodData, Slide } from '@/types/dashboard';

export const chartConfig = {
  calories: {
    label: "Calories",
    color: "#f59e0b",
  },
  target: {
    label: "Target",
    color: "#0055FFFF",
  },
};

export const foodData: FoodData[] = [
  { bahan: "Nasi", konsumsi: 85 },
  { bahan: "Ayam", konsumsi: 70 },
  { bahan: "Sayuran", konsumsi: 60 },
  { bahan: "Buah", konsumsi: 45 },
  { bahan: "Ikan", konsumsi: 40 },
  { bahan: "Telur", konsumsi: 55 },
];

export const radarConfig = {
  konsumsi: {
    label: "Konsumsi (%)",
    color: "#f59e0b",
  },
};

export const dailyFoodHistory: DailyFood[] = [
  {
    id: 1,
    name: "Nasi Gudeg",
    calories: 450,
    time: "07:30",
    date: new Date().toISOString().split('T')[0], // Today's date
    category: "Sarapan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop&crop=center",
    description: "Nasi Gudeg adalah makanan tradisional Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan dan bumbu khas.",
    usedMaterial: ["Nangka muda", "Santan", "Bawang merah", "Bawang putih", "Cabai", "Nasi"],
    unusedMaterial: [],
    missingMaterial: ["Daun salam", "Lengkuas"],
    material: ["Nangka muda", "Santan", "Bawang merah", "Bawang putih", "Cabai", "Nasi", "Daun salam", "Lengkuas"],
    step: [
      {
        instruction: "Siapkan nangka muda, potong-potong sesuai selera",
        image: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Tumis bumbu halus sampai harum",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Masukkan nangka muda dan santan, masak hingga empuk",
        image: ["https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Ayam Goreng",
    calories: 320,
    time: "12:15",
    date: new Date().toISOString().split('T')[0], // Today's date
    category: "Makan Siang",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&h=400&fit=crop&crop=center",
    description: "Ayam goreng bumbu kuning yang gurih dan renyah, dipadukan dengan bumbu rempah-rempah pilihan.",
    usedMaterial: ["Ayam", "Kunyit", "Bawang putih", "Garam", "Minyak goreng"],
    unusedMaterial: ["Daun jeruk"],
    missingMaterial: ["Kemiri", "Ketumbar"],
    material: ["Ayam", "Kunyit", "Bawang putih", "Garam", "Minyak goreng", "Daun jeruk", "Kemiri", "Ketumbar"],
    step: [
      {
        instruction: "Bersihkan ayam dan potong sesuai selera",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Marinasi ayam dengan bumbu selama 30 menit",
        image: ["https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Goreng ayam dalam minyak panas hingga kecoklatan",
        image: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Gado-gado",
    calories: 280,
    time: "13:00",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
    category: "Makan Siang",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=500&h=400&fit=crop&crop=center",
    description: "Salad Indonesia dengan campuran sayuran segar dan bumbu kacang yang khas.",
    usedMaterial: ["Kangkung", "Tauge", "Kentang", "Telur", "Kacang tanah", "Cabai"],
    unusedMaterial: ["Tahu", "Tempe"],
    missingMaterial: ["Mentimun", "Kerupuk"],
    material: ["Kangkung", "Tauge", "Kentang", "Telur", "Kacang tanah", "Cabai", "Tahu", "Tempe", "Mentimun", "Kerupuk"],
    step: [
      {
        instruction: "Rebus sayuran hingga matang",
        image: ["https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Buat bumbu kacang dengan menghaluskan kacang tanah dan bumbu",
        image: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Tata sayuran dan siram dengan bumbu kacang",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Pisang Goreng",
    calories: 180,
    time: "16:45",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
    category: "Snack",
    image: "https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=500&h=400&fit=crop&crop=center",
    description: "Pisang goreng crispy dengan lapisan tepung yang renyah dan manis.",
    usedMaterial: ["Pisang", "Tepung terigu", "Gula", "Garam", "Minyak goreng"],
    unusedMaterial: ["Vanila"],
    missingMaterial: ["Telur", "Susu"],
    material: ["Pisang", "Tepung terigu", "Gula", "Garam", "Minyak goreng", "Vanila", "Telur", "Susu"],
    step: [
      {
        instruction: "Kupas pisang dan potong memanjang",
        image: ["https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Buat adonan tepung dengan air dan garam",
        image: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Celupkan pisang ke adonan dan goreng hingga kecoklatan",
        image: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=400&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "Soto Ayam",
    calories: 290,
    time: "19:20",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
    category: "Makan Malam",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop&crop=center",
    description: "Sup ayam tradisional Indonesia dengan kuah bening yang segar dan bumbu rempah.",
    usedMaterial: ["Ayam", "Bawang merah", "Bawang putih", "Jahe", "Kunyit", "Seledri"],
    unusedMaterial: ["Wortel", "Kentang"],
    missingMaterial: ["Daun bawang", "Bawang goreng"],
    material: ["Ayam", "Bawang merah", "Bawang putih", "Jahe", "Kunyit", "Seledri", "Wortel", "Kentang", "Daun bawang", "Bawang goreng"],
    step: [
      {
        instruction: "Rebus ayam dengan bumbu hingga empuk",
        image: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Tumis bumbu halus hingga harum",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Campurkan tumisan bumbu ke kuah ayam dan masak hingga mendidih",
        image: ["https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=400&fit=crop&crop=center"
  },
  // Add more data for different dates
  {
    id: 6,
    name: "Nasi Padang",
    calories: 380,
    time: "12:30",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
    category: "Makan Siang",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop&crop=center",
    description: "Nasi Padang dengan lauk pauk khas Sumatera yang kaya rempah dan cita rasa.",
    usedMaterial: ["Nasi", "Rendang", "Sayur nangka", "Sambal", "Kerupuk"],
    unusedMaterial: [],
    missingMaterial: ["Daun pisang"],
    material: ["Nasi", "Rendang", "Sayur nangka", "Sambal", "Kerupuk", "Daun pisang"],
    step: [
      {
        instruction: "Siapkan nasi putih hangat",
        image: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Tata berbagai lauk pauk khas Padang",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop&crop=center"
  },
  {
    id: 7,
    name: "Mie Ayam",
    calories: 350,
    time: "19:45",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days ago
    category: "Makan Malam",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=500&h=400&fit=crop&crop=center",
    description: "Mie ayam dengan kuah kaldu yang gurih dan topping ayam yang lezat.",
    usedMaterial: ["Mie", "Ayam", "Kaldu", "Sayuran", "Pangsit"],
    unusedMaterial: ["Bakso"],
    missingMaterial: ["Daun bawang", "Bawang goreng"],
    material: ["Mie", "Ayam", "Kaldu", "Sayuran", "Pangsit", "Bakso", "Daun bawang", "Bawang goreng"],
    step: [
      {
        instruction: "Rebus mie hingga matang",
        image: ["https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Siapkan ayam dan pangsit",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop&crop=center"
  },
  // Add data for month testing
  {
    id: 8,
    name: "Bakso",
    calories: 320,
    time: "14:20",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 20 days ago
    category: "Makan Siang",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=400&fit=crop&crop=center",
    description: "Bakso daging sapi dengan kuah kaldu yang hangat dan lezat.",
    usedMaterial: ["Daging sapi", "Tepung tapioka", "Mie", "Sayuran"],
    unusedMaterial: ["Tahu", "Siomay"],
    missingMaterial: ["Bawang goreng", "Kerupuk"],
    material: ["Daging sapi", "Tepung tapioka", "Mie", "Sayuran", "Tahu", "Siomay", "Bawang goreng", "Kerupuk"],
    step: [
      {
        instruction: "Buat adonan bakso dari daging sapi dan tepung",
        image: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Rebus bakso dalam kuah kaldu hingga mengapung",
        image: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop&crop=center"
  },
  {
    id: 9,
    name: "Es Teh Manis",
    calories: 80,
    time: "15:30",
    date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 40 days ago (more than a month)
    category: "Minuman",
    image: "https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=100&h=100&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=500&h=400&fit=crop&crop=center",
    description: "Minuman teh manis dingin yang menyegarkan di cuaca panas.",
    usedMaterial: ["Teh", "Gula", "Air", "Es batu"],
    unusedMaterial: ["Lemon", "Mint"],
    missingMaterial: [],
    material: ["Teh", "Gula", "Air", "Es batu", "Lemon", "Mint"],
    step: [
      {
        instruction: "Seduh teh dengan air panas",
        image: ["https://images.unsplash.com/photo-1587334207976-c8da06a3cc4e?w=300&h=200&fit=crop&crop=center"]
      },
      {
        instruction: "Tambahkan gula dan es batu",
        image: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"]
      }
    ],
    capturedImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center"
  }
];

export const weeklyHistory: HistoryData[] = [
  { day: "Sen", calories: 1850 },
  { day: "Sel", calories: 2100 },
  { day: "Rab", calories: 1600 },
  { day: "Kam", calories: 1940 },
  { day: "Jum", calories: 2050 },
  { day: "Sab", calories: 1750 },
  { day: "Min", calories: 1450 },
];

export const monthlyHistory: HistoryData[] = [
  { week: "W1", calories: 1800 },
  { week: "W2", calories: 1950 },
  { week: "W3", calories: 1700 },
  { week: "W4", calories: 1850 },
];

export const sixMonthHistory: HistoryData[] = [
  { month: "Jan", calories: 1800 },
  { month: "Feb", calories: 1950 },
  { month: "Mar", calories: 1700 },
  { month: "Apr", calories: 1850 },
  { month: "May", calories: 2000 },
  { month: "Jun", calories: 1900 },
];

export const yearlyHistory: HistoryData[] = [
  { year: "2020", calories: 1750 },
  { year: "2021", calories: 1850 },
  { year: "2022", calories: 1900 },
  { year: "2023", calories: 1950 },
  { year: "2024", calories: 1800 },
];

export const periods: PeriodData[] = [
  { id: 'week', label: '1 Minggu', data: weeklyHistory, dataKey: 'day' },
  { id: 'month', label: '1 Bulan', data: monthlyHistory, dataKey: 'week' },
  { id: 'sixmonth', label: '6 Bulan', data: sixMonthHistory, dataKey: 'month' },
  { id: 'year', label: '1 Tahun', data: yearlyHistory, dataKey: 'year' }
];

export const slides: Slide[] = [
  {
    id: 'food',
    title: 'Bahan Makanan Favorit',
    description: 'Konsumsi bahan makanan dalam 7 hari terakhir'
  },
  {
    id: 'history',
    title: 'History Kalori',
    description: 'Data konsumsi kalori berdasarkan periode waktu'
  }
];

export const historyConfig = {
  calories: {
    label: "Calories",
    color: "#f59e0b",
  },
}; 