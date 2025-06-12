import { Recipe } from './recipe';

export interface SnapResult {
  date: string;
  userId: string;
  snaped: string;
  material_detected: string[];
  receipts: Recipe[];
}

export interface RecipeRecommendationsProps {
  snapResult: SnapResult;
  currentIndex: number;
  showNavButtons: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onScrollToRecipe: (direction: 'left' | 'right') => void;
  onImageClick: (imageData: { url: string; alt: string }) => void;
} 