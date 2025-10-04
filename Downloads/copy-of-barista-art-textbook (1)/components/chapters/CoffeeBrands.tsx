import React from 'react';
import { SubSectionTitle } from '../common/Layout';

const vietnameseBrands = [
  {
    name: 'Trung Nguyên Legend',
    logo: 'https://i2.ex-cdn.com/homeaz.vn/files/content/2019/11/16/logo-tren-ly-cafe-trung-nguyen-5-1744.jpg',
    description: 'Biểu tượng cà phê Việt Nam, nổi tiếng với triết lý "cà phê năng lượng" và hương vị đậm đà, độc đáo.',
  },
  {
    name: 'Highlands Coffee',
    logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-HighLands-Coffee.png',
    description: 'Chuỗi cửa hàng cà phê lớn, kết hợp giữa hương vị phin truyền thống và phong cách phục vụ hiện đại, chuyên nghiệp.',
  },
  {
    name: 'The Coffee House',
    logo: 'https://brasol.vn/wp-content/uploads/2022/09/logo-the-coffee-house.png',
    description: 'Nổi bật với không gian "ngôi nhà cà phê" rộng rãi, thân thiện và mô hình "từ nông trại đến ly cà phê".',
  },
  {
    name: 'Phúc Long Coffee & Tea',
    logo: 'https://aeonmall-review-rikkei.cdn.vccloud.vn/public/wp/21/tenants/jKxsQ5pjaO2cOJ63U8UT6PIr8k5lcsL1Y4w50eOb.png',
    description: 'Thương hiệu có bề dày lịch sử về trà và cà phê, được yêu thích bởi hương vị đậm, mạnh và độc đáo.',
  },
];

const worldBrands = [
  {
    name: 'Starbucks',
    logo: 'https://e7.pngegg.com/pngimages/83/913/png-clipart-coffee-espresso-tea-cafe-starbucks-starbucks-logo-material-other-free-logo-design-template-thumbnail.png',
    description: 'Gã khổng lồ toàn cầu, tiên phong trong việc phổ biến văn hóa cà phê espresso và trải nghiệm "nơi thứ ba".',
  },
  {
    name: 'Nescafé',
    logo: 'https://rubee.com.vn/wp-content/uploads/2021/06/logo-cua-nescafe.png',
    description: 'Thương hiệu cà phê hòa tan hàng đầu thế giới, nhấn mạnh sự tiện lợi, nhanh chóng và dễ tiếp cận.',
  },
  {
    name: "Dunkin'",
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2VUrdjYtnjITAwLG3xyfAi5Mi0NjWwuokA&s',
    description: 'Phục vụ cà phê nhanh, đơn giản và không cầu kỳ, thường đi kèm với các loại bánh donut nổi tiếng.',
  },
  {
    name: "Peet's Coffee",
    logo: 'https://osu-wams-blogs-uploads.s3.amazonaws.com/blogs.dir/4201/files/2021/01/peets-logo-01-1024x642.png',
    description: 'Một trong những nhà rang xay cà phê đặc sản đầu tiên của Mỹ, nổi tiếng với phong cách rang đậm, đậm đà.',
  },
];

const BrandCard: React.FC<{ brand: typeof vietnameseBrands[0] }> = ({ brand }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center h-full">
    <div className="h-20 flex items-center justify-center mb-4">
      <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-16 max-w-full" />
    </div>
    <h4 className="text-lg font-bold text-gray-800 mb-2">{brand.name}</h4>
    <p className="text-sm text-gray-600 flex-grow">{brand.description}</p>
  </div>
);

const CoffeeBrands: React.FC = () => {
  return (
    <div className="my-10">
      <SubSectionTitle>Thương Hiệu Cà Phê Nổi Tiếng Việt Nam</SubSectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {vietnameseBrands.map((brand) => (
          <BrandCard key={brand.name} brand={brand} />
        ))}
      </div>

      <SubSectionTitle>Thương Hiệu Cà Phê Nổi Tiếng Thế Giới</SubSectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {worldBrands.map((brand) => (
          <BrandCard key={brand.name} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default CoffeeBrands;