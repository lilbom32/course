import React, { useState, useEffect } from 'react';
import { Coffee, Clock, Target, Zap, Thermometer, Play, CheckCircle, XCircle, AlertTriangle, BookOpen, Settings, Award, ChevronRight, RotateCw } from 'lucide-react';
import { ImageCard } from '../common/Layout';

interface GrindSettings {
  size: number;
  extractionTime: number;
  dose: number;
  ratio: number;
  temperature: number;
}

const GrindingTechniques: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'foundation' | 'practice' | 'application' | 'assessment'>('foundation');
  const [grindSettings, setGrindSettings] = useState<GrindSettings>({
    size: 5,
    extractionTime: 27,
    dose: 18,
    ratio: 2,
    temperature: 92
  });

  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [extractionResult, setExtractionResult] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      question: 'Khi cà phê chảy quá nhanh (15 giây), bạn cần làm gì?',
      options: ['Tăng độ mịn (finer grind)', 'Giảm độ mịn (coarser grind)', 'Tăng dose', 'Giảm temperature'],
      correctAnswer: 'Tăng độ mịn (finer grind)',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400',
      explanation: 'Khi cà phê chảy quá nhanh có nghĩa là grind size quá thô. Bạn cần tăng độ mịn (finer grind) để tạo nhiều resistance hơn cho nước chảy qua.'
    },
    {
      question: 'Target extraction time cho espresso chuẩn là?',
      options: ['15-20 giây', '25-30 giây', '35-40 giây', '45-50 giây'],
      correctAnswer: '25-30 giây',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      explanation: 'Espresso chuẩn nên có extraction time từ 25-30 giây để đạt được balance tối ưu giữa acidity, sweetness và bitterness.'
    },
    {
      question: 'Khi cà phê quá chua, vấn đề là gì?',
      options: ['Under-extraction', 'Over-extraction', 'Wrong temperature', 'Wrong dose'],
      correctAnswer: 'Under-extraction',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      explanation: 'Cà phê quá chua thường do under-extraction - grind size quá thô hoặc extraction time quá ngắn, không đủ thời gian để extract các compounds tạo sweetness.'
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    // Automatically show result when answer is selected
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setAssessmentScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAssessmentScore(0);
    setQuizFinished(false);
  };

  const grindSizes = [
    { value: 1, label: 'Rất mịn', description: 'Pha cà phê Thổ Nhĩ Kỳ', color: '#8B4513' },
    { value: 2, label: 'Mịn', description: 'Espresso mịn', color: '#A0522D' },
    { value: 3, label: 'Trung bình-mịn', description: 'Espresso trung bình-mịn', color: '#CD853F' },
    { value: 4, label: 'Trung bình', description: 'Espresso trung bình', color: '#DEB887' },
    { value: 5, label: 'Trung bình-thô', description: 'Espresso trung bình-thô', color: '#F4A460' },
    { value: 6, label: 'Thô', description: 'French press', color: '#D2B48C' },
    { value: 7, label: 'Rất thô', description: 'Cold brew', color: '#BC9A6A' }
  ];

  const extractionTargets = {
    espresso: { time: '25-30s', ratio: '1:2', dose: '18-20g' },
    americano: { time: '20-25s', ratio: '1:3', dose: '18-20g' },
    lungo: { time: '30-35s', ratio: '1:3', dose: '18-20g' }
  };

  const practicalScenarios = [
    {
      title: 'Espresso quá chua và loãng',
      problem: 'Cà phê chảy quá nhanh (15 giây), vị chua gắt',
      solution: 'Tăng độ mịn (finer grind) để tạo nhiều resistance hơn',
      icon: '⚡'
    },
    {
      title: 'Espresso quá đắng và đặc',
      problem: 'Cà phê chảy quá chậm (45 giây), vị đắng khó chịu',
      solution: 'Giảm độ mịn (coarser grind) để giảm resistance',
      icon: '🐌'
    },
    {
      title: 'Espresso có vị chát',
      problem: 'Cà phê có vị chát (astringent), không smooth',
      solution: 'Tăng dose hoặc giảm extraction time để tránh over-extraction',
      icon: '🌿'
    }
  ];

  const renderFoundation = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Kiến thức nền tảng</h2>
        <p className="text-lg text-gray-600">Tại sao việc xay cà phê đúng độ mịn lại quan trọng?</p>
      </div>

      {/* Grind Size Charts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">📊 Biểu Đồ Kích Thước Hạt Cà Phê</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1755355757/pplx_project_search_images/d64e55855270455f929a23c7f9cad1100b973aa2.png"
            alt="Coffee grind size chart comparing grind textures and recommended brewing methods"
            title="Kích thước hạt và phương pháp pha chế"
            description="Mỗi phương pháp pha chế cần độ mịn khác nhau để đạt extraction tối ưu"
          />
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">🎯 Mục tiêu chính</h4>
            <div className="space-y-3">
              {grindSizes.map((size) => (
                <div key={size.value} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: size.color }}
                  ></div>
                  <div>
                    <div className="font-medium text-gray-800">{size.label}</div>
                    <div className="text-sm text-gray-600">{size.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extraction Science */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🔬 Khoa học chiết xuất</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Thời gian</h4>
            <p className="text-sm text-gray-600">Thời gian chiết xuất ảnh hưởng đến balance của các compounds</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Target className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Độ mịn</h4>
            <p className="text-sm text-gray-600">Độ mịn quyết định surface area và resistance cho nước</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <Zap className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Tốc độ</h4>
            <p className="text-sm text-gray-600">Tốc độ chảy ảnh hưởng đến extraction yield</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Thực hành điều chỉnh độ mịn</h2>
        <p className="text-lg text-gray-600">Học cách điều chỉnh độ mịn cà phê để tạo ra ly espresso hoàn hảo</p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-800 text-sm">
            <strong>Mục tiêu:</strong> Điều chỉnh độ mịn để đạt thời gian chiết xuất 25-30 giây với tỷ lệ 1:2
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Thông số mục tiêu cho espresso</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-900">25-30s</div>
            <div className="text-sm text-blue-600">Thời gian chiết xuất</div>
            <div className="text-xs text-blue-500 mt-1">Quá nhanh = quá thô<br/>Quá chậm = quá mịn</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-900">1:2</div>
            <div className="text-sm text-green-600">Tỷ lệ cà phê:nước</div>
            <div className="text-xs text-green-500 mt-1">18g cà phê → 36g espresso</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-900">18-20g</div>
            <div className="text-sm text-purple-600">Lượng cà phê</div>
            <div className="text-xs text-purple-500 mt-1">Dose chuẩn cho portafilter</div>
          </div>
        </div>

        {/* Interactive Grinder */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">⚙️ Điều chỉnh máy xay</h4>
          <p className="text-sm text-gray-600 mb-4">Sử dụng nút bên dưới để điều chỉnh độ mịn. Bắt đầu từ mức 5 (trung bình-thô)</p>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <button 
              onClick={() => setGrindSettings(prev => ({ ...prev, size: Math.max(1, prev.size - 1) }))}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              title="Giảm độ mịn (thô hơn)"
            >
              <Settings className="w-6 h-6 text-gray-600 rotate-180" />
            </button>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{grindSettings.size}</div>
              <div className="text-sm text-gray-600">{grindSizes.find(s => s.value === grindSettings.size)?.label}</div>
              <div className="text-xs text-gray-500 mt-1">
                {grindSettings.size < 4 ? "Quá thô - chiết xuất nhanh" : 
                 grindSettings.size > 6 ? "Quá mịn - chiết xuất chậm" : 
                 "Độ mịn phù hợp"}
              </div>
            </div>
            <button 
              onClick={() => setGrindSettings(prev => ({ ...prev, size: Math.min(7, prev.size + 1) }))}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              title="Tăng độ mịn (mịn hơn)"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-700">
              <strong>Hướng dẫn:</strong> Nếu chiết xuất quá nhanh (&lt;25s), tăng độ mịn. Nếu quá chậm (&gt;30s), giảm độ mịn.
            </p>
          </div>
          <button
            onClick={() => {
              setIsExtracting(true);
              setExtractionProgress(0);
              setExtractionResult('');
              const interval = setInterval(() => {
                setExtractionProgress(prev => {
                  if (prev >= 100) {
                    clearInterval(interval);
                    setIsExtracting(false);
                    const time = Math.round(15 + (grindSettings.size * 3) + Math.random() * 10);
                    const isOptimal = time >= 25 && time <= 30;
                    setExtractionResult(`Chiết xuất hoàn tất: ${time}s ${isOptimal ? '✅ Tối ưu!' : time < 25 ? '⚠️ Quá nhanh - cần mịn hơn' : '⚠️ Quá chậm - cần thô hơn'}`);
                    return 100;
                  }
                  return prev + 2;
                });
              }, 100);
            }}
            disabled={isExtracting}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          >
            {isExtracting ? 'Đang chiết xuất...' : 'Bắt đầu chiết xuất'}
          </button>
          
          {isExtracting && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${extractionProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {extractionResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold">{extractionResult}</p>
              <div className="mt-2 text-sm text-blue-600">
                <p><strong>Phân tích kết quả:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Thời gian 25-30s = Độ mịn tối ưu ✅</li>
                  <li>Dưới 25s = Cần xay mịn hơn (tăng số)</li>
                  <li>Trên 30s = Cần xay thô hơn (giảm số)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderApplication = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Ứng dụng thực tế</h2>
        <p className="text-lg text-gray-600">Áp dụng kiến thức để giải quyết các tình huống thực tế</p>
      </div>

      <div className="space-y-4">
        {practicalScenarios.map((scenario, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{scenario.title}</h3>
                <div className="bg-red-50 p-3 rounded-lg mb-3">
                  <p className="text-red-800"><strong>Vấn đề:</strong> {scenario.problem}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800"><strong>Giải pháp:</strong> {scenario.solution}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssessment = () => {
    if (quizFinished) {
      return (
        <div className="bg-sky-50 p-6 rounded-lg border-2 border-sky-200 my-10 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Hoàn thành!</h3>
          <p className="text-lg text-gray-600 mt-2">
            Bạn đã trả lời đúng <strong className="text-sky-600">{assessmentScore}</strong> trên <strong className="text-sky-600">{questions.length}</strong> câu hỏi.
          </p>
          <button
            onClick={restartQuiz}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
          >
            <RotateCw size={18} />
            Làm lại
          </button>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200 my-10 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Câu hỏi {currentQuestionIndex + 1}/{questions.length}</h3>
          <p className="font-semibold text-gray-700">Điểm: {assessmentScore}</p>
        </div>
        <div className="md:flex md:gap-6">
          <div className="flex-1">
            <p className="text-lg text-gray-700 mb-4">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                
                let buttonClass = 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 cursor-pointer';
                if (showResult) {
                  if (isCorrect) {
                    buttonClass = 'border-green-500 bg-green-100 text-green-800 cursor-default';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'border-red-500 bg-red-100 text-red-800 cursor-default';
                  } else {
                    buttonClass = 'border-gray-300 bg-gray-50 text-gray-500 cursor-default';
                  }
                } else if (isSelected) {
                  buttonClass = 'border-sky-500 bg-sky-100 cursor-pointer';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${buttonClass}`}
                  >
                    <span className="font-medium text-lg">{option}</span>
                    {showResult && isCorrect && <CheckCircle className="text-green-600" size={20} />}
                    {showResult && isSelected && !isCorrect && <XCircle className="text-red-600" size={20} />}
                  </button>
                );
              })}
            </div>
            {showResult && (
              <div className={`mt-4 p-4 rounded-lg text-base ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} border`}>
                <h4 className={`font-bold ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-800' : 'text-red-800'}`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Chính xác!' : 'Chưa đúng!'}
                </h4>
                <p className="text-gray-700 mt-1">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0 md:w-48">
            <img src={currentQuestion.image} alt="Grinding techniques" className="rounded-lg object-cover w-full h-full shadow-sm border" />
          </div>
        </div>
        
        <div className="mt-6 text-right">
          {showResult && (
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const steps = [
    { id: 'foundation', label: 'Nền tảng', icon: BookOpen },
    { id: 'practice', label: 'Thực hành', icon: Play },
    { id: 'application', label: 'Ứng dụng', icon: Settings },
    { id: 'assessment', label: 'Đánh giá', icon: Award }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  isActive 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : isCompleted 
                    ? 'text-green-600 hover:text-green-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{step.label}</span>
                {isCompleted && <CheckCircle size={16} className="text-green-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {currentStep === 'foundation' && renderFoundation()}
        {currentStep === 'practice' && renderPractice()}
        {currentStep === 'application' && renderApplication()}
        {currentStep === 'assessment' && renderAssessment()}
      </div>
    </div>
  );
};

export default GrindingTechniques;