import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { achievements, rarityColors } from '../data/achievements';
import { courses, getAvailableLanguages } from '../data/courses';
import ProgressRing from '../components/common/ProgressRing';
import ProgressBar from '../components/common/ProgressBar';
import { 
  Flame, Trophy, Calendar, Target, Zap, 
  BookOpen, Mic, Headphones, Brain, 
  Settings, ChevronRight, Share2, Award, CheckCircle, Clock
} from 'lucide-react';

export default function Profile() {
  const { user, isAuthenticated } = useAuthStore();
  const { dailyGoal, todayMinutes, progress } = useProgressStore();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">登录后查看学习数据</p>
          <Link to="/login" className="btn-primary">去登录</Link>
        </div>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => user.achievements.includes(a.id));
  const lockedAchievements = achievements.filter(a => !user.achievements.includes(a.id));
  const expToNextLevel = 100 - (user.exp % 100);
  const levelProgress = (user.exp % 100);

  const stats = [
    { label: '连续学习', value: `${user.streak}天`, icon: Flame, color: 'text-accent' },
    { label: '今日学习', value: `${todayMinutes}分钟`, icon: Target, color: 'text-success' },
    { label: '获得成就', value: `${unlockedAchievements.length}`, icon: Trophy, color: 'text-gold' },
    { label: '总经验值', value: `${user.exp}`, icon: Zap, color: 'text-purple-500' },
  ];

  const correctRates = progress['english']?.correctRate || { vocabulary: 0, grammar: 0, speaking: 0, listening: 0 };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="gradient-bg py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-slide-up">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.nickname} 
                className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl" 
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {user.level}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{user.nickname}</h1>
              <p className="text-white/70">加入于 {new Date(user.joinDate).toLocaleDateString()}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Flame className="w-4 h-4" />
                  {user.streak}天连续
                </div>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Award className="w-4 h-4" />
                  {unlockedAchievements.length}成就
                </div>
              </div>
            </div>
            <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Progress */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg text-primary dark:text-white">等级 Lv.{user.level}</h2>
              <p className="text-sm text-gray-500">距离下一等级还需 {expToNextLevel} EXP</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-accent">{user.exp % 100}/100</p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-success rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="card p-4 text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-primary dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Daily Goal */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-primary dark:text-white">今日目标</h2>
            <span className="badge badge-accent">{todayMinutes}/{dailyGoal}分钟</span>
          </div>
          <div className="flex items-center justify-center">
            <ProgressRing 
              progress={Math.min((todayMinutes / dailyGoal) * 100, 100)} 
              size={160} 
              strokeWidth={12}
              color={todayMinutes >= dailyGoal ? '#4ecdc4' : '#ff6b35'}
            >
              <div className="text-center">
                {todayMinutes >= dailyGoal ? (
                  <>
                    <Trophy className="w-8 h-8 text-success mx-auto mb-1" />
                    <p className="text-sm font-medium text-success">已达成!</p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-primary dark:text-white">{todayMinutes}</p>
                    <p className="text-sm text-gray-500">分钟</p>
                  </>
                )}
              </div>
            </ProgressRing>
          </div>
        </div>

        {/* Module Progress */}
        <div className="card p-6 mb-8 animate-slide-up">
          <h2 className="font-bold text-lg text-primary dark:text-white mb-6">模块正确率</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: '单词记忆', value: correctRates.vocabulary, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
              { label: '语法练习', value: correctRates.grammar, icon: Brain, color: 'from-purple-500 to-pink-500' },
              { label: '口语跟读', value: correctRates.speaking, icon: Mic, color: 'from-orange-500 to-red-500' },
              { label: '听力训练', value: correctRates.listening, icon: Headphones, color: 'from-green-500 to-emerald-500' },
            ].map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.label} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{module.label}</span>
                      <span className="font-medium text-primary dark:text-white">{module.value}%</span>
                    </div>
                    <ProgressBar value={module.value} size="sm" color={module.value >= 80 ? 'success' : 'accent'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'stats' 
                ? 'bg-accent text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            学习统计
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'achievements' 
                ? 'bg-accent text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            成就徽章
          </button>
        </div>

        {activeTab === 'stats' ? (
          /* Learning Records */
          <div className="space-y-4">
            {getAvailableLanguages().map(lang => {
              const course = courses.find(c => c.language === lang.code);
              if (!course) return null;
              const courseProgress = progress[course.language];
              const completedLessons = courseProgress?.completedLessons?.length || 0;
              const totalLessons = course.units.reduce((acc, u) => acc + u.lessons.length, 0);
              const coursePercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
              return (
                <Link
                  key={course.id}
                  to={`/learn/${course.language}`}
                  className="card p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-primary-light/50 transition-colors"
                >
                  <span className="text-3xl">{course.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-primary dark:text-white">{course.languageName}</h3>
                      <span className="text-sm text-gray-500">{course.level} · {course.levelName}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent to-success rounded-full transition-all"
                          style={{ width: `${coursePercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{Math.round(coursePercent)}%</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {completedLessons}/{totalLessons} 课
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {courseProgress?.totalTime || 0}分钟
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {courseProgress?.currentStreak || 0}天
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
          </div>
        ) : (
          /* Achievements Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...unlockedAchievements, ...lockedAchievements].map((achievement, index) => {
              const isUnlocked = unlockedAchievements.includes(achievement);
              const colors = rarityColors[achievement.rarity];
              
              return (
                <div
                  key={achievement.id}
                  className={`card p-4 text-center relative animate-slide-up ${!isUnlocked ? 'opacity-50' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-gray-900/50 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl opacity-30">🔒</span>
                    </div>
                  )}
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}>
                    <Award className={`w-7 h-7 ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="font-bold text-sm text-primary dark:text-white mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{achievement.description}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                    achievement.rarity === 'legendary' ? 'bg-amber-100 text-amber-700' :
                    achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                    achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {achievement.rarity === 'legendary' ? '传说' : achievement.rarity === 'epic' ? '史诗' : achievement.rarity === 'rare' ? '稀有' : '普通'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
