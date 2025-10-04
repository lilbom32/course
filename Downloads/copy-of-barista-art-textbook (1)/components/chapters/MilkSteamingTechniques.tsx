import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Thermometer, Droplets, Target } from 'lucide-react';

interface SteamingStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  technique: string;
  tips: string[];
  audioCue?: string;
}

const MilkSteamingTechniques: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const steamingSteps: SteamingStep[] = [
    {
      id: 'preparation',
      name: 'Chuẩn Bị',
      description: 'Chuẩn bị dụng cụ và sữa trước khi bắt đầu',
      duration: 5,
      technique: 'Kiểm tra và chuẩn bị',
      tips: [
        'Chọn pitcher phù hợp (600ml cho 1-2 ly)',
        'Đo sữa lạnh (4°C) đúng lượng',
        'Purging steam wand 2-3 giây',
        'Kiểm tra áp suất steam (1-1.2 bar)'
      ]
    },
    {
      id: 'positioning',
      name: 'Định Vị Steam Wand',
      description: 'Đặt steam wand ở vị trí tối ưu trong pitcher',
      duration: 3,
      technique: 'Vị trí chính xác',
      tips: [
        'Steam wand nghiêng 15-20° so với mặt sữa',
        'Đầu wand cách bề mặt sữa 1-2cm',
        'Vị trí 1/3 từ mép pitcher',
        'Tạo góc 45° với trục pitcher'
      ]
    },
    {
      id: 'stretching',
      name: 'Stretching (Tạo Bọt)',
      description: 'Giai đoạn quan trọng nhất để tạo microfoam',
      duration: 8,
      technique: 'Tạo bọt khí siêu nhỏ',
      tips: [
        'Bắt đầu với steam mở 100%',
        'Tạo âm thanh "hôn" nhẹ nhàng',
        'Giữ vị trí wand ổn định',
        'Quan sát sự tăng trưởng của bọt',
        'Dừng khi đạt 30-40% volume'
      ],
      audioCue: 'Tiếng "hôn" nhẹ nhàng, đều đặn'
    },
    {
      id: 'texturing',
      name: 'Texturing (Tạo Vortex)',
      description: 'Tạo chuyển động xoáy để làm mịn bọt khí',
      duration: 12,
      technique: 'Vortex mạnh và ổn định',
      tips: [
        'Đưa wand xuống sâu hơn (2-3cm)',
        'Tạo vortex mạnh, đều đặn',
        'Giữ nhiệt độ tăng dần',
        'Quan sát bề mặt sữa mịn màng',
        'Chuẩn bị dừng khi gần đạt nhiệt độ mục tiêu'
      ],
      audioCue: 'Âm thanh vortex đều đặn, không có tiếng "hôn"'
    },
    {
      id: 'finishing',
      name: 'Hoàn Thành',
      description: 'Dừng steam và đánh giá chất lượng',
      duration: 3,
      technique: 'Dừng chính xác',
      tips: [
        'Dừng steam khi đạt 60-65°C',
        'Purging wand ngay lập tức',
        'Đánh giá texture bằng mắt',
        'Chuẩn bị pour ngay',
        'Không để sữa đứng yên quá lâu'
      ]
    }
  ];

  const totalDuration = steamingSteps.reduce((sum, step) => sum + step.duration, 0);

  const startSteaming = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
  };

  const pauseSteaming = () => {
    setIsPlaying(false);
  };

  const resetSteaming = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const nextStep = () => {
    if (currentStep < steamingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const currentStepData = steamingSteps[currentStep];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200">
      <div className="flex items-center gap-3 mb-6">
        <Droplets className="w-8 h-8 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">Kỹ Thuật Đánh Sữa Từng Bước</h3>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Hướng Dẫn: Bí Quyết Sữa Mịn Màng</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/B9FwiOE4O78"
            title="The Key to Silky Smooth Steamed Milk"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-purple-800 text-sm space-y-1">
            <li>• <strong>Microfoam hoàn hảo:</strong> Bọt khí siêu nhỏ, mịn như kem</li>
            <li>• <strong>Vortex mạnh:</strong> Tạo chuyển động xoáy để làm mịn bọt</li>
            <li>• <strong>Nhiệt độ chính xác:</strong> 60-65°C để giữ được texture tốt</li>
            <li>• <strong>Thời gian tối ưu:</strong> 8-12 giây cho stretching, 12-15 giây cho texturing</li>
            <li>• <strong>Kỹ thuật wand:</strong> Vị trí và góc độ chính xác là chìa khóa</li>
            <li>• <strong>Luyện tập:</strong> Thực hành thường xuyên để phát triển muscle memory</li>
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Step Navigation */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Các Bước Thực Hiện</h4>
            <div className="space-y-2">
              {steamingSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    currentStep === index
                      ? 'bg-purple-200 border-2 border-purple-400'
                      : 'bg-gray-50 border border-gray-200 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep === index
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{step.name}</div>
                      <div className="text-sm text-gray-600">{step.duration}s</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Điều Khiển</h4>
            <div className="flex gap-3">
              <button
                onClick={isPlaying ? pauseSteaming : startSteaming}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Tạm dừng' : 'Bắt đầu'}
              </button>
              <button
                onClick={resetSteaming}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-sm text-gray-600">
                  {isMuted ? 'Âm thanh tắt' : 'Âm thanh bật'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Step Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {currentStep + 1}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">{currentStepData.name}</h4>
                <p className="text-gray-600">{currentStepData.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Kỹ thuật
                </h5>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {currentStepData.technique}
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Mẹo thực hành
                </h5>
                <ul className="space-y-2">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentStepData.audioCue && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Gợi ý âm thanh
                  </h5>
                  <p className="text-blue-700 text-sm">{currentStepData.audioCue}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Tiến Trình</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Bước {currentStep + 1} / {steamingSteps.length}</span>
                <span>{currentStepData.duration}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steamingSteps.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600">
                Tổng thời gian: {totalDuration}s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilkSteamingTechniques;
