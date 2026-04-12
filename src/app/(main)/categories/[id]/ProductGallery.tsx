"use client"
import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

interface ProductGalleryProps {
  images: string[];
  imageCover: string;
  title: string;
}

export default function ProductGallery({ images, imageCover, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(imageCover);

  useEffect(() => {
    if (imageCover) {
      setActiveImage(imageCover);
    }
  }, [imageCover]);

  // Combine imageCover and images, keeping only unique values
  const allImages = [imageCover, ...(images || [])].filter(Boolean);
  const uniqueImages = Array.from(new Set(allImages));

  return (
    <div className="w-full lg:w-[400px] xl:w-[480px] shrink-0 flex flex-col gap-4">
      {/* Main Image */}
      <Card className="p-4 aspect-[3/4] relative overflow-hidden flex items-center justify-center rounded-xl shadow-sm border-[#E5E7EB]">
        {activeImage ? (
          <img src={activeImage} alt={title} className="w-full h-full object-contain transition-opacity duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg"></div>
        )}
      </Card>
      {/* Thumbnails */}
      <div className="flex gap-2 h-24 sm:h-32 overflow-x-auto scrollbar-hide py-1">
        {uniqueImages.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveImage(img)}
            className={`flex-1 min-w-[70px] sm:min-w-[90px] rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden transition-all ${activeImage === img ? 'border-4 border-[#16A34A]' : 'border-4 border-transparent hover:border-gray-300'}`}
          >
            <img src={img} alt={`${title} thumbnail ${idx + 1}`} className={`w-full h-full object-contain transition-opacity ${activeImage === img ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
