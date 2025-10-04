import React, { useState } from 'react';
import { Eye, Hand, Droplets, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface FoamType {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  idealFor: string[];
  technique: string;
  quality: 'excellent' | 'good' | 'poor';
  image: string;
}

const FoamTextureGuide: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('microfoam');

  const foamTypes: FoamType[] = [
    {
      id: 'microfoam',
      name: 'Microfoam Hoàn Hảo',
      description: 'Bọt khí siêu nhỏ (0,1-0,3mm) với cấu trúc mịn màng, có độ bóng tự nhiên',
      characteristics: [
        'Bọt khí đồng đều, kích thước 0,1-0,3mm',
        'Bề mặt bóng, mịn như sơn ướt',
        'Độ dày vừa phải, không quá khô',
        'Có thể tạo latte art phức tạp'
      ],
      idealFor: ['Latte', 'Cappuccino', 'Flat White'],
      technique: 'Stretching 3-5 giây, tạo vortex mạnh, nhiệt độ 60-65°C',
      quality: 'excellent',
      image: 'https://picsum.photos/seed/microfoam/300/200'
    },
    {
      id: 'dry-foam',
      name: 'Dry Foam (Bọt Khô)',
      description: 'Bọt khí lớn hơn, cấu trúc khô, phù hợp cho cappuccino truyền thống',
      characteristics: [
        'Bọt khí lớn hơn (0,5-1mm)',
        'Cấu trúc khô, xốp',
        'Ít bóng, màu trắng đục',
        'Dễ tạo hình cơ bản'
      ],
      idealFor: ['Cappuccino', 'Macchiato'],
      technique: 'Stretching 8-12 giây, ít vortex, nhiệt độ 65-70°C',
      quality: 'good',
      image: 'https://picsum.photos/seed/dryfoam/300/200'
    },
    {
      id: 'wet-foam',
      name: 'Wet Foam (Bọt Ướt)',
      description: 'Bọt khí rất nhỏ, cấu trúc ướt, gần như không có bọt',
      characteristics: [
        'Bọt khí rất nhỏ, gần như không thấy',
        'Cấu trúc ướt, mượt',
        'Bóng cao, giống sữa nguyên chất',
        'Khó tạo latte art'
      ],
      idealFor: ['Flat White', 'Cortado'],
      technique: 'Stretching 2-3 giây, vortex mạnh, nhiệt độ 55-60°C',
      quality: 'good',
      image: 'https://picsum.photos/seed/wetfoam/300/200'
    },
    {
      id: 'over-aerated',
      name: 'Over-aerated (Bọt Quá Nhiều)',
      description: 'Bọt khí quá lớn, cấu trúc không ổn định, chất lượng kém',
      characteristics: [
        'Bọt khí rất lớn (&gt;1mm)',
        'Cấu trúc không ổn định',
        'Màu trắng đục, không bóng',
        'Không thể tạo latte art'
      ],
      idealFor: [],
      technique: 'Stretching quá lâu (&gt;15 giây), nhiệt độ quá cao',
      quality: 'poor',
      image: 'https://picsum.photos/seed/overaerated/300/200'
    },
    {
      id: 'under-aerated',
      name: 'Under-aerated (Bọt Quá Ít)',
      description: 'Hầu như không có bọt, giống sữa nóng thông thường',
      characteristics: [
        'Hầu như không có bọt khí',
        'Cấu trúc lỏng, mượt',
        'Bóng cao nhưng không có texture',
        'Không thể tạo latte art'
      ],
      idealFor: [],
      technique: 'Stretching quá ít (<2 giây), không tạo vortex',
      quality: 'poor',
      image: 'https://picsum.photos/seed/underaerated/300/200'
    }
  ];

  const selectedFoam = foamTypes.find(f => f.id === selectedType);

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'poor': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl border border-amber-200">
      <div className="flex items-center gap-3 mb-6">
        <Droplets className="w-8 h-8 text-amber-600" />
        <h3 className="text-2xl font-bold text-gray-800">Hướng Dẫn Texture Bọt Sữa</h3>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Foam Type Selection */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Loại Bọt Sữa</h4>
          {foamTypes.map((foam) => (
            <button
              key={foam.id}
              onClick={() => setSelectedType(foam.id)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedType === foam.id
                  ? 'bg-amber-200 border-2 border-amber-400'
                  : 'bg-white border border-gray-200 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {getQualityIcon(foam.quality)}
                <div>
                  <div className="font-medium text-gray-800">{foam.name}</div>
                  <div className="text-sm text-gray-600">{foam.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Foam Details */}
        {selectedFoam && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                {getQualityIcon(selectedFoam.quality)}
                <h4 className="text-xl font-bold text-gray-800">{selectedFoam.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedFoam.quality === 'excellent' ? 'bg-green-100 text-green-800' :
                  selectedFoam.quality === 'good' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedFoam.quality === 'excellent' ? 'Tuyệt vời' :
                   selectedFoam.quality === 'good' ? 'Tốt' : 'Kém'}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedFoam.image} 
                    alt={selectedFoam.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700 mb-4">{selectedFoam.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Đặc điểm nhận biết
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {selectedFoam.characteristics.map((char, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedFoam.idealFor.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Phù hợp cho
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedFoam.idealFor.map((drink, index) => (
                          <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                            {drink}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Hand className="w-4 h-4" />
                      Kỹ thuật tạo
                    </h5>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedFoam.technique}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Troubleshooting Tips */}
            {selectedFoam.quality === 'poor' && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Cách khắc phục
                </h5>
                <div className="text-sm text-red-700 space-y-1">
                  {selectedFoam.id === 'over-aerated' && (
                    <>
                      <p>• Giảm thời gian stretching xuống 3-5 giây</p>
                      <p>• Tăng cường tạo vortex để làm mịn bọt khí</p>
                      <p>• Kiểm soát nhiệt độ ở 60-65°C</p>
                    </>
                  )}
                  {selectedFoam.id === 'under-aerated' && (
                    <>
                      <p>• Tăng thời gian stretching lên 5-8 giây</p>
                      <p>• Đảm bảo steam wand ở vị trí đúng</p>
                      <p>• Tạo vortex mạnh hơn trong quá trình texturing</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoamTextureGuide;
