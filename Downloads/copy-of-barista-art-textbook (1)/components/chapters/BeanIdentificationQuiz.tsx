import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCw } from 'lucide-react';

const questions = [
  {
    question: 'Loại hạt nào có hàm lượng caffeine cao, vị đắng gắt và thường được trồng ở độ cao thấp?',
    options: ['Arabica', 'Robusta', 'Moka', 'Culi'],
    correctAnswer: 'Robusta',
    image: 'https://www.espresso-international.com/media/image/24/3f/79/Robusta-bean.jpg',
    explanation: 'Robusta là loại cà phê có hàm lượng caffeine cao nhất (2-4%), vị đắng đậm và thích hợp với khí hậu nóng ẩm ở độ cao thấp.'
  },
  {
    question: 'Đặc điểm nào sau đây là của hạt Arabica?',
    options: ['Vị chua thanh, hương thơm', 'Caffeine rất cao (trên 3%)', 'Hình tròn, nhỏ', 'Chủ yếu trồng ở Việt Nam'],
    correctAnswer: 'Vị chua thanh, hương thơm',
    image: 'https://www.espresso-international.com/media/image/a4/cc/f0/Arabica-beans-big.jpg',
    explanation: 'Arabica nổi tiếng với hương thơm phong phú và vị chua thanh nhẹ nhàng, trái ngược với vị đắng gắt của Robusta.'
  },
  {
    question: 'Hạt Culi (hay Peaberry) có đặc điểm hình thái độc đáo nào?',
    options: ['Hạt rất dài và dẹp', 'Có 2 nhân trong một trái', 'Chỉ có 1 nhân (hạt) hình tròn trong một trái', 'Luôn có màu xanh lục'],
    correctAnswer: 'Chỉ có 1 nhân (hạt) hình tròn trong một trái',
    image: 'https://toanhangcoffee.com/uploads/images/products-images/culi-3.png',
    explanation: 'Culi là một dạng đột biến tự nhiên, quả cà phê chỉ phát triển một nhân duy nhất thay vì hai. Điều này làm cho hạt có hình tròn và được cho là có hương vị đậm đà hơn.'
  },
  {
    question: 'Để trồng được cà phê Moka chất lượng cao, cần điều kiện độ cao nào?',
    options: ['Dưới 500m', 'Khoảng 800m', 'Trên 1500m', 'Bất kỳ độ cao nào'],
    correctAnswer: 'Trên 1500m',
    image: 'https://www.greenworldcoffeefarm.com/cdn/shop/files/75174685_2583802141668057_6216260528625418240_o.jpg?v=1630583056&width=1500',
    explanation: 'Moka là một giống Arabica quý hiếm, đòi hỏi điều kiện khí hậu mát mẻ và độ cao trên 1500m để phát triển hương vị phức tạp và quý phái.'
  },
  {
    question: 'Phương pháp chế biến nào giúp cà phê có vị "sạch" và làm nổi bật độ axit (vị chua)?',
    options: ['Chế biến Khô (Natural)', 'Chế biến Ướt (Washed)', 'Chế biến Mật Ong (Honey)', 'Tất cả các phương pháp trên'],
    correctAnswer: 'Chế biến Ướt (Washed)',
    image: 'https://file.hstatic.net/1000383842/file/cf_c60b31ce5fdb49ea898730b744f03c91.jpeg',
    explanation: 'Chế biến Ướt (Washed) loại bỏ hoàn toàn lớp thịt quả trước khi phơi, giúp hương vị cà phê trở nên tinh khiết, sạch sẽ và làm nổi bật vị chua thanh đặc trưng.'
  },
  {
    question: 'Quốc gia nào được mệnh danh là "cái nôi của cà phê Arabica"?',
    options: ['Brazil', 'Việt Nam', 'Colombia', 'Ethiopia'],
    correctAnswer: 'Ethiopia',
    image: 'https://atlas-content-cdn.pixelsquid.com/stock-images/ethiopia-flag-rvnNE8B-600.jpg',
    explanation: 'Theo truyền thuyết, cà phê Arabica được phát hiện lần đầu tiên ở vùng Kaffa của Ethiopia, do đó quốc gia này được coi là quê hương của cà phê.'
  }
];

const BeanIdentificationQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    // Automatically show result when answer is selected
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
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
    setScore(0);
    setQuizFinished(false);
  };
  
  if (quizFinished) {
    return (
      <div className="bg-sky-50 p-6 rounded-lg border-2 border-sky-200 my-10 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Hoàn thành!</h3>
        <p className="text-lg text-gray-600 mt-2">
          Bạn đã trả lời đúng <strong className="text-sky-600">{score}</strong> trên <strong className="text-sky-600">{questions.length}</strong> câu hỏi.
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
        <p className="font-semibold text-gray-700">Điểm: {score}</p>
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
          <img src={currentQuestion.image} alt="Coffee beans" className="rounded-lg object-cover w-full h-full shadow-sm border" />
        </div>
      </div>
      
      <div className="mt-6 text-right">
        {showResult && (
          <button
            onClick={nextQuestion}
            className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
          >
            Câu tiếp theo
          </button>
        )}
      </div>
    </div>
  );
};

export default BeanIdentificationQuiz;