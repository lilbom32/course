import React from 'react';
import { X, ZoomIn, Download } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt, caption }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = alt || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="relative max-w-7xl max-h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="absolute -top-4 -right-16 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Download className="w-6 h-6 text-gray-600" />
        </button>

        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Caption */}
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg">
            <p className="text-center text-sm">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
