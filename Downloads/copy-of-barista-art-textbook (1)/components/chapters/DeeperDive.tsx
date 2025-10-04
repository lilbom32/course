
import React from 'react';
import { Leaf, Globe, DollarSign, Award } from 'lucide-react';

const diveTopics = [
  {
    icon: <Leaf className="text-green-600" />,
    title: 'Giống (Varietal) vs. Giống Loài (Species)',
    content: 'Chúng ta thường nghe về Arabica và Robusta - đó là hai Giống Loài (Species) chính. Trong mỗi giống loài lại có vô số các Giống (Varietals) khác nhau, tương tự như các giống táo (Granny Smith, Fuji...). Ví dụ, trong Arabica có các giống nổi tiếng như Typica, Bourbon, Geisha, Caturra... Mỗi giống có đặc điểm hương vị, hình thái và khả năng chống chịu sâu bệnh khác nhau.',
  },
  {
    icon: <Globe className="text-sky-600" />,
    title: 'Nguồn Gốc Đơn (Single Origin) vs. Phối Trộn (Blend)',
    content: 'Cà phê Nguồn Gốc Đơn (Single Origin) đến từ một vùng địa lý cụ thể, thậm chí là từ một nông trại duy nhất. Điều này giúp thể hiện trọn vẹn đặc tính hương vị của vùng đất đó (terroir). Ngược lại, Cà phê Phối Trộn (Blend) là sự kết hợp của nhiều loại hạt từ các nguồn gốc khác nhau để tạo ra một hồ sơ hương vị cân bằng, ổn định và độc đáo mà một loại hạt đơn lẻ không có được. Espresso thường là cà phê blend.',
  },
  {
    icon: <DollarSign className="text-yellow-600" />,
    title: 'Cà Phê Thương Mại (Commodity) vs. Cà Phê Đặc Sản (Specialty)',
    content: 'Cà phê Thương Mại được sản xuất hàng loạt, tập trung vào số lượng và giá cả, thường được giao dịch trên thị trường hàng hóa. Ngược lại, Cà phê Đặc Sản được chấm điểm chất lượng trên thang 100 của Hiệp hội Cà phê Đặc sản (SCA). Chỉ những loại cà phê đạt từ 80 điểm trở lên, có hương vị độc đáo và không có lỗi sơ cấp mới được công nhận là "specialty".',
  },
  {
    icon: <Award className="text-red-600" />,
    title: 'Tầm Quan Trọng Của Thương Mại Công Bằng (Fair Trade)',
    content: 'Chứng nhận Fair Trade đảm bảo rằng người nông dân trồng cà phê nhận được một mức giá công bằng, đủ để trang trải chi phí sản xuất và cải thiện cuộc sống. Nó cũng thúc đẩy các tiêu chuẩn về môi trường và điều kiện lao động. Lựa chọn cà phê Fair Trade là một cách để người tiêu dùng hỗ trợ sự phát triển bền vững trong ngành cà phê.',
  },
];

const DeeperDive: React.FC = () => {
  return (
    <div className="my-10 space-y-6">
      {diveTopics.map((topic, index) => (
        <div key={index} className="flex items-start gap-4 p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex-shrink-0 mt-1">{React.cloneElement(topic.icon, { size: 28 })}</div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-1">{topic.title}</h4>
            <p className="text-gray-600 leading-relaxed">{topic.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeeperDive;
