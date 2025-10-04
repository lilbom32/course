import React, { useState, useEffect } from 'react';
import { Settings, Clock, Thermometer, Gauge, Play, Pause, RotateCcw, Target } from 'lucide-react';
import { ImageCard } from '../common/Layout';

interface MachineSettings {
  temperature: number;
  pressure: number;
  preInfusionTime: number;
  extractionTime: number;
  flowRate: number;
}

interface ExtractionData {
  time: number;
  pressure: number;
  temperature: number;
  flowRate: number;
  volume: number;
}

const MachineOperation: React.FC = () => {
  const [machineSettings, setMachineSettings] = useState<MachineSettings>({
    temperature: 92,
    pressure: 9,
    preInfusionTime: 3,
    extractionTime: 27,
    flowRate: 2.5
  });

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [extractionData, setExtractionData] = useState<ExtractionData[]>([]);
  const [dialInStep, setDialInStep] = useState(0);
  const [extractionResult, setExtractionResult] = useState<string>('');

  const dialInSteps = [
    {
      title: "Chuẩn bị máy",
      description: "Làm nóng máy, vệ sinh group head",
      duration: 15,
      settings: { temperature: 92, pressure: 9 }
    },
    {
      title: "Pre-infusion",
      description: "Làm ướt puck với áp lực thấp",
      duration: 3,
      settings: { temperature: 92, pressure: 2 }
    },
    {
      title: "Chiết xuất chính",
      description: "Áp lực đầy đủ 9 bar",
      duration: 25,
      settings: { temperature: 92, pressure: 9 }
    },
    {
      title: "Kết thúc",
      description: "Giảm áp lực, vệ sinh group head",
      duration: 2,
      settings: { temperature: 92, pressure: 0 }
    }
  ];

  const temperatureRanges = [
    { min: 88, max: 94, optimal: 92, label: "Espresso" },
    { min: 90, max: 96, optimal: 93, label: "Americano" },
    { min: 85, max: 90, optimal: 87, label: "Lungo" }
  ];

  const pressureProfiles = [
    { name: "Classic", description: "9 bar constant", color: "bg-blue-500" },
    { name: "Pre-infusion", description: "2 bar → 9 bar", color: "bg-green-500" },
    { name: "Ramp down", description: "9 bar → 6 bar", color: "bg-purple-500" },
    { name: "Pressure profiling", description: "Variable pressure", color: "bg-orange-500" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentTime < machineSettings.extractionTime + machineSettings.preInfusionTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          
          // Update extraction data
          const newData: ExtractionData = {
            time: newTime,
            pressure: getCurrentPressure(newTime),
            temperature: machineSettings.temperature + (Math.random() - 0.5) * 2,
            flowRate: getCurrentFlowRate(newTime),
            volume: newTime * machineSettings.flowRate
          };
          
          setExtractionData(prev => [...prev, newData]);
          
          // Check if extraction is complete
          if (newTime >= machineSettings.extractionTime + machineSettings.preInfusionTime) {
            setIsRunning(false);
            evaluateExtraction();
          }
          
          return newTime;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, currentTime, machineSettings]);

  const getCurrentPressure = (time: number) => {
    if (time <= machineSettings.preInfusionTime) {
      return 2; // Pre-infusion pressure
    } else {
      return machineSettings.pressure;
    }
  };

  const getCurrentFlowRate = (time: number) => {
    if (time <= machineSettings.preInfusionTime) {
      return 0.5; // Slow flow during pre-infusion
    } else {
      return machineSettings.flowRate;
    }
  };

  const startExtraction = () => {
    setIsRunning(true);
    setCurrentTime(0);
    setExtractionData([]);
    setExtractionResult('');
  };

  const stopExtraction = () => {
    setIsRunning(false);
    evaluateExtraction();
  };

  const resetExtraction = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setExtractionData([]);
    setExtractionResult('');
  };

  const evaluateExtraction = () => {
    const totalTime = currentTime;
    const totalVolume = currentTime * machineSettings.flowRate;
    const avgPressure = extractionData.reduce((sum, data) => sum + data.pressure, 0) / extractionData.length;
    
    let result = '';
    
    if (totalTime < 20) {
      result = 'Under-extraction: Thời gian quá ngắn, cà phê chua và thiếu body.';
    } else if (totalTime > 35) {
      result = 'Over-extraction: Thời gian quá dài, cà phê đắng và khô.';
    } else if (avgPressure < 7) {
      result = 'Áp lực thấp: Cần kiểm tra máy, có thể bị tắc nghẽn.';
    } else if (avgPressure > 11) {
      result = 'Áp lực cao: Có thể gây channeling, cần kiểm tra grind size.';
    } else {
      result = 'Perfect! Chiết xuất cân bằng với thời gian và áp lực tối ưu.';
    }
    
    setExtractionResult(result);
  };

  const calculateYield = () => {
    return (currentTime * machineSettings.flowRate).toFixed(1);
  };

  const getExtractionPhase = () => {
    if (currentTime <= machineSettings.preInfusionTime) {
      return { phase: "Pre-infusion", color: "bg-blue-500" };
    } else if (currentTime <= machineSettings.extractionTime + machineSettings.preInfusionTime) {
      return { phase: "Extraction", color: "bg-green-500" };
    } else {
      return { phase: "Complete", color: "bg-gray-500" };
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-900">Bài 2.3 - Sử Dụng Máy Café</h1>
        <p className="text-xl text-amber-700">Quy trình vận hành máy espresso chuyên nghiệp</p>
      </div>

      {/* Espresso Extraction Images */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">☕ Hình Ảnh Chiết Xuất Espresso</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1754976934/pplx_project_search_images/f5f44f85f0e4f47eec1207c3c1e319fc73f9ba87.png"
            alt="Close-up of espresso flowing from a commercial espresso machine into a cup, highlighting the crema extraction"
            caption="Hình 2.6: Chiết xuất espresso hoàn hảo với crema vàng óng chảy vào cốc trắng"
          />
          <ImageCard
            src="https://i0.wp.com/www.cirellicoffee.com.au/wp-content/uploads/2019/10/AGTGP_Cirellli_Jack_Fenby_DSC_9512-scaled.jpg?fit=2560%2C1709&ssl=1"
            alt="Espresso extraction pouring into two branded cups from a commercial espresso machine"
            caption="Hình 2.7: Chiết xuất double shot từ máy espresso thương mại"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-md">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1759573785/pplx_project_search_images/7071e3c5f538e94448d532cdbb154bb3ad08c8eb.png"
              alt="Close-up of an espresso machine showing uneven coffee extraction and channeling during brewing"
              caption="Hình 2.8: Vấn đề channeling - chiết xuất không đều cần khắc phục"
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Hướng Dẫn: Cách Vận Hành Máy Espresso</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/7GaB72fbQ8I"
            title="How To Operate An Espresso Machine"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-amber-50 rounded-lg p-4">
          <h4 className="font-semibold text-amber-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-amber-800 text-sm space-y-1">
            <li>• <strong>Khởi động máy:</strong> Làm nóng máy 15-20 phút trước khi sử dụng</li>
            <li>• <strong>Vệ sinh group head:</strong> Rửa sạch group head và portafilter trước mỗi shot</li>
            <li>• <strong>Chuẩn bị shot:</strong> Xay cà phê, tamp đều, lắp portafilter vào máy</li>
            <li>• <strong>Chiết xuất:</strong> Bấm nút, đợi 25-30 giây, dừng khi đạt 30ml</li>
            <li>• <strong>Vệ sinh sau khi dùng:</strong> Rửa portafilter, vệ sinh group head</li>
          </ul>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Thông Số Kỹ Thuật
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-900">88-94°C</div>
            <div className="text-amber-700">Nhiệt độ nước</div>
            <div className="text-sm text-amber-600">Tối ưu: 92°C</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-900">9 bar</div>
            <div className="text-amber-700">Áp lực chiết xuất</div>
            <div className="text-sm text-amber-600">±0.5 bar</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-900">25-30s</div>
            <div className="text-amber-700">Thời gian chiết xuất</div>
            <div className="text-sm text-amber-600">Tối ưu: 27s</div>
          </div>
        </div>
      </div>

      {/* Machine Control Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Bảng Điều Khiển Máy
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-800">Cài Đặt Máy</h3>
            
            {/* Temperature Control */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Nhiệt Độ (°C)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="85"
                  max="98"
                  value={machineSettings.temperature}
                  onChange={(e) => setMachineSettings(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono text-amber-900">
                  {machineSettings.temperature}°C
                </span>
              </div>
              <div className="text-xs text-amber-600">
                Tối ưu: 88-94°C cho espresso
              </div>
            </div>

            {/* Pressure Control */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Áp Lực (bar)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="6"
                  max="12"
                  step="0.5"
                  value={machineSettings.pressure}
                  onChange={(e) => setMachineSettings(prev => ({ ...prev, pressure: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono text-amber-900">
                  {machineSettings.pressure} bar
                </span>
              </div>
              <div className="text-xs text-amber-600">
                Chuẩn: 9 bar cho espresso
              </div>
            </div>

            {/* Pre-infusion Control */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Pre-infusion (s)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={machineSettings.preInfusionTime}
                  onChange={(e) => setMachineSettings(prev => ({ ...prev, preInfusionTime: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono text-amber-900">
                  {machineSettings.preInfusionTime}s
                </span>
              </div>
              <div className="text-xs text-amber-600">
                Làm ướt puck trước khi chiết xuất
              </div>
            </div>

            {/* Flow Rate Control */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-700">Tốc Độ Dòng (ml/s)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={machineSettings.flowRate}
                  onChange={(e) => setMachineSettings(prev => ({ ...prev, flowRate: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono text-amber-900">
                  {machineSettings.flowRate} ml/s
                </span>
              </div>
              <div className="text-xs text-amber-600">
                Tối ưu: 2-3 ml/s
              </div>
            </div>
          </div>

          {/* Real-time Display */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-800">Hiển Thị Thời Gian Thực</h3>
            
            {/* Extraction Timer */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - currentTime / (machineSettings.extractionTime + machineSettings.preInfusionTime))}`}
                  className="transition-all duration-100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900">
                    {currentTime.toFixed(1)}
                  </div>
                  <div className="text-sm text-amber-600">seconds</div>
                </div>
              </div>
            </div>

            {/* Current Phase */}
            <div className="text-center">
              {(() => {
                const phase = getExtractionPhase();
                return (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${phase.color} text-white`}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span className="font-semibold">{phase.phase}</span>
                  </div>
                );
              })()}
            </div>

            {/* Current Values */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-amber-900">
                  {extractionData.length > 0 ? extractionData[extractionData.length - 1]?.pressure.toFixed(1) : '0.0'} bar
                </div>
                <div className="text-xs text-amber-600">Áp lực</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-amber-900">
                  {extractionData.length > 0 ? extractionData[extractionData.length - 1]?.temperature.toFixed(1) : '0.0'}°C
                </div>
                <div className="text-xs text-amber-600">Nhiệt độ</div>
              </div>
            </div>

            {/* Yield Display */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 text-center">
              <div className="text-sm text-amber-600 mb-1">Yield hiện tại</div>
              <div className="text-2xl font-bold text-amber-900">
                {calculateYield()} ml
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={startExtraction}
          disabled={isRunning}
          className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            isRunning
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Đang chạy...' : 'Bắt đầu chiết xuất'}
        </button>
        
        <button
          onClick={stopExtraction}
          disabled={!isRunning}
          className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            !isRunning
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          <Pause className="w-5 h-5" />
          Dừng
        </button>
        
        <button
          onClick={resetExtraction}
          className="px-8 py-3 rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Extraction Result */}
      {extractionResult && (
        <div className={`p-4 rounded-lg ${
          extractionResult.includes('Perfect') 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className={`font-semibold ${
            extractionResult.includes('Perfect') ? 'text-green-800' : 'text-red-800'
          }`}>
            {extractionResult}
          </div>
        </div>
      )}

      {/* Dialing In Process */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Quy Trình "Dialing In"
        </h2>
        
        <div className="space-y-4">
          {dialInSteps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all ${
                dialInStep >= index
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-amber-800">{step.title}</h3>
                  <p className="text-amber-600">{step.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-amber-600">{step.duration}s</div>
                  <div className="text-xs text-amber-500">
                    {step.settings.temperature}°C, {step.settings.pressure} bar
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature Ranges Reference */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Thermometer className="w-6 h-6" />
          Nhiệt Độ Cho Từng Loại Café
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {temperatureRanges.map((range, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-2">{range.label}</h3>
              <div className="space-y-1 text-sm text-amber-700">
                <div>Min: {range.min}°C</div>
                <div>Max: {range.max}°C</div>
                <div className="font-semibold text-amber-900">Tối ưu: {range.optimal}°C</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pressure Profiles */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Gauge className="w-6 h-6" />
          Các Profile Áp Lực
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pressureProfiles.map((profile, index) => (
            <div key={index} className="p-4 rounded-lg border border-gray-200">
              <div className={`w-4 h-4 rounded-full ${profile.color} mb-2`}></div>
              <h3 className="font-semibold text-amber-800 mb-1">{profile.name}</h3>
              <p className="text-sm text-amber-600">{profile.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Bảo Trì & Vệ Sinh</h2>
        
        {/* Maintenance Video */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📹 Video Hướng Dẫn: Bảo Trì Máy Espresso</h3>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Bl7kuC1IQ-g"
              title="The Beginner's Guide to Coffee Machine Maintenance"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="bg-blue-100 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📝 Tóm Tắt Video:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>Vệ sinh hàng ngày:</strong> Rửa group head, portafilter, và vòi steam</li>
              <li>• <strong>Backflush:</strong> Sử dụng nước sạch và detergent để làm sạch bên trong</li>
              <li>• <strong>Descaling:</strong> Khử cặn định kỳ để tránh tắc nghẽn</li>
              <li>• <strong>Kiểm tra gasket:</strong> Thay thế gasket khi bị mòn hoặc rách</li>
              <li>• <strong>Bảo trì định kỳ:</strong> Kiểm tra áp lực, nhiệt độ, và các bộ phận khác</li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Hàng Ngày</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Vệ sinh group head sau mỗi shot</li>
              <li>• Backflush với nước sạch</li>
              <li>• Kiểm tra nhiệt độ và áp lực</li>
              <li>• Làm sạch portafilter và basket</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Định Kỳ</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Backflush với detergent (hàng tuần)</li>
              <li>• Descaling (hàng tháng)</li>
              <li>• Kiểm tra gasket và shower screen</li>
              <li>• Calibration nhiệt độ và áp lực</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineOperation;
