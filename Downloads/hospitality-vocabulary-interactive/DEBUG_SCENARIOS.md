# 🔍 Hướng dẫn Debug mục Tình huống

## Vấn đề
Mục Tình huống đang bị lỗi hiển thị.

## Các bước kiểm tra

### 1. Mở Browser Console
1. Mở `index.html` trong browser
2. Nhấn `F12` hoặc Right-click → Inspect
3. Click vào tab **Console**

### 2. Click vào mục Tình huống
- Click vào **🎭 Tình huống** trong sidebar
- Xem messages trong console

### 3. Kiểm tra Console Messages

#### ✅ Nếu thấy messages này → Hoạt động đúng:
```
🎭 loadScenarios() called
✓ scenariosByCategory exists with 10 categories
✓ scenarioCategoriesGrid element found
📝 renderScenarioCategories() called
🎨 Rendering 10 categories
🎭 loadScenarios() completed
```

#### ❌ Nếu thấy error này:
```
❌ scenariosByCategory not initialized!
```
**Nguyên nhân**: Data scenarios chưa được load
**Fix**: Kiểm tra constructor có khởi tạo `this.scenariosByCategory` không

#### ❌ Nếu thấy error này:
```
❌ scenarioCategoriesGrid element not found in DOM
```
**Nguyên nhân**: Element HTML không tồn tại
**Fix**: Kiểm tra `index.html` có element `<div id="scenarioCategoriesGrid">`

### 4. Kiểm tra Visual Display

#### Nếu console OK nhưng vẫn không thấy:
1. **Check CSS display**:
   ```javascript
   // Paste vào console:
   const section = document.getElementById('scenarios');
   console.log('Section display:', window.getComputedStyle(section).display);
   console.log('Has active class:', section.classList.contains('active'));
   ```
   
2. **Expected result**:
   - Display: `block` (không phải `none`)
   - Has active class: `true`

3. **Nếu display = 'none'**:
   ```javascript
   // Force show để test:
   section.classList.add('active');
   ```

#### Nếu thấy section nhưng không có categories:
1. **Check container**:
   ```javascript
   const container = document.getElementById('scenarioCategoriesGrid');
   console.log('Container innerHTML:', container.innerHTML);
   console.log('Container children:', container.children.length);
   ```

2. **Expected**: Có ít nhất 10 category cards

## Quick Test File

Tôi đã tạo `test_scenarios_display.html` để test riêng:
1. Mở `test_scenarios_display.html` trong browser
2. Xem status messages
3. Xem categories hiển thị

## Common Issues & Fixes

### Issue 1: scenariosByCategory undefined
**Symptom**: Console error về undefined
**Fix**:
```javascript
// Kiểm tra trong constructor:
this.scenariosByCategory = {
    "Category 1": [...],
    "Category 2": [...]
};
```

### Issue 2: Section không hiển thị
**Symptom**: Console OK nhưng UI trống
**Fix**:
```css
/* Check CSS */
.content-section { display: none; }
.content-section.active { display: block; }
```

### Issue 3: Categories không render
**Symptom**: Container empty
**Fix**: Kiểm tra forEach loop có chạy không
```javascript
Object.entries(this.scenariosByCategory).forEach(([category, scenarios], index) => {
    console.log('Rendering:', category, scenarios.length);
    // ...
});
```

### Issue 4: Click không hoạt động
**Symptom**: Click vào sidebar không phản hồi
**Fix**: Kiểm tra event listener
```javascript
// Check trong setupEventListeners():
document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', (e) => {
        console.log('Nav clicked:', e.target.dataset.section);
        this.handleNavigation(e);
    });
});
```

## Debug Commands (paste vào console)

### 1. Check app instance
```javascript
window.app = new HospitalityApp();
console.log('App:', app);
console.log('Scenarios data:', app.scenariosByCategory);
```

### 2. Force load scenarios
```javascript
app.loadScenarios();
```

### 3. Check DOM elements
```javascript
console.log('Scenarios section:', document.getElementById('scenarios'));
console.log('Categories grid:', document.getElementById('scenarioCategoriesGrid'));
```

### 4. Force show section
```javascript
const section = document.getElementById('scenarios');
section.classList.add('active');
document.querySelectorAll('.content-section').forEach(s => {
    if (s.id !== 'scenarios') s.classList.remove('active');
});
```

### 5. Manual render
```javascript
app.renderScenarioCategories();
```

## Expected Console Output

Khi click vào Tình huống, bạn nên thấy:

```
🎭 loadScenarios() called
✓ scenariosByCategory exists with 10 categories  
✓ scenarioCategoriesGrid element found
📝 renderScenarioCategories() called
🎨 Rendering 10 categories
🎭 loadScenarios() completed
```

Sau đó categories sẽ hiển thị trên màn hình.

## Checklist

- [ ] Console không có errors
- [ ] Thấy logging messages
- [ ] Section #scenarios có class `active`
- [ ] scenarioCategoriesGrid có HTML children
- [ ] Categories cards visible trên UI
- [ ] Hover effects hoạt động
- [ ] Click categories hoạt động

## Nếu vẫn lỗi

Gửi cho tôi:
1. Screenshot console errors
2. Copy console log messages
3. Kết quả của command: 
   ```javascript
   {
     hasSection: !!document.getElementById('scenarios'),
     hasGrid: !!document.getElementById('scenarioCategoriesGrid'),
     hasData: !!app.scenariosByCategory,
     categoriesCount: Object.keys(app.scenariosByCategory || {}).length,
     sectionActive: document.getElementById('scenarios')?.classList.contains('active')
   }
   ```

---

**Created**: October 11, 2025  
**Purpose**: Debug scenarios display issue

