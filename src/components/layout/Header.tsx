import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useProgressStore } from '../../store/useProgressStore';
import { Flame, Bell, User, LogOut, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { dailyGoal, todayMinutes } = useProgressStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = location.pathname === '/';

  const progressPercent = Math.min((todayMinutes / dailyGoal) * 100, 100);

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/learn/english', label: '学习' },
    { path: '/community', label: '社区' },
    { path: '/profile', label: '我的' },
  ];

  const notifications = [
    { id: 1, text: '今日挑战还剩2小时！完成获得双倍经验', type: 'challenge' },
    { id: 2, text: '你的连续学习天数已达3天，继续加油！', type: 'streak' },
    { id: 3, text: '新课程「日语初级会话」已上线', type: 'new' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 dark:bg-primary-dark/95 dark:border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-serif font-bold text-xl text-primary dark:text-cream hidden sm:block">
              LinguaFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path 
                    ? 'text-accent' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {/* Daily Progress */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-primary-light rounded-full">
                  <Flame className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {todayMinutes}/{dailyGoal}分钟
                  </span>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-success rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Notification Bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-light transition-colors relative"
                  >
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
                  </button>
                  {notificationOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-primary-light rounded-xl shadow-xl border border-gray-100 dark:border-primary overflow-hidden animate-slide-up z-50">
                      <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-medium text-sm text-primary dark:text-white">通知</p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className="p-3 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{n.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-primary-light transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.nickname}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-primary-light shadow-md"
                    />
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.nickname}
                    </span>
                  </button>
                  
                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-primary-light rounded-xl shadow-xl border border-gray-100 dark:border-primary z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.nickname}</p>
                        <p className="text-xs text-gray-500">Lv.{user.level} · {user.exp}EXP</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <User className="w-4 h-4" />
                        个人中心
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-error/5"
                      >
                        <LogOut className="w-4 h-4" />
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent transition-colors">
                  登录
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  注册
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-light"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-primary-light animate-slide-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
