
import React from 'react';
import { ChapterTitle, SectionTitle, SubSectionTitle, Paragraph, StyledList, ChapterSubtitle, Note } from '../common/Layout';

const Chapter4: React.FC = () => {
  return (
    <div>
      <ChapterTitle>Bài 4: Latte Art</ChapterTitle>
      <ChapterSubtitle>Tổng quan về nghệ thuật vẽ hình trên bề mặt cà phê bằng bọt sữa.</ChapterSubtitle>

      {/* Coffee Drink Variations Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">☕ Các Loại Đồ Uống Cà Phê</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573785/pplx_project_search_images/fbfd778814552008bb9e58e4f308859625807227.png"
            alt="Guide to espresso drinks showing shot types and espresso-based drinks with ingredient proportions"
            caption="Hình 4.1: Hướng dẫn các loại đồ uống espresso với tỷ lệ thành phần"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573785/pplx_project_search_images/c2625eaa3b32c4df3047b2686e942470ab45ab22.png"
            alt="Comparison of Flat White, Cortado, and Macchiato coffee drinks by steamed milk and espresso volume"
            caption="Hình 4.2: So sánh Flat White, Cortado và Macchiato theo thể tích sữa và espresso"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-2xl">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1754895533/pplx_project_search_images/5dc4953e65987a224af0278bf767e67fc839230f.png"
              alt="Infographic explaining different types of coffee drinks and their coffee, milk, and foam proportions"
              caption="Hình 4.3: Infographic giải thích 13 loại đồ uống cà phê khác nhau và tỷ lệ thành phần"
            />
          </div>
        </div>
      </div>

      <SectionTitle>4.3 Tổng Quan Latte Art</SectionTitle>
      <SubSectionTitle>4.3.1 Khởi nguồn Latte Art</SubSectionTitle>
      <Paragraph>
        Sự phát triển của espresso và microfoam ở Ý vào những năm 1900 đã đặt nền móng cho Latte Art. Tuy nhiên, kỹ thuật này lại được lan truyền và phổ biến rộng rãi khắp thế giới từ Mỹ, mà công lao lớn thuộc về David Schomer ở Seattle vào cuối những năm 1980. Ông là người tiên phong trong việc sáng tạo và đào tạo về "Caffe Latte Art", với những hình ảnh đầu tiên là trái tim và rosetta.
      </Paragraph>

      <SubSectionTitle>4.3.2 Latte Art là gì?</SubSectionTitle>
      <Paragraph>
        Latte Art là nghệ thuật vẽ hình lên bề mặt cà phê bằng bọt sữa. Đây là một trong những kỹ thuật ấn tượng nhất của barista. Ban đầu, latte art chỉ là việc đổ bọt sữa một cách khéo léo lên tách cà phê espresso để tạo ra một kết cấu vững chắc. Sau này, các hoạ tiết đầu tiên được trang trí là trái tim (heart) và rosetta.
      </Paragraph>
      
      <SectionTitle>4.4 Kỹ Thuật Latte Art</SectionTitle>
      <Paragraph>Kỹ thuật Latte Art được chia làm 3 giai đoạn chính:</Paragraph>
      <SubSectionTitle>Giai đoạn 1: Tạo bọt sữa (foam)</SubSectionTitle>
      <Paragraph>
        Đây là bước quan trọng nhất. Cần tạo ra một lớp bọt sữa (microfoam) mịn, mượt, không có bong bóng lớn. Sữa cần được làm lạnh và sử dụng ca đánh sữa lạnh để có thêm thời gian tạo bọt trước khi sữa quá nóng.
      </Paragraph>

      <SubSectionTitle>Giai đoạn 2: Chiết suất Espresso tiêu chuẩn</SubSectionTitle>
      <Paragraph>
        Một shot espresso hoàn hảo với lớp crema dày, màu nâu cánh gián và không bị vỡ là nền tảng không thể thiếu. Lớp crema này chính là "khung vẽ" cho nghệ thuật latte art.
      </Paragraph>
      
      <SubSectionTitle>Giai đoạn 3: Rót sữa và thực hiện kỹ thuật Latte Art</SubSectionTitle>
       <StyledList items={[
        "Bước 1: Bắt đầu rót từ trên cao một chút để sữa chìm xuống dưới lớp crema, cho đến khi cốc đầy khoảng 1/2.",
        "Bước 2: Hạ thấp ca sữa xuống gần bề mặt cà phê để bọt trắng bắt đầu nổi lên và tạo hình.",
        "Bước 3: Di chuyển ca sữa để tạo hình mong muốn (ví dụ: lắc cổ tay để tạo hình rosetta, hoặc giữ yên để tạo hình trái tim).",
        "Bước 4: Khi gần đầy, nâng cao ca sữa và rót một dòng nhỏ để kết thúc hình vẽ."
       ]}/>
       <Note>Nếu đổ quá nhanh sẽ làm vỡ lớp crema. Nhưng nếu đổ quá chậm sẽ khiến bọt bị sót lại trong kết cấu.</Note>
    </div>
  );
};

export default Chapter4;
