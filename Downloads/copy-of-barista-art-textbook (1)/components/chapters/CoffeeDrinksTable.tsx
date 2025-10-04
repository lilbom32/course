import React, { useState } from 'react';
import { SubSectionTitle } from '../common/Layout';
import { X, BookOpen } from 'lucide-react';

const drinksData = {
  vietnamese: [
    {
      name: 'Cà Phê Sữa Đá',
      origin: 'Việt Nam',
      description: 'Biểu tượng của cà phê Việt. Cà phê Robusta đậm đặc pha phin, hòa quyện cùng vị ngọt béo của sữa đặc, uống cùng đá.',
      image: 'https://www.cubes-asia.com/storage/blogs/2023/ca-phe-sua-da.jpg',
      recipe: {
        ingredients: ['25g cà phê Robusta xay', '20-30ml sữa đặc', '100g đá viên'],
        instructions: [
          'Cho cà phê vào phin, lắc nhẹ cho phẳng.',
          'Đặt phin lên ly, rót 20ml nước sôi và ủ 2 phút.',
          'Rót thêm 50-60ml nước sôi và đợi cà phê chiết xuất xong.',
          'Cho sữa đặc vào một ly khác, đổ cà phê nóng vào và khuấy đều.',
          'Thêm đá viên và thưởng thức.'
        ]
      }
    },
    {
      name: 'Cà Phê Đen Đá',
      origin: 'Việt Nam',
      description: 'Hương vị cà phê Robusta nguyên bản, đậm đắng, thường được thêm chút đường để cân bằng vị, uống cùng đá.',
      image: 'https://vcdn1-ngoisao.vnecdn.net/2024/08/03/5-4580-1722654873.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=GqX3lIaRR2gpxlh4Jl8X-Q',
      recipe: {
        ingredients: ['25g cà phê Robusta xay', '10g đường (tùy chọn)', '100g đá viên'],
        instructions: [
          'Cho cà phê vào phin, lắc nhẹ cho phẳng.',
          'Đặt phin lên ly, rót 20ml nước sôi và ủ 2 phút.',
          'Rót thêm 50-60ml nước sôi và đợi cà phê chiết xuất xong.',
          'Thêm đường nếu muốn và khuấy đều.',
          'Cho cà phê vào ly đá và thưởng thức.'
        ]
      }
    },
    {
      name: 'Cà Phê Trứng',
      origin: 'Hà Nội, Việt Nam',
      description: 'Đặc sản Hà Nội với lớp kem trứng béo ngậy, mềm mịn như tiramisu phủ trên nền cà phê đen đậm đà.',
      image: 'https://cdn.tcdulichtphcm.vn/upload/4-2024/images/2024-10-10/ca-phe-trung-8-1728553370-656-width1600height1000.jpg',
      recipe: {
        ingredients: ['25g cà phê Robusta xay', '1 lòng đỏ trứng gà tươi', '2 thìa cà phê sữa đặc', 'Một ít mật ong (tùy chọn)'],
        instructions: [
          'Pha một ly cà phê đen bằng phin.',
          'Cho lòng đỏ trứng, sữa đặc, mật ong vào bát nhỏ.',
          'Dùng máy đánh trứng đánh bông hỗn hợp cho đến khi trở thành một lớp kem mịn, có màu vàng nhạt và không còn mùi tanh.',
          'Rót cà phê nóng ra ly, sau đó nhẹ nhàng đổ lớp kem trứng lên trên.',
          'Đặt ly cà phê vào một bát nước nóng để giữ ấm và thưởng thức.'
        ]
      }
    },
    {
      name: 'Bạc Xỉu',
      origin: 'Việt Nam',
      description: 'Bạc xỉu là "ly sữa trắng pha một chút cà phê". Vị sữa ngọt béo là chủ đạo, hòa cùng một chút hương thơm đắng nhẹ của cà phê.',
      image: 'https://thecoffeevys.com/wp-content/uploads/2022/12/Bac-Xiu-Da.jpg',
      recipe: {
        ingredients: ['20ml cà phê phin', '40ml sữa đặc', '60ml sữa tươi không đường', '100g đá viên'],
        instructions: [
          'Cho sữa đặc và sữa tươi vào ly, khuấy đều.',
          'Thêm đá viên vào đầy ly.',
          'Rót từ từ cà phê đã pha phin lên trên cùng để tạo lớp.',
          'Khi uống, khuấy đều và thưởng thức.'
        ]
      }
    },
    {
      name: 'Cà Phê Cốt Dừa',
      origin: 'Việt Nam',
      description: 'Sự kết hợp độc đáo giữa cà phê Việt Nam và nước cốt dừa béo ngậy, được xay mịn cùng đá như một ly sinh tố mát lạnh.',
      image: 'https://lypham.vn/wp-content/uploads/2024/09/ca-phe-cot-dua-da-xay.jpg',
      recipe: {
        ingredients: ['30ml cà phê phin', '60ml nước cốt dừa', '40ml sữa đặc', '100g đá viên'],
        instructions: [
          'Pha một ly cà phê đen bằng phin và để nguội.',
          'Cho cà phê, nước cốt dừa, sữa đặc và đá viên vào máy xay sinh tố.',
          'Xay hỗn hợp cho đến khi mịn và bông lên.',
          'Rót ra ly và thưởng thức ngay.'
        ]
      }
    },
    {
      name: 'Cà Phê Kem Muối',
      origin: 'Việt Nam',
      description: 'Một đặc sản của Huế, cà phê muối là sự pha trộn độc đáo giữa cà phê phin đậm đà và lớp kem sữa có vị mặn nhẹ, tạo nên hương vị cân bằng, lạ miệng.',
      image: 'https://vinbarista.com/uploads/news/cach-lam-ca-phe-muoi-ngon-don-gian-tai-nha-va-de-kinh-doanh-202405271558.jpg',
      recipe: {
        ingredients: ['25g cà phê Robusta', '20ml sữa đặc', '2g muối tinh', '50ml kem béo (whipping cream)'],
        instructions: [
          'Pha cà phê bằng phin.',
          'Trong một bát nhỏ, hòa tan muối với kem béo và sữa đặc, sau đó dùng máy đánh trứng đánh nhẹ hỗn hợp cho bông lên (kem muối).',
          'Cho lớp kem muối vào đáy ly.',
          'Rót từ từ cà phê phin nóng vào.',
          'Thêm đá, khuấy đều và thưởng thức.'
        ]
      }
    }
  ],
  world: [
    {
      name: 'Espresso',
      origin: 'Ý',
      description: 'Nền tảng của hầu hết các loại cà phê Ý. Một lượng nhỏ cà phê đậm đặc được chiết xuất dưới áp suất cao.',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      recipe: {
        ingredients: ['7-9g cà phê Arabica/Robusta xay mịn'],
        instructions: [
          'Nén cà phê xay mịn vào tay cầm (portafilter).',
          'Lắp vào máy pha espresso.',
          'Chiết xuất trong khoảng 25-30 giây để thu được 25-35ml cà phê.',
          'Thưởng thức ngay lập tức.'
        ]
      }
    },
    {
      name: 'Cappuccino',
      origin: 'Ý',
      description: 'Sự cân bằng hoàn hảo giữa espresso, sữa nóng và bọt sữa. Tỷ lệ ba phần thường là bằng nhau.',
      image: 'https://tchibo.us/cdn/shop/articles/cappucino.jpg?v=1690196460&width=1440',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', '120-150ml sữa tươi lạnh'],
        instructions: [
          'Chiết xuất một shot espresso vào ly cappuccino.',
          'Đánh sữa tươi lạnh để tạo ra một lớp bọt sữa dày và mịn (microfoam).',
          'Rót sữa đã đánh vào ly espresso, bắt đầu từ giữa ly để tạo lớp.',
          'Lớp trên cùng là bọt sữa dày khoảng 1-2cm. Có thể rắc thêm bột cacao.'
        ]
      }
    },
    {
      name: 'Caffè Latte',
      origin: 'Ý',
      description: 'Latte có nghĩa là "sữa" trong tiếng Ý. Món này có nhiều sữa nóng hơn cappuccino và chỉ một lớp bọt mỏng trên cùng.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf0RgSexAbiZiUTn5Q5IcdjKTgbmSrGqXpZg&s',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', '180-240ml sữa tươi lạnh'],
        instructions: [
          'Chiết xuất một shot espresso vào một ly lớn.',
          'Đánh sữa tươi để tạo một lớp bọt mỏng trên bề mặt.',
          'Rót sữa nóng vào ly espresso, giữ lại lớp bọt mỏng.',
          'Cuối cùng, rót lớp bọt sữa mỏng lên trên cùng. Thường được phục vụ trong ly thủy tinh cao.'
        ]
      }
    },
    {
      name: 'Macchiato',
      origin: 'Ý',
      description: 'Macchiato có nghĩa là "đánh dấu" hoặc "vệt lốm đốm". Đây là một shot espresso được "đánh dấu" bằng một lượng nhỏ bọt sữa.',
      image: 'https://roastercoffees.com/wp-content/uploads/2021/05/Espresso-Macchiato-Recipe.webp',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', '1-2 thìa cà phê bọt sữa'],
        instructions: [
          'Chiết xuất một shot espresso vào một tách nhỏ.',
          'Dùng thìa múc một lượng nhỏ bọt sữa (không lấy phần sữa lỏng) và đặt nhẹ nhàng lên trên bề mặt espresso.'
        ]
      }
    },
    {
      name: 'Americano',
      origin: 'Mỹ',
      description: 'Được cho là do lính Mỹ ở Ý tạo ra trong Thế chiến II để pha loãng espresso cho giống cà phê quê nhà. Đơn giản là espresso pha với nước nóng.',
      image: 'https://myeverydaytable.com/wp-content/uploads/americano-1024x576.png',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', '90-120ml nước nóng'],
        instructions: [
          'Chiết xuất một shot espresso.',
          'Rót nước nóng vào một chiếc cốc.',
          'Rót shot espresso vào cốc nước nóng. Cách làm này giúp giữ lại lớp crema của espresso.'
        ]
      }
    },
    {
      name: 'Flat White',
      origin: 'Úc / New Zealand',
      description: 'Tương tự như Latte nhưng có lớp bọt sữa (microfoam) mỏng hơn và mịn hơn, làm nổi bật hương vị đậm đà của espresso.',
      image: 'https://www.nescafe.com/vn/sites/default/files/2023-08/Nes_Web3_Article_Header_FlatWhite_1448x1240.png',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', '150ml sữa tươi lạnh'],
        instructions: [
          'Chiết xuất espresso vào ly.',
          'Đánh sữa để tạo ra một lớp microfoam rất mỏng, mịn và mượt, không có bọt khí lớn.',
          'Xoay nhẹ ca đánh sữa để hoà quyện sữa và bọt.',
          'Rót sữa từ từ vào espresso, thường tạo hình nghệ thuật (latte art) trên bề mặt.'
        ]
      }
    },
    {
      name: 'Caffè Mocha',
      origin: 'Ý / Mỹ',
      description: 'Sự kết hợp ngọt ngào giữa espresso, sốt sô cô la và sữa nóng, thường được trang trí bằng kem tươi.',
      image: 'https://athome.starbucks.com/sites/default/files/styles/recipe_banner_xlarge/public/2024-05/CaffeMocha_RecipeHeader_848x539_%402x.jpg.webp?itok=ov3gQo8W',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', '20-30ml sốt sô cô la', '180ml sữa tươi', 'Kem tươi (tùy chọn)'],
        instructions: [
          'Cho sốt sô cô la vào đáy ly.',
          'Chiết xuất espresso trực tiếp vào ly và khuấy đều với sô cô la.',
          'Đánh nóng sữa, tạo một ít bọt.',
          'Rót sữa nóng vào hỗn hợp espresso-sô cô la.',
          'Trang trí với kem tươi và bột cacao nếu muốn.'
        ]
      }
    },
    {
      name: 'Affogato',
      origin: 'Ý',
      description: 'Một món tráng miệng đơn giản mà tinh tế. \'Affogato\' có nghĩa là \'chết đuối\', mô tả viên kem vanilla được \'nhấn chìm\' trong espresso nóng.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDaxPdlBJLGoGxtOXF1TLCBPjys4LLdVix6w&s',
      recipe: {
        ingredients: ['1 viên kem vanilla', '1 shot espresso nóng (30ml)'],
        instructions: [
          'Cho viên kem vanilla vào một ly hoặc bát nhỏ, đã được làm lạnh.',
          'Chiết xuất một shot espresso.',
          'Ngay lập tức rót espresso nóng lên trên viên kem.',
          'Thưởng thức ngay khi kem bắt đầu tan chảy.'
        ]
      }
    },
    {
      name: 'Irish Coffee',
      origin: 'Ireland',
      description: 'Một ly cocktail cà phê kinh điển giúp làm ấm cơ thể, kết hợp vị đắng của cà phê, nồng nàn của rượu whiskey Ireland, ngọt của đường và béo của kem tươi.',
      image: 'https://myradkitchen.com/wp-content/uploads/2024/12/Espresso-Irish-Coffee-Easy-Drinks-Cocktails-My-Rad-Kitchen-0007-RC.jpg',
      recipe: {
        ingredients: ['120ml cà phê nóng (phin hoặc pha máy)', '45ml rượu Irish Whiskey', '2 thìa cà phê đường nâu', 'Kem tươi (heavy cream), đánh nhẹ'],
        instructions: [
          'Làm nóng ly thuỷ tinh bằng cách tráng qua nước sôi.',
          'Cho đường nâu vào ly, sau đó rót rượu whiskey và cà phê nóng vào. Khuấy đều cho đường tan hết.',
          'Nhẹ nhàng rót lớp kem tươi đã đánh nhẹ lên trên bề mặt cà phê qua lưng một chiếc thìa để kem không bị chìm.'
        ]
      }
    },
    {
      name: 'Cold Brew (Cà Phê Ủ Lạnh)',
      origin: 'Quốc tế',
      description: 'Cà phê được ngâm trong nước lạnh từ 12-24 giờ. Quá trình này tạo ra một loại cà phê đậm đặc, ít axit, mượt mà và có vị ngọt tự nhiên.',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      recipe: {
        ingredients: ['100g cà phê xay thô', '1 lít nước lọc'],
        instructions: [
          'Cho cà phê xay thô vào một bình lớn.',
          'Từ từ đổ nước vào, đảm bảo toàn bộ cà phê được ngấm đều.',
          'Đậy nắp và ủ ở nhiệt độ phòng hoặc trong tủ lạnh từ 12 đến 24 giờ.',
          'Sau khi ủ, lọc hỗn hợp qua giấy lọc cà phê hoặc vải lọc mịn để loại bỏ bã.',
          'Pha loãng cà phê cold brew đậm đặc với nước hoặc sữa theo tỷ lệ 1:1 hoặc 1:2 và uống cùng đá.'
        ]
      }
    },
    {
      name: 'Frappé / Cà Phê Đá Xay',
      origin: 'Quốc tế',
      description: 'Một món đồ uống giải khát mát lạnh, nơi cà phê, sữa, đường và đá được xay nhuyễn thành một hỗn hợp mịn như tuyết.',
      image: 'https://cafebarista.ca/cdn/shop/articles/recette-cafe-frappe-a-la-vanille.png?v=1693057528',
      recipe: {
        ingredients: ['1 shot espresso kép (60ml), để nguội', '100ml sữa tươi', '2-3 thìa đường hoặc siro', '1 ly đá viên'],
        instructions: [
          'Cho tất cả các nguyên liệu: espresso, sữa, đường và đá vào máy xay sinh tố.',
          'Xay ở tốc độ cao cho đến khi hỗn hợp mịn và bông xốp.',
          'Rót ra ly cao, có thể trang trí thêm với kem tươi.'
        ]
      }
    },
    {
      name: 'Espresso Con Panna',
      origin: 'Ý',
      description: '\'Espresso với kem\' trong tiếng Ý. Một shot espresso đậm đà được phủ lên trên một lớp kem tươi đánh bông mềm mại.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1pNTokXsAQo6-ZFVLe0828ZHhOyevxl6sw&s',
      recipe: {
        ingredients: ['1 shot espresso (30ml)', 'Kem tươi đánh bông (whipped cream)'],
        instructions: [
          'Chiết xuất một shot espresso vào tách.',
          'Dùng thìa hoặc túi bắt kem, cho một lượng kem tươi vừa đủ lên trên bề mặt espresso.',
          'Thưởng thức sự tương phản giữa vị đắng của cà phê nóng và vị ngọt mát của kem.'
        ]
      }
    },
    {
      name: 'Ristretto',
      origin: 'Ý',
      description: 'Một shot espresso \'rút gọn\' (restricted). Cùng một lượng cà phê nhưng sử dụng một nửa lượng nước, tạo ra một ly cà phê cô đặc, ngọt hơn và ít đắng hơn espresso.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5LzNZeJ7f_KQhN7yKKiBlvtdemKQP6vUGQ&s',
      recipe: {
        ingredients: ['7-9g cà phê xay mịn'],
        instructions: [
          'Chuẩn bị máy pha như một shot espresso thông thường.',
          'Bắt đầu chiết xuất nhưng ngắt dòng chảy sớm hơn, sau khoảng 15-20 giây để thu được 15-20ml cà phê.',
          'Ly ristretto sẽ đậm đặc, có vị ngọt và hương hoa quả nổi bật hơn.'
        ]
      }
    },
    {
      name: 'Lungo',
      origin: 'Ý',
      description: '\'Lungo\' có nghĩa là \'dài\' trong tiếng Ý. Đây là một shot espresso được chiết xuất với lượng nước gấp đôi, tạo ra một ly cà phê loãng hơn và có vị đắng rõ nét hơn.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVJSnz6AueSVFJgI1l3CsmwnRqDVlb2m_cQ&s',
      recipe: {
        ingredients: ['7-9g cà phê xay mịn'],
        instructions: [
          'Chuẩn bị máy pha như một shot espresso thông thường.',
          'Bắt đầu chiết xuất và để dòng chảy kéo dài hơn, khoảng 40-50 giây để thu được 50-60ml cà phê.',
          'Do chiết xuất lâu hơn, Lungo sẽ có nhiều caffeine và vị đắng hơn espresso.'
        ]
      }
    }
  ]
};

