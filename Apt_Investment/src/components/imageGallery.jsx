import React, { useState } from 'react';

export default function ImageGallery({ investment }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!investment) {
    return <div>No investment data available</div>;
  }

  const galleryImages = investment.galleryImages || [investment.image];

  if (!galleryImages || galleryImages.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-3/4 ml-0 lg:ml-20 overflow-hidden rounded-lg">
        <img
          src={galleryImages[selectedImage]}
          alt={investment.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-2 ml-0 lg:ml-20">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
              index === selectedImage ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${investment.title} view ${index + 1}`}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
