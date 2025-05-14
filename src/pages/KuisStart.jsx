import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../QuizPage.css'; // You'll need to extract the CSS from the HTML

const KuisStart = () => {
  const [searchParams] = useSearchParams();
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [hintUsed, setHintUsed] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isReviewing, setIsReviewing] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStats, setQuizStats] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    flaggedQuestions: 0,
    timeTaken: '00:00'
  });
  
  const timerIntervalRef = useRef(null);
  const navigate = useNavigate();
  
  // Quiz data (you would likely fetch this from an API in a real app)
  const quizData = [
                {
                    question: "Apa singkatan dari P3K?",
                    options: [
                        "Pertolongan Pertama Pada Kecelakaan",
                        "Penanganan Pertama Pada Korban",
                        "Pertolongan Pertama Pada Korban",
                        "Penanganan Pertama Pada Kecelakaan"
                    ],
                    correct: 0
                },
                {
                    question: "Apa yang harus dilakukan pertama kali saat menemukan korban kecelakaan?",
                    options: [
                        "Langsung memindahkan korban",
                        "Memeriksa keadaan sekitar untuk memastikan keamanan",
                        "Memberikan pertolongan medis segera",
                        "Menelepon ambulans"
                    ],
                    correct: 1
                },
                {
                    question: "Berapa jumlah kompresi dada per menit yang direkomendasikan saat melakukan CPR?",
                    options: [
                        "60-80 kompresi",
                        "80-100 kompresi",
                        "100-120 kompresi",
                        "120-140 kompresi"
                    ],
                    correct: 2
                },
                {
                    question: "Apa yang harus dilakukan pertama kali saat menangani luka bakar?",
                    options: [
                        "Mengoleskan mentega atau minyak",
                        "Mendinginkan dengan air mengalir selama 10-20 menit",
                        "Memecahkan lepuh yang terbentuk",
                        "Langsung membalut luka"
                    ],
                    correct: 1
                },
                {
                    question: "Apa tanda-tanda seseorang mengalami serangan jantung?",
                    options: [
                        "Nyeri pada perut bagian bawah",
                        "Sakit kepala ringan",
                        "Nyeri dada yang menjalar ke lengan, rahang, atau punggung",
                        "Gatal-gatal pada kulit"
                    ],
                    correct: 2
                },
                {
                    question: "Bagaimana cara menangani korban tersedak yang masih sadar?",
                    options: [
                        "Memberikan minum air putih",
                        "Menepuk-nepuk punggung dengan lembut",
                        "Melakukan Heimlich maneuver",
                        "Meminta korban untuk berbaring"
                    ],
                    correct: 2
                },
                {
                    question: "Apa yang harus dilakukan jika menemukan korban tidak sadarkan diri?",
                    options: [
                        "Langsung melakukan CPR",
                        "Memeriksa napas dan denyut nadi",
                        "Memberikan air minum",
                        "Mengguncang tubuh korban dengan keras"
                    ],
                    correct: 1
                },
                {
                    question: "Bagaimana cara menghentikan pendarahan eksternal yang parah?",
                    options: [
                        "Membersihkan dengan alkohol",
                        "Memberikan tekanan langsung pada luka",
                        "Mengikat di atas dan di bawah luka",
                        "Membiarkan darah keluar untuk membersihkan luka"
                    ],
                    correct: 1
                },
                {
                    question: "Apa yang harus dihindari saat menangani patah tulang?",
                    options: [
                        "Menggerakkan area yang cedera",
                        "Memasang bidai",
                        "Menjaga area cedera tetap diam",
                        "Mengevaluasi kondisi korban"
                    ],
                    correct: 0
                },
                {
                    question: "Apa isi dasar yang harus ada dalam kotak P3K?",
                    options: [
                        "Obat-obatan resep",
                        "Perban, antiseptik, sarung tangan, dan gunting",
                        "Peralatan bedah",
                        "Alat pemantau tekanan darah"
                    ],
                    correct: 1
                }
            ];
  
  // Initialize quiz
  useEffect(() => {
    // Initialize user answers, flagged questions, and hint used arrays
    setUserAnswers(new Array(quizData.length).fill(null));
    setFlaggedQuestions(new Array(quizData.length).fill(false));
    setHintUsed(new Array(quizData.length).fill(false));
    
    // Start timer
    startTimer();
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);
  
  // Get quiz title from URL parameters
  const quizTitle = searchParams.get('title') || 'Dasar-Dasar P3K';
  
  // Timer function
  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current);
          finishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  
  // Format time display (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Select an option
  const selectOption = (index) => {
    if (isReviewing) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = index;
    setUserAnswers(newAnswers);
  };
  
  // Go to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHint(false);
    }
  };
  
  // Go to next question
  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
    } else {
      finishQuiz();
    }
  };
  
  // Go to specific question
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
    setShowHint(false);
  };
  
  // Toggle flag for current question
  const toggleFlagQuestion = () => {
    const newFlagged = [...flaggedQuestions];
    newFlagged[currentQuestion] = !newFlagged[currentQuestion];
    setFlaggedQuestions(newFlagged);
  };
  
  // Toggle hint visibility
  const toggleHint = () => {
    if (!showHint) {
      const newHintUsed = [...hintUsed];
      newHintUsed[currentQuestion] = true;
      setHintUsed(newHintUsed);
    }
    setShowHint(!showHint);
  };
  
  // Finish quiz and calculate results
  const finishQuiz = () => {
    clearInterval(timerIntervalRef.current);
    
    let newScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let flaggedCount = 0;
    
    userAnswers.forEach((answer, index) => {
      if (answer === quizData[index].correct) {
        newScore++;
        correctCount++;
      } else if (answer !== null) {
        incorrectCount++;
      }
      
      if (flaggedQuestions[index]) {
        flaggedCount++;
      }
    });
    
    setScore(newScore);
    
    // Calculate time taken
    const timeTaken = 600 - timeLeft;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setQuizStats({
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      flaggedQuestions: flaggedCount,
      timeTaken: formattedTime
    });
    
    setQuizFinished(true);
  };
  
  // Review quiz answers
  const reviewQuiz = () => {
    setIsReviewing(true);
    setCurrentQuestion(0);
    setQuizFinished(false);
  };
  
  // Retry quiz
  const retryQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(quizData.length).fill(null));
    setFlaggedQuestions(new Array(quizData.length).fill(false));
    setHintUsed(new Array(quizData.length).fill(false));
    setTimeLeft(600);
    setIsReviewing(false);
    setQuizFinished(false);
    setShowHint(false);
    
    // Start timer again
    startTimer();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Quiz Header */}
      <section className="quiz-header text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 quiz-title">{quizTitle}</h1>
              <p className="text-blue-100">Uji pengetahuan Anda tentang dasar-dasar pertolongan pertama</p>
            </div>
            <div className="flex items-center">
              <div className={`timer mr-4 ${timeLeft <= 60 ? 'bg-red-100 text-red-600' : ''}`}>
                <i className="far fa-clock mr-2"></i>
                <span>{formatTime(timeLeft)}</span>
              </div>
              <Link to="/kuis" className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition shadow-md">
                <i className="fas fa-times mr-1"></i> Keluar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Content */}
      <main className="py-6 md:py-8 flex-grow">
        {!quizFinished ? (
          <div className="quiz-container px-4">
            {/* Progress Tracker */}
            <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-gray-700">Progres Kuis</div>
                <div className="text-blue-600 font-medium">
                  <span>{currentQuestion + 1}</span> dari <span>{quizData.length}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="progress-bar" 
                  style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Container */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 question-container">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                {quizData[currentQuestion].question}
              </h2>
              <div className="space-y-4">
                {quizData[currentQuestion].options.map((option, index) => (
                  <div 
                    key={index}
                    className={`option-btn p-4 rounded-lg border border-gray-200 mb-3 flex items-center ${
                      userAnswers[currentQuestion] === index ? 'selected' : ''
                    } ${
                      isReviewing && index === quizData[currentQuestion].correct ? 'correct' : ''
                    } ${
                      isReviewing && userAnswers[currentQuestion] === index && 
                      index !== quizData[currentQuestion].correct ? 'incorrect' : ''
                    }`}
                    onClick={() => selectOption(index)}
                  >
                    <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                      {userAnswers[currentQuestion] === index && <i className="fas fa-check text-white"></i>}
                    </span>
                    <span className="flex-grow">{option}</span>
                  </div>
                ))}
              </div>
              
              {/* Hint Box */}
              {showHint && (
                <div className="hint-box mt-6 p-4 rounded-md">
                  <div className="flex items-start">
                    <i className="fas fa-lightbulb text-yellow-500 mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Petunjuk:</h4>
                      <p className="text-yellow-700">{quizData[currentQuestion].hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <button 
                className={`btn-nav bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition flex items-center ${
                  currentQuestion === 0 ? 'opacity-50' : ''
                }`}
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <i className="fas fa-arrow-left mr-2"></i> Sebelumnya
              </button>
              <div className="flex flex-wrap gap-3">
                <button 
                  className={`btn-nav px-4 py-3 rounded-lg font-medium transition ${
                    flaggedQuestions[currentQuestion] 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                  onClick={toggleFlagQuestion}
                >
                  <i className="fas fa-flag mr-2"></i> 
                  {flaggedQuestions[currentQuestion] ? 'Ditandai' : 'Tandai'}
                </button>
                <button 
                  className="btn-nav bg-blue-100 text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-200 transition"
                  onClick={toggleHint}
                >
                  <i className="fas fa-lightbulb mr-2"></i> Petunjuk
                </button>
              </div>
              <button 
                className="btn-nav bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
                onClick={goToNextQuestion}
              >
                {currentQuestion === quizData.length - 1 ? (
                  <><i className="fas fa-check mr-2"></i> Selesai</>
                ) : (
                  <>Selanjutnya <i className="fas fa-arrow-right ml-2"></i></>
                )}
              </button>
            </div>

            {/* Question Navigator */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Navigasi Pertanyaan</h3>
              <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
                {quizData.map((_, index) => (
                  <div 
                    key={index}
                    className={`question-dot w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-all ${
                      index === currentQuestion 
                        ? 'bg-blue-600 text-white' 
                        : userAnswers[index] !== null 
                          ? 'bg-green-100 text-green-800 border border-green-500' 
                          : flaggedQuestions[index] 
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-500' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="quiz-container px-4">
            <div className="result-card p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-award text-4xl text-blue-600"></i>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Kuis Selesai!</h2>
                <p className="text-gray-600">Anda telah menyelesaikan kuis {quizTitle}</p>
              </div>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {score}/{quizData.length}
                </div>
                <p className="text-gray-600">Skor Anda</p>
                <div className="mt-4 flex justify-center">
                  <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(score / quizData.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                <button 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
                  onClick={reviewQuiz}
                >
                  <i className="fas fa-search mr-2"></i> Tinjau Jawaban
                </button>
                <button 
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-md"
                  onClick={retryQuiz}
                >
                  <i className="fas fa-redo mr-2"></i> Coba Lagi
                </button>
                <Link 
                  to="/kuis" 
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition text-center shadow-md"
                >
                  <i className="fas fa-list mr-2"></i> Daftar Kuis
                </Link>
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Statistik Kuis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-xl font-bold">{quizStats.correctAnswers}</div>
                    <div className="text-gray-600 text-sm">Jawaban Benar</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-red-600 text-xl font-bold">{quizStats.incorrectAnswers}</div>
                    <div className="text-gray-600 text-sm">Jawaban Salah</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-yellow-600 text-xl font-bold">{quizStats.flaggedQuestions}</div>
                    <div className="text-gray-600 text-sm">Soal Ditandai</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-green-600 text-xl font-bold">{quizStats.timeTaken}</div>
                    <div className="text-gray-600 text-sm">Waktu Digunakan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KuisStart;