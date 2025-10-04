import React, { useState } from 'react';
import { ImageCard } from '../common/Layout';

interface LatteArtComparisonProps {
  isDarkMode?: boolean;
}

const LatteArtComparison: React.FC<LatteArtComparisonProps> = ({ isDarkMode = false }) => {
  const [selectedComparison, setSelectedComparison] = useState<'difficulty' | 'timing' | 'technique'>('difficulty');

  const techniques = [
    {
      name: 'Trái Tim',
      difficulty: 'Dễ',
      difficultyLevel: 1,
      timing: '30-45 giây',
      keyPoints: [
        'Kỹ thuật cơ bản nhất',
        'Tốc độ rót đều đặn',
        'Thời điểm nâng cao ca sữa quan trọng',
        'Phù hợp cho người mới bắt đầu'
      ],
      image: 'https://coffeemerch.co.uk/cdn/shop/articles/Latte_Heart_Large_6ddb1c3b-8477-4f13-be8c-3fbe749c81e2.jpg?v=1681763666',
      description: 'Hình trái tim là kỹ thuật cơ bản nhất trong Latte Art, đòi hỏi sự kiểm soát tốc độ rót và thời điểm chuyển đổi.'
    },
    {
      name: 'Rosetta',
      difficulty: 'Trung bình',
      difficultyLevel: 2,
      timing: '45-60 giây',
      keyPoints: [
        'Cần kỹ năng lắc cổ tay',
        'Kiểm soát di chuyển ca sữa',
        'Tạo được nhiều lớp lá',
        'Đòi hỏi luyện tập nhiều'
      ],
      image: 'https://bazancoffee.com/cdn/shop/articles/traditional-rosetta-leaf-pattern-latte-art-photographed-above-vintage-wood-ai-generated-341270804.jpg?v=1748770619',
      description: 'Rosetta yêu cầu kỹ năng lắc cổ tay và kiểm soát di chuyển ca sữa để tạo ra các lớp lá đẹp mắt.'
    },
    {
      name: 'Tulip',
      difficulty: 'Khó',
      difficultyLevel: 3,
      timing: '60-75 giây',
      keyPoints: [
        'Tạo nhiều vòng tròn chồng lên nhau',
        'Kiểm soát kích thước từng vòng',
        'Thời gian thực hiện dài hơn',
        'Cần kinh nghiệm và sự kiên nhẫn'
      ],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDnOwH-8cN75ApIpusMvMS7Fq__EXSA4wSQ&s',
      description: 'Tulip là kỹ thuật nâng cao, đòi hỏi khả năng tạo nhiều vòng tròn có kích thước giảm dần một cách chính xác.'
    },
    {
      name: 'Thiên Nga',
      difficulty: 'Rất khó',
      difficultyLevel: 4,
      timing: '75-90 giây',
      keyPoints: [
        'Kết hợp nhiều kỹ thuật',
        'Tạo hình phức tạp',
        'Cần sự sáng tạo và kiên nhẫn',
        'Dành cho barista chuyên nghiệp'
      ],
      image: 'https://media.istockphoto.com/id/1438597689/vi/anh/thi%E1%BA%BFt-k%E1%BA%BF-thi%C3%AAn-nga-tr%C3%AAn-%C4%91%E1%BB%89nh-c%C3%A0-ph%C3%AA-ngh%E1%BB%87-thu%E1%BA%ADt-latte-trong-t%C3%A1ch-m%C3%A0u-%C4%91en-tr%C3%AAn-b%C3%A0n-g%E1%BB%97-c%C5%A9-v%C3%A0-%C4%91%E1%BA%B9p.jpg?s=612x612&w=0&k=20&c=7k3TteeiByYmuVyh0v8cMW43LTGfQ3FdSaOPeu2kaKo=',
      description: 'Thiên nga là kỹ thuật phức tạp nhất, kết hợp nhiều kỹ năng và đòi hỏi sự sáng tạo cao.'
    }
  ];

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'text-green-600 bg-green-100';
      case 2: return 'text-yellow-600 bg-yellow-100';
      case 3: return 'text-orange-600 bg-orange-100';
      case 4: return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyStars = (level: number) => {
    return '★'.repeat(level) + '☆'.repeat(4 - level);
  };

  const sortTechniques = () => {
    switch (selectedComparison) {
      case 'difficulty':
        return [...techniques].sort((a, b) => a.difficultyLevel - b.difficultyLevel);
      case 'timing':
        return [...techniques].sort((a, b) => {
          const aTime = parseInt(a.timing.split('-')[0]);
          const bTime = parseInt(b.timing.split('-')[0]);
          return aTime - bTime;
        });
      case 'technique':
        return techniques;
      default:
        return techniques;
    }
  };

  return (
    <div className={`rounded-xl p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        📊 So Sánh Các Kỹ Thuật Latte Art
      </h3>

      {/* Comparison Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedComparison('difficulty')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedComparison === 'difficulty'
              ? 'bg-blue-600 text-white'
              : isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Theo độ khó
        </button>
        <button
          onClick={() => setSelectedComparison('timing')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedComparison === 'timing'
              ? 'bg-blue-600 text-white'
              : isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Theo thời gian
        </button>
        <button
          onClick={() => setSelectedComparison('technique')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedComparison === 'technique'
              ? 'bg-blue-600 text-white'
              : isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Theo kỹ thuật
        </button>
      </div>

      {/* Techniques Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortTechniques().map((technique, index) => (
          <div
            key={technique.name}
            className={`rounded-lg p-4 border-2 transition-all hover:shadow-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 hover:border-blue-500'
                : 'bg-gray-50 border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Technique Image */}
            <div className="mb-4">
              <ImageCard
                src={technique.image}
                caption={`${technique.name} - ${technique.difficulty}`}
              />
            </div>

            {/* Technique Info */}
            <div className="space-y-3">
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {technique.name}
              </h4>

              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {technique.description}
              </p>

              {/* Difficulty Rating */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Độ khó:
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(technique.difficultyLevel)}`}>
                    {technique.difficulty}
                  </span>
                  <span className="text-yellow-500 text-sm">
                    {getDifficultyStars(technique.difficultyLevel)}
                  </span>
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Thời gian:
                </span>
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  {technique.timing}
                </span>
              </div>

              {/* Key Points */}
              <div>
                <h5 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Điểm quan trọng:
                </h5>
                <ul className="space-y-1">
                  {technique.keyPoints.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className={`text-xs flex items-start ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <span className="mr-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
        <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          📝 Tóm tắt:
        </h4>
        <div className={`space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
          <p>
            <strong>Người mới bắt đầu:</strong> Nên bắt đầu với kỹ thuật Trái Tim, sau đó chuyển sang Rosetta.
          </p>
          <p>
            <strong>Barista có kinh nghiệm:</strong> Có thể thử Tulip và các kỹ thuật nâng cao khác.
          </p>
          <p>
            <strong>Lưu ý:</strong> Thời gian thực hiện có thể thay đổi tùy theo kinh nghiệm và điều kiện thực tế.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatteArtComparison;
