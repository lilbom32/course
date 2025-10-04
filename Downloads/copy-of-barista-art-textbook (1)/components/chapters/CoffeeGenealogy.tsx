
import React from 'react';
import { SubSectionTitle, Paragraph } from '../common/Layout';
import { GitBranch } from 'lucide-react';

const CoffeeGenealogy: React.FC = () => {
  return (
    <div className="my-10 p-6 bg-green-50/50 rounded-xl border border-green-200">
      <SubSectionTitle>Cây Phả Hệ Của Giống Arabica</SubSectionTitle>
      <Paragraph>
        Giống như một gia đình lớn, các giống cà phê Arabica đều có nguồn gốc và mối liên hệ với nhau. Hầu hết các giống Arabica mà chúng ta thưởng thức ngày nay đều bắt nguồn từ hai giống gốc là Typica và Bourbon.
      </Paragraph>

      <div className="relative mt-6 font-sans">
        {/* Main Trunk */}
        <div className="flex justify-center">
          <div className="p-3 bg-gray-700 text-white rounded-lg shadow-md text-center">
            <div className="font-bold text-lg">Coffea Arabica</div>
            <div className="text-sm text-gray-300">(Giống loài gốc)</div>
          </div>
        </div>
        
        {/* Vertical line down */}
        <div className="h-8 w-0.5 bg-gray-400 mx-auto"></div>
        
        {/* Horizontal line */}
        <div className="w-1/2 md:w-1/3 h-0.5 bg-gray-400 mx-auto"></div>

        {/* Two main branches */}
        <div className="flex justify-around relative">
          {/* Left Branch */}
          <div className="absolute left-1/4 top-0 h-8 w-0.5 bg-gray-400 -translate-x-1/2"></div>
          {/* Right Branch */}
          <div className="absolute right-1/4 top-0 h-8 w-0.5 bg-gray-400 translate-x-1/2"></div>

          <div className="w-1/2 text-center relative pt-8">
            <div className="p-3 bg-amber-600 text-white rounded-lg shadow-md inline-block">
              <div className="font-bold">Typica</div>
            </div>
            {/* Descendants of Typica */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-md">Maragogipe</div>
              <div className="p-2 bg-amber-100 text-amber-800 rounded-md">Java</div>
              <div className="p-2 bg-amber-100 text-amber-800 rounded-md">Kent</div>
            </div>
          </div>

          <div className="w-1/2 text-center relative pt-8">
            <div className="p-3 bg-red-600 text-white rounded-lg shadow-md inline-block">
              <div className="font-bold">Bourbon</div>
            </div>
            {/* Descendants of Bourbon */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="p-2 bg-red-100 text-red-800 rounded-md">Caturra</div>
              <div className="p-2 bg-red-100 text-red-800 rounded-md">Pacas</div>
              <div className="p-2 bg-red-100 text-red-800 rounded-md">SL28, SL34</div>
            </div>
          </div>
        </div>

        {/* Hybrid section */}
         <div className="h-8 w-0.5 bg-gray-400 mx-auto mt-4"></div>
        <div className="flex justify-center">
            <div className="p-3 bg-teal-600 text-white rounded-lg shadow-md text-center">
              <div className="font-bold text-lg">Giống Lai (Hybrids)</div>
              <div className="text-sm text-gray-300">(Ví dụ: Catimor, Mundo Novo)</div>
            </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 flex items-start gap-3">
        <GitBranch className="text-green-700 flex-shrink-0 mt-1" size={24} />
        <div>
          <h4 className="font-bold text-green-800">Tại Sao Lại Quan Trọng?</h4>
          <p className="text-gray-600 text-sm">
            Hiểu về phả hệ giúp chúng ta dự đoán được hương vị tiềm năng của hạt cà phê. Ví dụ, các giống thuộc họ Bourbon thường có vị ngọt và body tròn trịa, trong khi Typica lại thanh tao và phức hợp hơn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeGenealogy;
