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
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <img
          src={galleryImages[selectedImage]}
          alt={investment.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${index === selectedImage ? "border-blue-500" : "border-transparent"}`}
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

