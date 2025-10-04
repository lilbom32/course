
import React from 'react';
import { ChapterTitle, SectionTitle, SubSectionTitle, Paragraph, ImageCard, StyledList, ChapterSubtitle } from '../common/Layout';
import MilkTemperatureSimulator from './MilkTemperatureSimulator';
import FoamTextureGuide from './FoamTextureGuide';
import MilkSteamingTechniques from './MilkSteamingTechniques';

const Chapter3: React.FC = () => {
  return (
    <div>
      <ChapterTitle>Bài 3: Đánh Sữa Tạo <strong>Microfoam</strong> (Bọt Sữa Mịn)</ChapterTitle>
      <ChapterSubtitle>3 bước đơn giản để có <strong>microfoam</strong> (bọt sữa mịn) đẹp cho cà phê.</ChapterSubtitle>

      {/* Milk Steaming Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🥛 Hình Ảnh Kỹ Thuật Đánh Sữa</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://img.youtube.com/vi/NuR76h7j6pQ/maxresdefault.jpg"
            alt="Tutorial image showing how to steam milk for latte art using an espresso machine steam wand"
            caption="Hình 3.1: Hướng dẫn đánh sữa với <strong>steam wand</strong> (vòi hơi nước) cho <strong>Latte Art</strong>"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573763/pplx_project_search_images/ce8170919269e57a26b96ea242a99219792a498b.png"
            alt="Steaming milk and pouring microfoam into an espresso cup for latte art"
            caption="Hình 3.2: Đánh sữa và đổ <strong>microfoam</strong> (bọt sữa mịn) vào cốc <strong>espresso</strong> cho <strong>Latte Art</strong>"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-md">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1755846359/pplx_project_search_images/f0a8aec97fb05bb573f2e665d79aa6c9042659bf.png"
              alt="Person steaming milk with a steam wand in a metal pitcher for microfoam texture preparation"
              caption="Hình 3.3: Kỹ thuật steam wand tạo microfoam texture trong pitcher kim loại"
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Hướng Dẫn: Tất Cả Về Đánh Sữa Tuyệt Vời</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/oaKRBBpA4fw"
            title="Everything You Need To Know To Steam Great Milk"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• <strong>Chuẩn bị:</strong> Sữa lạnh, pitcher sạch, steam wand đã purge</li>
            <li>• <strong>Vị trí wand:</strong> Nghiêng 15°, cách bề mặt sữa 1-2cm</li>
            <li>• <strong>Tạo bọt:</strong> Nghe tiếng "hôn" nhẹ nhàng, tạo 30-40% volume</li>
            <li>• <strong>Làm mịn:</strong> Đưa wand sâu xuống, tạo vortex mạnh</li>
            <li>• <strong>Nhiệt độ:</strong> Dừng ở 60-65°C, kiểm tra bằng tay</li>
            <li>• <strong>Kết quả:</strong> Bọt mịn như kem, có độ bóng, không có bọt to</li>
          </ul>
        </div>
      </div>

      <SectionTitle>3.1 Chọn Sữa Nào?</SectionTitle>
      <SubSectionTitle>Sữa gì để đánh bọt tốt:</SubSectionTitle>
      <Paragraph>
        <strong>Mẹo đơn giản:</strong> Sữa có nhiều protein = bọt đẹp, sữa có nhiều béo = vị ngon. 
        Không cần hiểu sâu, chỉ cần nhớ: sữa tươi &gt; sữa hộp, sữa nguyên kem &gt; sữa tách béo.
      </Paragraph>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">💡 Nhớ Nhanh</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">Protein = Bọt Đẹp</h5>
            <StyledList items={[
              "Bọt không bị xẹp nhanh",
              "Sữa đặc hơn",
              "Bọt mịn như kem",
              "Dễ tạo hoa văn"
            ]} />
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">Chất Béo = Vị Ngon</h5>
            <StyledList items={[
              "Sữa ngọt tự nhiên",
              "Bọt bóng mịn",
              "Cảm giác mượt mà",
              "Vị đậm đà hơn"
            ]} />
          </div>
        </div>
      </div>

      <SubSectionTitle>Chọn sữa nào:</SubSectionTitle>
      <StyledList items={[
        "🥛 Sữa nguyên kem: Dễ nhất, bọt đẹp nhất (dùng cho latte)",
        "🥛 Sữa ít béo: Bọt khô, phù hợp cappuccino",
        "🥛 Sữa tách béo: Khó đánh, bọt to (tránh dùng nếu mới học)",
        "🌱 Sữa hạt: Khó hơn, cần tập nhiều"
      ]} />

      <div className="bg-green-50 p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">🎯 Mẹo Chọn Sữa</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">🥛 Sữa Nguyên Kem</h5>
            <p className="text-sm text-gray-600 mb-2"><strong>Dễ nhất cho người mới</strong></p>
            <p className="text-xs text-gray-500">Bọt mịn, vị ngon, nhiệt độ 60-65°C</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">🥛 Sữa Ít Béo</h5>
            <p className="text-sm text-gray-600 mb-2"><strong>Tốt cho cappuccino</strong></p>
            <p className="text-xs text-gray-500">Bọt khô, bền, nhiệt độ 65-70°C</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 mb-2">🥛 Sữa Tách Béo</h5>
            <p className="text-sm text-gray-600 mb-2"><strong>Khó đánh, tránh dùng</strong></p>
            <p className="text-xs text-gray-500">Bọt to, dễ vỡ, nhiệt độ 70-75°C</p>
          </div>
        </div>
      </div>

      <SectionTitle>3.2 Nhiệt Độ Bao Nhiêu?</SectionTitle>
      <SubSectionTitle>Nhiệt độ quan trọng như thế nào:</SubSectionTitle>
      <Paragraph>
        <strong>Quy tắc đơn giản:</strong> Sữa ấm = ngon, sữa nóng = dở. 
        Không cần nhiệt kế, chỉ cần cảm nhận bằng tay: ấm như nước tắm = đúng.
      </Paragraph>

      <StyledList items={[
        "🔥 Ấm như nước tắm (60°C): Tốt nhất — sữa ngọt, bọt mịn",
        "🔥 Hơi nóng tay (65°C): Vẫn được — bọt hơi khô",
        "🔥 Nóng rát tay (70°C+): Quá nóng — sữa mất vị, bọt xấu"
      ]} />

      <div className="my-8">
        <MilkTemperatureSimulator />
      </div>

      <SubSectionTitle>Những lỗi hay mắc:</SubSectionTitle>
      <div className="bg-red-50 p-6 rounded-lg my-6">
        <h4 className="text-lg font-semibold text-red-800 mb-4">❌ Tránh Những Lỗi Này</h4>
        <StyledList items={[
          "Đun quá nóng — sữa có mùi khó chịu, mất vị ngọt",
          "Đánh quá lâu — bọt bị hỏng, sữa đặc quá",
          "Để sữa nguội — bọt bị cứng, khó đổ",
          "Khuấy mạnh — làm vỡ bọt, mất đẹp"
        ]} />
      </div>

      <SectionTitle>3.3 3 Bước Đánh Sữa</SectionTitle>
      <SubSectionTitle>Làm sao để có bọt đẹp:</SubSectionTitle>
      <Paragraph>
        <strong>Đơn giản:</strong> Hơi nước nóng + sữa lạnh = bọt đẹp. 
        Chỉ cần nhớ: tạo bọt trước, làm nóng sau, không khuấy mạnh.
      </Paragraph>

      <StyledList items={[
        "💨 Hơi nước tạo bọt nhỏ li ti (như kem)",
        "🌡️ Nhiệt độ vừa phải giữ bọt bền",
        "📈 Sữa tăng gấp rưỡi thể tích",
        "🥛 Sữa đặc hơn, dễ vẽ hoa văn"
      ]} />

      {/* Foam Science Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🔬 Khoa Học Bọt Sữa</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573830/pplx_project_search_images/eca36b5e4b2cf7f52a33335d9d9af997c2f47862.png"
            alt="Close-up of milk foam showing different bubble sizes and textures"
            caption="Hình 3.4: So sánh kích thước bọt microfoam vs macrofoam"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573811/pplx_project_search_images/93a2b619895b83a946defb13cf1e19db61d6f772.png"
            alt="Diagram of an espresso machine with labeled parts highlighting key components such as the group head, portafilter, steam wand, and boiler"
            caption="Hình 3.5: Sơ đồ máy espresso với các bộ phận được ghi nhãn"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-md">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1759573811/pplx_project_search_images/f740c704505fb7df9a86e1e1b39b67119950ff12.png"
              alt="Labeled parts of an espresso machine including group head, steam wand, portafilter, and more"
              caption="Hình 3.6: Chi tiết các bộ phận máy espresso bao gồm group head, steam wand, portafilter"
            />
          </div>
        </div>
      </div>

      <div className="my-8">
        <MilkSteamingTechniques />
      </div>

      <div className="my-8">
        <FoamTextureGuide />
      </div>

      <SubSectionTitle>3 bước đơn giản:</SubSectionTitle>
      <div className="grid md:grid-cols-3 gap-6 my-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">1️⃣ Chuẩn bị</h4>
          <StyledList items={[
            "Cốc 600ml + sữa lạnh đầy 1/3",
            "Xả hơi nước 2-3 giây",
            "Sẵn sàng bấm nút"
          ]} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">2️⃣ Tạo bọt</h4>
          <StyledList items={[
            "Nghiêng ống hơi 15°",
            "Nghe tiếng \"hôn\" đều đặn",
            "Tạo bọt 3-5 giây"
          ]} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">3️⃣ Làm mịn</h4>
          <StyledList items={[
            "Đưa ống hơi sâu xuống",
            "Tạo xoáy đến 60°C",
            "Đổ ngay, không để lâu"
          ]} />
        </div>
      </div>

      <SectionTitle>3.4 Đánh Sữa Cho Loại Nào?</SectionTitle>
      <SubSectionTitle>Mỗi loại cà phê cần bọt khác nhau:</SubSectionTitle>
      <Paragraph>
        <strong>Nhớ đơn giản:</strong> Latte = bọt mỏng, Cappuccino = bọt dày, Flat White = bọt ít. 
        Chỉ cần thay đổi thời gian tạo bọt là được.
      </Paragraph>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Đào Tạo Barista: Đánh Sữa & Latte Art</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/mxALjb13b9U"
            title="Barista Training: Milk steaming & Latte Art"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• <strong>Kỹ thuật cơ bản:</strong> Chuẩn bị, positioning, stretching, texturing</li>
            <li>• <strong>Latte Art cơ bản:</strong> Heart, rosetta, tulip - các hình cơ bản</li>
            <li>• <strong>Pouring technique:</strong> Cách đổ sữa để tạo hoa văn</li>
            <li>• <strong>Consistency:</strong> Làm thế nào để tạo ra kết quả ổn định</li>
            <li>• <strong>Practice routine:</strong> Lịch trình luyện tập hiệu quả</li>
            <li>• <strong>Common mistakes:</strong> Các lỗi thường gặp và cách khắc phục</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-lg border border-amber-200">
          <h4 className="text-lg font-semibold text-amber-800 mb-4">☕ Latte</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bọt:</span>
              <span className="font-medium">Mỏng, mịn</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium">3-5 giây</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dùng để:</span>
              <span className="font-medium">Vẽ hoa văn</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nhiệt độ:</span>
              <span className="font-medium">60-65°C</span>
            </div>
            <p className="text-sm text-gray-700 mt-3">
              <strong>Dễ nhất:</strong> Tạo bọt ít, sữa nhiều. 
              Phù hợp cho người mới bắt đầu.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-lg border border-yellow-200">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">☕ Cappuccino</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bọt:</span>
              <span className="font-medium">Dày, xốp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium">8-12 giây</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dùng để:</span>
              <span className="font-medium">Lớp bọt riêng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nhiệt độ:</span>
              <span className="font-medium">65-70°C</span>
            </div>
            <p className="text-sm text-gray-700 mt-3">
              <strong>Trung bình:</strong> Tạo bọt nhiều hơn latte. 
              Cần tập nhiều hơn.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">☕ Flat White</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bọt:</span>
              <span className="font-medium">Rất ít</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium">2-3 giây</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dùng để:</span>
              <span className="font-medium">Vị cà phê đậm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nhiệt độ:</span>
              <span className="font-medium">55-60°C</span>
            </div>
            <p className="text-sm text-gray-700 mt-3">
              <strong>Đơn giản:</strong> Hầu như không tạo bọt. 
              Chỉ cần làm nóng sữa.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-lg border border-purple-200">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">☕ Macchiato</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bọt:</span>
              <span className="font-medium">Chỉ 1 thìa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium">5-8 giây</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dùng để:</span>
              <span className="font-medium">Đánh dấu cà phê</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nhiệt độ:</span>
              <span className="font-medium">60-65°C</span>
            </div>
            <p className="text-sm text-gray-700 mt-3">
              <strong>Đặc biệt:</strong> Chỉ một chút bọt để trang trí. 
              Vị cà phê là chính.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tip Video */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Mẹo Nhanh: Sữa Cho Latte & Cappuccino</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/NLO0mWJuIHk"
            title="Quick Tip: Milk for Lattes and Cappuccinos"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• <strong>Latte:</strong> Bọt mỏng (3-5 giây), nhiệt độ 60-65°C, texture mịn</li>
            <li>• <strong>Cappuccino:</strong> Bọt dày (8-12 giây), nhiệt độ 65-70°C, texture xốp</li>
            <li>• <strong>Thời gian chính xác:</strong> Đếm giây để đảm bảo consistency</li>
            <li>• <strong>Visual cues:</strong> Quan sát sự thay đổi của sữa trong pitcher</li>
            <li>• <strong>Temperature check:</strong> Kiểm tra bằng tay thay vì nhiệt kế</li>
            <li>• <strong>Quick reference:</strong> Bảng tóm tắt nhanh cho barista</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-bold text-blue-800 mb-4">💡 Nhớ Nhanh</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">🌡️ Nhiệt Độ</h4>
            <StyledList items={[
              "Ấm như nước tắm = đúng",
              "Nóng rát tay = sai",
              "Dùng tay kiểm tra, không cần nhiệt kế"
            ]} />
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">🔧 Sửa Lỗi</h4>
            <StyledList items={[
              "Bọt khô = đánh lâu quá",
              "Bọt to = ống hơi sai vị trí", 
              "Sữa mùi khó chịu = quá nóng"
            ]} />
          </div>
        </div>
      </div>

      <SectionTitle>3.5 Tập Luyện</SectionTitle>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Playlist Hướng Dẫn: Đánh Sữa Toàn Diện</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/videoseries?list=PLEuYLg1OomXSqacRtxj7XInih6H9D1QRk"
            title="MILK STEAMING TUTORIAL Learn how to steam milk for... (Playlist)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-900 mb-2">📝 Tóm Tắt Playlist:</h4>
          <ul className="text-orange-800 text-sm space-y-1">
            <li>• <strong>Series toàn diện:</strong> Từ cơ bản đến nâng cao</li>
            <li>• <strong>Kỹ thuật chi tiết:</strong> Mỗi bước được giải thích kỹ lưỡng</li>
            <li>• <strong>Thực hành thực tế:</strong> Ví dụ cụ thể với các loại sữa khác nhau</li>
            <li>• <strong>Troubleshooting:</strong> Khắc phục các vấn đề thường gặp</li>
            <li>• <strong>Advanced techniques:</strong> Kỹ thuật nâng cao cho barista chuyên nghiệp</li>
            <li>• <strong>Consistency training:</strong> Luyện tập để tạo ra kết quả ổn định</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-green-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-bold text-green-800 mb-4">🎯 Kiểm Tra Bọt Sữa</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
              👁️ Nhìn
            </h4>
            <StyledList items={[
              "Mịn như kem",
              "Có độ bóng",
              "Không có bọt to",
              "Màu đều"
            ]} />
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
              ✋ Sờ
            </h4>
            <StyledList items={[
              "Ấm như nước tắm",
              "Không quá lỏng",
              "Đổ được dễ dàng",
              "Mượt mà"
            ]} />
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
              ⚡ Nhanh
            </h4>
            <StyledList items={[
              "Xong trong 30-45 giây",
              "Chất lượng ổn định",
              "Giữ được 2-3 phút",
              "Dùng cho nhiều loại cà phê"
            ]} />
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-bold text-purple-800 mb-4">🏋️ Tập Luyện Từ Dễ Đến Khó</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-purple-700 mb-4">🥛 Bước 1: Học Cảm Nhiệt</h4>
            <StyledList items={[
              "Đánh sữa 10 lần đến 60°C",
              "Kiểm tra bằng tay",
              "Nhớ cảm giác 'ấm như nước tắm'",
              "Thành công 8/10 lần"
            ]} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-purple-700 mb-4">☕ Bước 2: Tạo Bọt Đúng</h4>
            <StyledList items={[
              "Tập latte: bọt mỏng (20 lần)",
              "Tập cappuccino: bọt dày (15 lần)", 
              "Tập flat white: bọt ít (15 lần)",
              "Thành công 8/10 lần"
            ]} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-purple-700 mb-4">⚡ Bước 3: Nhanh & Ổn Định</h4>
            <StyledList items={[
              "Đánh sữa xong trong 30 giây",
              "Tạo 4 ly cà phê trong 5 phút",
              "Chất lượng ổn định",
              "Thành công 9/10 lần"
            ]} />
          </div>
        </div>
      </div>

      <div className="bg-orange-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-bold text-orange-800 mb-4">🏆 Khi Đã Thành Thạo</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-orange-700 mb-4">⚡ Thử Thách Tốc Độ</h4>
            <StyledList items={[
              "Đánh sữa xong trong 25 giây",
              "Làm 10 ly latte trong 8 phút",
              "Chuyển đổi 3 loại cà phê trong 2 phút",
              "Không mất chất lượng khi bận"
            ]} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-orange-700 mb-4">🎨 Thử Thách Nghệ Thuật</h4>
            <StyledList items={[
              "Vẽ hoa văn phức tạp trên cà phê",
              "Đánh sữa hạt (hạnh nhân, yến mạch)",
              "Làm đẹp với máy khác nhau",
              "Giải quyết mọi tình huống"
            ]} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 my-8">
        <ImageCard src="https://picsum.photos/seed/steaming/400/500" caption="Hình 3.4: Cách đánh sữa" />
        <ImageCard src="https://picsum.photos/seed/foam/400/500" caption="Hình 3.5: Bọt sữa đẹp" />
      </div>
    </div>
  );
};

export default Chapter3;
