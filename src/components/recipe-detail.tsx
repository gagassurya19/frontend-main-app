import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import { Recipe, RecipeDetailProps } from '@/types';

export function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10 rounded-full bg-background/80 hover:bg-background/90 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative h-80 w-full">
          <Image
            src={recipe.mainImage}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">30 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">4 porsi</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                <span className="text-sm">{recipe.calories} cal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
          <p className="text-muted-foreground">{recipe.description}</p>
        </div>

        {/* Materials Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Bahan-bahan</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bahan yang digunakan:</h3>
              <ul className="space-y-2">
                {recipe.usedMaterial.map((material, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bahan yang tidak digunakan:</h3>
              <ul className="space-y-2">
                {recipe.unusedMaterial.map((material, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bahan yang kurang:</h3>
              <ul className="space-y-2">
                {recipe.missingMaterial.map((material, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Langkah-langkah</h2>
          <div className="space-y-6">
            {recipe.step.map((step, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border/40">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="mb-3">{step.instruction}</p>
                    {step.image.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {step.image.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative h-40 rounded-lg overflow-hidden">
                            <Image
                              src={img}
                              alt={`Step ${index + 1} - Image ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-card rounded-lg p-4 border border-border/40">
          <h2 className="text-xl font-semibold mb-4">Informasi Gizi</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Kalori</p>
              <p className="text-lg font-semibold">{recipe.calories} cal</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="text-lg font-semibold">25g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Karbohidrat</p>
              <p className="text-lg font-semibold">45g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lemak</p>
              <p className="text-lg font-semibold">15g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 