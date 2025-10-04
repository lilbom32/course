import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wrench, CheckCircle, XCircle, Lightbulb, Search, RotateCcw } from 'lucide-react';
import { ImageCard } from '../common/Layout';

interface Problem {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  solutions: string[];
  severity: 'low' | 'medium' | 'high';
  category: 'grinding' | 'tamping' | 'machine' | 'extraction' | 'crema';
}

interface DiagnosticResult {
  problem: Problem;
  confidence: number;
  recommendedSolutions: string[];
}

const Troubleshooting: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [troubleshootingHistory, setTroubleshootingHistory] = useState<DiagnosticResult[]>([]);

  const problems: Problem[] = [
    {
      id: 'channeling',
      name: 'Channeling',
      description: 'Nước chảy qua khe hở trong puck thay vì qua toàn bộ cà phê',
      symptoms: ['Crema không đều', 'Extraction quá nhanh', 'Vị chua và đắng', 'Puck có lỗ hổng'],
      causes: ['Grind quá mịn', 'Tamping không đều', 'Dose không đủ', 'Puck bị nứt'],
      solutions: ['Tăng grind size', 'Tamp đều hơn', 'Tăng dose', 'Kiểm tra puck'],
      severity: 'high',
      category: 'extraction'
    },
    {
      id: 'under_extraction',
      name: 'Under-extraction',
      description: 'Cà phê chưa được chiết xuất đủ, thiếu hương vị',
      symptoms: ['Vị chua', 'Thiếu body', 'Extraction quá nhanh', 'Crema mỏng'],
      causes: ['Grind quá thô', 'Dose quá ít', 'Nhiệt độ thấp', 'Thời gian ngắn'],
      solutions: ['Giảm grind size', 'Tăng dose', 'Tăng nhiệt độ', 'Tăng thời gian'],
      severity: 'medium',
      category: 'extraction'
    },
    {
      id: 'over_extraction',
      name: 'Over-extraction',
      description: 'Cà phê được chiết xuất quá mức, vị đắng và khô',
      symptoms: ['Vị đắng', 'Khô miệng', 'Extraction quá chậm', 'Crema đậm'],
      causes: ['Grind quá mịn', 'Dose quá nhiều', 'Nhiệt độ cao', 'Thời gian dài'],
      solutions: ['Tăng grind size', 'Giảm dose', 'Giảm nhiệt độ', 'Giảm thời gian'],
      severity: 'medium',
      category: 'extraction'
    },
    {
      id: 'no_crema',
      name: 'Không có Crema',
      description: 'Espresso không tạo ra crema hoặc crema rất ít',
      symptoms: ['Không có bọt', 'Cà phê phẳng', 'Thiếu hương thơm', 'Vị nhạt'],
      causes: ['Cà phê cũ', 'Grind quá thô', 'Áp lực thấp', 'Nhiệt độ thấp'],
      solutions: ['Dùng cà phê mới', 'Giảm grind size', 'Kiểm tra áp lực', 'Tăng nhiệt độ'],
      severity: 'high',
      category: 'crema'
    },
    {
      id: 'bitter_taste',
      name: 'Vị Đắng',
      description: 'Espresso có vị đắng quá mức, không cân bằng',
      symptoms: ['Vị đắng mạnh', 'Khô miệng', 'Crema đậm', 'Hương vị không hài hòa'],
      causes: ['Over-extraction', 'Nhiệt độ quá cao', 'Cà phê bị cháy', 'Grind quá mịn'],
      solutions: ['Giảm thời gian extraction', 'Giảm nhiệt độ', 'Kiểm tra cà phê', 'Tăng grind size'],
      severity: 'medium',
      category: 'extraction'
    },
    {
      id: 'sour_taste',
      name: 'Vị Chua',
      description: 'Espresso có vị chua quá mức, thiếu sweetness',
      symptoms: ['Vị chua mạnh', 'Thiếu body', 'Extraction nhanh', 'Crema mỏng'],
      causes: ['Under-extraction', 'Nhiệt độ thấp', 'Grind quá thô', 'Dose ít'],
      solutions: ['Tăng thời gian extraction', 'Tăng nhiệt độ', 'Giảm grind size', 'Tăng dose'],
      severity: 'medium',
      category: 'extraction'
    },
    {
      id: 'inconsistent_grind',
      name: 'Grind Không Đều',
      description: 'Kích thước hạt cà phê không đồng đều',
      symptoms: ['Extraction không đều', 'Crema không đều', 'Vị không ổn định', 'Channeling'],
      causes: ['Máy xay cũ', 'Lưỡi xay mòn', 'Điều chỉnh không chính xác', 'Cà phê không đều'],
      solutions: ['Thay lưỡi xay', 'Calibration máy xay', 'Làm sạch máy xay', 'Kiểm tra cà phê'],
      severity: 'high',
      category: 'grinding'
    },
    {
      id: 'tamping_issues',
      name: 'Vấn Đề Tamping',
      description: 'Tamping không đúng kỹ thuật gây ra các vấn đề extraction',
      symptoms: ['Puck không đều', 'Channeling', 'Extraction không đều', 'Crema không đều'],
      causes: ['Áp lực không đều', 'Góc độ sai', 'Tamp nhiều lần', 'Puck bị nứt'],
      solutions: ['Tamp đều hơn', 'Giữ góc độ thẳng', 'Tamp một lần', 'Kiểm tra puck'],
      severity: 'medium',
      category: 'tamping'
    },
    {
      id: 'machine_pressure',
      name: 'Áp Lực Máy Thấp',
      description: 'Máy espresso không đạt được áp lực cần thiết',
      symptoms: ['Extraction chậm', 'Crema ít', 'Vị nhạt', 'Nước chảy yếu'],
      causes: ['Máy chưa nóng', 'Tắc nghẽn', 'Gasket cũ', 'Pump yếu'],
      solutions: ['Làm nóng máy', 'Vệ sinh máy', 'Thay gasket', 'Kiểm tra pump'],
      severity: 'high',
      category: 'machine'
    },
    {
      id: 'temperature_issues',
      name: 'Vấn Đề Nhiệt Độ',
      description: 'Nhiệt độ nước không ổn định hoặc không đúng',
      symptoms: ['Extraction không đều', 'Vị không ổn định', 'Crema không đều', 'Thời gian thay đổi'],
      causes: ['Máy chưa nóng', 'Thermostat hỏng', 'Nhiệt độ môi trường', 'Lượng nước không đủ'],
      solutions: ['Làm nóng máy đủ lâu', 'Kiểm tra thermostat', 'Điều chỉnh nhiệt độ', 'Kiểm tra boiler'],
      severity: 'medium',
      category: 'machine'
    }
  ];

  const allSymptoms = Array.from(new Set(problems.flatMap(p => p.symptoms)));

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const runDiagnostic = () => {
    setIsDiagnosing(true);
    setCurrentStep(0);
    
    // Simulate diagnostic process
    const steps = [
      'Phân tích triệu chứng...',
      'So sánh với cơ sở dữ liệu...',
      'Tính toán độ tin cậy...',
      'Đưa ra chẩn đoán...'
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      setCurrentStep(stepIndex);
      stepIndex++;
      
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        performDiagnostic();
        setIsDiagnosing(false);
      }
    }, 1000);
  };

  const performDiagnostic = () => {
    // Find the problem with the most matching symptoms
    let bestMatch: Problem | null = null;
    let maxMatches = 0;
    
    problems.forEach(problem => {
      const matches = problem.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = problem;
      }
    });
    
    if (bestMatch) {
      const confidence = (maxMatches / bestMatch.symptoms.length) * 100;
      const result: DiagnosticResult = {
        problem: bestMatch,
        confidence: Math.round(confidence),
        recommendedSolutions: bestMatch.solutions
      };
      
      setDiagnosticResult(result);
      setTroubleshootingHistory(prev => [...prev, result]);
    } else {
      setDiagnosticResult({
        problem: {
          id: 'unknown',
          name: 'Không xác định được vấn đề',
          description: 'Không thể xác định vấn đề cụ thể từ các triệu chứng',
          symptoms: [],
          causes: [],
          solutions: ['Kiểm tra lại các triệu chứng', 'Thử các giải pháp chung', 'Liên hệ chuyên gia'],
          severity: 'low',
          category: 'extraction'
        },
        confidence: 0,
        recommendedSolutions: ['Kiểm tra lại các triệu chứng', 'Thử các giải pháp chung']
      });
    }
  };

  const resetDiagnostic = () => {
    setSelectedSymptoms([]);
    setDiagnosticResult(null);
    setCurrentStep(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'grinding': return '☕';
      case 'tamping': return '🎯';
      case 'machine': return '⚙️';
      case 'extraction': return '💧';
      case 'crema': return '🥛';
      default: return '❓';
    }
  };

  const diagnosticSteps = [
    'Phân tích triệu chứng...',
    'So sánh với cơ sở dữ liệu...',
    'Tính toán độ tin cậy...',
    'Đưa ra chẩn đoán...'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-900">Bài 2.5 - Xử Lý Sự Cố</h1>
        <p className="text-xl text-amber-700">Nhận biết và khắc phục các vấn đề thường gặp</p>
      </div>

      {/* Troubleshooting Images */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🔧 Hình Ảnh Khắc Phục Sự Cố</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573830/pplx_project_search_images/bbd9863dfe76ef7160a6f0585c92e51d79e73b01.png"
            alt="Extraction wheel infographic explaining espresso taste adjustment by modifying dose, grind size, and water flow for balanced flavor"
            caption="Hình 2.13: Bánh xe chiết xuất - hướng dẫn điều chỉnh vị cà phê"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573830/pplx_project_search_images/c0d11c6ac6494c93f06e2738991deb9013d75e9c.png"
            alt="Diagram illustrating espresso taste issues and adjustments for grind size and yield to fix sour, bitter, watery, or muddy flavors"
            caption="Hình 2.14: Sơ đồ khắc phục vấn đề vị cà phê và điều chỉnh grind size"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-md">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1759573830/pplx_project_search_images/b3da3a6e1e436bac68ae15dc457d0215f85f4673.png"
              alt="Visual guide for troubleshooting espresso shot taste issues with adjustments to extraction and strength"
              caption="Hình 2.15: Hướng dẫn khắc phục vấn đề vị chua, đắng, phẳng, quá mạnh"
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Hướng Dẫn: Khắc Phục Channeling</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/PlXzpfXjMFg"
            title="Espresso Channeling: Why It Happens & How to Fix It!"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• <strong>Channeling là gì:</strong> Nước tìm đường dễ nhất thay vì đi qua toàn bộ cà phê</li>
            <li>• <strong>Triệu chứng:</strong> Crema không đều, extraction quá nhanh, vị chua và đắng</li>
            <li>• <strong>Nguyên nhân chính:</strong> Tamping không đều, grind size không phù hợp, puck bị nứt</li>
            <li>• <strong>Giải pháp:</strong> Tamp đều hơn, điều chỉnh grind size, kiểm tra puck</li>
            <li>• <strong>Phòng ngừa:</strong> Sử dụng WDT tool, tamp một lần, kiểm tra kỹ thuật</li>
          </ul>
        </div>
      </div>

      {/* Diagnostic Tool */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <Search className="w-6 h-6" />
          Công Cụ Chẩn Đoán
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Symptom Selection */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-800">Chọn Triệu Chứng</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {allSymptoms.map((symptom, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSymptoms.includes(symptom)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="mr-3"
                  />
                  <span className="text-amber-700">{symptom}</span>
                </label>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={runDiagnostic}
                disabled={selectedSymptoms.length === 0 || isDiagnosing}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  selectedSymptoms.length === 0 || isDiagnosing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                <Search className="w-5 h-5" />
                {isDiagnosing ? 'Đang chẩn đoán...' : 'Chẩn đoán'}
              </button>
              
              <button
                onClick={resetDiagnostic}
                className="px-6 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Diagnostic Process */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-amber-800">Quá Trình Chẩn Đoán</h3>
            
            {isDiagnosing ? (
              <div className="space-y-4">
                {diagnosticSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      currentStep >= index
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        currentStep > index ? 'bg-green-500' : 
                        currentStep === index ? 'bg-amber-500' : 'bg-gray-300'
                      }`}>
                        {currentStep > index ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-amber-700">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : diagnosticResult ? (
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{getCategoryIcon(diagnosticResult.problem.category)}</div>
                    <div>
                      <h4 className="font-semibold text-amber-800">{diagnosticResult.problem.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(diagnosticResult.problem.severity)}`}></div>
                        <span className="text-sm text-amber-600 capitalize">{diagnosticResult.problem.severity} severity</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-amber-700 text-sm">{diagnosticResult.problem.description}</p>
                  <div className="mt-3">
                    <div className="text-sm text-amber-600 mb-1">Độ tin cậy: {diagnosticResult.confidence}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${diagnosticResult.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-amber-600 py-8">
                Chọn các triệu chứng để bắt đầu chẩn đoán
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Diagnostic Result */}
      {diagnosticResult && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Kết Quả Chẩn Đoán
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Chi Tiết Vấn Đề</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-2">Triệu chứng:</h4>
                    <ul className="space-y-1">
                      {diagnosticResult.problem.symptoms.map((symptom, index) => (
                        <li key={index} className="text-amber-600 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-2">Nguyên nhân có thể:</h4>
                    <ul className="space-y-1">
                      {diagnosticResult.problem.causes.map((cause, index) => (
                        <li key={index} className="text-amber-600 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Giải Pháp Đề Xuất</h3>
                <div className="space-y-3">
                  {diagnosticResult.recommendedSolutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-green-700">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common Problems Reference */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Wrench className="w-6 h-6" />
          Các Vấn Đề Thường Gặp
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.slice(0, 6).map((problem) => (
            <div key={problem.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{getCategoryIcon(problem.category)}</div>
                <div>
                  <h3 className="font-semibold text-amber-800">{problem.name}</h3>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    problem.severity === 'high' ? 'bg-red-100 text-red-700' :
                    problem.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(problem.severity)}`}></div>
                    {problem.severity}
                  </div>
                </div>
              </div>
              <p className="text-sm text-amber-600 mb-3">{problem.description}</p>
              <div className="text-xs text-amber-500">
                {problem.symptoms.length} triệu chứng • {problem.solutions.length} giải pháp
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting History */}
      {troubleshootingHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Lịch Sử Xử Lý Sự Cố</h2>
          <div className="space-y-3">
            {troubleshootingHistory.slice(-5).reverse().map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-amber-600">#{troubleshootingHistory.length - index}</div>
                  <div className="text-amber-900 font-semibold">{result.problem.name}</div>
                  <div className="text-amber-700">
                    {result.confidence}% tin cậy • {result.problem.category}
                  </div>
                </div>
                <div className={`font-bold ${
                  result.confidence >= 80 ? 'text-green-600' :
                  result.confidence >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {result.confidence}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipment & Workspace Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🔧 Thiết Bị & Không Gian Làm Việc</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1757941632/pplx_project_search_images/eb2d456d767ecb5ec727a860c9c6fd0d9fdaebe5.png"
            alt="Comparison of blade grinder and burr grinder showing the difference in coffee grind texture: coarse and uneven versus consistent and uniform"
            caption="Hình 2.16: So sánh máy xay blade vs burr - kết quả xay khác nhau"
          />
          <ImageCard
            src="https://lh3.googleusercontent.com/4xw5mRtNa-mECcDbs2z1Iwq-Gdb1o8bIdk78QD3ICwI2VWgQRmx9JgoJzVF39VWTtBejzI2F7IVATcn6BkqMLZd-T4ATT6M8C9dzvBLW8Op_I7VOs4LKbqq_kSmtNutYYFGNpgA2q41pFzWojU30wVVI8mEuZYKl38kN_fWVAe3TlP4XbuZhLtqvgFT1dTMsKFjdvBnn-psE1y3QheWSPezH5W1xxhwVRz1Hx_Y_c_cv9A1aiM8W3xHk_1aHxuYapW5asyXpM4eVPODenDJXSilEPccbB5GnjlPo0r82Otxg1zVSQX3_6qQLgZhooLPmpT6jmgLFU1gQWI74g7ZCS-NVakMN5jFC6xW7o3nwuOkftrAXmr5VT1IMLy20F6XERL4c9weDatByhdPF5cDtIEA4-79Oxmt8Lrdc5L4IW0J6XohUhaYR1fjrChy5Q6w-n9EHQtALuxsyhslQ8nOyhFUVCplcblYywZv9WHVcKf8h9fX7TAYnfuv90gTlZsxwOMf3WL5m6VC95-bSu2CkrupVyoS3QSQ4dwPIJb8udYgikkdWvGerA_wwG4tzQbiKSzPeWtghO8C3QAc2BO9mDnl0EwQq_FRENbvSsaqDzLrOELfXYXpvDGhxzFqXoU5C5PPzRKAre3UUF92od9ViFLri3FE6Br59s9RPDrtnJ1JsQ9Buh7S74jL-=w843-h632-no"
            alt="Professional barista workspace with espresso machines and coffee grinders on counter"
            caption="Hình 2.17: Không gian làm việc chuyên nghiệp với máy espresso và máy xay"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573785/pplx_project_search_images/4deec8a62f18a847aa8a85720ea605dc01fed87e.png"
            alt="A barista operating a professional espresso machine, illustrating coffee preparation and machine use"
            caption="Hình 2.18: Barista vận hành máy espresso chuyên nghiệp"
          />
          <ImageCard
            src="https://img.youtube.com/vi/eEDkJWzbU20/maxresdefault.jpg"
            alt="Compact espresso bar design illustrating efficient layout in a small space"
            caption="Hình 2.19: Thiết kế quầy espresso compact cho không gian nhỏ"
          />
        </div>
      </div>

      {/* Roasting Science Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🔥 Khoa Học Rang Cà Phê</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1754762827/pplx_project_search_images/5d044e50425747e41fcde02757b9f41311828d06.png"
            alt="Comparison chart of coffee bean roast levels from raw to dark, highlighting differences in color, acidity, flavor, and other attributes"
            caption="Hình 2.20: Biểu đồ so sánh các mức rang từ raw đến dark"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1756365295/pplx_project_search_images/886d5934c77b9662660f3b8e6ef0dbcc0f2d1645.png"
            alt="Coffee roast chart showing different roasting levels, time durations, and flavor profiles from green beans to dark roast"
            caption="Hình 2.21: Biểu đồ rang chi tiết với thời gian và hương vị"
          />
        </div>
      </div>

      {/* Training Environment Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🎓 Môi Trường Đào Tạo</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573830/pplx_project_search_images/53acd1662a8e65074b495abdfeac8f9da528e457.png"
            alt="Hands-on barista training at Galway Barista School with student pouring milk into coffee cups"
            caption="Hình 2.22: Đào tạo barista thực hành tại Galway Barista School"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1759573830/pplx_project_search_images/2b6a2dcf7f29c27661ee9264ddfe7b0c71c7fcaf.png"
            alt="Barista training session showing hands-on coffee making instruction with an espresso machine"
            caption="Hình 2.23: Buổi đào tạo barista với hướng dẫn thực hành làm cà phê"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-md">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1754724832/pplx_project_search_images/7ddc332a4c8162fd23634c993a4ccf89c66349a2.png"
              alt="Barista practicing coffee-making skills during a hands-on training session"
              caption="Hình 2.24: Barista thực hành kỹ năng làm cà phê trong buổi đào tạo"
            />
          </div>
        </div>
      </div>

      {/* Quality Control Images */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">🔍 Kiểm Soát Chất Lượng</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1757636816/pplx_project_search_images/d8a9241c27ba5d4988e5b6c317052141cb2fff02.png"
            alt="Professional coffee cupping setup with cups and coffee sample packets organized for sensory evaluation"
            caption="Hình 2.25: Setup cupping chuyên nghiệp cho đánh giá cảm quan"
          />
          <ImageCard
            src="https://img.youtube.com/vi/VbLIIrhE8ms/maxresdefault.jpg"
            alt="Cleaning and maintenance setup for a Gaggia Classic Pro espresso machine in a demonstration lab"
            caption="Hình 2.26: Setup vệ sinh và bảo trì máy Gaggia Classic Pro"
          />
        </div>
      </div>

      {/* Prevention Tips */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Phòng Ngừa Sự Cố
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">Bảo Trì Thường Xuyên</h3>
            <ul className="space-y-2 text-green-700">
              <li>• Vệ sinh máy hàng ngày</li>
              <li>• Calibration máy xay định kỳ</li>
              <li>• Kiểm tra nhiệt độ và áp lực</li>
              <li>• Thay thế gasket và lưỡi xay</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">Thực Hành Tốt</h3>
            <ul className="space-y-2 text-green-700">
              <li>• Ghi chép các thông số</li>
              <li>• Sử dụng cà phê tươi</li>
              <li>• Tamp đúng kỹ thuật</li>
              <li>• Theo dõi chất lượng liên tục</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooting;
