import React, { useState, useEffect } from 'react';
import { Gauge, Target, AlertTriangle, CheckCircle, XCircle, RotateCcw, BookOpen, Settings, Coffee, Award, ChevronRight } from 'lucide-react';
import { ImageCard } from '../common/Layout';

interface TampingData {
  pressure: number;
  angle: number;
  consistency: number;
  level: number;
}

const TampingTechniques: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'foundation' | 'practice' | 'application' | 'assessment'>('foundation');
  const [tampingData, setTampingData] = useState<TampingData>({
    pressure: 0,
    angle: 0,
    consistency: 0,
    level: 0
  });

  const [isTamping, setIsTamping] = useState(false);
  const [tampingHistory, setTampingHistory] = useState<TampingData[]>([]);
  const [currentPracticeStep, setCurrentPracticeStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean[]>([]);

  // Initialize arrays with correct length
  useEffect(() => {
    setSelectedAnswers(new Array(questions.length).fill(''));
    setShowResults(new Array(questions.length).fill(false));
  }, []);

  const pressureTarget = { min: 15, max: 30, optimal: 22.5 };
  const angleTarget = { min: -2, max: 2, optimal: 0 };
  const consistencyTarget = { min: 80, max: 100, optimal: 90 };

  const questions = [
    {
      question: 'Áp lực chuẩn cho nén cà phê là bao nhiêu?',
      options: ['5-10 pounds (2-5 kg)', '15-30 pounds (7-14 kg)', '35-50 pounds (16-23 kg)', 'Không quan trọng'],
      correctAnswer: '15-30 pounds (7-14 kg)',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      explanation: 'Áp lực nén cà phê lý tưởng là 15-30 pounds (7-14 kg). Áp lực quá thấp sẽ tạo kênh chảy nước, quá cao sẽ làm nén quá chặt và giảm chất lượng chiết xuất.'
    },
    {
      question: 'Khi cà phê chảy không đều, vấn đề thường là gì?',
      options: ['Độ mịn xay', 'Nén không đều', 'Nhiệt độ nước', 'Lượng cà phê'],
      correctAnswer: 'Nén không đều',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      explanation: 'Nén cà phê không đều sẽ tạo ra các kênh chảy nước khác nhau, dẫn đến chiết xuất không đồng nhất và vị cà phê không cân bằng.'
    },
    {
      question: 'Nén cà phê có mục đích chính là gì?',
      options: ['Tạo sức cản cho dòng nước', 'Làm cho cà phê ngon hơn', 'Tiết kiệm thời gian', 'Trang trí phễu lọc'],
      correctAnswer: 'Tạo sức cản cho dòng nước',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400',
      explanation: 'Mục đích chính của nén cà phê là tạo một bề mặt đồng nhất và chặt để tạo sức cản phù hợp cho nước chảy qua, đảm bảo chiết xuất đều.'
    }
  ];

  const handleAnswerSelect = (questionIndex: number, answer: string, isCorrect: boolean) => {
    if (showResults[questionIndex]) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
    
    const newShowResults = [...showResults];
    newShowResults[questionIndex] = true;
    setShowResults(newShowResults);
    
    if (isCorrect) {
      setAssessmentScore(prev => prev + 1);
    }
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
    setSelectedAnswers([]);
    setShowResults([]);
  };

  const tampingSteps = [
    {
      title: "Phân bố cà phê",
      description: "Rải đều cà phê trong portafilter, tránh tạo vùng dày mỏng",
      icon: "☕",
      tips: ["Sử dụng WDT tool", "Xoay nhẹ portafilter", "Kiểm tra độ đều"]
    },
    {
      title: "Đặt tamper",
      description: "Đặt tamper thẳng góc với portafilter, không nghiêng",
      icon: "🎯",
      tips: ["Giữ tamper thẳng", "Đặt nhẹ nhàng", "Không ấn mạnh"]
    },
    {
      title: "Áp lực tamping",
      description: "Tamp với áp lực 15-30 pounds, giữ đều trong 2-3 giây",
      icon: "💪",
      tips: ["Áp lực ổn định", "Không nhấc tamper", "Giữ thẳng tay"]
    },
    {
      title: "Kiểm tra độ phẳng",
      description: "Kiểm tra puck có phẳng và đều không",
      icon: "📏",
      tips: ["Dùng thước đo", "Kiểm tra góc độ", "Đảm bảo không có khe hở"]
    }
  ];

  const learningSteps = [
    {
      id: 'foundation',
      title: 'Foundation',
      icon: BookOpen,
      description: 'Hiểu nguyên lý tamping',
      color: 'blue'
    },
    {
      id: 'practice',
      title: 'Practice',
      icon: Settings,
      description: 'Thực hành kỹ thuật',
      color: 'green'
    },
    {
      id: 'application',
      title: 'Application',
      icon: Coffee,
      description: 'Áp dụng thực tế',
      color: 'orange'
    },
    {
      id: 'assessment',
      title: 'Assessment',
      icon: Award,
      description: 'Kiểm tra hiểu biết',
      color: 'purple'
    }
  ];

  const practicalScenarios = [
    {
      situation: "Cà phê chảy không đều, một bên nhanh một bên chậm",
      problem: "Uneven tamping",
      solution: "Điều chỉnh góc độ và áp lực",
      steps: ["Kiểm tra tamper có thẳng không", "Đảm bảo áp lực đều", "Practice tamping technique"]
    },
    {
      situation: "Crema có màu sắc không đồng đều",
      problem: "Inconsistent pressure",
      solution: "Tăng consistency trong tamping",
      steps: ["Đo áp lực bằng scale", "Practice với target 15-30 pounds", "Giữ consistent timing"]
    },
    {
      situation: "Puck bị vỡ khi lấy ra khỏi portafilter",
      problem: "Over-tamping hoặc channeling",
      solution: "Giảm áp lực và cải thiện distribution",
      steps: ["Kiểm tra grind size", "Cải thiện coffee distribution", "Điều chỉnh tamping pressure"]
    }
  ];

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  const nextStep = () => {
    const steps = ['foundation', 'practice', 'application', 'assessment'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1] as any);
    } else {
      onComplete();
    }
  };

  const getStepProgress = () => {
    const totalSteps = learningSteps.length;
    const currentIndex = learningSteps.findIndex(s => s.id === currentStep);
    return Math.round(((currentIndex + 1) / totalSteps) * 100);
  };

  const renderFoundation = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Foundation: Nguyên Lý Tamping</h2>
        <p className="text-lg text-gray-600">Hiểu tại sao tamping quan trọng và cách thực hiện đúng</p>
      </div>

      {/* Tamping Techniques Images */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">📸 Hướng Dẫn Kỹ Thuật Tamping</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1755087686/pplx_project_search_images/7de1e6a146896f7c16682d6e5f638c65210f56d0.png"
            alt="Step-by-step illustrated guide on how to properly tamp espresso coffee grounds"
            caption="Hình 2.3: Hướng dẫn 6 bước tamping chi tiết"
          />
          <ImageCard
            src="https://pplx-res.cloudinary.com/image/upload/v1758010656/pplx_project_search_images/d529c641a64d5f1cf32c812fb03e703f411e4549.png"
            alt="Hand holding a portafilter with tamped ground coffee, ready for espresso brewing"
            caption="Hình 2.4: Tư thế tamping chuyên nghiệp với form và áp lực đúng"
          />
        </div>
        <div className="flex justify-center">
          <div className="max-w-md">
            <ImageCard
              src="https://pplx-res.cloudinary.com/image/upload/v1755087686/pplx_project_search_images/8eddce5e40b9dfde1ac2684cb2c65552ab1d0b90.png"
              alt="Close-up of a barista tamping ground coffee in a portafilter for espresso preparation"
              caption="Hình 2.5: Cận cảnh kỹ thuật tamping với portafilter kim loại"
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Hướng Dẫn: Kỹ Thuật Tamping Chuyên Nghiệp</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/zMNcCPXDPQQ"
            title="How to Tamp Coffee for the Best Espresso (Pro Barista Tips)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• <strong>Áp lực chuẩn:</strong> 15-30 pounds (7-14kg) - không quá mạnh, không quá nhẹ</li>
            <li>• <strong>Góc độ:</strong> Giữ tamper thẳng góc với portafilter, không nghiêng</li>
            <li>• <strong>Thời gian:</strong> Giữ áp lực ổn định trong 2-3 giây</li>
            <li>• <strong>Kiểm tra:</strong> Đảm bảo bề mặt cà phê phẳng và đều</li>
            <li>• <strong>Lưu ý:</strong> Tamping đúng giúp nước chảy đều, tránh channeling</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Tại sao tamping quan trọng?
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-800">Tạo Resistance</h4>
            <p className="text-blue-700 text-sm">
              Tamping tạo ra resistance cần thiết để nước phải đi qua coffee bed 
              thay vì tìm đường dễ nhất (channeling).
            </p>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-xs text-gray-600">Target pressure:</div>
              <div className="font-medium text-blue-800">15-30 pounds (7-14kg)</div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-800">Even Extraction</h4>
            <p className="text-blue-700 text-sm">
              Tamping đều đảm bảo water flow qua toàn bộ coffee bed, 
              tạo ra even extraction và consistent flavor.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-xs text-gray-600">Key factors:</div>
              <div className="font-medium text-blue-800">Pressure + Angle + Consistency</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-4">✅ Checklist Foundation</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Hiểu tamping tạo resistance cho water flow",
            "Biết target pressure: 15-30 pounds",
            "Nhớ importance của even pressure distribution",
            "Hiểu relationship giữa tamping và extraction quality"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            markStepComplete('foundation');
            setCurrentStep('practice');
          }}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Tôi đã hiểu → Tiếp tục Practice
        </button>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Practice: Kỹ Thuật Tamping</h2>
        <p className="text-lg text-gray-600">Thực hành 4 bước tamping chuẩn</p>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📹 Video Thực Hành: Hiểu Cách Tamping Đúng</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ogujVacRDr4"
            title="Understanding How to Tamp Correctly for Espresso Brewing"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">📝 Tóm Tắt Video:</h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• <strong>Phân bố cà phê:</strong> Rải đều cà phê trong portafilter trước khi tamp</li>
            <li>• <strong>Kỹ thuật cầm:</strong> Cầm tamper bằng 3 ngón tay, giữ thẳng tay</li>
            <li>• <strong>Áp lực đều:</strong> Tamp từ giữa ra ngoài, đảm bảo áp lực đồng đều</li>
            <li>• <strong>Kiểm tra kết quả:</strong> Bề mặt phẳng, không có vết nứt hoặc lỗ hổng</li>
            <li>• <strong>Lỗi thường gặp:</strong> Tamp nghiêng, áp lực không đều, không kiểm tra kết quả</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Target Values</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-900">15-30</div>
            <div className="text-sm text-blue-600">Pounds Pressure</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-900">±2°</div>
            <div className="text-sm text-green-600">Angle Tolerance</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-900">90%</div>
            <div className="text-sm text-orange-600">Consistency</div>
          </div>
        </div>

        <div className="space-y-4">
          {tampingSteps.map((step, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              currentPracticeStep === index ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  currentPracticeStep === index ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Tips:</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {currentPracticeStep === index && (
                  <button
                    onClick={() => setCurrentPracticeStep(prev => prev + 1)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-4">✅ Practice Checklist</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Đã thực hành cả 4 bước tamping",
            "Biết target pressure 15-30 pounds",
            "Hiểu importance của even distribution",
            "Có thể maintain consistent angle và pressure"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            markStepComplete('practice');
            setCurrentStep('application');
          }}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Đã practice xong → Tiếp tục Application
        </button>
      </div>
    </div>
  );

  const renderApplication = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Application: Scenarios Thực Tế</h2>
        <p className="text-lg text-gray-600">Áp dụng kỹ thuật tamping để giải quyết các vấn đề thực tế</p>
      </div>

      <div className="space-y-4">
        {practicalScenarios.map((scenario, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.situation}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-red-700">Vấn đề</div>
                    <div className="text-red-900">{scenario.problem}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-green-700">Giải pháp</div>
                    <div className="text-green-900">{scenario.solution}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-blue-700">Các bước</div>
                    <ul className="text-blue-900 text-sm space-y-1">
                      {scenario.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{stepIndex + 1}. {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-4">✅ Application Checklist</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Biết cách diagnose uneven tamping",
            "Hiểu khi nào cần adjust pressure hoặc angle",
            "Biết troubleshoot channeling issues",
            "Có thể explain tamping importance cho customers"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            markStepComplete('application');
            setCurrentStep('assessment');
          }}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Đã hiểu scenarios → Tiếp tục Assessment
        </button>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Assessment: Kiểm Tra Hiểu Biết</h2>
        <p className="text-lg text-gray-600">Đánh giá kiến thức và kỹ năng nén cà phê</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Bài kiểm tra: Kỹ thuật nén cà phê</h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">Câu 1: Áp lực chuẩn cho nén cà phê là bao nhiêu?</h4>
            <div className="space-y-2">
              {[
                { answer: "5-10 pounds (2-5 kg)", correct: false },
                { answer: "15-30 pounds (7-14 kg)", correct: true },
                { answer: "35-50 pounds (16-23 kg)", correct: false },
                { answer: "Không quan trọng", correct: false }
              ].map((option, index) => {
                const isSelected = selectedAnswers[0] === option.answer;
                const showResult = showResults[0];
                let buttonClass = 'block w-full p-3 text-left border border-gray-200 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50';
                
                if (showResult) {
                  if (option.correct) {
                    buttonClass += ' border-green-500 bg-green-100 text-green-800';
                  } else if (isSelected && !option.correct) {
                    buttonClass += ' border-red-500 bg-red-100 text-red-800';
                  } else {
                    buttonClass += ' border-gray-300 bg-gray-50 text-gray-500 cursor-default';
                  }
                } else if (isSelected) {
                  buttonClass += ' border-blue-500 bg-blue-100';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(0, option.answer, option.correct)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.answer}</span>
                      {showResult && option.correct && <CheckCircle className="text-green-600" size={20} />}
                      {showResult && isSelected && !option.correct && <XCircle className="text-red-600" size={20} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">Câu 2: Khi cà phê chảy không đều, vấn đề thường là gì?</h4>
            <div className="space-y-2">
              {[
                { answer: "Độ mịn xay", correct: false },
                { answer: "Nén không đều", correct: true },
                { answer: "Nhiệt độ nước", correct: false },
                { answer: "Lượng cà phê", correct: false }
              ].map((option, index) => {
                const isSelected = selectedAnswers[1] === option.answer;
                const showResult = showResults[1];
                let buttonClass = 'block w-full p-3 text-left border border-gray-200 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50';
                
                if (showResult) {
                  if (option.correct) {
                    buttonClass += ' border-green-500 bg-green-100 text-green-800';
                  } else if (isSelected && !option.correct) {
                    buttonClass += ' border-red-500 bg-red-100 text-red-800';
                  } else {
                    buttonClass += ' border-gray-300 bg-gray-50 text-gray-500 cursor-default';
                  }
                } else if (isSelected) {
                  buttonClass += ' border-blue-500 bg-blue-100';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(1, option.answer, option.correct)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.answer}</span>
                      {showResult && option.correct && <CheckCircle className="text-green-600" size={20} />}
                      {showResult && isSelected && !option.correct && <XCircle className="text-red-600" size={20} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">Câu 3: Nén cà phê có mục đích chính là gì?</h4>
            <div className="space-y-2">
              {[
                { answer: "Tạo sức cản cho dòng nước", correct: true },
                { answer: "Làm cho cà phê ngon hơn", correct: false },
                { answer: "Tiết kiệm thời gian", correct: false },
                { answer: "Trang trí phễu lọc", correct: false }
              ].map((option, index) => {
                const isSelected = selectedAnswers[2] === option.answer;
                const showResult = showResults[2];
                let buttonClass = 'block w-full p-3 text-left border border-gray-200 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50';
                
                if (showResult) {
                  if (option.correct) {
                    buttonClass += ' border-green-500 bg-green-100 text-green-800';
                  } else if (isSelected && !option.correct) {
                    buttonClass += ' border-red-500 bg-red-100 text-red-800';
                  } else {
                    buttonClass += ' border-gray-300 bg-gray-50 text-gray-500 cursor-default';
                  }
                } else if (isSelected) {
                  buttonClass += ' border-blue-500 bg-blue-100';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(2, option.answer, option.correct)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.answer}</span>
                      {showResult && option.correct && <CheckCircle className="text-green-600" size={20} />}
                      {showResult && isSelected && !option.correct && <XCircle className="text-red-600" size={20} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-purple-600">Điểm số</div>
              <div className="text-2xl font-bold text-purple-900">{assessmentScore}/3</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-600">Tỷ lệ</div>
              <div className="text-lg font-semibold text-purple-900">
                {Math.round((assessmentScore / 3) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-green-900 mb-4">✅ Assessment Complete</h3>
        <p className="text-green-700 mb-4">
          {assessmentScore >= 2 
            ? "Chúc mừng! Bạn đã nắm vững kiến thức về tamping techniques."
            : "Hãy review lại kiến thức và thử lại nếu cần."
          }
        </p>
        <button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Hoàn thành bài học →
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header với Progress */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Bài 2.2 - Thao Tác Nén Café</h1>
        <p className="text-lg text-gray-600">Learning Path: Foundation → Practice → Application → Assessment</p>
        
        {/* Progress Steps */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            {learningSteps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = completedSteps.includes(step.id);
              const StepIcon = step.icon;
              
              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? `bg-${step.color}-100 border-2 border-${step.color}-500` 
                      : isCompleted
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    <StepIcon className={`w-4 h-4 ${
                      isActive 
                        ? `text-${step.color}-600` 
                        : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isActive 
                        ? `text-${step.color}-900` 
                        : isCompleted
                          ? 'text-green-900'
                          : 'text-gray-700'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < learningSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getStepProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Content based on current step */}
      {currentStep === 'foundation' && renderFoundation()}
      {currentStep === 'practice' && renderPractice()}
      {currentStep === 'application' && renderApplication()}
      {currentStep === 'assessment' && renderAssessment()}
    </div>
  );
};

export default TampingTechniques;