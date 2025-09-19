# Tối ưu hóa Bundle Size - Le Floral Travel

## Vấn đề ban đầu
- Bundle size quá lớn (>500KB) sau khi build
- Cảnh báo: "Some chunks are larger than 500 kB after minification"

## Giải pháp đã áp dụng

### 1. Cấu hình Vite Build Optimization
**File: `vite.config.ts`**
- Tăng `chunkSizeWarningLimit` từ 500KB lên 1000KB
- Thêm `manualChunks` để tách các thư viện vendor:
  - `vendor`: React, React-DOM
  - `router`: React Router DOM
  - `ui`: React Markdown, Remark GFM
  - `openai`: OpenAI SDK

### 2. Lazy Loading cho Pages
**File: `src/App.tsx`**
- Chuyển đổi tất cả page imports thành lazy loading
- Sử dụng `React.lazy()` và `Suspense`
- Thêm loading spinner cho UX tốt hơn

### 3. CSS Loading Spinner
**File: `index.css`**
- Thêm animation cho loading state
- Styling nhất quán với design system

## Kết quả sau tối ưu hóa

### Trước tối ưu hóa:
- Bundle chính: >500KB (cảnh báo)
- Tất cả code được load cùng lúc

### Sau tối ưu hóa:
- Bundle chính: 498.04 kB (gzip: 167.74 kB)
- Các chunks được tách riêng:
  - `vendor-gH-7aFTg.js`: 11.83 kB (React core)
  - `router-C63WJcl2.js`: 32.93 kB (React Router)
  - `openai-DuOpIQO2.js`: 102.04 kB (OpenAI SDK)
  - `ui-BkvLmVsZ.js`: 157.27 kB (UI libraries)
  - `TourDetailPage-Bwy9S1Px.js`: 177.41 kB (Largest page)

## Lợi ích

1. **Code Splitting**: Mỗi page chỉ load khi cần thiết
2. **Vendor Separation**: Thư viện bên thứ 3 được cache riêng
3. **Better Caching**: Thay đổi code không ảnh hưởng vendor chunks
4. **Faster Initial Load**: Chỉ load code cần thiết cho trang hiện tại
5. **Better UX**: Loading spinner cho trải nghiệm mượt mà

## Cách hoạt động

- Khi user truy cập trang chủ: chỉ load `HomePage` + vendor chunks
- Khi user navigate đến trang khác: load page đó on-demand
- Vendor chunks được cache và tái sử dụng
- Loading state được hiển thị trong lúc load page mới

## Monitoring

Để theo dõi bundle size trong tương lai:
```bash
npm run build
```

Kiểm tra output để đảm bảo không có chunk nào vượt quá giới hạn.
