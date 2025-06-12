import React, { useState } from 'react';
import { Clock, Users, Star, ChefHat, Utensils, Timer, AlertTriangle, CheckCircle, XCircle, ImageIcon, Eye, BookmarkPlus, Bookmark, Loader2 } from 'lucide-react';
import { SnapResult, RecipeRecommendationsProps, CompleteApiResult } from '@/types';
import { historyService, SaveRecipeHistoryRequest } from '@/services/historyService';

export function RecipeRecommendations({
  snapResult,
  completeApiResult,
  currentIndex,
  showNavButtons,
  scrollContainerRef,
  onScrollToRecipe,
  onImageClick,
}: RecipeRecommendationsProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [savedRecipes, setSavedRecipes] = useState<Record<number, boolean>>({});
  const [savingRecipes, setSavingRecipes] = useState<Record<number, boolean>>({});

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  const getMealCategory = (time: string) => {
    const hour = parseInt(time.split(':')[0], 10);

    if (hour >= 4 && hour < 10) return 'Sarapan';
    if (hour >= 10 && hour < 15) return 'Makan Siang';
    if (hour >= 15 && hour < 18) return 'Makan Sore';
    return 'Makan Malam';
  };

  const handleSaveRecipe = async (recipe: any, index: number) => {
    try {
      setSavingRecipes(prev => ({ ...prev, [index]: true }));

      // Get raw API data for this specific recipe
      const apiRecipeData = completeApiResult?.data[index];
      
      const recipeData: SaveRecipeHistoryRequest = {
        // Use actual receipt_id from API response (UUID format required)
        receiptId: apiRecipeData?.receipt_id || '',
        
        // Convert detected labels to JSON string (as expected by SaveRecipeHistoryRequest)
        detectedLabels: JSON.stringify(completeApiResult?.ingredients_detected || snapResult.material_detected || []),
        
        // Use captured image from complete API result or recipe image
        photoUrl: completeApiResult?.capturedImage || recipe.mainImage || '',
        
        category: getMealCategory(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })),
        notes: `Resep dipilih dari rekomendasi AI - ${recipe.title}${apiRecipeData?.similarity_score ? ` (Similarity: ${(apiRecipeData.similarity_score * 100).toFixed(1)}%)` : ''}`,
        
        // Convert ingredients arrays to JSON strings (as expected by SaveRecipeHistoryRequest)
        bahanUtama: JSON.stringify(apiRecipeData?.bahan || recipe.usedMaterial || []),
        bahanKurang: JSON.stringify(apiRecipeData?.bahan_tidak_terdeteksi || recipe.missingMaterial || []),
      };

      console.log('💾 Attempting to save recipe with corrected payload:', recipeData);

      await historyService.saveRecipeHistory(recipeData);
      
      setSavedRecipes(prev => ({ ...prev, [index]: true }));
      
      // Optional: Show success message
      console.log('✅ Recipe saved successfully!');
      
    } catch (error) {
      console.error('❌ Failed to save recipe:', error);
      
      // Optional: Show error message to user
      alert('Gagal menyimpan resep. Silakan coba lagi.');
      
    } finally {
      setSavingRecipes(prev => ({ ...prev, [index]: false }));
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} menit`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours} jam`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* Recipe navigation indicators */}
      {snapResult.receipts.length > 1 && (
        <div className="flex justify-center gap-2 mb-4">
          {snapResult.receipts.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-500 w-6' 
                  : 'bg-amber-200 hover:bg-amber-300'
              }`}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  const cardWidth = container.clientWidth;
                  container.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Recipe counter badge */}
      <div className="flex justify-center items-center mb-4">
        <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
          {snapResult.receipts.length} resep ditemukan
        </div>
      </div>

      {/* Recipe cards container */}
      <div className="relative">

        {/* Scrollable recipe container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth min-h-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {snapResult.receipts.map((recipe, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full bg-gradient-to-br from-white/80 to-amber-50/60 border border-amber-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300 snap-start hover-lift animate-slideInRight overflow-hidden h-fit"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Recipe Image */}
              <div className="relative h-72 w-full overflow-hidden group cursor-pointer" 
                   onClick={() => recipe.mainImage && !imageErrors[`recipe-${index}`] && onImageClick({
                     url: recipe.mainImage,
                     alt: `${recipe.title} - Gambar Resep`
                   })}>
                {recipe.mainImage && !imageErrors[`recipe-${index}`] ? (
                  <>
                    <img
                      src={recipe.mainImage}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImageError(`recipe-${index}`)}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <Eye className="w-6 h-6 text-amber-600" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center text-amber-600">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-sm font-medium opacity-75">Gambar tidak tersedia</p>
                    <p className="text-xs opacity-50 mt-1">Resep #{index + 1}</p>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Rekomendasi #{index + 1}
                </div>
              </div>

              <div className="p-4">
                {/* Recipe header */}
                <div className="mb-3">
                  <h4 className="font-semibold text-amber-900 text-xl leading-tight mb-2">
                    {recipe.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-amber-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      <span>Prep: {formatTime(recipe.prepTime || 15)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Cook: {formatTime(recipe.duration || 30)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings || 2} porsi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Utensils className="w-4 h-4" />
                      <span>{recipe.calories || 250} kal/porsi</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <p className="text-amber-700 text-sm leading-relaxed">
                    {recipe.description || 'Resep yang cocok dengan bahan-bahan yang terdeteksi dari gambar Anda.'}
                  </p>
                </div>

                {/* Complete Ingredients List */}
                {recipe.material && recipe.material.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-amber-800 mb-2 text-sm flex items-center gap-2">
                      <ChefHat className="w-4 h-4" />
                      Semua Bahan ({recipe.material.length}):
                    </h5>
                    <div className="grid grid-cols-1 gap-1">
                      {recipe.material.map((ingredient: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-amber-700"
                        >
                          <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0"></span>
                          <span>{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Material Status Grid */}
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {/* Used Materials */}
                  {recipe.usedMaterial && recipe.usedMaterial.length > 0 && (
                    <div>
                      <h5 className="font-medium text-green-800 mb-2 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Bahan Tersedia ({recipe.usedMaterial.length}):
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {recipe.usedMaterial.map((material: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs border border-green-200"
                          >
                            ✓ {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Materials */}
                  {recipe.missingMaterial && recipe.missingMaterial.length > 0 && (
                    <div>
                      <h5 className="font-medium text-red-800 mb-2 text-sm flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Bahan Perlu Dibeli ({recipe.missingMaterial.length}):
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {recipe.missingMaterial.map((material: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs border border-red-200"
                          >
                            ! {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Unused Materials */}
                  {recipe.unusedMaterial && recipe.unusedMaterial.length > 0 && (
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2 text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Bahan Tidak Terpakai ({recipe.unusedMaterial.length}):
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {recipe.unusedMaterial.map((material: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs border border-orange-200"
                          >
                            ~ {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cooking Steps */}
                {recipe.step && recipe.step.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-amber-800 mb-3 text-sm">
                      Langkah Memasak ({recipe.step.length} langkah):
                    </h5>
                    <div className="space-y-3">
                      {recipe.step.map((step, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-amber-700 text-sm leading-relaxed mb-2">
                              {step.instruction}
                            </p>
                            {step.image && step.image.length > 0 && (
                              <div className="flex gap-2 overflow-x-auto pb-2">
                                {step.image.map((imgUrl, imgIdx) => {
                                  const stepImageKey = `step-${index}-${idx}-${imgIdx}`;
                                  return (
                                    <div key={imgIdx} className="flex-shrink-0 relative group">
                                      {!imageErrors[stepImageKey] ? (
                                        <div 
                                          className="relative cursor-pointer"
                                          onClick={() => onImageClick({
                                            url: imgUrl,
                                            alt: `${recipe.title} - Langkah ${idx + 1} Gambar ${imgIdx + 1}`
                                          })}
                                        >
                                          <img
                                            src={imgUrl}
                                            alt={`Langkah ${idx + 1} - Gambar ${imgIdx + 1}`}
                                            className="w-20 h-20 object-cover rounded-lg border border-amber-200 group-hover:scale-105 transition-transform"
                                            onError={() => handleImageError(stepImageKey)}
                                          />
                                          {/* Hover overlay for step images */}
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                                              <Eye className="w-3 h-3 text-amber-600" />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg border border-amber-200 flex items-center justify-center">
                                          <ImageIcon className="w-6 h-6 text-amber-600 opacity-50" />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Complete Nutrition & Timing Info */}
                <div className="border-t border-amber-200 pt-4 mb-4">
                  <h5 className="font-medium text-amber-800 mb-2 text-sm">
                    Informasi Lengkap:
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-amber-50 p-2 rounded">
                      <span className="text-amber-600">Kalori/porsi: </span>
                      <span className="font-medium text-amber-800">{recipe.calories || 250} kal</span>
                    </div>
                    <div className="bg-amber-50 p-2 rounded">
                      <span className="text-amber-600">Total kalori: </span>
                      <span className="font-medium text-amber-800">{recipe.totalCalories || 500} kal</span>
                    </div>
                    <div className="bg-amber-50 p-2 rounded">
                      <span className="text-amber-600">Waktu prep: </span>
                      <span className="font-medium text-amber-800">{formatTime(recipe.prepTime || 15)}</span>
                    </div>
                    <div className="bg-amber-50 p-2 rounded">
                      <span className="text-amber-600">Waktu masak: </span>
                      <span className="font-medium text-amber-800">{formatTime(recipe.duration || 30)}</span>
                    </div>
                    <div className="bg-amber-50 p-2 rounded col-span-2">
                      <span className="text-amber-600">Total waktu: </span>
                      <span className="font-medium text-amber-800">
                        {formatTime((recipe.prepTime || 15) + (recipe.duration || 30))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Save Recipe Button */}
                <div className="border-t border-amber-200 pt-4">
                  <button
                    onClick={() => handleSaveRecipe(recipe, index)}
                    disabled={savingRecipes[index] || savedRecipes[index]}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      savedRecipes[index]
                        ? 'bg-green-100 text-green-700 border border-green-200 cursor-not-allowed'
                        : savingRecipes[index]
                        ? 'bg-amber-100 text-amber-600 border border-amber-200 cursor-not-allowed'
                        : 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {savingRecipes[index] ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : savedRecipes[index] ? (
                      <>
                        <Bookmark className="w-4 h-4" />
                        Tersimpan
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-4 h-4" />
                        Simpan Resep
                      </>
                    )}
                  </button>
                  
                  {savedRecipes[index] && (
                    <p className="text-center text-green-600 text-xs mt-2 animate-fadeIn">
                      ✅ Resep berhasil disimpan ke riwayat Anda
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 