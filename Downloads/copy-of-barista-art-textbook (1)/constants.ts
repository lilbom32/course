
import type { Chapter } from './types';
import Introduction from './components/chapters/Introduction';
import Chapter1 from './components/chapters/Chapter1';
import Chapter2 from './components/chapters/Chapter2';
import Chapter3 from './components/chapters/Chapter3';
import Chapter4 from './components/chapters/Chapter4';
import Chapter5 from './components/chapters/Chapter5';
import References from './components/chapters/References';

export const chapters: Chapter[] = [
  { id: 'intro', title: 'Hướng Dẫn Môn Học', shortTitle: 'Môn Học', component: Introduction },
  { id: 'ch1', title: 'Bài 1: Nguồn Gốc Cà Phê, Các Loại Hạt Cà Phê', shortTitle: 'Bài 1: Nguồn Gốc', component: Chapter1 },
  { id: 'ch2', title: 'Bài 2: Chiết Xuất <strong>Espresso</strong> (Cà Phê Đậm Đặc)', shortTitle: 'Bài 2: <strong>Espresso</strong>', component: Chapter2 },
  { id: 'ch3', title: 'Bài 3: Đánh Sữa Tạo <strong>Microfoam</strong> (Bọt Sữa Mịn)', shortTitle: 'Bài 3: Đánh Sữa', component: Chapter3 },
  { id: 'ch4', title: 'Bài 4: <strong>Latte Art</strong> (Nghệ Thuật Vẽ Hình Trên Cà Phê)', shortTitle: 'Bài 4: <strong>Latte Art</strong>', component: Chapter4 },
  { id: 'ch5', title: 'Bài 5: <strong>Latte Art</strong> (Nghệ Thuật Vẽ Hình) Trên Tách Cà Phê', shortTitle: 'Bài 5: Vẽ <strong>Latte Art</strong>', component: Chapter5 },
  { id: 'ref', title: 'Tài Liệu Tham Khảo', shortTitle: 'Tham Khảo', component: References },
];
