import React from 'react';
import { SubSectionTitle, Paragraph } from '../common/Layout';
import { ChevronsRight } from 'lucide-react';

const etymologySteps = [
  { region: 'Vùng Kaffa, Ethiopia', word: 'Kaffa' },
  { region: 'Ả Rập', word: 'Qahwa' },
  { region: 'Thổ Nhĩ Kỳ', word: 'Kahve' },
  { region: 'Hà Lan', word: 'Koffie' },
  { region: 'Thế Giới', word: 'Coffee / Café' },
];

const EtymologyOfCoffee: React.FC = () => {
  return (
    <div className="my-10">
      <SubSectionTitle>Hành Trình Của Một Từ: "Cà Phê"</SubSectionTitle>
      <Paragraph>
        Bản thân cái tên "cà phê" cũng có một lịch sử du hành hấp dẫn không kém hạt cà phê. Hãy cùng theo dõi sự biến đổi của nó qua các nền văn hóa.
      </Paragraph>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap items-center justify-center gap-y-4">
          {etymologySteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="text-center p-2">
                <p className="text-lg font-bold text-gray-800">{step.word}</p>
                <p className="text-sm text-gray-500">({step.region})</p>
              </div>
              {index < etymologySteps.length - 1 && (
                <ChevronsRight className="text-gray-400 mx-2 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EtymologyOfCoffee;