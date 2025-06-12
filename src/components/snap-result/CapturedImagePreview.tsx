import React from 'react';
import Image from 'next/image';
import { Camera, Eye, CheckCircle } from 'lucide-react';
import { formatDate } from '@/utils/bmi';
import { STORAGE_KEYS } from '@/constants';

interface CapturedImagePreviewProps {
  imageUrl: string;
  onImageClick: (imageData: { url: string; alt: string }) => void;
}

export function CapturedImagePreview({ imageUrl, onImageClick }: CapturedImagePreviewProps) {
  const handleImageClick = () => {
    onImageClick({
      url: imageUrl,
      alt: 'Gambar yang telah di-scan'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800">Gambar Berhasil di-Scan</h3>
          <p className="text-amber-600 text-sm">Tap untuk melihat gambar lebih detail</p>
        </div>
      </div>
      
      <div className="relative group cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-1" onClick={handleImageClick}>
        <img
          src={imageUrl}
          alt="Gambar yang telah di-scan"
          className="w-full h-52 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
            <Eye className="w-6 h-6 text-amber-600" />
          </div>
        </div>
        
        {/* Success badge */}
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
          ✓ Berhasil
        </div>
      </div>
      <p className="text-amber-600 text-sm text-center">
        Discan pada: {formatDate(new Date().toISOString())}
      </p>
    </div>
  );
} 