import type { LocalizedString } from './types';

export interface FAQItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export const faqData: FAQItem[] = [
  {
    id: 'booking-process',
    question: {
      en: 'How do I book a trip?',
      vi: 'Làm cách nào để đặt một chuyến đi?',
      fr: 'Comment puis-je réserver un voyage ?',
      zh: '我如何预订行程？',
      ja: '旅行を予約するにはどうすればよいですか？'
    },
    answer: {
      en: 'You can book a Small Group or Self-Guided trip directly on our website. For Bespoke Journeys, please fill out our survey form or contact us directly, and one of our travel designers will get in touch with you to start planning.',
      vi: 'Bạn có thể đặt chuyến đi Theo Nhóm Nhỏ hoặc Tự Hướng Dẫn trực tiếp trên trang web của chúng tôi. Đối với Hành Trình Thiết Kế Riêng, vui lòng điền vào biểu mẫu khảo sát của chúng tôi hoặc liên hệ trực tiếp, và một trong những nhà thiết kế du lịch của chúng tôi sẽ liên lạc với bạn để bắt đầu lên kế hoạch.',
      fr: 'Vous pouvez réserver un voyage en petit groupe ou autoguidé directement sur notre site web. Pour les voyages sur mesure, veuillez remplir notre formulaire de sondage ou nous contacter directement, et l\'un de nos concepteurs de voyages vous contactera pour commencer la planification.',
      zh: '您可以在我们的网站上直接预订小团游或自助游。对于定制旅程，请填写我们的调查表或直接与我们联系，我们的旅行设计师之一将与您联系以开始规划。',
      ja: '小グループまたはセルフガイドの旅行は、当社のウェブサイトで直接予約できます。オーダーメイドの旅については、調査フォームにご記入いただくか、直接お問い合わせください。当社の旅行デザイナーが計画を開始するためにご連絡いたします。'
    }
  },
  {
    id: 'customization',
    question: {
      en: 'Can I customize an existing itinerary?',
      vi: 'Tôi có thể tùy chỉnh một lịch trình hiện có không?',
      fr: 'Puis-je personnaliser un itinéraire existant ?',
      zh: '我可以定制现有的行程吗？',
      ja: '既存の旅程をカスタマイズできますか？'
    },
    answer: {
      en: 'Absolutely! All of our trips are fully customizable. If you see a Small Group trip that inspires you but the dates don\'t work, we can create a similar Bespoke Journey just for you. Contact us to discuss your ideas.',
      vi: 'Chắc chắn rồi! Tất cả các chuyến đi của chúng tôi đều có thể tùy chỉnh hoàn toàn. Nếu bạn thấy một chuyến đi Theo Nhóm Nhỏ truyền cảm hứng cho bạn nhưng ngày đi không phù hợp, chúng tôi có thể tạo một Hành Trình Thiết Kế Riêng tương tự chỉ dành cho bạn. Hãy liên hệ với chúng tôi để thảo luận về ý tưởng của bạn.',
      fr: 'Absolument ! Tous nos voyages sont entièrement personnalisables. Si un voyage en petit groupe vous inspire mais que les dates ne vous conviennent pas, nous pouvons créer un voyage sur mesure similaire juste pour vous. Contactez-nous pour discuter de vos idées.',
      zh: '当然可以！我们所有的旅行都是完全可定制的。如果您看到一个让您心动的小团游但日期不合适，我们可以为您创建一个类似的定制旅程。请联系我们讨论您的想法。',
      ja: 'もちろんです！私たちのすべての旅行は完全にカスタマイズ可能です。もし気に入った小グループ旅行の日程が合わない場合は、同様のオーダーメイドの旅をあなただけのために作成できます。アイデアについてご相談ください。'
    }
  },
  {
    id: 'activity-levels',
    question: {
      en: 'What do the activity levels mean?',
      vi: 'Các mức độ hoạt động có ý nghĩa gì?',
      fr: 'Que signifient les niveaux d\'activité ?',
      zh: '活动级别是什么意思？',
      ja: 'アクティビティレベルとは何ですか？'
    },
    answer: {
      en: 'Our activity levels range from 1 (leisurely) to 5 (challenging). Level 1 involves gentle walks and minimal physical exertion, while Level 5 is for experienced adventurers and may include long days of strenuous hiking or biking. You can find the specific level on each tour page.',
      vi: 'Các mức độ hoạt động của chúng tôi từ 1 (thư thái) đến 5 (thử thách). Cấp độ 1 bao gồm các cuộc đi bộ nhẹ nhàng và ít gắng sức thể chất, trong khi Cấp độ 5 dành cho những nhà thám hiểm có kinh nghiệm và có thể bao gồm những ngày dài đi bộ đường dài hoặc đạp xe gắng sức. Bạn có thể tìm thấy mức độ cụ thể trên mỗi trang tour.',
      fr: 'Nos niveaux d\'activité vont de 1 (détendu) à 5 (difficile). Le niveau 1 implique des promenades douces et un effort physique minimal, tandis que le niveau 5 est destiné aux aventuriers expérimentés et peut inclure de longues journées de randonnée ou de vélo intenses. Vous pouvez trouver le niveau spécifique sur chaque page de circuit.',
      zh: '我们的活动级别从1级（悠闲）到5级（挑战性）。1级涉及轻松的散步和最少的体力消耗，而5级则适合经验丰富的冒险家，可能包括长时间的艰苦徒步或骑行。您可以在每个旅行页面上找到具体的级别。',
      ja: '当社のアクティビティレベルは1（ゆったり）から5（挑戦的）まであります。レベル1は穏やかな散歩と最小限の身体的運動を含み、レベル5は経験豊富な冒険家向けで、長時間の激しいハイキングやサイクリングが含まれる場合があります。各ツアーページで具体的なレベルを確認できます。'
    }
  },
  {
    id: 'travel-insurance',
    question: {
      en: 'Is travel insurance required?',
      vi: 'Bảo hiểm du lịch có bắt buộc không?',
      fr: 'L\'assurance voyage est-elle obligatoire ?',
      zh: '旅行保险是强制性的吗？',
      ja: '旅行保険は必須ですか？'
    },
    answer: {
      en: 'Yes, we require all travellers to have comprehensive travel insurance for the duration of their trip. This should cover trip cancellation, medical expenses, evacuation, and baggage loss. Proof of insurance is required before departure.',
      vi: 'Có, chúng tôi yêu cầu tất cả du khách phải có bảo hiểm du lịch toàn diện trong suốt chuyến đi của họ. Bảo hiểm này nên bao gồm việc hủy chuyến, chi phí y tế, sơ tán và mất hành lý. Bằng chứng bảo hiểm được yêu cầu trước khi khởi hành.',
      fr: 'Oui, nous exigeons que tous les voyageurs aient une assurance voyage complète pour la durée de leur séjour. Celle-ci doit couvrir l\'annulation de voyage, les frais médicaux, l\'évacuation et la perte de bagages. Une preuve d\'assurance est requise avant le départ.',
      zh: '是的，我们要求所有旅行者在旅行期间拥有全面的旅行保险。这应包括行程取消、医疗费用、疏散和行李丢失。出发前需要提供保险证明。',
      ja: 'はい、すべての旅行者に旅行期間中の包括的な旅行保険への加入をお願いしています。これには、旅行のキャンセル、医療費、避難、手荷物紛失が含まれている必要があります。出発前に保険の証明が必要です。'
    }
  }
];