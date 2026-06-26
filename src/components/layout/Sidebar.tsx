import { Link, useLocation, useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Home, BookOpen, Brain, Mic, Headphones, 
  Users, Trophy, Settings, ChevronRight, BookMarked
} from 'lucide-react';
import { courses } from '../../data/courses';

export default function Sidebar() {
  const location = useLocation();
  const { language } = useParams<{ language?: string }>();
  const { selectedLanguage } = useLanguage();

  const currentLanguage = language || selectedLanguage?.code;
  const currentCourse = courses.find(c => c.language === currentLanguage);

  const mainNav = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/community', icon: Users, label: '社区' },
    { path: '/profile', icon: Trophy, label: '成就' },
  ];

  const learnNav = [
    { path: `/learn/${currentLanguage}/vocabulary`, icon: BookOpen, label: '单词记忆' },
    { path: `/learn/${currentLanguage}/grammar`, icon: Brain, label: '语法练习' },
    { path: `/learn/${currentLanguage}/speaking`, icon: Mic, label: '口语跟读' },
    { path: `/learn/${currentLanguage}/listening`, icon: Headphones, label: '听力训练' },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-primary-dark border-r border-gray-100 dark:border-primary-light overflow-y-auto hidden lg:block">
      <div className="p-4">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-light'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Course Section */}
        {currentCourse && (
          <div className="mt-8">
            <div className="flex items-center justify-between px-4 mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                当前课程
              </h3>
            </div>
            
            <div className="px-4 py-3 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentCourse.flag}</span>
                <div>
                  <p className="font-medium text-primary dark:text-white">{currentCourse.languageName}</p>
                  <p className="text-xs text-gray-500">{currentCourse.level} · {currentCourse.levelName}</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-primary-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-success rounded-full transition-all duration-500"
                  style={{ width: `${currentCourse.units[0]?.progress || 0}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{currentCourse.units[0]?.progress || 0}% 完成</p>
            </div>

            {/* Learning Modules */}
            <nav className="space-y-1">
              {learnNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-light'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
            快速链接
          </h3>
          <nav className="space-y-1">
            <Link
              to="/bookmarks"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-light transition-all duration-200"
            >
              <BookMarked className="w-4 h-4" />
              <span className="text-sm font-medium">我的收藏</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-light transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">设置</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
