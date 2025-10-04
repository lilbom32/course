import React, { useState, useEffect } from 'react';
import { Thermometer, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TemperatureState {
  current: number;
  target: number;
  isHeating: boolean;
  timeElapsed: number;
  proteinDenaturation: number;
  quality: 'excellent' | 'good' | 'poor' | 'damaged';
}

const MilkTemperatureSimulator: React.FC = () => {
  const [tempState, setTempState] = useState<TemperatureState>({
    current: 4,
    target: 60,
    isHeating: false,
    timeElapsed: 0,
    proteinDenaturation: 0,
    quality: 'excellent'
  });

  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating && tempState.isHeating) {
      interval = setInterval(() => {
        setTempState(prev => {
          const newTemp = Math.min(prev.current + 0.5, 100);
          const newTime = prev.timeElapsed + 0.1;
          
          // Calculate protein denaturation based on temperature and time
          let denaturation = 0;
          if (newTemp >= 55) {
            denaturation = Math.min(100, ((newTemp - 55) / 15) * 100 + (newTime * 0.1));
          }
          
          // Determine quality based on temperature and denaturation
          let quality: 'excellent' | 'good' | 'poor' | 'damaged' = 'excellent';
          if (newTemp >= 70 || denaturation > 50) {
            quality = 'damaged';
          } else if (newTemp >= 65 || denaturation > 30) {
            quality = 'poor';
          } else if (newTemp >= 60 || denaturation > 15) {
            quality = 'good';
          }

          return {
            ...prev,
            current: newTemp,
            timeElapsed: newTime,
            proteinDenaturation: denaturation,
            quality
          };
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isSimulating, tempState.isHeating]);

  const startHeating = () => {
    setIsSimulating(true);
    setTempState(prev => ({ ...prev, isHeating: true, timeElapsed: 0 }));
  };

  const stopHeating = () => {
    setIsSimulating(false);
    setTempState(prev => ({ ...prev, isHeating: false }));
  };

  const reset = () => {
    setIsSimulating(false);
    setTempState({
      current: 4,
      target: 60,
      isHeating: false,
      timeElapsed: 0,
      proteinDenaturation: 0,
      quality: 'excellent'
    });
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'poor': return 'text-yellow-600';
      case 'damaged': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'poor': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'damaged': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <Thermometer className="w-8 h-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-800">Mô Phỏng Nhiệt Độ Sữa</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Temperature Display */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Nhiệt Độ Hiện Tại</h4>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {tempState.current.toFixed(1)}°C
              </div>
              <div className="flex items-center justify-center gap-2">
                {getQualityIcon(tempState.quality)}
                <span className={`font-medium ${getQualityColor(tempState.quality)}`}>
                  {tempState.quality === 'excellent' && 'Tuyệt vời'}
                  {tempState.quality === 'good' && 'Tốt'}
                  {tempState.quality === 'poor' && 'Kém'}
                  {tempState.quality === 'damaged' && 'Hư hỏng'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Thông Số Khoa Học</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Protein biến tính:</span>
                <span className="font-medium">{tempState.proteinDenaturation.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-medium">{tempState.timeElapsed.toFixed(1)}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mục tiêu:</span>
                <span className="font-medium">{tempState.target}°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls and Information */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Điều Khiển</h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={startHeating}
                  disabled={isSimulating}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Bắt đầu gia nhiệt
                </button>
                <button
                  onClick={stopHeating}
                  disabled={!isSimulating}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Dừng
                </button>
              </div>
              <button
                onClick={reset}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Vùng Nhiệt Độ</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600">55-65°C:</span>
                <span>Vùng tối ưu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600">65-70°C:</span>
                <span>Vùng nguy hiểm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">&gt;70°C:</span>
                <span>Vùng hư hỏng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Tiến Trình Gia Nhiệt</h4>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (tempState.current / 100) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0°C</span>
            <span>50°C</span>
            <span>100°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilkTemperatureSimulator;
