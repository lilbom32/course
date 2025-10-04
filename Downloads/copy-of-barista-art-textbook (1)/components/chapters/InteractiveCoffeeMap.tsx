import React, { useState } from 'react';
import { X } from 'lucide-react';

const countries = [
  {
    id: 'vietnam',
    name: 'Việt Nam',
    position: { top: '48%', left: '77%' },
    flag: 'https://flagcdn.com/vn.svg',
    info: {
      title: 'Thủ phủ Robusta',
      text: 'Việt Nam là nước sản xuất cà phê Robusta lớn nhất thế giới, nổi tiếng với hương vị đậm đà, mạnh mẽ và là nền tảng cho món cà phê sữa đá trứ danh.',
    },
  },
  {
    id: 'brazil',
    name: 'Brazil',
    position: { top: '68%', left: '33%' },
    flag: 'https://flagcdn.com/br.svg',
    info: {
      title: 'Người khổng lồ của ngành cà phê',
      text: 'Brazil là nhà sản xuất cà phê lớn nhất thế giới trong hơn 150 năm. Cà phê Brazil thường có vị ngọt, ít axit và hậu vị sô cô la hoặc hạt dẻ.',
    },
  },
  {
    id: 'colombia',
    name: 'Colombia',
    position: { top: '55%', left: '26%' },
    flag: 'https://flagcdn.com/co.svg',
    info: {
      title: 'Chất lượng hảo hạng',
      text: 'Nổi tiếng với hạt Arabica chất lượng cao, cà phê Colombia thường có độ axit trung bình, mượt mà và hương vị cân bằng, phong phú.',
    },
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    position: { top: '52%', left: '60%' },
    flag: 'https://flagcdn.com/et.svg',
    info: {
      title: 'Cái nôi của Arabica',
      text: 'Được xem là nơi khởi nguồn của cà phê Arabica. Cà phê Ethiopia vô cùng đa dạng, thường có hương hoa quả và hương hoa cỏ phức tạp.',
    },
  },
];

type Country = typeof countries[0];

const InteractiveCoffeeMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <div className="relative rounded-xl my-10 border border-sky-200 shadow-sm overflow-hidden aspect-[16/9]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://www.pexels.com/download/video/2675509/"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="absolute inset-0 z-20">
        {/* Bean Belt */}
        <div className="absolute top-[34%] left-0 right-0 h-[38%] bg-green-800 opacity-20" />
        
        {countries.map((country) => (
          <button
            key={country.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ top: country.position.top, left: country.position.left }}
            onClick={() => setSelectedCountry(country)}
            aria-label={`Learn more about ${country.name}`}
          >
            <div className="w-12 h-12 bg-red-600 rounded-full animate-pulse"></div>
            <div className="absolute w-16 h-16 border-2 border-red-600 rounded-full animate-ping"></div>
            <img src={country.flag} alt={`${country.name} flag`} className="absolute w-12 h-12 object-cover rounded-full border-2 border-white shadow-lg" />
          </button>
        ))}
      </div>
      
      {/* Info Card */}
      {selectedCountry && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
            <div className="relative bg-white w-full max-w-sm p-6 rounded-lg shadow-2xl animate-fade-in-up">
                <button 
                    onClick={() => setSelectedCountry(null)}
                    className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>
                <div className="flex items-center mb-3">
                    <img src={selectedCountry.flag} alt={`${selectedCountry.name} flag`} className="w-10 h-10 rounded-full object-cover mr-4 shadow-md"/>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800">{selectedCountry.name}</h4>
                        <p className="text-sky-600 font-semibold">{selectedCountry.info.title}</p>
                    </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{selectedCountry.info.text}</p>
            </div>
        </div>
      )}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveCoffeeMap;