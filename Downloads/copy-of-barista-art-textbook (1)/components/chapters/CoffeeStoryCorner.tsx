import React, { useState } from 'react';
import { BookText, Anchor, ChevronDown, PawPrint, Gem } from 'lucide-react';

const stories = [
  {
    id: 'penny',
    icon: <BookText className="text-amber-600" />,
    title: '"Penny Universities" - Trường Đại Học Một Xu',
    content: 'Vào thế kỷ 17, các quán cà phê ở London được mệnh danh là "Penny Universities". Chỉ với một xu (penny) cho một tách cà phê, mọi người từ mọi tầng lớp có thể tụ tập, đọc tin tức, và tham gia vào các cuộc tranh luận sôi nổi về chính trị, khoa học, văn học. Cà phê đã trở thành chất xúc tác cho sự tỉnh táo, giao lưu trí tuệ và lan tỏa tri thức trong xã hội.',
  },
  {
    id: 'journey',
    icon: <Anchor className="text-sky-600" />,
    title: 'Hành Trình Mạo Hiểm Đến Châu Mỹ',
    content: 'Câu chuyện kể về Gabriel de Clieu, một sĩ quan hải quân Pháp, đã đánh cắp một nhánh cây cà phê từ vườn thực vật hoàng gia ở Paris vào năm 1723. Trong chuyến hải trình dài đến Martinique, ông đã đối mặt với cướp biển, bão tố và phải chia sẻ khẩu phần nước ít ỏi của mình cho cái cây. Nhờ sự hy sinh đó, cái cây đã sống sót và được cho là tổ tiên của hàng triệu cây cà phê ở Trung và Nam Mỹ ngày nay.',
  },
  {
    id: 'kopi-luwak',
    icon: <PawPrint className="text-orange-700" />,
    title: 'Kopi Luwak - Cà Phê Chồn Huyền Thoại',
    content: 'Đây là một trong những loại cà phê nổi tiếng và đắt đỏ nhất, được tạo ra từ một quá trình độc đáo. Những con cầy vòi hương (còn gọi là chồn) ăn những quả cà phê chín mọng. Hạt cà phê sau đó đi qua hệ tiêu hóa của chúng, được lên men tự nhiên bởi các enzyme, giúp phá vỡ protein và giảm độ đắng. Sau khi được thải ra, hạt cà phê được thu lượm, rửa sạch và rang. Quá trình này tạo ra một hương vị mượt mà, ít axit và vô cùng đặc biệt.',
  },
  {
    id: 'black-ivory',
    icon: <PawPrint className="text-gray-600" />,
    title: 'Black Ivory - Vàng Đen Từ Voi',
    content: 'Tương tự Kopi Luwak nhưng ở một cấp độ hiếm có hơn, Black Ivory được sản xuất tại Thái Lan. Những con voi ăn quả cà phê Arabica. Axit trong dạ dày của voi giúp phá vỡ protein, tạo ra một hương vị cực kỳ êm dịu, không hề đắng, với hương sô cô la và hoa quả. Do quá trình thu lượm rất khó khăn và tỷ lệ hạt còn nguyên vẹn thấp, Black Ivory là một trong những loại cà phê đắt nhất thế giới.',
  },
  {
    id: 'geisha',
    icon: <Gem className="text-pink-500" />,
    title: 'Geisha Panama - Nữ Hoàng Của Các Giống Cà Phê',
    content: 'Khác với các loại trên, giá trị của Geisha đến từ chính bản thân giống cây. Được tái phát hiện tại trang trại Hacienda La Esmeralda ở Panama, giống cà phê Geisha có hương vị vô cùng phức tạp và tinh tế, gợi nhớ đến trà hoa nhài, cam bergamot và các loại trái cây nhiệt đới. Nó thường xuyên đạt mức giá kỷ lục trong các cuộc đấu giá cà phê đặc sản toàn cầu.',
  },
];

const AccordionItem: React.FC<{ story: typeof stories[0]; isOpen: boolean; onClick: () => void }> = ({ story, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <h2>
        <button
          type="button"
          className="flex justify-between items-center w-full p-5 font-medium text-left text-gray-700 hover:bg-gray-100"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            {story.icon}
            <span className="text-lg">{story.title}</span>
          </div>
          <ChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h2>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-5 border-t-0">
          <p className="text-gray-600 leading-relaxed">{story.content}</p>
        </div>
      </div>
    </div>
  );
};

const CoffeeStoryCorner: React.FC = () => {
  const [openStoryId, setOpenStoryId] = useState<string | null>(stories[0].id);

  const handleToggle = (id: string) => {
    setOpenStoryId(openStoryId === id ? null : id);
  };

  return (
    <div className="my-10 bg-white rounded-lg border border-gray-200 shadow-sm">
      {stories.map((story) => (
        <AccordionItem
          key={story.id}
          story={story}
          isOpen={openStoryId === story.id}
          onClick={() => handleToggle(story.id)}
        />
      ))}
    </div>
  );
};

export default CoffeeStoryCorner;