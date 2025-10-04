import React from 'react';
import { ChapterTitle, SectionTitle, Paragraph, ImageCard, ChapterSubtitle } from '../common/Layout';
import InteractiveCoffeeJourney from './InteractiveCoffeeJourney';
import CoffeeTypeFlashcards from './CoffeeTypeFlashcards';
import InteractiveCoffeeMap from './InteractiveCoffeeMap';
import ProcessingMethods from './ProcessingMethods';
import BeanIdentificationQuiz from './BeanIdentificationQuiz';
import CoffeeStoryCorner from './CoffeeStoryCorner';
import DeeperDive from './DeeperDive';
import FunFacts from './FunFacts';
import CoffeeBrands from './CoffeeBrands';
import CoffeeDrinksInteractive from './CoffeeDrinksTable';
import BaristaValue from './BaristaValue';
import PhotoGallery from './PhotoGallery';
import CoffeeGenealogy from './CoffeeGenealogy';
import TerroirExplanation from './TerroirExplanation';
import EtymologyOfCoffee from './EtymologyOfCoffee';

const Chapter1: React.FC = () => {
  return (
    <div>
      <ChapterTitle>Bài 1: Nguồn Gốc Cà Phê, Các Loại Hạt Cà Phê</ChapterTitle>
      <ChapterSubtitle>Khám phá lịch sử, địa lý, các loại hạt và quy trình chế biến cà phê phổ biến trên thế giới.</ChapterSubtitle>

      <SectionTitle>1.1 Khám Phá Cội Nguồn Cà Phê</SectionTitle>
      <Paragraph>Hành trình của cà phê không chỉ là một câu chuyện lịch sử, mà còn là một cuộc du hành về sinh học, địa lý và cả ngôn ngữ. Hãy cùng đi sâu vào từng khía cạnh để hiểu trọn vẹn về hạt cà phê.</Paragraph>
      <InteractiveCoffeeJourney />
      <CoffeeGenealogy />
      <TerroirExplanation />
      <EtymologyOfCoffee />


      <SectionTitle>Góc Kể Chuyện Cà Phê</SectionTitle>
      <Paragraph>
        Đằng sau mỗi tách cà phê là những câu chuyện lịch sử và văn hóa hấp dẫn. Hãy cùng khám phá những hành trình đã định hình nên ngành công nghiệp cà phê ngày nay.
      </Paragraph>
      <CoffeeStoryCorner />

      <SectionTitle>Giá Trị Công Việc Của Một Barista</SectionTitle>
      <Paragraph>
        Nghề barista không chỉ đơn thuần là pha cà phê. Họ là mắt xích cuối cùng và quan trọng nhất trong hành trình từ nông trại đến tách cà phê, là người nghệ sĩ, nhà khoa học và người kết nối cộng đồng.
      </Paragraph>
      <BaristaValue />

      <SectionTitle>Bản Đồ Cà Phê Thế Giới</SectionTitle>
      <Paragraph>
        Cà phê được trồng chủ yếu ở một khu vực gọi là "<strong>Vành đai Cà phê</strong>" (<strong>Bean Belt</strong>), nằm giữa hai chí tuyến Bắc và Nam. Hãy khám phá một số quốc gia sản xuất cà phê tiêu biểu trên bản đồ dưới đây.
      </Paragraph>
      <InteractiveCoffeeMap />

      <SectionTitle>1.2 Phân Loại Các Loại Hạt Cà Phê</SectionTitle>
      <Paragraph>
        Dưới đây là các loại hạt cà phê phổ biến nhất. Hãy nhấp vào từng thẻ để xem chi tiết và so sánh sự khác biệt giữa chúng.
      </Paragraph>
      <CoffeeTypeFlashcards />
      
      <SectionTitle>Đi Sâu Vào Hạt Cà Phê</SectionTitle>
      <Paragraph>
        Để hiểu rõ hơn về sự đa dạng của thế giới cà phê, chúng ta cần tìm hiểu về các cấp độ phân loại và các yếu tố kinh tế - xã hội quan trọng.
      </Paragraph>
      <DeeperDive />

      <SectionTitle>Bạn Có Biết?</SectionTitle>
      <FunFacts />

      <SectionTitle>1.3 Phương Pháp Chế Biến Cà Phê</SectionTitle>
      <Paragraph>Hương vị của cà phê không chỉ đến từ giống cây mà còn phụ thuộc rất nhiều vào cách nó được chế biến sau khi thu hoạch. Có ba phương pháp chính, mỗi phương pháp tạo ra một hồ sơ hương vị độc đáo.</Paragraph>
      <ProcessingMethods />
      
      <SectionTitle>Thương Hiệu Cà Phê Tiêu Biểu</SectionTitle>
      <Paragraph>
        Từ những chuỗi cửa hàng toàn cầu đến các thương hiệu nội địa đầy tự hào, thế giới cà phê vô cùng đa dạng. Hãy cùng điểm qua một vài cái tên nổi bật đã định hình nên văn hóa thưởng thức cà phê hiện đại.
      </Paragraph>
      <CoffeeBrands />

      <SectionTitle>Khám Phá Các Thức Uống Cà Phê</SectionTitle>
      <Paragraph>
        Từ hạt cà phê, con người trên khắp thế giới đã sáng tạo ra vô số cách thưởng thức khác nhau. Khám phá những công thức cà phê đặc trưng từ Việt Nam và các nước trên thế giới. Từ cà phê sữa đá quen thuộc đến espresso Ý truyền thống, mỗi món đều mang trong mình một câu chuyện văn hóa riêng biệt. Hãy nhấp vào từng món để xem hình ảnh và công thức pha chế chi tiết.
      </Paragraph>
      <CoffeeDrinksInteractive />

      <SectionTitle>Thư Viện Ảnh Cà Phê</SectionTitle>
      <Paragraph>
        Hành trình của hạt cà phê chứa đựng vẻ đẹp ở mỗi công đoạn. Hãy cùng chiêm ngưỡng những khoảnh khắc đầy cảm hứng từ nông trại, xưởng rang cho đến tách cà phê hoàn thiện.
      </Paragraph>
      <PhotoGallery />

      <SectionTitle>Thử Thách: Nhận Diện Hạt Cà Phê</SectionTitle>
      <Paragraph>Sau khi đã tìm hiểu về các loại hạt, hãy cùng làm một bài kiểm tra nhỏ để củng cố kiến thức của bạn nhé!</Paragraph>
      <BeanIdentificationQuiz />

    </div>
  );
};

export default Chapter1;