import React, { useState, useEffect } from 'react';

interface LatteArtSimulatorProps {
  isDarkMode?: boolean;
}

const LatteArtSimulator: React.FC<LatteArtSimulatorProps> = ({ isDarkMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [pourProgress, setPourProgress] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState<'heart' | 'rosetta' | 'tulip'>('heart');
  const [showInstructions, setShowInstructions] = useState(true);

  const techniques = {
    heart: {
      name: 'Trái Tim',
      steps: [
        'Nghiêng tách cà phê về phía ca sữa',
        'Rót sữa cao để tạo nền',
        'Hạ thấp ca sữa và rót vào giữa tách',
        'Kéo đường thẳng qua tâm để tạo trái tim'
      ],
      timing: [0, 2000, 4000, 6000]
    },
    rosetta: {
      name: 'Rosetta',
      steps: [
        'Rót sữa cao tạo nền',
        'Hạ thấp ca sữa và bắt đầu lắc',
        'Di chuyển ca sữa từ sau ra trước',
        'Kéo đường thẳng tạo cuống lá'
      ],
      timing: [0, 2000, 4000, 6000]
    },
    tulip: {
      name: 'Tulip',
      steps: [
        'Tạo vòng tròn đầu tiên ở giữa',
        'Tạo vòng tròn thứ hai phía trước',
        'Tiếp tục tạo các vòng tròn nhỏ hơn',
        'Kéo đường thẳng tạo thân hoa'
      ],
      timing: [0, 1500, 3000, 4500, 6000]
    }
  };

  const startPouring = () => {
    setIsPouring(true);
    setCurrentStep(0);
    setPourProgress(0);
  };

  const stopPouring = () => {
    setIsPouring(false);
    setCurrentStep(0);
    setPourProgress(0);
  };

  useEffect(() => {
    if (isPouring) {
      const interval = setInterval(() => {
        setPourProgress(prev => {
          if (prev >= 100) {
            setIsPouring(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPouring]);

  useEffect(() => {
    if (isPouring) {
      const technique = techniques[selectedTechnique];
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= technique.steps.length - 1) {
            setIsPouring(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);

      return () => clearInterval(stepInterval);
    }
  }, [isPouring, selectedTechnique]);

  const currentTechnique = techniques[selectedTechnique];

  return (
    <div className={`rounded-xl p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        🎯 Mô Phỏng Thực Hành Latte Art
      </h3>

      {/* Technique Selection */}
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Chọn kỹ thuật:
        </h4>
        <div className="flex flex-wrap gap-2">
          {Object.keys(techniques).map((technique) => (
            <button
              key={technique}
              onClick={() => setSelectedTechnique(technique as keyof typeof techniques)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTechnique === technique
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {techniques[technique as keyof typeof techniques].name}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Area */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Coffee Cup Visualization */}
        <div className="relative">
          <div className={`w-48 h-48 mx-auto rounded-full border-4 ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-amber-600 bg-amber-50'} flex items-center justify-center`}>
            <div className={`w-40 h-40 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-amber-100'} relative overflow-hidden`}>
              {/* Coffee base */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full"></div>
              
              {/* Milk foam simulation */}
              {pourProgress > 20 && (
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(pourProgress * 0.8, 80)}%`,
                    height: `${Math.min(pourProgress * 0.3, 30)}%`,
                    opacity: Math.min(pourProgress / 50, 1)
                  }}
                ></div>
              )}

              {/* Latte art pattern simulation */}
              {pourProgress > 60 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {selectedTechnique === 'heart' && (
                    <div className="text-white text-4xl">❤️</div>
                  )}
                  {selectedTechnique === 'rosetta' && (
                    <div className="text-white text-3xl">🌿</div>
                  )}
                  {selectedTechnique === 'tulip' && (
                    <div className="text-white text-3xl">🌷</div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className={`mt-4 w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-100"
              style={{ width: `${pourProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Hướng dẫn từng bước:
            </h4>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className={`px-3 py-1 text-sm rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {showInstructions ? 'Ẩn' : 'Hiện'}
            </button>
          </div>

          {showInstructions && (
            <div className="space-y-2">
              {currentTechnique.steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg transition-colors ${
                    index === currentStep && isPouring
                      ? 'bg-blue-100 border-l-4 border-blue-500'
                      : index < currentStep
                      ? isDarkMode ? 'bg-green-900/30 border-l-4 border-green-500' : 'bg-green-50 border-l-4 border-green-500'
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                      index === currentStep && isPouring
                        ? 'bg-blue-500 text-white'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-400 text-white'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <span className={`${
                      index === currentStep && isPouring
                        ? 'text-blue-800 font-semibold'
                        : index < currentStep
                        ? isDarkMode ? 'text-green-300' : 'text-green-700'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={startPouring}
          disabled={isPouring}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isPouring
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPouring ? 'Đang thực hiện...' : 'Bắt đầu mô phỏng'}
        </button>
        
        <button
          onClick={stopPouring}
          disabled={!isPouring}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            !isPouring
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Dừng lại
        </button>
      </div>

      {/* Tips */}
      <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          💡 Mẹo thực hành:
        </h4>
        <ul className={`space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
          <li>• Quan sát kỹ từng bước và thời điểm chuyển đổi</li>
          <li>• Luyện tập tư thế cầm ca sữa ổn định</li>
          <li>• Kiểm soát tốc độ rót sữa đều đặn</li>
          <li>• Thực hành với nước trước khi dùng sữa thật</li>
        </ul>
      </div>
    </div>
  );
};

export default LatteArtSimulator;
