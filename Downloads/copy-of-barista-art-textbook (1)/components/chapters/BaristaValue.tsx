import React from 'react';
import { ShieldCheck, MessageSquare, Users, SlidersHorizontal } from 'lucide-react';

const values = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
    title: 'Người Gác Đền Chất Lượng',
    description: 'Barista là người đảm bảo công sức của người nông dân và nhà rang xay được thể hiện trọn vẹn. Kỹ năng của họ quyết định chất lượng cuối cùng của ly cà phê.',
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-sky-600" />,
    title: 'Đại Sứ Cà Phê',
    description: 'Họ là những người kể chuyện, giới thiệu cho khách hàng về nguồn gốc, hương vị và sự đa dạng của cà phê, làm giàu thêm trải nghiệm thưởng thức.',
  },
  {
    icon: <Users className="w-10 h-10 text-amber-600" />,
    title: 'Người Tạo Dựng Trải Nghiệm',
    description: 'Không chỉ là cà phê, barista còn tạo ra một không gian chào đón, một trải nghiệm dịch vụ đáng nhớ và góp phần xây dựng cộng đồng tại quán.',
  },
  {
    icon: <SlidersHorizontal className="w-10 h-10 text-red-600" />,
    title: 'Kỹ Thuật Viên Lành Nghề',
    description: 'Pha chế là một khoa học đòi hỏi sự chính xác. Từ việc điều chỉnh máy xay đến kiểm soát dòng chảy espresso, mỗi thao tác đều cần kỹ thuật và sự am hiểu sâu sắc.',
  },
];

const ValueCard: React.FC<{ value: typeof values[0] }> = ({ value }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center flex flex-col items-center h-full">
        <div className="mb-4">{value.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
        <p className="text-gray-600 leading-relaxed">{value.description}</p>
    </div>
);

const BaristaValue: React.FC = () => {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {values.map((value, index) => (
        <ValueCard key={index} value={value} />
      ))}
    </div>
  );
};

export default BaristaValue;