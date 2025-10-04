import React, { useState } from 'react';
import { Bean, Zap, Droplets, Mountain } from 'lucide-react';

const coffeeTypes = [
  {
    id: 'robusta',
    name: 'Robusta',
    aka: '(Café vối)',
    imageSrc: 'https://www.espresso-international.com/media/image/24/3f/79/Robusta-bean.jpg',
    characteristics: [
      { icon: <Zap size={18} className="text-red-500" />, label: 'Hương vị', value: 'Đắng gắt, đậm đà' },
      { icon: <Bean size={18} className="text-amber-600" />, label: 'Caffeine', value: 'Cao (2% - 4%)' },
      { icon: <Droplets size={18} className="text-blue-500" />, label: 'Tính axit', value: 'Thấp, không chua' },
      { icon: <Mountain size={18} className="text-green-600" />, label: 'Độ cao trồng', value: 'Dưới 1000m' },
    ],
  },
  {
    id: 'arabica',
    name: 'Arabica',
    aka: '(Café chè)',
    imageSrc: 'https://www.espresso-international.com/media/image/a4/cc/f0/Arabica-beans-big.jpg',
    characteristics: [
      { icon: <Zap size={18} className="text-red-500" />, label: 'Hương vị', value: 'Thanh dịu, hương thơm' },
      { icon: <Bean size={18} className="text-amber-600" />, label: 'Caffeine', value: 'Thấp (1% - 2%)' },
      { icon: <Droplets size={18} className="text-blue-500" />, label: 'Tính axit', value: 'Cao, có vị chua nhẹ' },
      { icon: <Mountain size={18} className="text-green-600" />, label: 'Độ cao trồng', value: 'Trên 1000m' },
    ],
  },
  {
    id: 'moka',
    name: 'Moka',
    aka: '(Giống Arabica)',
    imageSrc: 'https://i.pinimg.com/736x/f7/5e/21/f75e21c859b555b251d2fa6facb3d8b5.jpg',
    characteristics: [
      { icon: <Zap size={18} className="text-red-500" />, label: 'Hương vị', value: 'Quý phái, thơm nồng' },
      { icon: <Bean size={18} className="text-amber-600" />, label: 'Caffeine', value: 'Thấp (Tương tự Arabica)' },
      { icon: <Droplets size={18} className="text-blue-500" />, label: 'Tính axit', value: 'Chua thanh, hậu vị ngọt' },
      { icon: <Mountain size={18} className="text-green-600" />, label: 'Độ cao trồng', value: 'Trên 1500m' },
    ],
  },
  {
    id: 'culi',
    name: 'Culi',
    aka: '(Café Bi)',
    imageSrc: 'https://i.pinimg.com/1200x/ca/78/63/ca78638a24d5b662a93c10771be28219.jpg',
    characteristics: [
      { icon: <Zap size={18} className="text-red-500" />, label: 'Hương vị', value: 'Độc đáo, đắng gắt hơn' },
      { icon: <Bean size={18} className="text-amber-600" />, label: 'Caffeine', value: 'Cao, đậm đặc' },
      { icon: <Droplets size={18} className="text-blue-500" />, label: 'Đặc điểm', value: '1 hạt duy nhất/trái (đột biến)' },
      { icon: <Mountain size={18} className="text-green-600" />, label: 'Năng suất', value: 'Hiếm (2-4% vụ mùa)' },
    ],
  },
];

const CoffeeTypeFlashcards: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {coffeeTypes.map((coffee) => (
        <div
          key={coffee.id}
          className="perspective-1000 h-80"
          onClick={() => handleCardClick(coffee.id)}
          role="button"
          tabIndex={0}
          aria-pressed={flippedCardId === coffee.id}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              flippedCardId === coffee.id ? 'rotate-y-180' : ''
            }`}
          >
            {/* Card Front */}
            <div className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center bg-white border-2 border-sky-200 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow">
              <h3 className="text-3xl font-bold text-gray-800">{coffee.name}</h3>
              <p className="text-gray-500 mb-4">{coffee.aka}</p>
              <span className="px-3 py-1 bg-sky-100 text-sky-800 text-sm font-semibold rounded-full">
                Xem chi tiết
              </span>
            </div>

            {/* Card Back */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 text-white rounded-xl shadow-lg p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <img src={coffee.imageSrc} alt={coffee.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-500 mr-4" />
                <div>
                  <h4 className="text-2xl font-bold">{coffee.name}</h4>
                  <p className="text-gray-400">{coffee.aka}</p>
                </div>
              </div>
              <div className="flex-grow space-y-3">
                {coffee.characteristics.map((char, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8">{char.icon}</div>
                    <span className="font-semibold w-24">{char.label}:</span>
                    <span className="text-gray-300">{char.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoffeeTypeFlashcards;