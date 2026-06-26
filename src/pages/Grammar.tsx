import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { courses, GrammarContent, GrammarExercise } from '../data/courses';
import { showToast } from '../components/common/Toast';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Home, Brain } from 'lucide-react';

export default function Grammar() {
  const { language, module } = useParams<{ language: string; module: string }>();
  const { selectedLanguage } = useLanguage();
  const { addExperience } = useAuthStore();
  const { completeLesson, updateCorrectRate } = useProgressStore();

  const currentLanguage = language || selectedLanguage?.code || 'english';
  const course = courses.find(c => c.language === currentLanguage);

  const allLessons = course?.units.flatMap(u => u.lessons.filter(l => l.type === 'grammar')) || [];
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentLesson = allLessons[currentLessonIndex];
  const content = currentLesson?.content as GrammarContent;
  const exercises = content?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    if (exercises.length > 0 && currentExerciseIndex >= exercises.length && !isCompleted) {
      const correctRate = (correctCount / exercises.length) * 100;
      if (currentLesson) {
        completeLesson(currentLanguage, currentLesson.id);
        updateCorrectRate(currentLanguage, 'grammar', correctRate);
        addExperience(currentLesson.expReward + (correctRate === 100 ? 10 : 0));
        showToast('success', `语法练习完成！正确率 ${Math.round(correctRate)}%`);
      }
      setIsCompleted(true);
    }
  }, [currentExerciseIndex, exercises.length, isCompleted, correctCount, currentLesson, currentLanguage, completeLesson, updateCorrectRate, addExperience]);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentExercise.correctAnswer) {
      setIsCorrect(true);
      setCorrectCount(prev => prev + 1);
    } else {
      setIsCorrect(false);
      setWrongCount(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setCurrentExerciseIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentLessonIndex(0);
    setCurrentExerciseIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsCompleted(false);
    setShowExplanation(false);
  };

  if (!course || module !== 'grammar') {
    return <Navigate to={`/learn/${currentLanguage}`} replace />;
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无语法练习内容</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const correctRate = Math.round((correctCount / exercises.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center animate-bounce-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">语法练习完成！</h2>
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
              <p className="text-white/60 text-sm">语法练习</p>
              <h1 className="text-xl font-bold text-white">{course.languageName} 语法</h1>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">进度</p>
              <p className="text-white font-bold">{currentExerciseIndex + 1} / {exercises.length}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grammar Rules */}
        {content?.rules && content.rules.length > 0 && currentExerciseIndex === 0 && (
          <div className="card p-6 mb-8">
            <h3 className="font-bold text-lg text-primary dark:text-white mb-4">语法规则</h3>
            {content.rules.map(rule => (
              <div key={rule.id} className="mb-4 last:mb-0">
                <h4 className="font-medium text-accent mb-2">{rule.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{rule.explanation}</p>
                <div className="space-y-1">
                  {rule.examples.map((example, i) => (
                    <p key={i} className="text-sm bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300">
                      {example}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exercise */}
        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
              第 {currentExerciseIndex + 1} 题
            </span>
            <h2 className="text-xl font-bold text-primary dark:text-white">{currentExercise.question}</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentExercise.options.map((option, index) => {
              let buttonClass = 'border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20';
              if (selectedAnswer) {
                if (option === currentExercise.correctAnswer) {
                  buttonClass = 'border-2 border-success bg-success/10 text-success';
                } else if (option === selectedAnswer && selectedAnswer !== currentExercise.correctAnswer) {
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

          {showExplanation && (
            <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-success/10 border border-success/30' : 'bg-error/10 border border-error/30'}`}>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentExercise.explanation}</p>
            </div>
          )}

          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {currentExerciseIndex < exercises.length - 1 ? '下一题' : '查看结果'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < currentExerciseIndex 
                  ? 'bg-success scale-100' 
                  : index === currentExerciseIndex && selectedAnswer
                    ? isCorrect ? 'bg-success' : 'bg-error'
                    : index === currentExerciseIndex
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