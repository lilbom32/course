import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import ImageModal from './ImageModal';

interface ImageCardProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption, className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`relative group cursor-pointer ${className}`} onClick={() => setIsModalOpen(true)}>
        <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay with zoom icon */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <ZoomIn className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Caption */}
        <p className="text-sm text-gray-600 text-center mt-2 group-hover:text-gray-800 transition-colors">
          {caption}
        </p>
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={src}
        alt={alt}
        caption={caption}
      />
    </>
  );
};

export default ImageCard;
