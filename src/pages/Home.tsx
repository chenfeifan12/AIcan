import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { courses } from '../data/courses';
import ProgressRing from '../components/common/ProgressRing';
import { 
  Zap, Users, Award, Clock, ChevronRight, Play, 
  Target, TrendingUp, Flame, Star, Globe, BookOpen, Mic, Headphones, Brain
} from 'lucide-react';

export default function Home() {
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();
  const { user, isAuthenticated } = useAuthStore();
  const { dailyGoal, todayMinutes } = useProgressStore();
  const navigate = useNavigate();

  const progressPercent = Math.min((todayMinutes / dailyGoal) * 100, 100);

  const features = [
    { icon: BookOpen, title: '智能单词卡', desc: '科学记忆曲线', color: 'from-blue-500 to-cyan-500' },
    { icon: Brain, title: '语法精讲', desc: '系统化学习', color: 'from-purple-500 to-pink-500' },
    { icon: Mic, title: '口语跟读', desc: 'AI语音评测', color: 'from-orange-500 to-red-500' },
    { icon: Headphones, title: '听力训练', desc: '原版音频材料', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary-dark">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-success/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm text-white/90">开启你的语言学习之旅</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                环球语言
                <span className="block text-accent">学府</span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
                融合AI技术打造沉浸式语言学习体验，支持英语、日语、韩语等多语种学习，
                让语言学习变得有趣且高效。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isAuthenticated ? (
                  <Link to="/learn/english" className="btn-primary flex items-center justify-center gap-2 text-lg">
                    <Play className="w-5 h-5" />
                    继续学习
                  </Link>
                ) : (
                  <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-lg">
                    <Zap className="w-5 h-5" />
                    免费开始
                  </Link>
                )}
                <Link to="/community" className="btn-outline border-white text-white hover:bg-white hover:text-primary flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  加入社区
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-white mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-2xl font-bold">28K+</span>
                  </div>
                  <p className="text-sm text-white/60">学习者</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-white mb-1">
                    <Globe className="w-4 h-4" />
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <p className="text-sm text-white/60">语种</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-white mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-2xl font-bold">95%</span>
                  </div>
                  <p className="text-sm text-white/60">好评率</p>
                </div>
              </div>
            </div>

            {/* Right - Daily Progress Card */}
            {isAuthenticated && user && (
              <div className="flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="glass-card p-8 w-full max-w-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <img src={user.avatar} alt={user.nickname} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-medium text-primary dark:text-white">{user.nickname}</p>
                      <p className="text-sm text-gray-500">Lv.{user.level} · {user.streak}天连续</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center mb-6">
                    <ProgressRing progress={progressPercent} size={140} strokeWidth={12} color="#ff6b35">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary dark:text-white">{todayMinutes}</p>
                        <p className="text-sm text-gray-500">/ {dailyGoal}分钟</p>
                      </div>
                    </ProgressRing>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 bg-accent/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium text-primary dark:text-white">今日目标</span>
                    </div>
                    <span className="text-sm text-accent font-medium">
                      {todayMinutes >= dailyGoal ? '已达成!' : '进行中'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-12 sm:py-16 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">选择你的学习语言</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              从主流语言开始，开启你的语言学习之旅。每个语种都配备了完整的学习路径和互动练习。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {availableLanguages.map((lang, index) => (
              <LanguageCard 
                key={lang.code} 
                language={lang} 
                course={courses.find(c => c.language === lang.code)}
                index={index}
                onSelect={() => { setSelectedLanguage(lang); navigate(`/learn/${lang.code}`); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-cream dark:bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">沉浸式学习体验</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              多种互动学习模块，让语言学习不再枯燥
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="card p-6 text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-primary dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="py-12 sm:py-16 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-accent to-accent-dark rounded-3xl p-6 lg:p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">每日挑战</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  完成挑战赢取双倍经验
                </h2>
                <p className="text-white/80 mb-8">
                  今日挑战：完成任意课程的一节课程，即可获得双倍经验值奖励！
                </p>
                <Link 
                  to={isAuthenticated ? "/learn/english" : "/register"}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Target className="w-5 h-5" />
                  立即挑战
                </Link>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-6xl font-bold text-white mb-2">2x</div>
                  <p className="text-white/80">经验加成</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-white/60 mx-auto mb-1" />
                      <p className="text-sm text-white/60">剩余时间</p>
                      <p className="text-lg font-bold text-white">12:34:56</p>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div className="text-center">
                      <TrendingUp className="w-6 h-6 text-white/60 mx-auto mb-1" />
                      <p className="text-sm text-white/60">已参与</p>
                      <p className="text-lg font-bold text-white">1,234</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
            准备好开始你的语言学习之旅了吗？
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            加入 28,000+ 学习者，开始你的多语言学习之路
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg py-4 px-8">
              立即注册 · 免费学习
            </Link>
            <Link to="/learn/english" className="bg-white/10 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-xl hover:bg-white/20 transition-colors">
              了解更多
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function LanguageCard({ language, course, index, onSelect }: { 
  language: { code: string; name: string; flag: string; color: string }; 
  course?: typeof courses[0];
  index: number;
  onSelect: () => void;
}) {
  return (
    <div 
      className="card p-6 cursor-pointer group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
          {language.flag}
        </span>
        <div>
          <h3 className="font-bold text-xl text-primary dark:text-white">{language.name}</h3>
          <p className="text-sm text-gray-500">{language.code}</p>
        </div>
      </div>
      
      {course && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{course.level} · {course.levelName}</span>
            <span className="badge badge-accent">{course.units[0]?.progress || 0}% 完成</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-success rounded-full transition-all duration-500"
              style={{ width: `${course.units[0]?.progress || 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{course.totalHours}小时课程</span>
            <span>{course.enrolledCount.toLocaleString()}人学习</span>
          </div>
        </div>
      )}

      <button 
        onClick={(e) => { e.stopPropagation(); navigate(`/learn/${language.code}`); }}
        className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-primary/5 dark:bg-white/5 rounded-xl text-primary dark:text-white font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300"
      >
        开始学习
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
