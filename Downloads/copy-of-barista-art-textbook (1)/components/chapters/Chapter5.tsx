
import React, { useState } from 'react';
import { ChapterTitle, SectionTitle, SubSectionTitle, Paragraph, ImageCard, StyledList, ChapterSubtitle, Note } from '../common/Layout';
import LatteArtComparison from './LatteArtComparison';
import LatteArtGallery from './LatteArtGallery';

const Chapter5: React.FC = () => {
  const [activeTechnique, setActiveTechnique] = useState<'heart' | 'rosetta' | 'tulip' | 'swan'>('heart');
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const techniqueSteps = {
    heart: [
        "Bước 1: Nghiêng tách espresso về phía ca đánh sữa.",
        "Bước 2: Rót một dòng sữa nhỏ và đều vào giữa cốc để hòa quyện lớp crema và sữa.",
        "Bước 3: Khi cốc đầy khoảng 2/3, hạ thấp ca sữa xuống gần bề mặt và tiếp tục đổ vào giữa. Một chấm tròn trắng sẽ xuất hiện và lớn dần.",
        "Bước 4: Khi cốc gần đầy, nâng cao ca sữa và rót một dòng mỏng, nhanh xuyên qua tâm hình tròn để tạo thành hình trái tim."
    ],
    rosetta: [
        "Bước 1: Chuẩn bị 1 tách espresso và 1 ca sữa hoàn hảo. Luôn lắc ca sữa đều tay.",
        "Bước 2: Rót cao và chậm để tạo một nền sữa bên dưới lớp crema.",
        "Bước 3: Khi cốc đầy 1/2, hạ thấp ca sữa xuống gần bề mặt. Bắt đầu lắc nhẹ cổ tay từ bên này sang bên kia.",
        "Bước 4: Trong khi lắc, từ từ lùi ca sữa về phía sau để tạo các lớp lá.",
        "Bước 5: Khi gần đến cuối, ngừng lắc, nâng cao ca sữa lên và rót một dòng mỏng kéo thẳng về phía trước để hoàn thành phần cuống lá."
    ],
    tulip: [
      "Bước 1: Bắt đầu như hình trái tim, tạo một vòng tròn trắng ở giữa.",
      "Bước 2: Tạo vòng tròn thứ hai phía trước vòng tròn đầu tiên.",
      "Bước 3: Tiếp tục tạo vòng tròn thứ ba, thứ tư... mỗi vòng nhỏ hơn vòng trước.",
      "Bước 4: Kết thúc bằng cách kéo một đường thẳng qua tất cả các vòng tròn để tạo thân hoa tulip."
    ],
    swan: [
      "Bước 1: Tạo một vòng tròn lớn ở giữa tách làm thân thiên nga.",
      "Bước 2: Tạo một vòng tròn nhỏ hơn ở phía trước làm đầu thiên nga.",
      "Bước 3: Kéo một đường cong từ đầu xuống thân để tạo cổ thiên nga.",
      "Bước 4: Tạo các đường sóng nhỏ ở phía sau thân để tạo cánh thiên nga."
    ]
  };

  const troubleshootingIssues = [
    {
      problem: "Bọt sữa quá dày, không chảy mượt",
      solution: "Đánh sữa ít hơn, tạo microfoam mịn hơn. Nhiệt độ sữa khoảng 60-65°C.",
      prevention: "Luyện tập kỹ thuật đánh sữa, kiểm soát tốc độ và góc độ ca đánh sữa."
    },
    {
      problem: "Hình vẽ bị mờ, không rõ nét",
      solution: "Hạ thấp ca sữa hơn, rót chậm hơn và đều tay hơn.",
      prevention: "Đảm bảo lớp crema dày và ổn định trước khi bắt đầu vẽ."
    },
    {
      problem: "Hình vẽ bị lệch hoặc không cân đối",
      solution: "Giữ tay ổn định, đảm bảo tách cà phê được đặt thẳng.",
      prevention: "Luyện tập tư thế cầm ca sữa và vị trí đặt tách cà phê."
    },
    {
      problem: "Sữa chảy quá nhanh làm vỡ lớp crema",
      solution: "Rót chậm hơn, kiểm soát tốc độ dòng chảy.",
      prevention: "Luyện tập kiểm soát áp lực tay khi rót sữa."
    }
  ];

  return (
    <div>
      <ChapterTitle>Bài 5: Latte Art Hình Trên Tách Cà Phê</ChapterTitle>
      <ChapterSubtitle>Hướng dẫn thực hành chi tiết các kỹ thuật Latte Art từ cơ bản đến nâng cao, bao gồm trái tim, rosetta, tulip và thiên nga.</ChapterSubtitle>

      <SectionTitle>5.1 Tổng Quan Về Latte Art</SectionTitle>
      <Paragraph>
        Latte Art là nghệ thuật tạo hình trên bề mặt cà phê bằng cách rót sữa đã đánh bọt một cách có kiểm soát. Đây là kỹ năng đỉnh cao của barista, đòi hỏi sự kết hợp hoàn hảo giữa kỹ thuật đánh sữa, chiết xuất espresso và khả năng kiểm soát dòng chảy.
      </Paragraph>

      <ImageCard 
        src="https://d3awvtnmmsvyot.cloudfront.net/api/file/Xe1yP7KQ1uuJq4uzwVNC/convert?w=1200&quality=90" 
        caption="Hình 5.0: Tổng quan về nghệ thuật Latte Art - sự kết hợp hoàn hảo giữa cà phê và sữa" 
      />

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-8 border-l-4 border-amber-400">
        <h3 className="text-xl font-semibold text-amber-800 mb-4">🎯 Mục Tiêu Học Tập</h3>
        <StyledList items={[
          "Nắm vững các kỹ thuật Latte Art cơ bản: trái tim và rosetta",
          "Hiểu rõ nguyên lý tạo hình và kiểm soát dòng chảy",
          "Thực hành các kỹ thuật nâng cao: tulip và thiên nga",
          "Xử lý được các vấn đề thường gặp trong quá trình thực hành",
          "Phát triển phong cách riêng và sáng tạo các mẫu mới"
        ]} />
      </div>

      <SectionTitle>5.2 Chuẩn Bị Dụng Cụ Và Nguyên Liệu</SectionTitle>
      <SubSectionTitle>Dụng cụ cần thiết</SubSectionTitle>
      <StyledList items={[
        "Ca đánh sữa (steaming pitcher) dung tích 600ml",
        "Tách cà phê espresso tiêu chuẩn (150-200ml)",
        "Máy pha cà phê espresso với vòi đánh sữa",
        "Nhiệt kế đo nhiệt độ sữa",
        "Khăn lau sạch",
        "Thìa nhỏ để điều chỉnh bọt sữa"
      ]} />

      <SubSectionTitle>Yêu cầu về nguyên liệu</SubSectionTitle>
      <StyledList items={[
        "Espresso: 30ml, chiết xuất trong 25-30 giây, lớp crema dày 3-5mm",
        "Sữa tươi: 150-200ml, nhiệt độ lạnh (2-4°C)",
        "Chất lượng sữa: hàm lượng chất béo 3,5-4%, protein 3,2-3,5%"
      ]} />

      <Note>
        Chất lượng sữa ảnh hưởng trực tiếp đến khả năng tạo bọt. Sữa có hàm lượng protein cao sẽ tạo bọt ổn định hơn.
      </Note>

      <ImageCard 
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" 
        caption="Hình 5.0.1: Dụng cụ cần thiết cho Latte Art - ca đánh sữa, tách cà phê, máy espresso và các phụ kiện" 
      />

      <SectionTitle>5.3 Kỹ Thuật Đánh Sữa Cho Latte Art</SectionTitle>
      <Paragraph>
        Kỹ thuật đánh sữa là nền tảng của Latte Art. Bạn cần tạo ra microfoam - lớp bọt sữa mịn, mượt, không có bong bóng lớn, có độ đặc vừa phải để có thể tạo hình.
      </Paragraph>

      <SubSectionTitle>Quy trình đánh sữa chuẩn</SubSectionTitle>
      <StyledList items={[
        "Bước 1: Làm lạnh ca đánh sữa và sữa tươi",
        "Bước 2: Đặt vòi hơi nước ở góc 45° so với bề mặt sữa",
        "Bước 3: Bật hơi nước và đưa vòi xuống sâu 1cm để tạo bọt",
        "Bước 4: Khi sữa nóng lên 40°C, hạ vòi xuống sâu hơn để làm nóng",
        "Bước 5: Tắt hơi nước khi sữa đạt 60-65°C",
        "Bước 6: Lắc nhẹ ca sữa để hòa trộn bọt và sữa lỏng"
      ]} />

      <ImageCard 
        src="https://horecavn.com/wp-content/uploads/2024/05/kham-pha-ky-thuat-tao-hinh-latte-art-de-tro-thanh-barista-chuyen-nghiep_20240526183954.jpg" 
        caption="Hình 5.1: Kỹ thuật đánh sữa cho Latte Art" 
      />

      <SectionTitle>5.4 Các Kỹ Thuật Latte Art Cơ Bản</SectionTitle>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(techniqueSteps).map((technique) => (
            <button
              key={technique}
              onClick={() => setActiveTechnique(technique as keyof typeof techniqueSteps)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTechnique === technique
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {technique === 'heart' && 'Trái Tim'}
              {technique === 'rosetta' && 'Rosetta'}
              {technique === 'tulip' && 'Tulip'}
              {technique === 'swan' && 'Thiên Nga'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {activeTechnique === 'heart' && 'Kỹ Thuật Vẽ Trái Tim'}
            {activeTechnique === 'rosetta' && 'Kỹ Thuật Vẽ Rosetta'}
            {activeTechnique === 'tulip' && 'Kỹ Thuật Vẽ Tulip'}
            {activeTechnique === 'swan' && 'Kỹ Thuật Vẽ Thiên Nga'}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Các bước thực hiện:</h4>
              <StyledList items={techniqueSteps[activeTechnique]} />
            </div>
            <div>
              <ImageCard 
                src={
                  activeTechnique === 'heart' ? 'https://brewbuds.club/cdn/shop/articles/Heart_Latte_Art_1200x1200.jpg?v=1637895465' :
                  activeTechnique === 'rosetta' ? 'https://brewbuds.club/cdn/shop/articles/Rosetta_Latte_Art_1200x1200.jpg?v=1637895881' :
                  activeTechnique === 'tulip' ? 'https://brewbuds.club/cdn/shop/articles/Tulip_Latte_Art_1200x1200.jpg?v=1637896443' :
                  'https://brewbuds.club/cdn/shop/articles/Swan_Latte_Art_1200x1200.jpg?v=1637896192'
                }
                caption={`Hình 5.${Object.keys(techniqueSteps).indexOf(activeTechnique) + 2}: Quy trình vẽ ${activeTechnique === 'heart' ? 'trái tim' : activeTechnique === 'rosetta' ? 'rosetta' : activeTechnique === 'tulip' ? 'tulip' : 'thiên nga'}`}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Mẹo thực hành:</h4>
            <ul className="text-blue-700 space-y-1">
              {activeTechnique === 'heart' && (
                <>
                  <li>• Giữ tay ổn định khi kéo đường thẳng qua tâm</li>
                  <li>• Tốc độ rót phải đều và kiểm soát</li>
                  <li>• Thời điểm nâng cao ca sữa rất quan trọng</li>
                </>
              )}
              {activeTechnique === 'rosetta' && (
                <>
                  <li>• Lắc cổ tay nhẹ nhàng, không quá mạnh</li>
                  <li>• Di chuyển ca sữa từ sau ra trước đều đặn</li>
                  <li>• Dừng lắc đúng thời điểm để tạo cuống lá</li>
                </>
              )}
              {activeTechnique === 'tulip' && (
                <>
                  <li>• Tạo các vòng tròn có kích thước giảm dần</li>
                  <li>• Khoảng cách giữa các vòng phải đều nhau</li>
                  <li>• Đường kéo cuối phải thẳng và rõ nét</li>
                </>
              )}
              {activeTechnique === 'swan' && (
                <>
                  <li>• Tỷ lệ giữa thân và đầu thiên nga phải cân đối</li>
                  <li>• Đường cong cổ thiên nga phải mềm mại</li>
                  <li>• Cánh thiên nga tạo bằng các đường sóng nhỏ</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <SectionTitle>5.5 So Sánh Các Kỹ Thuật</SectionTitle>
      
      {/* Technique Comparison */}
      <LatteArtComparison isDarkMode={false} />

      <SectionTitle>5.6 Thư Viện Mẫu Latte Art</SectionTitle>
      
      {/* Pattern Gallery */}
      <LatteArtGallery isDarkMode={false} />

      <SectionTitle>5.7 Kỹ Thuật Nâng Cao</SectionTitle>
      <SubSectionTitle>5.7.1 Layering (Tạo lớp)</SubSectionTitle>
      <Paragraph>
        Kỹ thuật tạo nhiều lớp hình vẽ chồng lên nhau, tạo độ sâu và phức tạp cho tác phẩm. Thường sử dụng trong các mẫu phức tạp như hoa hồng nhiều lớp hoặc các mẫu trừu tượng.
      </Paragraph>

      <ImageCard 
        src="https://www.cet.edu.vn/wp-content/uploads/2019/10/nghe-thuat-ve-latte-art-la-gi.jpg" 
        caption="Hình 5.6: Kỹ thuật Layering - tạo nhiều lớp hình vẽ chồng lên nhau" 
      />

      <SubSectionTitle>5.7.2 Etching (Khắc họa)</SubSectionTitle>
      <Paragraph>
        Sử dụng dụng cụ nhỏ (như tăm, thìa nhỏ) để vẽ chi tiết trên bề mặt cà phê sau khi đã tạo hình cơ bản. Thường dùng để tạo mắt, mũi, miệng cho các hình động vật hoặc chi tiết trang trí.
      </Paragraph>

      <ImageCard 
        src="https://i.ytimg.com/vi/VvwthwuRjX4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSWaYRuU0ax91tXp3XziZpbeSGgQ" 
        caption="Hình 5.7: Kỹ thuật Etching - sử dụng dụng cụ nhỏ để vẽ chi tiết" 
      />

      <SubSectionTitle>5.7.3 Free Pour (Rót tự do)</SubSectionTitle>
      <Paragraph>
        Kỹ thuật tạo hình hoàn toàn bằng cách rót sữa mà không cần dụng cụ hỗ trợ. Đòi hỏi kỹ năng cao và sự kiểm soát hoàn hảo về tốc độ, góc độ và thời điểm.
      </Paragraph>

      <ImageCard 
        src="https://coffeehit.com.au/cdn/shop/articles/Latte_Art_1600x.png?v=1681729440" 
        caption="Hình 5.8: Kỹ thuật Free Pour - tạo hình hoàn toàn bằng cách rót sữa" 
      />

      <SectionTitle>5.8 Xử Lý Sự Cố Thường Gặp</SectionTitle>
      <div className="mb-4">
        <button
          onClick={() => setShowTroubleshooting(!showTroubleshooting)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {showTroubleshooting ? 'Ẩn' : 'Hiển thị'} Hướng dẫn xử lý sự cố
        </button>
      </div>

      {showTroubleshooting && (
        <div className="space-y-4">
          {troubleshootingIssues.map((issue, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-red-800 mb-2">❌ Vấn đề: {issue.problem}</h4>
              <div className="text-red-700 space-y-2">
                <p><span className="font-medium">Giải pháp:</span> {issue.solution}</p>
                <p><span className="font-medium">Phòng ngừa:</span> {issue.prevention}</p>
              </div>
            </div>
          ))}
          
          <div className="mt-6">
            <ImageCard 
              src="https://hocphachehaffee.com/wp-content/uploads/2024/05/Khoa-hoc-barista-2.png" 
              caption="Hình 5.9: Các vấn đề thường gặp và cách khắc phục trong Latte Art" 
            />
          </div>
        </div>
      )}

      <SectionTitle>5.9 Hướng Dẫn Video Chi Tiết</SectionTitle>
      <Paragraph>
        Sử dụng các video hướng dẫn sau để củng cố từng kỹ thuật thông qua hướng dẫn từng bước rõ ràng:
      </Paragraph>

      <div className="space-y-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Latte Art Designs for Beginners (2024)</h3>
          <p className="text-gray-600 mb-4">
            Hướng dẫn POV bao gồm trái tim, trái tim đôi, tulip cơ bản & xếp chồng, tulip cánh, và nhiều mẫu khác. Có mốc thời gian cho từng mẫu.
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/4TTp06RVy3M"
              title="Basic Latte Art Designs for Beginners"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Steam Milk Perfectly for Flat Whites & Lattes (Jul 2025)</h3>
          <p className="text-gray-600 mb-4">
            Quy tắc "2-4-6 giây", vị trí vòi hơi, tạo xoáy nước, kiểm soát nhiệt độ, và các mẹo chuyên nghiệp.
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/Gy5ht0Y7HAs"
              title="How to Steam Milk Perfectly for Flat Whites & Lattes"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Beginners Guide to Pouring a Rosetta (Aug 2023)</h3>
          <p className="text-gray-600 mb-4">
            Thực hành với sữa đậu nành, kỹ thuật cổ tay, các giai đoạn: nền + cổ + kéo qua.
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/TGQdkqyyZnU"
              title="Beginners Guide to Pouring a Rosetta"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How To Pour Heart (Latte Art Tutorial, 2021)</h3>
          <p className="text-gray-600 mb-4">
            Phân tích chi tiết chuyển động tay, kiểm soát trục, nghiêng tách, và mẹo giảm lãng phí.
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/SiefJJv-Qho"
              title="How To Pour Heart - Latte Art Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">The Beginner's Guide to Latte Art (Mar 2025)</h3>
          <p className="text-yellow-700 mb-4">
            Tổng quan toàn diện cho người mới bắt đầu: chuẩn bị bọt sữa, độ cao rót, tốc độ, trái tim, rosetta, tulip, và chẩn đoán sự cố.
          </p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/20HxMMSqRyg"
              title="The Beginner's Guide to Latte Art"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <SectionTitle>5.10 Luyện Tập Và Phát Triển Kỹ Năng</SectionTitle>
      <SubSectionTitle>Lộ trình luyện tập</SubSectionTitle>
      <StyledList items={[
        "Tuần 1-2: Luyện tập kỹ thuật đánh sữa và tạo hình trái tim cơ bản",
        "Tuần 3-4: Thành thạo hình rosetta và bắt đầu thử tulip",
        "Tuần 5-6: Luyện tập các kỹ thuật nâng cao và sáng tạo mẫu mới",
        "Tuần 7-8: Phát triển phong cách riêng và tham gia cộng đồng Latte Art"
      ]} />

      <SubSectionTitle>Mẹo luyện tập hiệu quả</SubSectionTitle>
      <StyledList items={[
        "Ghi chép lại quá trình luyện tập để theo dõi tiến bộ",
        "Quay video quá trình thực hiện để phân tích và cải thiện",
        "Tham gia các nhóm cộng đồng Latte Art để học hỏi kinh nghiệm",
        "Thử nghiệm với các loại sữa khác nhau để hiểu đặc tính của từng loại",
        "Luyện tập đều đặn mỗi ngày, ít nhất 30 phút"
      ]} />

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-semibold text-green-800 mb-4">🎉 Chúc mừng!</h3>
        <Paragraph>
          Bạn đã hoàn thành bài học về Latte Art! Hãy bắt đầu luyện tập ngay hôm nay và đừng nản lòng nếu những lần đầu chưa thành công. Latte Art là một nghệ thuật đòi hỏi sự kiên nhẫn và luyện tập liên tục. Hãy tận hưởng quá trình học hỏi và sáng tạo!
        </Paragraph>
      </div>
    </div>
  );
};

export default Chapter5;
