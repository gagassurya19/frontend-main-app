export interface Receipt {
  id: string;
  judul: string;
  gambar: string;
  deskripsi: string;
  labelBahan: string; // JSON string array
  metodeMemasak: string; // JSON string array
  kalori: number;
  protein: number;
  lemak: number;
  karbohidrat: number;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export interface Ingredient {
  id: string;
  receiptId: string;
  bahan: string;
}

export interface StepImage {
  id: string;
  stepId: string;
  url: string;
  order: number;
}

export interface Step {
  id: string;
  receiptId: string;
  stepNumber: number;
  description: string;
  images: StepImage[];
}

export interface User {
  id: string;
  userAlias: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface HistoryItem {
  id: string;
  userId: string;
  receiptId: string;
  detectedLabels: string | string[]; // Can be JSON string or array
  photoUrl: string;
  selectedAt: string; // ISO date string
  category: string;
  notes: string;
  bahanUtama: string | string[]; // Can be JSON string or array
  bahanKurang: string | string[]; // Can be JSON string or array
  receipt: Receipt;
  user?: User; // Only available in detail response
}

export interface HistoryDetailResponse {
  status: string;
  data: {
    history: HistoryItem;
  };
}

export interface HistoryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface HistoryResponse {
  status: string;
  data: {
    histories: HistoryItem[];
    pagination: HistoryPagination;
  };
}

export interface HistoryQueryParams {
  page?: number;
  limit?: number;
  category?: string;
}

// Processed types for UI
export interface ProcessedHistoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  category: string;
  date: string;
  time: string;
  notes: string;
  detectedIngredients: string[];
  mainIngredients: string[];
  missingIngredients: string[];
  photoUrl: string;
}

// Processed types for detailed view
export interface ProcessedHistoryDetail {
  id: string;
  name: string;
  description: string;
  image: string;
  capturedImage: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  category: string;
  date: string;
  time: string;
  notes: string;
  detectedIngredients: string[];
  mainIngredients: string[];
  missingIngredients: string[];
  cookingMethods: string[];
  ingredients: string[];
  steps: ProcessedStep[];
  user?: {
    name: string;
    alias: string;
    email: string;
  };
}

export interface ProcessedStep {
  stepNumber: number;
  instruction: string;
  images: string[];
} 