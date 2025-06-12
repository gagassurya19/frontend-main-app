'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CapturedImagePreview, 
  DetectedMaterials, 
  RecipeRecommendations, 
  RetrySection, 
  LoadingState 
} from '@/components/snap-result';
import ImagePopup from '@/components/image-popup';
import { MenuBar } from '@/components/menu-bar';
import { MenuBarTop } from '@/components/menu-bar-top';
import { ProtectedPageContent } from '@/components/auth/ProtectedPage';
import { useSnapResult, useRecipeNavigation } from '@/hooks';
import { ROUTES } from '@/constants';

export function SnapResultContent() {
  const router = useRouter();
  const { snapResult, completeApiResult, isLoading } = useSnapResult();
  const { currentIndex, showNavButtons, scrollContainerRef, scrollToRecipe } = useRecipeNavigation(snapResult);
  
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  const handleRetry = () => {
    router.push(ROUTES.SNAP);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!snapResult) {
    return (
      <ProtectedPageContent>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center px-6 animate-fadeInUp">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.15 0-4.2-.585-6.1-1.64l1.1-2.76A5 5 0 0112 13a5 5 0 004.9-2.4l1.1 2.76A7.96 7.96 0 0112 15z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Data Tidak Ditemukan</h2>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Sepertinya hasil scan belum tersedia. Silakan coba scan ulang untuk mendapatkan rekomendasi resep.
              </p>
            </div>
            <button 
              onClick={handleRetry}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover-lift"
            >
              Kembali ke Scan
            </button>
          </div>
        </div>
      </ProtectedPageContent>
    );
  }

  return (
    <ProtectedPageContent>
      <div className="min-h-screen">
        <MenuBarTop />
        
        {/* Header Section */}
        <div className="px-4 pt-20 pb-4">
          <div className="text-center mb-6 animate-fadeInUp">
            <h1 className="text-2xl font-bold text-amber-800 mb-2">Hasil Scan</h1>
            <p className="text-amber-600 text-sm">
              Kami telah menganalisis gambar Anda dan menemukan beberapa rekomendasi resep
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="px-4 pb-24 space-y-6">
          {/* Captured Image Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/40 shadow-sm hover-lift animate-fadeInUp glass" style={{ animationDelay: '0.1s' }}>
            <CapturedImagePreview 
              imageUrl={snapResult.snaped}
              onImageClick={(imageData) => setSelectedImage(imageData)}
            />
          </div>
          
          {/* Detected Materials Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/40 shadow-sm hover-lift animate-fadeInUp glass" style={{ animationDelay: '0.2s' }}>
            <DetectedMaterials 
              materials={snapResult.material_detected}
            />
          </div>
          
          {/* Recipe Recommendations Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/40 shadow-sm hover-lift animate-fadeInUp glass" style={{ animationDelay: '0.3s' }}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                </svg>
                Rekomendasi Resep
              </h2>
              <p className="text-amber-600 text-sm">
                {snapResult.receipts.length} resep ditemukan berdasarkan bahan yang terdeteksi
              </p>
            </div>
            
            <RecipeRecommendations
              snapResult={snapResult}
              completeApiResult={completeApiResult}
              currentIndex={currentIndex}
              showNavButtons={showNavButtons}
              scrollContainerRef={scrollContainerRef}
              onScrollToRecipe={scrollToRecipe}
              onImageClick={(imageData) => setSelectedImage(imageData)}
            />
          </div>
          
          {/* Retry Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/40 shadow-sm hover-lift animate-fadeInUp glass" style={{ animationDelay: '0.4s' }}>
            <RetrySection onRetryDetection={handleRetry} />
          </div>
        </div>

        
        <div className="flex justify-center mt-16">
          <MenuBar
            showRecipeNavButtons={showNavButtons}
            hasMultipleRecipes={snapResult?.receipts && snapResult.receipts.length > 1}
            onScrollToRecipe={scrollToRecipe}
          />
        </div>
        
        <ImagePopup
          isOpen={selectedImage !== null}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage?.url || ''}
          alt={selectedImage?.alt || ''}
        />
      </div>
    </ProtectedPageContent>
  );
} 