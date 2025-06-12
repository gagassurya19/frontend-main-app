import React from 'react';
import { Scan, Brain, ChefHat, Sparkles } from 'lucide-react';

export function LoadingState() {
  const steps = [
    {
      icon: Scan,
      title: "Menganalisis Gambar",
      description: "Memproses gambar yang Anda upload..."
    },
    {
      icon: Brain,
      title: "Mendeteksi Bahan",
      description: "Mengidentifikasi bahan makanan..."
    },
    {
      icon: ChefHat,
      title: "Mencari Resep",
      description: "Mencocokkan dengan database resep..."
    },
    {
      icon: Sparkles,
      title: "Menyiapkan Hasil",
      description: "Menyusun rekomendasi terbaik..."
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-20 -left-8 w-32 h-32 bg-orange-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-8 w-28 h-28 bg-amber-300/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-md w-full">
          {/* Main loading card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200/40">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-amber-800 mb-2">Sedang Menganalisis</h2>
              <p className="text-amber-600 text-sm">
                AI kami sedang memproses gambar Anda untuk memberikan rekomendasi terbaik
              </p>
            </div>

            {/* Progress steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = true; // For demo, show all as active
                const isCompleted = false; // For demo
                
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200' 
                        : 'bg-muted/30'
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-amber-500 text-white animate-pulse' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium transition-colors ${
                        isActive ? 'text-amber-800' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm transition-colors ${
                        isActive ? 'text-amber-600' : 'text-muted-foreground'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    
                    {isActive && (
                      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-amber-600 mb-2">
                <span>Progress</span>
                <span>Menganalisis...</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full animate-pulse w-3/4 transition-all duration-1000" />
              </div>
            </div>

            {/* Bottom message */}
            <div className="text-center">
              <p className="text-xs text-amber-600">
                Proses ini biasanya memakan waktu 10-30 detik
              </p>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        </div>
               </div>
    );
  } 