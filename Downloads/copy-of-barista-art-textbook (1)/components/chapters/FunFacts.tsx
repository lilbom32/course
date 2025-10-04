import React from 'react';
import { Lightbulb, Sprout, BarChart } from 'lucide-react';

const facts = [
  {
    icon: <Lightbulb className="text-yellow-500" />,
    title: 'Fact Check: Rang Đậm Hơn Ít Caffeine Hơn?',
    text: 'Đúng vậy! Nhiều người lầm tưởng cà phê rang đậm (dark roast) sẽ "mạnh" hơn. Thực tế, quá trình rang càng lâu, một lượng caffeine sẽ bị cháy và mất đi. Do đó, nếu xét cùng một khối lượng, cà phê rang nhạt (light roast) thực chất có nhiều caffeine hơn.',
    color: 'bg-yellow-50',
  },
  {
    icon: <Sprout className="text-green-500" />,
    title: 'Cà Phê Thực Chất Là Một Loại Trái Cây',
    text: 'Hạt cà phê mà chúng ta sử dụng thực chất là hạt nằm bên trong một quả mọng nhỏ, màu đỏ hoặc tím, được gọi là "quả anh đào cà phê" (coffee cherry). Vì vậy, về mặt kỹ thuật, chúng ta đang pha chế từ hạt của một loại trái cây.',
    color: 'bg-green-50',
  },
  {
    icon: <BarChart className="text-blue-500" />,
    title: 'Hàng Hóa Quyền Lực Thứ Hai Thế Giới',
    text: 'Cà phê là một trong những mặt hàng có giá trị nhất trên thế giới. Nó là mặt hàng được giao dịch nhiều thứ hai trên thị trường hàng hóa toàn cầu, chỉ đứng sau dầu mỏ. Điều này cho thấy tầm ảnh hưởng kinh tế và văn hóa to lớn của nó.',
    color: 'bg-blue-50',
  },
];

const FunFacts: React.FC = () => {
  return (
    <div className="my-10 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      {facts.map((fact, index) => (
        <div key={index} className={`p-6 rounded-xl shadow-sm ${fact.color} border border-gray-200 flex flex-col items-center text-center`}>
          <div className="mb-4">{React.cloneElement(fact.icon, { size: 36 })}</div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">{fact.title}</h4>
          <p className="text-gray-600 text-base leading-relaxed">{fact.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FunFacts;
