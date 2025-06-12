import { ApiRecommendationResponse, ApiRecipe, ApiRecipeStep } from '@/types/api';
import { SnapResult, Recipe, RecipeStep } from '@/types';

/**
 * Transform API recipe step to our Recipe step format
 */
function transformRecipeStep(stepKey: string, apiStep: ApiRecipeStep): RecipeStep {
  return {
    instruction: apiStep.deskripsi,
    image: apiStep.gambar,
  };
}

/**
 * Transform API recipe to our Recipe format
 */
function transformRecipe(apiRecipe: ApiRecipe): Recipe {
  // Parse JSON strings in arrays if they exist
  const parseJsonArray = (arr: string[]): string[] => {
    if (arr.length > 0 && arr[0].startsWith('[')) {
      try {
        return JSON.parse(arr[0]);
      } catch {
        return arr;
      }
    }
    return arr;
  };

  const parsedBahan = parseJsonArray(apiRecipe.bahan);
  const parsedBahanTidakTerdeteksi = parseJsonArray(apiRecipe.bahan_tidak_terdeteksi);
  const parsedMetodeMemasak = Array.isArray(apiRecipe.metode_memasak) 
    ? apiRecipe.metode_memasak 
    : parseJsonArray([apiRecipe.metode_memasak as unknown as string]);

  // Transform steps from object to array
  const steps: RecipeStep[] = Object.entries(apiRecipe.langkah)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([stepKey, stepData]) => transformRecipeStep(stepKey, stepData));

  return {
    title: apiRecipe.judul,
    mainImage: apiRecipe.gambar,
    calories: Math.round(apiRecipe.kalori),
    totalCalories: Math.round(apiRecipe.kalori), // Assuming this is per serving, so same as calories
    duration: 30, // Default cooking time since not provided by API
    prepTime: 15, // Default prep time since not provided by API
    servings: 1, // Default servings since not provided by API
    usedMaterial: parsedBahan,
    unusedMaterial: parsedBahanTidakTerdeteksi,
    missingMaterial: parsedBahanTidakTerdeteksi, // Same as unused for now
    material: parsedBahan,
    description: apiRecipe.deskripsi,
    step: steps,
  };
}

/**
 * Transform API response to SnapResult format
 */
export function transformApiResponseToSnapResult(
  apiResponse: ApiRecommendationResponse,
  capturedImageUrl: string,
  userId: string = 'current-user'
): SnapResult {
  const recipes = apiResponse.data.map(transformRecipe);

  return {
    date: new Date().toISOString(),
    userId,
    snaped: capturedImageUrl,
    material_detected: apiResponse.ingredients_detected,
    receipts: recipes,
  };
} 