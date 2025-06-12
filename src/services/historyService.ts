import { 
  HistoryResponse, 
  HistoryDetailResponse,
  HistoryQueryParams, 
  HistoryItem, 
  ProcessedHistoryItem,
  ProcessedHistoryDetail,
  ProcessedStep
} from '@/types/history';
import { getAuthTokenFromCookie } from '@/utils/auth-cookies';

// Types for saving recipe history
export interface SaveRecipeHistoryRequest {
  receiptId: string;
  detectedLabels: string; // JSON string dari bahan-bahan hasil deteksi ML
  photoUrl?: string; // captured photo stored in Supabase storage
  category?: string; // contoh: "Sarapan", "Makan Siang", dst
  notes?: string; // opsional: catatan user
  bahanUtama: string; // JSON string: bahan cocok dengan resep
  bahanKurang: string; // JSON string: bahan yang tidak tersedia
}

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Safe JSON parse helper
const safeJsonParse = (jsonString: string | string[]): string[] => {
  if (Array.isArray(jsonString)) {
    return jsonString;
  }
  
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// Convert API data to UI format for list view
const processHistoryItem = (item: HistoryItem): ProcessedHistoryItem => {
  const date = new Date(item.selectedAt);
  
  return {
    id: item.id,
    name: item.receipt.judul,
    description: item.notes || `${item.receipt.judul} - Makanan lezat dengan bahan-bahan pilihan`,
    image: item.receipt.gambar,
    calories: Math.round(item.receipt.kalori),
    protein: item.receipt.protein,
    fat: item.receipt.lemak,
    carbs: item.receipt.karbohidrat,
    category: item.category,
    date: date.toISOString().split('T')[0], // YYYY-MM-DD format
    time: date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    notes: item.notes,
    detectedIngredients: safeJsonParse(item.detectedLabels),
    mainIngredients: safeJsonParse(item.bahanUtama),
    missingIngredients: safeJsonParse(item.bahanKurang),
    photoUrl: item.photoUrl,
  };
};

// Convert API data to UI format for detail view
const processHistoryDetail = (item: HistoryItem): ProcessedHistoryDetail => {
  const date = new Date(item.selectedAt);
  
  // Process steps
  const processedSteps: ProcessedStep[] = item.receipt.steps
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map(step => ({
      stepNumber: step.stepNumber,
      instruction: step.description,
      images: step.images
        .sort((a, b) => a.order - b.order)
        .map(img => img.url)
    }));

  return {
    id: item.id,
    name: item.receipt.judul,
    description: item.receipt.deskripsi || item.notes || `${item.receipt.judul} - Makanan lezat dengan bahan-bahan pilihan`,
    image: item.receipt.gambar,
    capturedImage: item.photoUrl,
    calories: Math.round(item.receipt.kalori),
    protein: item.receipt.protein,
    fat: item.receipt.lemak,
    carbs: item.receipt.karbohidrat,
    category: item.category,
    date: date.toISOString().split('T')[0],
    time: date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    notes: item.notes,
    detectedIngredients: safeJsonParse(item.detectedLabels),
    mainIngredients: safeJsonParse(item.bahanUtama),
    missingIngredients: safeJsonParse(item.bahanKurang),
    cookingMethods: safeJsonParse(item.receipt.metodeMemasak),
    ingredients: item.receipt.ingredients.map(ing => ing.bahan),
    steps: processedSteps,
    user: item.user ? {
      name: `${item.user.firstName} ${item.user.lastName}`.trim(),
      alias: item.user.userAlias,
      email: item.user.email
    } : undefined,
  };
};

// Get auth headers using existing utility
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthTokenFromCookie();
  return {
    'Content-Type': 'application/json',
    ...(token && { authorization: `Bearer ${token}` })
  };
};

// Handle API response with consistent error handling
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication failed');
    }
    if (response.status === 404) {
      throw new Error('Data not found');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.status !== 'success') {
    throw new Error('API request was not successful');
  }

  return data.data;
};

export const historyService = {
  async getUserHistory(params: HistoryQueryParams = {}): Promise<{
    histories: ProcessedHistoryItem[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    const token = getAuthTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const queryString = new URLSearchParams();
    
    if (params.page) queryString.append('page', params.page.toString());
    if (params.limit) queryString.append('limit', params.limit.toString());
    if (params.category && params.category !== 'all') {
      queryString.append('category', params.category);
    }

    const url = `${API_BASE_URL}/history/my-history${queryString.toString() ? `?${queryString.toString()}` : ''}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await handleResponse<{
        histories: HistoryItem[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
      }>(response);

      const processedHistories = result.histories.map(processHistoryItem);

      return {
        histories: processedHistories,
        pagination: result.pagination,
      };

    } catch (error) {
      console.error('Error fetching user history:', error);
      
      // Return empty result for 404 instead of throwing error
      if (error instanceof Error && error.message.includes('Data not found')) {
        return {
          histories: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
        };
      }
      
      throw error;
    }
  },

  async getHistoryDetail(historyId: string): Promise<ProcessedHistoryDetail> {
    const token = getAuthTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${API_BASE_URL}/history/${historyId}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await handleResponse<{ history: HistoryItem }>(response);

      return processHistoryDetail(result.history);

    } catch (error) {
      console.error('Error fetching history detail:', error);
      throw error;
    }
  },

  async saveRecipeHistory(data: SaveRecipeHistoryRequest): Promise<any> {
    const token = getAuthTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${API_BASE_URL}/history`;

    try {
      console.log('🍽️ Saving recipe to history:', data);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await handleResponse<any>(response);
      
      console.log('✅ Recipe saved to history successfully:', result);
      return result;

    } catch (error) {
      console.error('❌ Error saving recipe to history:', error);
      throw error;
    }
  }
}; 