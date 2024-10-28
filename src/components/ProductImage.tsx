import React from 'react';

type ProductImageProps = {
  mainImage: string;
  thumbnails: string[];
  onThumbnailClick: (index: number) => void;
  activeIndex: number;
};

export function ProductImage({ mainImage, thumbnails, onThumbnailClick, activeIndex }: ProductImageProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <img src={mainImage} alt="Product" className="w-full h-auto object-cover" />
      </div>
      <div className="flex gap-2">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => onThumbnailClick(index)}
            className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
              activeIndex === index ? 'border-black' : 'border-transparent'
            }`}
          >
            <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}