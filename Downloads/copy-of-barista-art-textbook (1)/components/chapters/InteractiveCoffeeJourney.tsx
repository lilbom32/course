
import React from 'react';
import { Coffee, Ship, Utensils, Globe } from 'lucide-react';

const journeySteps = [
  {
    year: 'Thế kỷ 9',
    title: 'Phát hiện ở Ethiopia',
    description: 'Theo truyền thuyết, một người chăn dê tên Kaldi phát hiện ra những con dê của mình trở nên tràn đầy năng lượng sau khi ăn quả mọng từ một loại cây lạ. Đây được cho là sự khám phá ra cây cà phê.',
    icon: <Coffee />,
  },
  {
    year: 'Thế kỷ 15',
    title: 'Gieo trồng ở Ả Rập',
    description: 'Cà phê được trồng và giao dịch lần đầu tiên ở bán đảo Ả Rập. Cảng Mocha ở Yemen trở thành trung tâm thương mại cà phê quan trọng nhất thế giới.',
    icon: <Ship />,
  },
  {
    year: 'Thế kỷ 17',
    title: 'Lan tỏa đến Châu Âu',
    description: 'Cà phê du nhập vào châu Âu và nhanh chóng trở nên phổ biến. Các quán cà phê (coffee house) đầu tiên xuất hiện, trở thành trung tâm của các hoạt động xã hội và trí tuệ.',
    icon: <Utensils />,
  },
  {
    year: 'Thế kỷ 18-19',
    title: 'Vòng quanh thế giới',
    description: 'Thông qua các cường quốc thực dân, cây cà phê được đưa đến trồng ở các thuộc địa khắp châu Mỹ và châu Á, hình thành nên "Vành đai Cà phê" (Bean Belt) như ngày nay.',
    icon: <Globe />,
  },
];

const InteractiveCoffeeJourney: React.FC = () => {
  return (
    <div className="my-10">
      <div className="relative border-l-2 border-sky-200 ml-6 pl-8 space-y-10">
        {journeySteps.map((step, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[45px] top-1 z-10 bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
              {React.cloneElement(step.icon, { size: 24 })}
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sky-800">{step.year} - {step.title}</h3>
              <p className="text-gray-600 leading-relaxed mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveCoffeeJourney;
