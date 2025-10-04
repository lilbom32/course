
import React from 'react';
import { SubSectionTitle, Paragraph } from '../common/Layout';
import { Mountain, Sun, Cloud, Map } from 'lucide-react';

const terroirFactors = [
  {
    icon: <Mountain className="text-gray-600" />,
    name: 'Độ cao',
    description: 'Cà phê trồng ở độ cao lớn hơn (đặc biệt là Arabica) thường phát triển chậm hơn, giúp hạt cà phê cứng hơn và phát triển các hương vị phức tạp, tinh tế với độ axit cao hơn.',
  },
  {
    icon: <Sun className="text-yellow-500" />,
    name: 'Khí hậu & Ánh sáng',
    description: 'Lượng mưa, nhiệt độ và ánh nắng mặt trời đều ảnh hưởng trực tiếp đến quá trình quang hợp và sự phát triển của quả cà phê. Bóng râm từ các cây lớn hơn có thể làm chậm quá trình chín, tạo ra vị ngọt hơn.',
  },
  {
    icon: <Cloud className="text-blue-400" />,
    name: 'Thổ nhưỡng',
    description: 'Thành phần khoáng chất và độ pH của đất (đặc biệt là đất núi lửa giàu dinh dưỡng) cung cấp các chất cần thiết cho cây cà phê, góp phần tạo nên hương vị độc đáo cho hạt.',
  },
  {
    icon: <Map className="text-green-600" />,
    name: 'Địa hình',
    description: 'Độ dốc của sườn đồi ảnh hưởng đến việc thoát nước và lượng ánh sáng mặt trời mà cây nhận được. Các yếu tố vi khí hậu trong một thung lũng hoặc trên một sườn núi cũng tạo ra sự khác biệt.',
  },
];

const TerroirExplanation: React.FC = () => {
  return (
    <div className="my-10 p-6 bg-orange-50/50 rounded-xl border border-orange-200">
      <SubSectionTitle>Terroir: Dấu Ấn Của Vùng Đất</SubSectionTitle>
      <Paragraph>
        <span className="font-bold">Terroir</span> (phát âm là "ter-wah") là một thuật ngữ tiếng Pháp mượn từ ngành rượu vang, dùng để chỉ tập hợp tất cả các yếu tố môi trường ảnh hưởng đến cây trồng, mà cuối cùng được thể hiện qua hương vị của sản phẩm. Đối với cà phê, terroir là lý do tại sao hạt cà phê từ Ethiopia lại có hương vị khác biệt so với hạt từ Colombia, dù cùng một giống.
      </Paragraph>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {terroirFactors.map((factor, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex-shrink-0 mt-1">{React.cloneElement(factor.icon, { size: 28 })}</div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">{factor.name}</h4>
              <p className="text-gray-600 leading-relaxed">{factor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerroirExplanation;
