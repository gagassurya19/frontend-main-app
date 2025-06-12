import React from 'react';
import { Camera, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RetrySectionProps {
  onRetryDetection: () => void;
}

export function RetrySection({ onRetryDetection }: RetrySectionProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-amber-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Tidak Menemukan yang Dicari?</h3>
          <p className="text-amber-600 text-sm leading-relaxed max-w-md mx-auto">
            Jika hasil tidak sesuai harapan, Anda bisa mengambil foto ulang dengan pencahayaan yang lebih baik 
            atau angle yang berbeda untuk hasil yang lebih akurat.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
        <Button 
          onClick={onRetryDetection}
          className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 hover:scale-105 shadow-md px-6 py-3 rounded-xl font-medium min-w-[160px]"
        >
          <Camera className="w-4 h-4" />
          Scan Ulang
        </Button>
        
        <div className="flex items-center gap-2 text-xs text-amber-600">
          <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
          <span>Atau coba dengan gambar yang berbeda</span>
          <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Tips section */}
      <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
        <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-2">
          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
            <Lightbulb className="text-white w-3 h-3" />
          </div>
          Tips untuk Hasil Terbaik
        </h4>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>• Pastikan pencahayaan cukup terang</li>
          <li>• Posisikan bahan makanan terlihat jelas</li>
          <li>• Hindari bayangan yang menutupi bahan</li>
          <li>• Gunakan background yang kontras</li>
        </ul>
      </div>
    </div>
  );
} 