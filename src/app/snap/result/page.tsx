'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MenuBar } from '@/components/menu-bar';
import { MenuBarTop } from '@/components/menu-bar-top';
import ImagePopup from '@/components/image-popup';
import { useSnapResult, useRecipeNavigation } from '@/hooks';
import { Recipe } from '@/types';
import { ROUTES, STORAGE_KEYS } from '@/constants';
import {
  CapturedImagePreview,
  DetectedMaterials,
  RecipeRecommendations,
  RetrySection,
  LoadingState
} from '@/components/snap-result';
import { ProtectedPageContent } from '@/components/auth/ProtectedPage';
import { Suspense } from 'react'
import { SnapResultContent } from '@/components/snap-result'

export default function SnapResultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/30 rounded-full blur-xl" />
        <div className="absolute top-20 -left-8 w-32 h-32 bg-orange-200/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-8 w-28 h-28 bg-amber-300/25 rounded-full blur-xl" />
        <div className="absolute bottom-40 left-4 w-20 h-20 bg-orange-300/20 rounded-full blur-xl" />
      </div>
      
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
        </div>
      }>
        <SnapResultContent />
      </Suspense>
    </div>
  )
}