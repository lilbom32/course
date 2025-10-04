import React, { useState } from 'react';
import { ImageCard } from '../common/Layout';

interface LatteArtGalleryProps {
  isDarkMode?: boolean;
}

const LatteArtGallery: React.FC<LatteArtGalleryProps> = ({ isDarkMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'intermediate' | 'advanced' | 'creative'>('basic');
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);

  const patterns = {
    basic: [
      {
        name: 'Trái Tim Cơ Bản',
        image: 'https://dayphache.edu.vn/wp-content/uploads/2019/05/rot-tao-hinh-trai-tim.jpg',
        description: 'Hình trái tim đơn giản, phù hợp cho người mới bắt đầu',
        difficulty: 'Dễ',
        time: '30-45s'
      },
      {
        name: 'Trái Tim Đôi',
        image: 'https://static.vecteezy.com/system/resources/previews/055/365/073/non_2x/double-heart-coffee-latte-art-isolated-on-transparent-background-png.png',
        description: 'Hai trái tim đan xen, tạo hiệu ứng đẹp mắt',
        difficulty: 'Dễ',
        time: '45-60s'
      },
      {
        name: 'Rosetta Cơ Bản',
        image: 'https://cdn.shopify.com/s/files/1/0403/3089/files/Latte_Art_Rosetta_-_Creating_the_Rosetta_Pattern_with_Wiggle_-_4_480x480.jpg?v=1639731610',
        description: 'Rosetta 3-4 lớp lá, kỹ thuật cơ bản',
        difficulty: 'Trung bình',
        time: '45-60s'
      }
    ],
    intermediate: [
      {
        name: 'Tulip 3 Lớp',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6qBUGmc9zSXqmShxl37Mwy4EnROw5f-sYCg&s',
        description: 'Hoa tulip với 3 lớp cánh, đòi hỏi kiểm soát tốt',
        difficulty: 'Trung bình',
        time: '60-75s'
      },
      {
        name: 'Rosetta Nhiều Lớp',
        image: 'https://horecavn.com/wp-content/uploads/2024/05/8-buoc-tao-hinh-rosetta-hoan-chinh_20240527010549.jpg',
        description: 'Rosetta với 6-8 lớp lá, tạo độ phức tạp',
        difficulty: 'Trung bình',
        time: '60-90s'
      },
      {
        name: 'Trái Tim Có Viền',
        image: 'https://khoinghiepcafe.com/wp-content/uploads/cach-ve-latte-art-hinh-trai-tim-voi-may-pha-cafe-breville-viet-nam-khoi-nghiep-cafe.jpg',
        description: 'Trái tim với viền trang trí, tăng tính thẩm mỹ',
        difficulty: 'Trung bình',
        time: '45-60s'
      }
    ],
    advanced: [
      {
        name: 'Thiên Nga',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8HJ8oDU_WJPIylcR8NMJgDrRwtJcU6Gjgg&s',
        description: 'Hình thiên nga phức tạp, đòi hỏi kỹ năng cao',
        difficulty: 'Khó',
        time: '75-90s'
      },
      {
        name: 'Hoa Hồng',
        image: 'https://media.istockphoto.com/id/844290606/vi/anh/m%E1%BB%99t-t%C3%A1ch-c%C3%A0-ph%C3%AA-v%E1%BB%9Bi-hoa-h%E1%BB%93ng-ngh%E1%BB%87-thu%E1%BA%ADt-latte-trong-m%E1%BB%99t-t%C3%A1ch-c%C3%A0-ph%C3%AA-tr%E1%BA%AFng-tr%C3%AAn-b%C3%A0n-g%E1%BB%97-trong-qu%C3%A1n.jpg?s=170667a&w=0&k=20&c=Ezo-vvqXViu7fVb4gT8MEZjOh_ZTM0ZLWIlAnCC2HTk=',
        description: 'Hoa hồng nhiều lớp, kỹ thuật layering',
        difficulty: 'Khó',
        time: '90-120s'
      },
      {
        name: 'Tulip Nhiều Lớp',
        image: 'https://tophotel.vn/wp-content/uploads/2021/04/latte-art-tulip.jpg',
        description: 'Tulip với 5-7 lớp cánh, kiểm soát hoàn hảo',
        difficulty: 'Khó',
        time: '75-105s'
      }
    ],
    creative: [
      {
        name: 'Hình Mặt Cười',
        image: 'https://png.pngtree.com/png-vector/20241211/ourlarge/pngtree-smiley-face-latte-art-in-coffee-cup-illustration-png-image_14676419.png',
        description: 'Mặt cười vui tươi, sử dụng etching',
        difficulty: 'Trung bình',
        time: '60-75s'
      },
      {
        name: 'Hình Con Mèo',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOvB4ejjOfldqPjS7p3649N3DKTRQhcGyaw&s',
        description: 'Hình con mèo dễ thương, kết hợp pour và etching',
        difficulty: 'Khó',
        time: '90-120s'
      },
      {
        name: 'Hình Trái Tim Có Cánh',
        image: 'https://png.pngtree.com/png-vector/20250219/ourmid/pngtree-white-cup-of-art-latte-coffee-with-heart-shape-png-image_15527168.png',
        description: 'Trái tim có cánh thiên thần, sáng tạo',
        difficulty: 'Khó',
        time: '75-90s'
      }
    ]
  };

  const categories = [
    { key: 'basic', name: 'Cơ Bản', color: 'green' },
    { key: 'intermediate', name: 'Trung Bình', color: 'yellow' },
    { key: 'advanced', name: 'Nâng Cao', color: 'orange' },
    { key: 'creative', name: 'Sáng Tạo', color: 'purple' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'text-green-600 bg-green-100';
      case 'Trung bình': return 'text-yellow-600 bg-yellow-100';
      case 'Khó': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`rounded-xl p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        🎨 Thư Viện Mẫu Latte Art
      </h3>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key as keyof typeof patterns)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              selectedCategory === category.key
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${getCategoryColor(category.color)}`}></div>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Patterns Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns[selectedCategory].map((pattern, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg cursor-pointer ${
              selectedPattern === index
                ? isDarkMode
                  ? 'border-blue-500 bg-blue-900/30'
                  : 'border-blue-500 bg-blue-50'
                : isDarkMode
                ? 'border-gray-600 bg-gray-700 hover:border-blue-400'
                : 'border-gray-200 bg-gray-50 hover:border-blue-300'
            }`}
            onClick={() => setSelectedPattern(selectedPattern === index ? null : index)}
          >
            {/* Pattern Image */}
            <div className="relative">
              <ImageCard
                src={pattern.image}
                caption=""
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(pattern.difficulty)}`}>
                  {pattern.difficulty}
                </span>
              </div>
            </div>

            {/* Pattern Info */}
            <div className="p-4">
              <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {pattern.name}
              </h4>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {pattern.description}
              </p>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  ⏱️ {pattern.time}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(pattern.difficulty)}`}>
                  {pattern.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Pattern Details */}
      {selectedPattern !== null && (
        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
          <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            📋 Chi tiết mẫu: {patterns[selectedCategory][selectedPattern].name}
          </h4>
          <div className={`space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
            <p><strong>Mô tả:</strong> {patterns[selectedCategory][selectedPattern].description}</p>
            <p><strong>Độ khó:</strong> {patterns[selectedCategory][selectedPattern].difficulty}</p>
            <p><strong>Thời gian thực hiện:</strong> {patterns[selectedCategory][selectedPattern].time}</p>
            <p><strong>Kỹ thuật chính:</strong> {
              selectedCategory === 'basic' ? 'Rót cơ bản, kiểm soát tốc độ' :
              selectedCategory === 'intermediate' ? 'Layering, kiểm soát di chuyển' :
              selectedCategory === 'advanced' ? 'Kết hợp nhiều kỹ thuật, sáng tạo' :
              'Etching, kết hợp pour và vẽ'
            }</p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
        <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
          💡 Lời khuyên:
        </h4>
        <div className={`space-y-2 ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
          <p>• Bắt đầu với các mẫu cơ bản trước khi thử mẫu phức tạp</p>
          <p>• Luyện tập đều đặn để nâng cao kỹ năng</p>
          <p>• Quay video quá trình thực hiện để phân tích và cải thiện</p>
          <p>• Tham khảo các video hướng dẫn chi tiết trên YouTube</p>
          <p>• Tham gia cộng đồng Latte Art để chia sẻ kinh nghiệm</p>
        </div>
      </div>
    </div>
  );
};

export default LatteArtGallery;
