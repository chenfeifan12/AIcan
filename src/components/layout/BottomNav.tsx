import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/community', icon: Users, label: '社区' },
  { path: '/profile', icon: User, label: '我的' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-primary-dark border-t border-gray-100 dark:border-primary-light lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200 ${
                isActive ? 'text-accent' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-accent/10' : ''
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
