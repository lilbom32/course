
import type { LocalizedString } from './types';

export interface Tour {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  imageGradient: string;
}

export const toursData: Tour[] = [
  {
    id: 1,
    title: {
      en: 'Kyoto: A Dialogue with Sakura',
      vi: 'Kyoto: Đối Thoại Cùng Sakura',
      fr: 'Kyoto : Un Dialogue avec les Sakura',
      zh: '京都：与樱的对话',
      ja: '京都：桜との対話'
    },
    description: {
      en: 'More than a trail, this is an invitation to find stillness beneath canopies of pink. A journey of quiet contemplation, connecting with the fleeting, poetic soul of Japan\'s most cherished bloom.',
      vi: 'Không chỉ là một con đường, đây là lời mời tìm về sự tĩnh tại dưới những vòm hoa hồng phấn. Một hành trình chiêm nghiệm, kết nối với linh hồn thơ mộng, chóng tàn của loài hoa được yêu mến nhất Nhật Bản.',
      fr: 'Plus qu\'un sentier, c\'est une invitation à trouver la quiétude sous des dais roses. Un voyage de contemplation silencieuse, en connexion avec l\'âme poétique et éphémère de la fleur la plus chérie du Japon.',
      zh: '这不仅是一条小径，更是一份在粉色华盖下寻找宁静的邀请。一次静谧的沉思之旅，与日本最珍贵花朵那短暂而富有诗意的灵魂相连。',
      ja: 'これは単なる小道ではなく、ピンクの天蓋の下で静けさを見つけるための招待状です。日本の最も愛される花の、はかなく詩的な魂とつながる、静かな思索の旅。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/8d/3d/16/8d3d161015857ec4a4d9b852395dc671.jpg')`
  },
  {
    id: 2,
    title: {
      en: 'Provence: A Symphony in Lavender',
      vi: 'Provence: Bản Giao Hưởng Oải Hương',
      fr: 'Provence : Une Symphonie en Lavande',
      zh: '普罗旺斯：一曲薰衣草交响乐',
      ja: 'プロヴァンス：ラベンダーの交響曲'
    },
    description: {
      en: 'Step into a living painting where endless waves of purple meet the golden sun. This is a sensory journey through the fragrant soul of Provence, guided by the hum of bees and the warmth of the summer air.',
      vi: 'Bước vào một bức tranh sống, nơi những con sóng tím bất tận gặp gỡ ánh mặt trời vàng óng. Đây là một hành trình của các giác quan đi qua linh hồn thơm ngát của Provence, được dẫn lối bởi tiếng ong reo và không khí mùa hè ấm áp.',
      fr: 'Entrez dans un tableau vivant où des vagues infinies de violet rencontrent le soleil doré. C\'est un voyage sensoriel à travers l\'âme parfumée de la Provence, guidé par le bourdonnement des abeilles et la chaleur de l\'air estival.',
      zh: '步入一幅活生生的画卷，无尽的紫色波浪与金色的阳光在此交汇。这是一场穿越普罗旺斯芬芳灵魂的感官之旅，由蜜蜂的嗡鸣与夏日的暖风引领。',
      ja: '果てしない紫の波が黄金の太陽と出会う、生きた絵画の中に足を踏み入れてください。これは、蜂の羽音と夏の空気の暖かさに導かれ、プロヴァンスの香りの魂を巡る感覚の旅です。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/56/ea/d1/56ead10693d6000976638f88ec7ec584.jpg')`
  },
  {
    id: 3,
    title: {
      en: 'Holland: A Painter\'s Palette',
      vi: 'Hà Lan: Bảng Màu Của Họa Sĩ',
      fr: 'Hollande : La Palette d\'un Peintre',
      zh: '荷兰：画家的调色板',
      ja: 'オランダ：画家のパレット'
    },
    description: {
      en: 'Experience the Dutch landscape transformed into a master artist\'s canvas. A journey through geometric fields of vibrant color, where every glance reveals a new, breathtaking composition.',
      vi: 'Trải nghiệm cảnh quan Hà Lan biến thành bức canvas của một nghệ sĩ bậc thầy. Một hành trình qua những cánh đồng hình học rực rỡ sắc màu, nơi mỗi ánh nhìn đều mở ra một bố cục mới, ngoạn mục.',
      fr: 'Découvrez le paysage hollandais transformé en une toile de maître. Un voyage à travers des champs géométriques de couleurs vives, où chaque regard révèle une nouvelle composition à couper le souffle.',
      zh: '体验荷兰风景化身为艺术大师的画布。一场穿越几何色块田野的旅程，每一次凝视都揭示出全新而壮丽的构图。',
      ja: '巨匠のキャンバスに変貌したオランダの風景を体験してください。鮮やかな色彩の幾何学的な畑を巡る旅では、一瞥するごとに新たな息をのむような構図が現れます。'
    },
    imageGradient: `url('https://i.pinimg.com/1200x/2c/8a/90/2c8a90b8c5b6a5402abc2c130324e19d.jpg')`
  },
];
