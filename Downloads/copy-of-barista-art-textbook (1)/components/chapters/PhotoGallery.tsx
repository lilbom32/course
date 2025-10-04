import React, { useState } from 'react';
import { X } from 'lucide-react';

const images = [
  { src: 'https://i.pinimg.com/736x/c0/cb/0c/c0cb0c86dfef743c00e575c812173664.jpg', alt: 'Nghệ thuật Latte Art tinh xảo' },
  { src: 'https://i.pinimg.com/1200x/df/d6/32/dfd632f9dc6547fefef35734c3411a9f.jpg', alt: 'Hạt cà phê Arabica chất lượng cao' },
  { src: 'https://i.pinimg.com/1200x/f2/a2/a4/f2a2a434b1b4d69060ea3bfd8c028373.jpg', alt: 'Không gian quán cà phê hiện đại và ấm cúng' },
  { src: 'https://i.pinimg.com/1200x/a2/e2/4e/a2e24ea028a8926b02b871938df6b248.jpg', alt: 'Một ly espresso hoàn hảo với lớp crema dày' },
  { src: 'https://i.pinimg.com/1200x/23/ed/a0/23eda05a4dfe99545859dc745ae2c76e.jpg', alt: 'Barista đang thực hiện kỹ thuật đổ sữa cho Latte Art' },
  { src: 'https://i.pinimg.com/736x/d3/e3/86/d3e3868c0bb4b51fc5ae350766ae280a.jpg', alt: 'Quả cà phê chín đỏ trên cây' },
];

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-screen-lg max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition"
              aria-label="Close image viewer"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default PhotoGallery;