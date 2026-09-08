"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface ProductGalleryProps {
  images: string[];
  imageCover: string;
  title: string;
}

export default function ProductGallery({ images, imageCover, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prevImageCover, setPrevImageCover] = useState(imageCover);

  if (prevImageCover !== imageCover) {
    setPrevImageCover(imageCover);
    setSelectedImage(null);
  }

  const activeImage = selectedImage ?? imageCover;

  // Combine imageCover and images, keeping only unique values
  const allImages = [imageCover, ...(images || [])].filter(Boolean);
  const uniqueImages = Array.from(new Set(allImages));

  return (
    <div className="w-full lg:w-[400px] xl:w-[480px] shrink-0 flex flex-col gap-4">
      {/* Main Image */}
      <Card className="p-4 aspect-[3/4] relative overflow-hidden flex items-center justify-center rounded-xl shadow-sm border-[#E5E7EB] bg-white">
        {activeImage ? (
          <div className="relative w-full h-full">
            <Image 
              src={activeImage} 
              alt={title} 
              fill 
              sizes="(max-width: 1024px) 100vw, 480px" 
              className="object-contain transition-opacity duration-300" 
              priority 
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </Card>
      {/* Thumbnails */}
      <div className="flex gap-2 h-24 sm:h-32 overflow-x-auto scrollbar-hide py-1">
        {uniqueImages.map((img, idx) => (
          <button 
            key={idx} 
            type="button"
            onClick={() => setSelectedImage(img)}
            className={`relative flex-1 min-w-[70px] sm:min-w-[90px] h-full rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden transition-all ${activeImage === img ? 'border-4 border-[#16A34A]' : 'border-4 border-transparent hover:border-gray-300'}`}
          >
            <Image 
              src={img} 
              alt={`${title} thumbnail ${idx + 1}`} 
              fill 
              sizes="90px" 
              className={`object-contain transition-opacity ${activeImage === img ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
