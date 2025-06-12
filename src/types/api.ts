// API Response Types
export interface ApiRecipeStep {
  deskripsi: string;
  gambar: string[];
}

export interface ApiRecipe {
  bahan: string[];
  bahan_tidak_terdeteksi: string[];
  deskripsi: string;
  gambar: string;
  judul: string;
  kalori: number;
  karbohidrat: number;
  langkah: Record<string, ApiRecipeStep>;
  lemak: number;
  metode_memasak: string[];
  protein: number;
  receipt_id: string;
  similarity_score: number;
}

export interface ApiRecommendationResponse {
  data: ApiRecipe[];
  ingredients_detected: string[];
  status: string;
}

// Request Types
export interface RecommendationRequest {
  image: File | Blob;
} 