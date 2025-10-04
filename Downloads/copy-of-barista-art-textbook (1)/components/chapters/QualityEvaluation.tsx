import React, { useState, useEffect } from 'react';
import { Star, Award, Eye, Droplets, Clock, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import { ImageCard } from '../common/Layout';

interface SCAScore {
  fragrance: number;
  aroma: number;
  flavor: number;
  aftertaste: number;
  acidity: number;
  body: number;
  balance: number;
  sweetness: number;
  cleanCup: number;
  overall: number;
}

interface CremaEvaluation {
  color: number;
  consistency: number;
  persistence: number;
  thickness: number;
}

const QualityEvaluation: React.FC = () => {
  const [scaScore, setScaScore] = useState<SCAScore>({
    fragrance: 0,
    aroma: 0,
    flavor: 0,
    aftertaste: 0,
    acidity: 0,
    body: 0,
    balance: 0,
    sweetness: 0,
    cleanCup: 0,
    overall: 0
  });

  const [cremaEvaluation, setCremaEvaluation] = useState<CremaEvaluation>({
    color: 0,
    consistency: 0,
    persistence: 0,
    thickness: 0
  });

  const [evaluationHistory, setEvaluationHistory] = useState<SCAScore[]>([]);
  const [currentEvaluation, setCurrentEvaluation] = useState<string>('');

  const scaCriteria = [
    {
      key: 'fragrance',
      name: 'Hương thơm (Fragrance)',
      description: 'Hương thơm từ hạt cà phê xay khô — ngửi trước khi pha để cảm nhận mùi hương tự nhiên',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'aroma',
      name: 'Mùi thơm (Aroma)',
      description: 'Hương thơm tỏa ra khi pha cà phê — thường ngọt ngào và phong phú hơn fragrance',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'flavor',
      name: 'Hương vị (Flavor)',
      description: 'Vị tổng thể khi nếm — tiêu chí quan trọng nhất (chiếm 20% điểm số)',
      range: [0, 10],
      weight: 0.2
    },
    {
      key: 'aftertaste',
      name: 'Dư vị (Aftertaste)',
      description: 'Vị còn lại sau khi nuốt — dư vị ngọt ngào là dấu hiệu tốt',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'acidity',
      name: 'Độ chua (Acidity)',
      description: 'Vị chua tự nhiên, tươi mát — giống vị chua của trái cây chín',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'body',
      name: 'Độ đậm (Body)',
      description: 'Cảm giác đậm đà trong miệng — như độ đặc của sữa nguyên kem',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'balance',
      name: 'Cân bằng (Balance)',
      description: 'Sự hài hòa giữa chua, ngọt, đắng — không có vị nào quá mạnh',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'sweetness',
      name: 'Độ ngọt (Sweetness)',
      description: 'Vị ngọt tự nhiên từ đường trong hạt — không phải đường thêm vào',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'cleanCup',
      name: 'Sạch sẽ (Clean Cup)',
      description: 'Không có vị lạ, vị kim loại, hay vị cháy — vị thuần khiết',
      range: [0, 10],
      weight: 0.1
    },
    {
      key: 'overall',
      name: 'Tổng thể (Overall)',
      description: 'Ấn tượng chung về cà phê — bạn có muốn uống lại không?',
      range: [0, 10],
      weight: 0.1
    }
  ];

  const cremaCriteria = [
    {
      key: 'color',
      name: 'Màu sắc',
      description: 'Màu vàng nâu đậm là lý tưởng — tránh màu quá nhạt (chưa chín) hoặc quá đen (cháy)',
      range: [0, 10]
    },
    {
      key: 'consistency',
      name: 'Độ đồng đều',
      description: 'Bề mặt mịn màng, không có lỗ hổng hay vết nứt — giống kem tươi',
      range: [0, 10]
    },
    {
      key: 'persistence',
      name: 'Độ bền',
      description: 'Crema giữ được ít nhất 2-3 phút — không biến mất ngay sau khi pha',
      range: [0, 10]
    },
    {
      key: 'thickness',
      name: 'Độ dày',
      description: 'Dày khoảng 2-3mm (bằng độ dày thẻ ATM) — không quá mỏng cũng không quá dày',
      range: [0, 10]
    }
  ];

  const qualityLevels = [
    { min: 90, max: 100, label: 'Outstanding', color: 'bg-green-500', description: 'Cà phê xuất sắc' },
    { min: 85, max: 89, label: 'Excellent', color: 'bg-blue-500', description: 'Cà phê tuyệt vời' },
    { min: 80, max: 84, label: 'Very Good', color: 'bg-yellow-500', description: 'Cà phê rất tốt' },
    { min: 70, max: 79, label: 'Good', color: 'bg-orange-500', description: 'Cà phê tốt' },
    { min: 60, max: 69, label: 'Fair', color: 'bg-red-500', description: 'Cà phê khá' },
    { min: 0, max: 59, label: 'Poor', color: 'bg-gray-500', description: 'Cà phê kém' }
  ];

  const handleSCAScoreChange = (key: keyof SCAScore, value: number) => {
    setScaScore(prev => ({ ...prev, [key]: value }));
  };

  const handleCremaScoreChange = (key: keyof CremaEvaluation, value: number) => {
    setCremaEvaluation(prev => ({ ...prev, [key]: value }));
  };

  const calculateTotalScore = () => {
    return scaCriteria.reduce((total, criterion) => {
      return total + (scaScore[criterion.key as keyof SCAScore] * criterion.weight);
    }, 0);
  };

  const calculateCremaScore = () => {
    return Object.values(cremaEvaluation).reduce((total, score) => total + score, 0) / 4;
  };

  const getQualityLevel = (score: number) => {
    return qualityLevels.find(level => score >= level.min && score <= level.max) || qualityLevels[qualityLevels.length - 1];
  };

  const saveEvaluation = () => {
    const newEvaluation = { ...scaScore };
    setEvaluationHistory(prev => [...prev, newEvaluation]);
    setCurrentEvaluation('Đánh giá đã được lưu!');
    setTimeout(() => setCurrentEvaluation(''), 3000);
  };

  const resetEvaluation = () => {
    setScaScore({
      fragrance: 0,
      aroma: 0,
      flavor: 0,
      aftertaste: 0,
      acidity: 0,
      body: 0,
      balance: 0,
      sweetness: 0,
      cleanCup: 0,
      overall: 0
    });
    setCremaEvaluation({
      color: 0,
      consistency: 0,
      persistence: 0,
      thickness: 0
    });
    setCurrentEvaluation('');
  };

  const totalScore = calculateTotalScore();
  const cremaScore = calculateCremaScore();
  const qualityLevel = getQualityLevel(totalScore);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-900">Bài 2.4 - Đánh Giá Chất Lượng</h1>
        <p className="text-xl text-amber-700">Tiêu chuẩn đánh giá crema theo khoa học</p>
      </div>

      {/* Crema Quality Assessment Images */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🥛 Đánh Giá Chất Lượng Crema</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1755422748/pplx_project_search_images/d07c4348928040ac782ae98d5098c0c7f7efdbba.png"
            alt="Two white cups of espresso with golden-brown crema on a dark surface"
            caption="Hình 2.9: Ví dụ crema hoàn hảo với màu nâu vàng đậm"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1755087686/pplx_project_search_images/cd0c0808a768a116e27fbdf3c333b992082b8609.png"
            alt="Labeled layers of a good espresso shot showing crema, body, and heart"
            caption="Hình 2.10: Sơ đồ giải phẫu espresso với các lớp Crema, Body và Heart"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1755660645/pplx_project_search_images/0051bee05b5233fffbeaf921a4916cb1f28cc355.png"
            alt="A freshly brewed espresso shot with a golden-brown crema layer in a glass cup on a wooden surface"
            caption="Hình 2.11: Crema chất lượng cao trong cốc thủy tinh"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1756881838/pplx_project_search_images/fd4cf88393c8d65725c3093ee1f00d518edc9592.png"
            alt="A perfect espresso shot with thick golden-brown crema in a measuring glass on a wooden surface"
            caption="Hình 2.12: Espresso hoàn hảo với crema dày và có vạch đo thể tích"
          />
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Hướng Dẫn: Kỹ Thuật Espresso Tốt Hơn</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/PfTWCcIAg0g"
            title="Better Espresso: The Techniques You Need to Know"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• <strong>Kỹ thuật cơ bản:</strong> Xay đều, tamp đúng, nhiệt độ ổn định</li>
            <li>• <strong>Pre-infusion:</strong> Làm ướt puck trước để tránh channeling</li>
            <li>• <strong>Pressure profiling:</strong> Điều chỉnh áp lực theo từng giai đoạn</li>
            <li>• <strong>Grind consistency:</strong> Sử dụng máy xay chất lượng cao</li>
            <li>• <strong>Water quality:</strong> Nước sạch, không có mùi vị lạ</li>
            <li>• <strong>Practice makes perfect:</strong> Luyện tập thường xuyên để cải thiện</li>
          </ul>
        </div>
      </div>

      {/* SCA Scoring System */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Hệ Thống Chấm Điểm SCA — Hướng Dẫn Cho Người Mới
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">SCA Là Gì?</h3>
            <p className="text-amber-700">
              SCA (Specialty Coffee Association) là tổ chức quốc tế đặt ra tiêu chuẩn đánh giá cà phê. 
              Hệ thống chấm điểm 100 điểm với 10 tiêu chí, giúp bạn đánh giá cà phê một cách khách quan.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-amber-600 mb-2">💡 Mẹo cho người mới:</div>
              <div className="text-amber-800">
                Bắt đầu với 3 tiêu chí chính: <strong>Hương vị</strong>, <strong>Cân bằng</strong>, và <strong>Tổng thể</strong>. 
                Sau đó mở rộng dần các tiêu chí khác.
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">Thang Điểm Dễ Hiểu</h3>
            <div className="space-y-2">
              {qualityLevels.slice(0, 4).map((level, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                  <span className="text-sm text-amber-700">
                    {level.min}-{level.max}: {level.label} ({level.description})
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 mt-4">
              <div className="text-sm text-yellow-800">
                <strong>Lưu ý:</strong> Cà phê trên 80 điểm đã rất tốt, trên 85 điểm là xuất sắc!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beginner Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Mẹo Đánh Giá Cho Người Mới Bắt Đầu
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Cách Đánh Giá Đúng</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• <strong>Bắt đầu từ 5 điểm:</strong> Điểm trung bình, sau đó điều chỉnh lên/xuống</li>
              <li>• <strong>So sánh với cà phê khác:</strong> Đánh giá tương đối dễ hơn tuyệt đối</li>
              <li>• <strong>Ghi chép lại:</strong> Viết cảm nhận để học hỏi từ từ</li>
              <li>• <strong>Luyện tập thường xuyên:</strong> Đánh giá nhiều loại cà phê khác nhau</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">❌ Lỗi Thường Gặp</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• <strong>Đánh giá quá cao/ thấp:</strong> Hãy bắt đầu từ giữa thang điểm</li>
              <li>• <strong>Nhầm lẫn các tiêu chí:</strong> Đọc kỹ mô tả từng tiêu chí</li>
              <li>• <strong>Đánh giá khi cà phê nguội:</strong> Nếm khi cà phê còn ấm (60-70°C)</li>
              <li>• <strong>Bỏ qua dư vị:</strong> Chờ 30 giây sau khi nuốt để đánh giá aftertaste</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SCA Scoring Interface */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <Star className="w-6 h-6" />
          Đánh Giá SCA — Thực Hành
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scoring Panel */}
          <div className="space-y-6">
            {scaCriteria.map((criterion) => (
              <div key={criterion.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-800">{criterion.name}</h3>
                    <p className="text-sm text-amber-600">{criterion.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-amber-900">
                    {scaScore[criterion.key as keyof SCAScore]}
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scaScore[criterion.key as keyof SCAScore]}
                  onChange={(e) => handleSCAScoreChange(criterion.key as keyof SCAScore, Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-amber-500">
                  <span>0 - Rất kém</span>
                  <span>5 - Trung bình</span>
                  <span>10 - Xuất sắc</span>
                </div>
              </div>
            ))}
          </div>

          {/* Score Display */}
          <div className="space-y-6">
            {/* Total Score */}
            <div className="text-center">
              <div className="text-6xl font-bold text-amber-900 mb-2">
                {totalScore.toFixed(1)}
              </div>
              <div className="text-amber-600 mb-4">Điểm tổng SCA</div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${qualityLevel.color} text-white`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="font-semibold">{qualityLevel.label}</span>
              </div>
              <p className="text-sm text-amber-600 mt-2">{qualityLevel.description}</p>
            </div>

            {/* Score Breakdown */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-3">Phân Tích Điểm</h3>
              <div className="space-y-2">
                {scaCriteria.slice(0, 5).map((criterion) => (
                  <div key={criterion.key} className="flex justify-between text-sm">
                    <span className="text-amber-700">{criterion.name}:</span>
                    <span className="font-semibold text-amber-900">
                      {scaScore[criterion.key as keyof SCAScore]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={saveEvaluation}
                className="w-full py-3 rounded-lg font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-all"
              >
                Lưu Đánh Giá
              </button>
              <button
                onClick={resetEvaluation}
                className="w-full py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crema Evaluation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <Droplets className="w-6 h-6" />
          Đánh Giá Crema — Hướng Dẫn Chi Tiết
        </h2>
        
        {/* Crema Introduction */}
        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">🥛 Crema Là Gì?</h3>
          <p className="text-amber-700 mb-3">
            Crema là lớp bọt vàng nâu trên mặt cà phê espresso, được tạo ra từ khí CO₂ và dầu cà phê. 
            Đây là dấu hiệu quan trọng cho thấy chất lượng pha chế và hạt cà phê.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-amber-800">Crema tốt:</strong> Dày, màu đẹp, bền lâu
            </div>
            <div>
              <strong className="text-amber-800">Crema kém:</strong> Mỏng, màu nhạt, biến mất nhanh
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Crema Scoring */}
          <div className="space-y-6">
            {cremaCriteria.map((criterion) => (
              <div key={criterion.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-800">{criterion.name}</h3>
                    <p className="text-sm text-amber-600">{criterion.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-amber-900">
                    {cremaEvaluation[criterion.key as keyof CremaEvaluation]}
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={cremaEvaluation[criterion.key as keyof CremaEvaluation]}
                  onChange={(e) => handleCremaScoreChange(criterion.key as keyof CremaEvaluation, Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-amber-500">
                  <span>0 - Kém</span>
                  <span>5 - Trung bình</span>
                  <span>10 - Tuyệt vời</span>
                </div>
              </div>
            ))}
          </div>

          {/* Crema Score Display */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-900 mb-2">
                {cremaScore.toFixed(1)}
              </div>
              <div className="text-amber-600">Điểm Crema</div>
            </div>

            {/* Crema Quality Indicators */}
            <div className="space-y-3">
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">🎨 Màu Sắc Crema</h3>
                <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-8 h-8 rounded-full ${
                        cremaEvaluation.color >= level * 2 ? 'bg-amber-400' : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-amber-600 space-y-1">
                  <div>1-2: Quá nhạt (hạt chưa chín hoặc pha sai)</div>
                  <div>3-4: Tốt (màu vàng nâu đậm)</div>
                  <div>5: Tuyệt vời (màu nâu đậm, óng ánh)</div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">📏 Độ Dày Crema</h3>
                <div className="space-y-2">
                  <div className="text-sm text-amber-700">
                    {cremaEvaluation.thickness < 4 ? '⚠️ Quá mỏng (dưới 1mm)' : 
                     cremaEvaluation.thickness > 7 ? '⚠️ Quá dày (trên 4mm)' : '✅ Lý tưởng (2-3mm)'}
                  </div>
                  <div className="text-xs text-amber-600">
                    💡 So sánh với độ dày thẻ ATM (0,8mm) để ước lượng
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">🏆 Dấu Hiệu Crema Xuất Sắc</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Màu vàng nâu óng ánh</li>
                  <li>• Bề mặt mịn màng, không có lỗ</li>
                  <li>• Giữ được ít nhất 3 phút</li>
                  <li>• Dày đều khắp bề mặt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensory Evaluation Guide */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Kỹ Thuật Cupping & Sensory Evaluation
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Quy Trình Cupping</h3>
            <ol className="space-y-2 text-amber-700">
              <li>1. Đánh giá fragrance (cà phê xay)</li>
              <li>2. Đánh giá aroma (khi pha)</li>
              <li>3. Nếm và đánh giá flavor</li>
              <li>4. Đánh giá aftertaste</li>
              <li>5. Ghi chép và so sánh</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Lưu Ý Quan Trọng</h3>
            <ul className="space-y-2 text-amber-700">
              <li>• Nhiệt độ nước 93°C</li>
              <li>• Tỷ lệ 1:18.18 (55g/1L)</li>
              <li>• Thời gian 4 phút</li>
              <li>• Nhiệt độ phòng 20-25°C</li>
              <li>• Không có mùi lạ trong phòng</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Evaluation History */}
      {evaluationHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Lịch Sử Đánh Giá</h2>
          <div className="space-y-3">
            {evaluationHistory.slice(-5).reverse().map((evaluation, index) => {
              const totalScore = scaCriteria.reduce((total, criterion) => {
                return total + (evaluation[criterion.key as keyof SCAScore] * criterion.weight);
              }, 0);
              const qualityLevel = getQualityLevel(totalScore);
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-amber-600">#{evaluationHistory.length - index}</div>
                    <div className="text-amber-900 font-semibold">
                      {totalScore.toFixed(1)} điểm
                    </div>
                    <div className="text-amber-700">
                      Flavor: {evaluation.flavor} | Balance: {evaluation.balance}
                    </div>
                  </div>
                  <div className={`font-bold ${qualityLevel.color.replace('bg-', 'text-')}`}>
                    {qualityLevel.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quality Standards */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Tiêu Chuẩn Chất Lượng — Bảng Hướng Dẫn
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Espresso Xuất Sắc</h3>
            <ul className="space-y-2 text-green-700">
              <li>• <strong>Điểm SCA:</strong> 85+ (rất hiếm, chỉ 2-3% cà phê thế giới)</li>
              <li>• <strong>Crema:</strong> Dày 2-3mm, màu vàng nâu đậm</li>
              <li>• <strong>Hương vị:</strong> Cân bằng, không có vị nào quá mạnh</li>
              <li>• <strong>Dư vị:</strong> Ngọt ngào, kéo dài 30+ giây</li>
              <li>• <strong>Độ sạch:</strong> Không có vị lạ, kim loại, hay cháy</li>
            </ul>
            <div className="bg-yellow-50 rounded-lg p-3 mt-3">
              <div className="text-sm text-yellow-800">
                <strong>Mẹo:</strong> Đừng quá kỳ vọng điểm 85+. Điểm 75-80 đã rất tốt!
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">❌ Dấu Hiệu Cần Cải Thiện</h3>
            <ul className="space-y-2 text-green-700">
              <li>• <strong>Crema:</strong> Mỏng hoặc không có (pha quá nhanh/chậm)</li>
              <li>• <strong>Màu sắc:</strong> Không đều, có vết đen (cháy)</li>
              <li>• <strong>Vị đắng:</strong> Quá mạnh, khó chịu (over-extraction)</li>
              <li>• <strong>Thiếu body:</strong> Nhạt nhẽo, không có cảm giác (under-extraction)</li>
              <li>• <strong>Vị lạ:</strong> Kim loại, chua gắt, hay cháy</li>
            </ul>
            <div className="bg-blue-50 rounded-lg p-3 mt-3">
              <div className="text-sm text-blue-800">
                <strong>Lưu ý:</strong> Các lỗi này thường do kỹ thuật pha chế, không phải hạt cà phê xấu.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {currentEvaluation && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {currentEvaluation}
        </div>
      )}
    </div>
  );
};

export default QualityEvaluation;
