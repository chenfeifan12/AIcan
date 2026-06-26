import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgressStore } from '../store/useProgressStore';
import { courses, languageLevels, levelDescriptions } from '../data/courses';
import ProgressBar from '../components/common/ProgressBar';
import { 
  BookOpen, Brain, Mic, Headphones, ChevronRight, 
  Clock, Users, Award, CheckCircle, Play
} from 'lucide-react';

export default function Learn() {
  const { language } = useParams<{ language: string }>();
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();
  const { getProgress } = useProgressStore();

  const currentLanguage = language || selectedLanguage?.code || 'english';
  const course = courses.find(c => c.language === currentLanguage);

  useEffect(() => {
    const lang = availableLanguages.find(l => l.code === currentLanguage);
    if (lang) setSelectedLanguage(lang);
  }, [currentLanguage, availableLanguages, setSelectedLanguage]);
  
  if (!course) {
    return <Navigate to="/" replace />;
  }

  const progress = getProgress(currentLanguage);
  const completedCount = progress?.completedLessons.length || 0;
  const totalLessons = course.units.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const modules = [
    { 
      id: 'vocabulary', 
      name: '单词记忆', 
      icon: BookOpen, 
      color: 'from-blue-500 to-cyan-500',
      description: '智能单词卡，科学记忆',
      lessonCount: course.units.reduce((acc, u) => acc + u.lessons.filter(l => l.type === 'vocabulary').length, 0)
    },
    { 
      id: 'grammar', 
      name: '语法练习', 
      icon: Brain, 
      color: 'from-purple-500 to-pink-500',
      description: '系统化语法讲解',
      lessonCount: course.units.reduce((acc, u) => acc + u.lessons.filter(l => l.type === 'grammar').length, 0)
    },
    { 
      id: 'speaking', 
      name: '口语跟读', 
      icon: Mic, 
      color: 'from-orange-500 to-red-500',
      description: 'AI语音评测',
      lessonCount: course.units.reduce((acc, u) => acc + u.lessons.filter(l => l.type === 'speaking').length, 0)
    },
    { 
      id: 'listening', 
      name: '听力训练', 
      icon: Headphones, 
      color: 'from-green-500 to-emerald-500',
      description: '原版音频材料',
      lessonCount: course.units.reduce((acc, u) => acc + u.lessons.filter(l => l.type === 'listening').length, 0)
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="gradient-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6 animate-slide-up">
            <span className="text-6xl">{course.flag}</span>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">{course.languageName}</h1>
              <p className="text-white/70">{course.level} · {course.levelName}</p>
            </div>
          </div>

          <p className="text-white/80 max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {course.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 max-w-lg animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-white/60 mx-auto mb-1" />
              <p className="text-white font-bold">{course.totalHours}h</p>
              <p className="text-xs text-white/60">课程时长</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-white/60 mx-auto mb-1" />
              <p className="text-white font-bold">{(course.enrolledCount / 1000).toFixed(1)}K</p>
              <p className="text-xs text-white/60">学习人数</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <BookOpen className="w-5 h-5 text-white/60 mx-auto mb-1" />
              <p className="text-white font-bold">{totalLessons}</p>
              <p className="text-xs text-white/60">课程数</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <Award className="w-5 h-5 text-white/60 mx-auto mb-1" />
              <p className="text-white font-bold">{course.level}</p>
              <p className="text-xs text-white/60">CEFR等级</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Progress */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-primary dark:text-white">学习进度</h2>
            <span className="badge badge-success">{Math.round(overallProgress)}% 完成</span>
          </div>
          <ProgressBar value={overallProgress} color="accent" size="lg" />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>已完成 {completedCount} / {totalLessons} 节课程</span>
            <span>距离下一等级还需 {Math.ceil((100 - overallProgress))}%</span>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="section-title mb-6">学习模块</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const moduleProgress = progress?.correctRate[module.id as keyof typeof progress.correctRate] || 0;
              return (
                <Link
                  key={module.id}
                  to={`/learn/${currentLanguage}/${module.id}`}
                  className="card p-6 group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-primary dark:text-white mb-1">{module.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{module.lessonCount}节课程</span>
                    <div className="flex items-center gap-1 text-accent">
                      <Play className="w-3 h-3" />
                      <span className="text-xs font-medium">开始</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Course Units */}
        <div>
          <h2 className="section-title mb-6">课程单元</h2>
          <div className="space-y-4">
            {course.units.map((unit, unitIndex) => {
              const completedLessons = unit.lessons.filter(l => l.completed).length;
              const unitProgress = (completedLessons / unit.lessons.length) * 100;
              
              return (
                <div
                  key={unit.id}
                  className="card p-6 animate-slide-up"
                  style={{ animationDelay: `${unitIndex * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-primary dark:text-white">{unit.title}</h3>
                      <p className="text-sm text-gray-500">{unit.description}</p>
                    </div>
                    <span className="badge badge-accent">{unit.progress}%</span>
                  </div>

                  <ProgressBar value={unitProgress} color="success" size="sm" />

                  <div className="mt-4 space-y-2">
                    {unit.lessons.map((lesson) => {
                      const isCompleted = progress?.completedLessons.includes(lesson.id);
                      const typeColors = {
                        vocabulary: 'bg-blue-100 text-blue-600',
                        grammar: 'bg-purple-100 text-purple-600',
                        speaking: 'bg-orange-100 text-orange-600',
                        listening: 'bg-green-100 text-green-600'
                      };
                      const typeIcons = {
                        vocabulary: BookOpen,
                        grammar: Brain,
                        speaking: Mic,
                        listening: Headphones
                      };
                      const TypeIcon = typeIcons[lesson.type];
                      
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[lesson.type]}`}>
                            <TypeIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {lesson.type === 'vocabulary' && '单词'}
                              {lesson.type === 'grammar' && '语法'}
                              {lesson.type === 'speaking' && '口语'}
                              {lesson.type === 'listening' && '听力'}
                              {' '}· +{lesson.expReward}EXP
                            </p>
                          </div>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
