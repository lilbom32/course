
import React from 'react';
import { ChapterTitle, SectionTitle, Paragraph, StyledList, ChapterSubtitle } from '../common/Layout';

const Introduction: React.FC = () => {
  return (
    <div>
      <ChapterTitle>Hướng Dẫn</ChapterTitle>
      <ChapterSubtitle>Giới thiệu tổng quan về môn học Barista.</ChapterSubtitle>

      <SectionTitle>Mô Tả Môn Học</SectionTitle>
      <Paragraph>
        Trong chuyên đề pha chế đồ uống, ngoài việc pha chế đồ uống có cồn (Cocktail), đồ uống không cồn (Mocktail) thì còn một mảng pha chế về cà phê (Barista) cũng rất thú vị. Môn học giúp sinh viên biết cách chiết xuất cà phê <strong>espresso</strong> (cà phê đậm đặc), <strong>cappuccino</strong> (cà phê sữa Ý)... Bên cạnh đó, giúp sinh viên biết cách đánh sữa, vẽ <strong>Latte Art</strong> (nghệ thuật vẽ hình trên cà phê) trên tách cà phê, phân biệt các loại hạt cà phê...
      </Paragraph>

      <SectionTitle>Nội Dung Môn Học</SectionTitle>
      <StyledList items={[
        "Bài 1. Nguồn gốc cà phê, các loại hạt cà phê.",
        "Bài 2: Chiết xuất cà phê <strong>espresso</strong> (cà phê đậm đặc).",
        "Bài 3: Thao tác đánh sữa tạo <strong>microfoam</strong> (bọt sữa mịn).",
        "Bài 4: <strong>Latte Art</strong> (nghệ thuật vẽ hình) hình trái tim trên ly <strong>cappuccino</strong> (cà phê sữa Ý).",
        "Bài 5: <strong>Latte Art</strong> (nghệ thuật vẽ hình) hình chiếc lá trên ly <strong>cappuccino</strong> (cà phê sữa Ý)."
      ]} />

      <SectionTitle>Yêu Cầu Môn Học</SectionTitle>
      <Paragraph>
        Người học phải dự học và thực hành đầy đủ các buổi lên lớp và luyện tập ở nhà.
      </Paragraph>

      <SectionTitle>Phương Pháp Đánh Giá Môn Học</SectionTitle>
      <Paragraph>Môn học được đánh giá gồm:</Paragraph>
      <StyledList items={[
        "Chuyên cần, hoạt động trên lớp: 20%",
        "Kiểm tra thường xuyên: 30%",
        "Bài thi thực hành cá nhân: 50%"
      ]} />
    </div>
  );
};

export default Introduction;
