import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { courses, ListeningContent, ListeningQuestion } from '../data/courses';
import { CheckCircle, XCircle, RotateCcw, Home, Headphones, Play, Volume2, ArrowRight } from 'lucide-react';

export default function Listening() {
  const { language, module } = useParams<{ language: string; module: string }>();
  const { selectedLanguage } = useLanguage();
  const { addExperience } = useAuthStore();
  const { completeLesson, updateCorrectRate } = useProgressStore();

  const currentLanguage = language || selectedLanguage?.code || 'english';
  const course = courses.find(c => c.language === currentLanguage);

  const allLessons = course?.units.flatMap(u => u.lessons.filter(l => l.type === 'listening')) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentLesson = allLessons[currentIndex];
  const content = currentLesson?.content as ListeningContent;
  const questions = content?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length && !isCompleted) {
      const correctRate = (correctCount / questions.length) * 100;
      if (currentLesson) {
        completeLesson(currentLanguage, currentLesson.id);
        updateCorrectRate(currentLanguage, 'listening', correctRate);
        addExperience(currentLesson.expReward + (correctRate === 100 ? 10 : 0));
      }
      setIsCompleted(true);
    }
  }, [currentQuestionIndex, questions.length, isCompleted, correctCount, currentLesson, currentLanguage, completeLesson, updateCorrectRate, addExperience]);

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window && content?.transcript) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content.transcript);
      const langMap: Record<string, string> = { english: 'en-US', japanese: 'ja-JP', korean: 'ko-KR' };
      utterance.lang = langMap[currentLanguage] || 'en-US';
      utterance.rate = 0.85;
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setCorrectCount(prev => prev + 1);
    } else {
      setIsCorrect(false);
      setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsCompleted(false);
    setShowTranscript(false);
  };

  if (!course || module !== 'listening') {
    return <Navigate to={`/learn/${currentLanguage}`} replace />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Headphones className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无听力练习内容</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const correctRate = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center animate-bounce-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Headphones className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">听力训练完成！</h2>
          <p className="text-gray-500 mb-6">正确率 {correctRate}%</p>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-success">正确: {correctCount}</span>
              <span className="text-error">错误: {wrongCount}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-error transition-all duration-500"
                style={{ width: `${correctRate}%` }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Link to={`/learn/${currentLanguage}`} className="btn-outline flex-1 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              返回课程
            </Link>
            <button onClick={handleRestart} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              再练一遍
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="gradient-bg py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">听力训练</p>
              <h1 className="text-xl font-bold text-white">{course.languageName} 听力</h1>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">进度</p>
              <p className="text-white font-bold">{currentQuestionIndex + 1} / {questions.length}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Audio Player */}
        <div className="card p-8 mb-8 text-center">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
            第 {currentQuestionIndex + 1} 题
          </span>

          <button
            onClick={handlePlayAudio}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
              isPlaying 
                ? 'bg-green-500 scale-110 shadow-lg shadow-green-500/30 animate-pulse-glow' 
                : 'bg-gradient-to-br from-green-500 to-emerald-500 hover:scale-105 shadow-lg'
            }`}
          >
            {isPlaying ? (
              <Volume2 className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </button>
          <p className="text-sm text-gray-400">
            {isPlaying ? '正在播放...' : '点击播放听力内容'}
          </p>
          <p className="text-xs text-gray-400 mt-2">可以多次播放</p>
        </div>

        {/* Question */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-primary dark:text-white mb-6 text-center">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20';
              if (selectedAnswer) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass = 'border-2 border-success bg-success/10 text-success';
                } else if (option === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                  buttonClass = 'border-2 border-error bg-error/10 text-error';
                } else {
                  buttonClass = 'border-2 border-gray-100 dark:border-gray-800 opacity-50';
                }
              }
              return (
                <button
                  key={index}
                  onClick={() => !selectedAnswer && handleSelectAnswer(option)}
                  disabled={!!selectedAnswer}
                  className={`p-4 rounded-xl text-left font-medium transition-all duration-200 ${buttonClass}`}
                >
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-center leading-8 mr-3 text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className={`mt-6 p-4 rounded-xl animate-slide-up ${isCorrect ? 'bg-success/10 border border-success/30' : 'bg-error/10 border border-error/30'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-error" />
                )}
                <span className={`font-medium ${isCorrect ? 'text-success' : 'text-error'}`}>
                  {isCorrect ? '回答正确！' : '回答错误'}
                </span>
              </div>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-sm text-accent hover:underline"
              >
                {showTranscript ? '隐藏原文' : '查看听力原文'}
              </button>
              {showTranscript && content?.transcript && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                  {content.transcript}
                </p>
              )}
            </div>
          )}

          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {currentQuestionIndex < questions.length - 1 ? '下一题' : '查看结果'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < currentQuestionIndex 
                  ? 'bg-success scale-100' 
                  : index === currentQuestionIndex && selectedAnswer
                    ? isCorrect ? 'bg-success' : 'bg-error'
                    : index === currentQuestionIndex
                      ? 'bg-accent scale-125'
                      : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}