type Drink = typeof drinksData.vietnamese[0];

const DrinkCard: React.FC<{ drink: Drink, onSelect: (drink: Drink) => void }> = ({ drink, onSelect }) => (
  <div 
    className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group transform hover:-translate-y-1 transition-transform duration-300"
    onClick={() => onSelect(drink)}
  >
    <img src={drink.image} alt={drink.name} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-4">
      <h4 className="text-xl font-bold text-white">{drink.name}</h4>
      <p className="text-sm text-gray-200">{drink.origin}</p>
    </div>
    <div className="absolute inset-0 bg-sky-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-center text-white">
            <BookOpen size={48} className="mx-auto mb-2" />
            <p className="font-bold text-lg">Xem Công Thức</p>
        </div>
    </div>
  </div>
);

const DrinkRecipeModal: React.FC<{ drink: Drink, onClose: () => void }> = ({ drink, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="relative">
        <img src={drink.image} alt={drink.name} className="w-full h-64 object-cover rounded-t-lg"/>
        <button onClick={onClose} className="absolute top-3 right-3 bg-white/70 rounded-full p-2 text-gray-700 hover:bg-white transition">
          <X size={24} />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-3xl font-bold text-gray-800">{drink.name}</h3>
        <p className="text-md text-gray-500 mb-4">{drink.origin}</p>
        <p className="text-lg text-gray-600 mb-6">{drink.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-700 mb-3 border-b-2 pb-2">Nguyên liệu</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {drink.recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700 mb-3 border-b-2 pb-2">Cách làm</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {drink.recipe.instructions.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `}</style>
  </div>
);


const CoffeeDrinksInteractive: React.FC = () => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  return (
    <div className="my-10 space-y-10">
      <div>
        <SubSectionTitle>Hương Vị Việt Nam</SubSectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {drinksData.vietnamese.map(drink => <DrinkCard key={drink.name} drink={drink} onSelect={setSelectedDrink} />)}
        </div>
      </div>
      <div>
        <SubSectionTitle>Kinh Điển Thế Giới</SubSectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {drinksData.world.map(drink => <DrinkCard key={drink.name} drink={drink} onSelect={setSelectedDrink} />)}
        </div>
      </div>
      {selectedDrink && <DrinkRecipeModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} />}
    </div>
  );
};

export default CoffeeDrinksInteractive;