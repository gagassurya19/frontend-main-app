'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface ImageFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  fallbackClassName = '',
  priority = false,
  sizes,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted text-muted-foreground ${
          fill ? 'w-full h-full' : ''
        } ${fallbackClassName}`}
        style={!fill ? { width, height } : undefined}
      >
        <div className="flex flex-col items-center gap-2">
          <ImageIcon className="w-8 h-8" />
          <span className="text-xs text-center">Gambar tidak tersedia</span>
        </div>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className,
    priority,
    onError: () => setHasError(true),
    ...(fill ? { fill: true } : { width, height }),
    ...(sizes && { sizes }),
  };

  return <Image {...imageProps} />;
}; 