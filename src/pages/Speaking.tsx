import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { courses, SpeakingContent } from '../data/courses';
import { CheckCircle, RotateCcw, Home, Mic, MicOff, Volume2, ArrowRight } from 'lucide-react';

export default function Speaking() {
  const { language, module } = useParams<{ language: string; module: string }>();
  const { selectedLanguage } = useLanguage();
  const { addExperience } = useAuthStore();
  const { completeLesson, updateCorrectRate } = useProgressStore();

  const currentLanguage = language || selectedLanguage?.code || 'english';
  const course = courses.find(c => c.language === currentLanguage);

  const allLessons = course?.units.flatMap(u => u.lessons.filter(l => l.type === 'speaking')) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);

  const currentLesson = allLessons[currentIndex];
  const content = currentLesson?.content as SpeakingContent;

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      const langMap: Record<string, string> = { english: 'en-US', japanese: 'ja-JP', korean: 'ko-KR' };
      recognitionRef.current.lang = langMap[currentLanguage] || 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim();
        setIsListening(false);
        setIsSpeaking(false);
        if (content) {
          const similarity = calculateSimilarity(transcript.toLowerCase(), content.targetSentence.toLowerCase());
          if (similarity > 0.7) {
            setFeedback('great');
          } else if (similarity > 0.4) {
            setFeedback('good');
          } else {
            setFeedback('try_again');
          }
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setIsSpeaking(false);
        setFeedback('error');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsSpeaking(false);
      };
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLanguage, content]);

  const calculateSimilarity = (a: string, b: string): number => {
    const aWords = new Set(a.split(/\s+/));
    const bWords = new Set(b.split(/\s+/));
    const intersection = new Set([...aWords].filter(x => bWords.has(x)));
    return intersection.size / Math.max(aWords.size, bWords.size);
  };

  const handleStartSpeaking = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setIsSpeaking(true);
      setFeedback(null);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
        setIsSpeaking(false);
      }
    }
  };

  const handlePlayTarget = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content.targetSentence);
      const langMap: Record<string, string> = { english: 'en-US', japanese: 'ja-JP', korean: 'ko-KR' };
      utterance.lang = langMap[currentLanguage] || 'en-US';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFeedback(null);
      setAttempts(0);
    } else {
      completeLesson(currentLanguage, currentLesson.id);
      updateCorrectRate(currentLanguage, 'speaking', 80);
      addExperience(currentLesson.expReward);
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setFeedback(null);
    setAttempts(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setFeedback(null);
    setAttempts(0);
    setIsCompleted(false);
  };

  if (!course || module !== 'speaking') {
    return <Navigate to={`/learn/${currentLanguage}`} replace />;
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Mic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无口语练习内容</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center animate-bounce-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">口语练习完成！</h2>
          <p className="text-gray-500 mb-6">继续加油，多开口才能进步！</p>
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

  const feedbackMessages: Record<string, { text: string; color: string; icon: any }> = {
    great: { text: '发音很棒！非常接近标准发音', color: 'text-success', icon: CheckCircle },
    good: { text: '还不错，继续练习可以更好', color: 'text-accent', icon: CheckCircle },
    try_again: { text: '可以再试一次，注意听示范发音', color: 'text-error', icon: RotateCcw },
    error: { text: '未检测到语音，请重试', color: 'text-error', icon: RotateCcw },
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="gradient-bg py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">口语跟读</p>
              <h1 className="text-xl font-bold text-white">{course.languageName} 口语</h1>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">进度</p>
              <p className="text-white font-bold">{currentIndex + 1} / {allLessons.length}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
            口语练习
          </span>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{content.prompt}</p>

          {/* Target Sentence */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <p className="text-2xl font-bold text-primary dark:text-white">{content.targetSentence}</p>
              <button
                onClick={handlePlayTarget}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Volume2 className="w-5 h-5 text-accent" />
              </button>
            </div>
            <p className="text-sm text-gray-400">点击喇叭听取示范发音，然后点击麦克风跟读</p>
          </div>

          {/* Speak Button */}
          <div className="mb-6">
            <button
              onClick={handleStartSpeaking}
              disabled={!!feedback || isListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                isSpeaking 
                  ? 'bg-accent scale-110 shadow-lg shadow-accent/30 animate-pulse-glow' 
                  : 'bg-gradient-to-br from-orange-500 to-red-500 hover:scale-105 shadow-lg'
              }`}
            >
              {isSpeaking ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
            <p className="mt-3 text-sm text-gray-400">
              {isSpeaking ? '正在聆听...' : feedback ? '已收到语音' : '点击麦克风开始跟读'}
            </p>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="animate-slide-up">
              <div className={`p-4 rounded-xl mb-4 ${
                feedback === 'great' ? 'bg-success/10 border border-success/30' :
                feedback === 'good' ? 'bg-accent/10 border border-accent/30' :
                'bg-error/10 border border-error/30'
              }`}>
                <p className={`font-medium ${feedbackMessages[feedback]?.color || 'text-gray-600'}`}>
                  {feedbackMessages[feedback]?.text}
                </p>
              </div>

              <div className="flex gap-4">
                {(feedback === 'try_again' || feedback === 'error') && (
                  <button onClick={handleRetry} className="btn-outline flex-1 flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    重试
                  </button>
                )}
                <button onClick={handleNext} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {currentIndex < allLessons.length - 1 ? '下一题' : '完成'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}