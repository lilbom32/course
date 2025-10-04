import React, { useState, useEffect } from 'react';
import { Coffee, Target, Settings, Award, AlertTriangle, CheckCircle, Clock, BookOpen, ArrowRight, ArrowLeft, Home, ChevronRight } from 'lucide-react';
import GrindingTechniques from './GrindingTechniques';
import TampingTechniques from './TampingTechniques';
import MachineOperation from './MachineOperation';
import QualityEvaluation from './QualityEvaluation';
import Troubleshooting from './Troubleshooting';

interface ChapterProgress {
  grinding: boolean;
  tamping: boolean;
  machine: boolean;
  evaluation: boolean;
  troubleshooting: boolean;
}

const Chapter2: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('overview');
  const [progress, setProgress] = useState<ChapterProgress>({
    grinding: false,
    tamping: false,
    machine: false,
    evaluation: false,
    troubleshooting: false
  });
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [studyTime, setStudyTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const sections = [
    {
      id: 'overview',
      title: 'Tổng Quan',
      icon: BookOpen,
      description: 'Học cách pha espresso ngon',
      estimatedTime: 5
    },
    {
      id: 'grinding',
      title: 'Bài 2.1 - Xay Cà Phê',
      icon: Coffee,
      description: 'Cách xay cà phê đúng độ mịn cho <strong>espresso</strong>',
      estimatedTime: 12
    },
    {
      id: 'tamping',
      title: 'Bài 2.2 - Nén Cà Phê',
      icon: Target,
      description: 'Kỹ thuật nén cà phê bằng tay trong <strong>portafilter</strong>',
      estimatedTime: 10
    },
    {
      id: 'machine',
      title: 'Bài 2.3 - Dùng Máy Pha',
      icon: Settings,
      description: 'Cách vận hành máy <strong>espresso</strong>',
      estimatedTime: 15
    },
    {
      id: 'evaluation',
      title: 'Bài 2.4 - Kiểm Tra Chất Lượng',
      icon: Award,
      description: 'Nhận biết <strong>espresso</strong> ngon qua lớp <strong>crema</strong>',
      estimatedTime: 8
    },
    {
      id: 'troubleshooting',
      title: 'Bài 2.5 - Sửa Lỗi Thường Gặp',
      icon: AlertTriangle,
      description: 'Khắc phục các vấn đề khi pha',
      estimatedTime: 6
    }
  ];

  const learningObjectives = [
    'Xay cà phê như nào để không quá mịn, không quá thô',
    'Nén cà phê đủ chặt để nước chảy đều',
    'Bấm nút máy đúng cách, không bị cháy',
    'Nhìn màu sắc để biết espresso ngon hay dở',
    'Sửa lỗi khi cà phê chảy quá nhanh/chậm'
  ];

  const keySkills = [
    {
      skill: 'Xay Cà Phê',
      description: 'Như cát biển - không quá mịn, không quá thô',
      icon: Coffee
    },
    {
      skill: 'Nén Cà Phê',
      description: 'Ép chặt như bóp tay bạn - vừa phải',
      icon: Target
    },
    {
      skill: 'Dùng Máy',
      description: 'Bấm nút, đợi 25-30 giây là xong',
      icon: Settings
    },
    {
      skill: 'Nhìn Màu',
      description: 'Vàng nâu đẹp = ngon, đen xám = dở',
      icon: Award
    },
    {
      skill: 'Sửa Lỗi',
      description: 'Chảy nhanh = xay mịn hơn, chảy chậm = xay thô hơn',
      icon: AlertTriangle
    }
  ];

  useEffect(() => {
    if (isTimerActive) {
      const timer = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerActive]);

  const startTimer = () => setIsTimerActive(true);
  const stopTimer = () => setIsTimerActive(false);

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
      setProgress(prev => ({
        ...prev,
        [sectionId]: true
      }));
    }
  };

  const getNextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    return sections[currentIndex + 1];
  };

  const getPreviousSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    return sections[currentIndex - 1];
  };

  const getCurrentSectionIndex = () => {
    return sections.findIndex(s => s.id === currentSection);
  };

  const getTotalEstimatedTime = () => {
    return sections.slice(1).reduce((total, section) => total + section.estimatedTime, 0);
  };

  const getRemainingTime = () => {
    const completedTime = completedSections.reduce((total, sectionId) => {
      const section = sections.find(s => s.id === sectionId);
      return total + (section?.estimatedTime || 0);
    }, 0);
    return getTotalEstimatedTime() - completedTime;
  };

  const getProgressPercentage = () => {
    const totalSections = sections.length - 1; // Exclude overview
    const completedCount = completedSections.length;
    return Math.round((completedCount / totalSections) * 100);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSection = () => {
    const handleSectionComplete = (sectionId: string) => {
      markSectionComplete(sectionId);
      stopTimer();
    };

    switch (currentSection) {
      case 'grinding':
        return <GrindingTechniques onComplete={() => handleSectionComplete('grinding')} />;
      case 'tamping':
        return <TampingTechniques onComplete={() => handleSectionComplete('tamping')} />;
      case 'machine':
        return <MachineOperation onComplete={() => handleSectionComplete('machine')} />;
      case 'evaluation':
        return <QualityEvaluation onComplete={() => handleSectionComplete('evaluation')} />;
      case 'troubleshooting':
        return <Troubleshooting onComplete={() => handleSectionComplete('troubleshooting')} />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => {
    const nextSection = getNextSection();
    const totalTime = getTotalEstimatedTime();
    const remainingTime = getRemainingTime();

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Simplified Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Bài 2: Pha <strong>Espresso</strong> (Cà Phê Đậm Đặc) Đơn Giản</h1>
          <p className="text-lg text-gray-600">5 bước cơ bản để có ly <strong>espresso</strong> (cà phê đậm đặc) ngon</p>
        </div>


        {/* Next Action - Clear CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {completedSections.length === 0 ? 'Bắt đầu học' : 'Tiếp tục học'}
              </h3>
              <p className="text-gray-600">
                {completedSections.length === 0 
                  ? 'Bắt đầu với bước đầu tiên: xay cà phê'
                  : nextSection 
                    ? `Tiếp tục: ${nextSection.title}`
                    : 'Tuyệt vời! Bạn đã biết pha espresso cơ bản'
                }
              </p>
            </div>
            <button
              onClick={() => {
                if (completedSections.length === 0) {
                  setCurrentSection('grinding');
                  startTimer();
                } else if (nextSection) {
                  setCurrentSection(nextSection.id);
                  if (!isTimerActive) startTimer();
                }
              }}
              disabled={completedSections.length === sections.length - 1}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              {completedSections.length === sections.length - 1 ? 'Hoàn thành' : 'Bắt đầu'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Learning Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📹 Tài Liệu Video Bổ Sung</h3>
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
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-2">📝 Tóm Tắt Video:</h4>
            <ul className="text-indigo-800 text-sm space-y-1">
              <li>• <strong>Kỹ thuật nâng cao:</strong> Pre-infusion, pressure profiling, temperature control</li>
              <li>• <strong>Grind optimization:</strong> Điều chỉnh độ mịn theo từng loại cà phê</li>
              <li>• <strong>Water chemistry:</strong> Tầm quan trọng của chất lượng nước</li>
              <li>• <strong>Equipment maintenance:</strong> Bảo trì máy móc để đảm bảo hiệu suất</li>
              <li>• <strong>Consistency:</strong> Làm thế nào để tạo ra espresso ổn định mỗi ngày</li>
            </ul>
          </div>
        </div>

        {/* Quick Section Overview - Compact */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nội dung chương</h3>
          <div className="space-y-3">
            {sections.slice(1).map((section, index) => {
              const isCompleted = completedSections.includes(section.id);
              const isCurrent = currentSection === section.id;
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer ${
                    isCompleted 
                      ? 'bg-green-50 border border-green-200' 
                      : isCurrent
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentSection(section.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      isCompleted ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-800'
                    }`}>
                      {section.title}
                    </h4>
                    <p className={`text-sm ${
                      isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    ~{section.estimatedTime} phút
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header with Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentSection('overview')}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Chương 2</span>
              </button>
              
              {currentSection !== 'overview' && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">
                    {sections.find(s => s.id === currentSection)?.title}
                  </span>
                </>
              )}
            </div>
            
            {/* Progress & Timer */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {formatTime(studyTime)}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {getProgressPercentage()}%
              </div>
            </div>
          </div>
          
          {/* Progress Bar in Header */}
          {currentSection !== 'overview' && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Content with Navigation */}
      <div className="relative">
        {/* Navigation Buttons for Sections */}
        {currentSection !== 'overview' && (
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Previous Button */}
              <button
                onClick={() => {
                  const prev = getPreviousSection();
                  if (prev && prev.id !== 'overview') {
                    setCurrentSection(prev.id);
                  } else {
                    setCurrentSection('overview');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {getPreviousSection()?.id === 'overview' ? 'Về tổng quan' : 'Bài trước'}
              </button>

              {/* Current Section Info */}
              <div className="text-center">
                <div className="text-sm text-gray-500">
                  Bài {getCurrentSectionIndex()} / {sections.length - 1}
                </div>
                <div className="text-sm text-gray-600">
                  ~{sections.find(s => s.id === currentSection)?.estimatedTime} phút
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  const next = getNextSection();
                  if (next) {
                    setCurrentSection(next.id);
                  } else {
                    setCurrentSection('overview');
                  }
                }}
                disabled={!getNextSection()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {getNextSection() ? 'Bài tiếp' : 'Hoàn thành'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {renderSection()}
      </div>
    </div>
  );
};

export default Chapter2;