import { Recipe } from './recipe';
import { ApiRecipe, ApiRecipeStep } from './api';

export interface SnapResult {
  date: string;
  userId: string;
  snaped: string;
  material_detected: string[];
  receipts: Recipe[];
}

// Complete API Response interface for storing all raw data
export interface CompleteApiResult {
  data: ApiRecipe[];
  ingredients_detected: string[];
  status: string;
  capturedImage: string;
  timestamp: string;
}

export interface RecipeRecommendationsProps {
  snapResult: SnapResult;
  completeApiResult: CompleteApiResult | null;
  currentIndex: number;
  showNavButtons: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onScrollToRecipe: (direction: 'left' | 'right') => void;
  onImageClick: (imageData: { url: string; alt: string }) => void;
} 