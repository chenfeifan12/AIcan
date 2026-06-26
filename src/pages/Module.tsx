import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { courses, Lesson, Word, VocabularyContent } from '../data/courses';
import { showToast } from '../components/common/Toast';
import { Volume2, CheckCircle, XCircle, ArrowRight, RotateCcw, Home } from 'lucide-react';

export default function Vocabulary() {
  const { language } = useParams<{ language: string }>();
  const { selectedLanguage } = useLanguage();
  const { addExperience } = useAuthStore();
  const { completeLesson, updateCorrectRate } = useProgressStore();

  const currentLanguage = language || selectedLanguage?.code || 'english';
  const course = courses.find(c => c.language === currentLanguage);

  const allLessons = course?.units.flatMap(u => u.lessons.filter(l => l.type === 'vocabulary')) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speaking, setSpeaking] = useState<string | null>(null);

  const currentLesson = allLessons[currentIndex];
  const content = currentLesson?.content as VocabularyContent;
  const words = content?.words || [];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    if (words.length > 0 && currentWordIndex >= words.length && !isCompleted) {
      // Lesson completed
      const correctRate = (knownWords.length / words.length) * 100;
      if (currentLesson) {
        completeLesson(currentLanguage, currentLesson.id);
        updateCorrectRate(currentLanguage, 'vocabulary', correctRate);
        addExperience(currentLesson.expReward + (correctRate === 100 ? 10 : 0));
        showToast('success', `完成！掌握 ${knownWords.length}/${words.length} 个单词`);
      }
      setIsCompleted(true);
    }
  }, [currentWordIndex, words.length, isCompleted, knownWords.length, currentLesson, currentLanguage, completeLesson, updateCorrectRate, addExperience]);

  const handleKnown = () => {
    if (currentWord) {
      setKnownWords([...knownWords, currentWord.id]);
    }
    setIsFlipped(false);
    setCurrentWordIndex(prev => prev + 1);
  };

  const handleUnknown = () => {
    if (currentWord) {
      setUnknownWords([...unknownWords, currentWord.id]);
    }
    setIsFlipped(false);
    setCurrentWordIndex(prev => prev + 1);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'japanese' ? 'ja-JP' : currentLanguage === 'korean' ? 'ko-KR' : 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
      setSpeaking(text);
      setTimeout(() => setSpeaking(null), 1000);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCurrentWordIndex(0);
    setKnownWords([]);
    setUnknownWords([]);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  if (!course) {
    return <Navigate to="/" replace />;
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">暂无单词内容</p>
      </div>
    );
  }

  if (isCompleted) {
    const correctRate = Math.round((knownWords.length / words.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center animate-bounce-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-success to-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">单元完成！</h2>
          <p className="text-gray-500 mb-6">你已掌握 {knownWords.length} / {words.length} 个单词</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-success">认识: {knownWords.length}</span>
              <span className="text-error">不认识: {unknownWords.length}</span>
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
              再学一遍
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="gradient-bg py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">单词记忆</p>
              <h1 className="text-xl font-bold text-white">{course.languageName} 词汇</h1>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">进度</p>
              <p className="text-white font-bold">{currentWordIndex + 1} / {words.length}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Flash Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div 
          className={`card-flip ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="card-flip-inner">
            {/* Front */}
            <div className="card-flip-front shadow-lg">
              <button
                onClick={(e) => { e.stopPropagation(); handleSpeak(currentWord.term); }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Volume2 className={`w-6 h-6 ${speaking === currentWord.term ? 'text-accent' : 'text-gray-400'}`} />
              </button>
              <p className="text-4xl font-bold text-primary dark:text-white mb-4">{currentWord.term}</p>
              <p className="text-gray-400 text-sm">点击卡片查看释义</p>
            </div>
            {/* Back */}
            <div className="card-flip-back shadow-lg">
              <p className="text-3xl font-bold text-white mb-4">{currentWord.translation}</p>
              <p className="text-white/60 mb-2">/{currentWord.pronunciation}/</p>
              <div className="mt-4 p-4 bg-white/10 rounded-xl w-full">
                <p className="text-white/80 text-sm mb-1">例句</p>
                <p className="text-white">{currentWord.example}</p>
                <p className="text-white/60 text-sm mt-1">{currentWord.exampleTranslation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleUnknown}
            className="flex-1 py-4 bg-error/10 text-error rounded-xl font-medium hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            不认识
          </button>
          <button
            onClick={handleKnown}
            className="flex-1 py-4 bg-success/10 text-success rounded-xl font-medium hover:bg-success/20 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            认识
          </button>
        </div>

        {/* Word List */}
        <div className="mt-8">
          <h3 className="font-bold text-primary dark:text-white mb-4">本课词汇</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {words.map((word, index) => {
              const isKnown = knownWords.includes(word.id);
              const isUnknown = unknownWords.includes(word.id);
              const isCurrent = index === currentWordIndex;
              
              return (
                <div
                  key={word.id}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isCurrent ? 'border-accent bg-accent/5' : 
                    isKnown ? 'border-success/30 bg-success/5' : 
                    isUnknown ? 'border-error/30 bg-error/5' : 
                    'border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <p className={`font-medium text-sm ${isCurrent ? 'text-accent' : 'text-gray-700 dark:text-gray-300'}`}>
                    {word.term}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{word.translation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
