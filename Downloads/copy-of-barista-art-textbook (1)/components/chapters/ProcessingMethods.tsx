import React, { useState } from 'react';
import { Sun, Droplets, Package } from 'lucide-react';

const methods = [
  {
    id: 'natural',
    name: 'Chế Biến Khô (Natural/Dry Process)',
    icon: <Sun size={24} className="text-red-500" />,
    description: 'Đây là phương pháp cổ xưa nhất. Quả cà phê sau khi thu hoạch sẽ được phơi khô nguyên vẹn dưới ánh nắng mặt trời trên giàn phơi hoặc sân bê tông. Quá trình này kéo dài vài tuần cho đến khi quả khô lại.',
    flavorProfile: 'Tạo ra hương vị ngọt ngào, đậm đà (full-bodied), với hương trái cây chín mọng như dâu, việt quất và ít vị chua (axit).',
    image: 'https://lh7-us.googleusercontent.com/zt05aLkYwLLnih0DLEFBZCP8xmkrf1oil3Uc1G63tXQfKNTpUhYw3aaeDwNYTuUZngd4Vr1DZYgxyYfq7KjqH2HmTAQLo9y6xzD3qIIA9iSff-ZvNVwiTinI-KbA0tmFrYzWAMRhzkiqZKiXCF36awQ',
  },
  {
    id: 'washed',
    name: 'Chế Biến Ướt (Washed/Wet Process)',
    icon: <Droplets size={24} className="text-blue-500" />,
    description: 'Phương pháp này loại bỏ hoàn toàn lớp vỏ và thịt quả bằng nước trước khi phơi khô hạt. Quá trình này đòi hỏi nhiều nước và kỹ thuật hơn so với chế biến khô.',
    flavorProfile: 'Tạo ra hương vị trong trẻo, "sạch sẽ" (clean cup), làm nổi bật vị chua thanh (acidity) và các nốt hương tinh tế của hạt cà phê. Body thường nhẹ hơn.',
    image: 'https://file.hstatic.net/1000383842/file/cf_c60b31ce5fdb49ea898730b744f03c91.jpeg',
  },
  {
    id: 'honey',
    name: 'Chế Biến Mật Ong (Honey/Pulped Natural)',
    icon: <Package size={24} className="text-yellow-600" />,
    description: 'Đây là phương pháp lai giữa chế biến khô và ướt. Vỏ quả được loại bỏ, nhưng một phần hoặc toàn bộ lớp thịt nhầy (mucilage) được giữ lại trên hạt trong quá trình phơi khô.',
    flavorProfile: 'Cân bằng giữa hai phương pháp trên. Tạo ra vị ngọt đặc trưng (giống mật ong), body tròn trịa hơn chế biến ướt và độ axit vừa phải.',
    image: 'https://file.hstatic.net/1000383842/file/huong-phap-che-bien-ca-phe-honey-mat-ong-phoi-tren-gian-e1615351418857_6150a48019d8459b89a54b1381e127cb_grande.jpg',
  },
];

const ProcessingMethods: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);

  return (
    <div className="my-10">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method)}
            className={`flex-1 p-4 rounded-lg border-2 text-left transition-all duration-300 ${
              selectedMethod.id === method.id
                ? 'bg-sky-100 border-sky-500 shadow-md'
                : 'bg-white border-gray-200 hover:border-sky-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {method.icon}
              <h4 className="text-lg font-bold text-gray-800">{method.name}</h4>
            </div>
          </button>
        ))}
      </div>

      {selectedMethod && (
        <div className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold text-sky-800 mb-2">{selectedMethod.name}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{selectedMethod.description}</p>
            <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-400">
                <p className="font-semibold text-green-800">Hồ sơ hương vị:</p>
                <p className="text-green-700">{selectedMethod.flavorProfile}</p>
            </div>
          </div>
          <div>
            <img 
              src={selectedMethod.image} 
              alt={selectedMethod.name} 
              className="w-full h-64 object-cover rounded-lg shadow-md" 
            />
          </div>
        </div>
      )}
       <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProcessingMethods;