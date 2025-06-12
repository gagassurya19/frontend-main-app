import React from 'react';
import { Package, Tag } from 'lucide-react';

interface DetectedMaterialsProps {
  materials: string[];
}

export function DetectedMaterials({ materials }: DetectedMaterialsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <Package className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800">Bahan Terdeteksi</h3>
          <p className="text-amber-600 text-sm">
            {materials.length > 0 ? `${materials.length} bahan makanan berhasil diidentifikasi` : 'Belum ada bahan yang terdeteksi'}
          </p>
        </div>
      </div>

      {materials.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {materials.map((material, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:border-amber-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-amber-800 font-medium text-sm leading-tight">
                  {material}
                </span>
              </div>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-amber-300/0 group-hover:bg-amber-300/10 rounded-lg transition-all duration-300" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-amber-400" />
          </div>
          <h4 className="font-medium text-amber-700 mb-2">Belum Ada Bahan Terdeteksi</h4>
          <p className="text-amber-600 text-sm max-w-xs mx-auto leading-relaxed">
            Sistem sedang menganalisis gambar Anda. Pastikan gambar menunjukkan bahan makanan yang jelas.
          </p>
        </div>
      )}
    </div>
  );
} 