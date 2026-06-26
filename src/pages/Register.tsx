import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Check } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const getPasswordStrength = () => {
    if (password.length === 0) return { level: 0, text: '', color: '' };
    if (password.length < 6) return { level: 1, text: '太短', color: 'bg-error' };
    if (password.length < 10) return { level: 2, text: '中等', color: 'bg-yellow-500' };
    return { level: 3, text: '强', color: 'bg-success' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !nickname || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password.length < 6) {
      setError('密码至少6位');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }

    setIsLoading(true);
    try {
      const success = await register(email, nickname, password);
      if (success) {
        navigate('/');
      } else {
        setError('注册失败，请稍后重试');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-accent/80 to-accent">
        <div className="text-center text-white p-8">
          <div className="w-64 h-64 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center animate-float">
            <span className="text-8xl">📚</span>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">加入 LinguaFlow</h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">
            开启你的多语言学习之旅，与全球学习者一起进步
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold">28K+</p>
              <p className="text-sm text-white/60">学习者</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">3</p>
              <p className="text-sm text-white/60">语种</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">95%</p>
              <p className="text-sm text-white/60">好评率</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <span className="font-serif font-bold text-2xl text-primary">LinguaFlow</span>
          </Link>

          <h1 className="text-3xl font-serif font-bold text-primary mb-2">创建账号</h1>
          <p className="text-gray-500 mb-8">开始你的语言学习之旅</p>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                昵称
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="选择一个昵称"
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少6位字符"
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${(strength.level / 3) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{strength.text}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className={`input-field pl-12 ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-error focus:border-error focus:ring-error/20' 
                      : confirmPassword 
                        ? 'border-success focus:border-success' 
                        : ''
                  }`}
                />
                {confirmPassword && (
                  <Check className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    password === confirmPassword ? 'text-success' : 'text-error'
                  }`} />
                )}
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-error">两次密码输入不一致</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                我已阅读并同意{' '}
                <a href="#" className="text-accent hover:underline">服务条款</a>
                {' '}和{' '}
                <a href="#" className="text-accent hover:underline">隐私政策</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  注册中...
                </>
              ) : (
                '创建账号'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-500">
            已有账号？{' '}
            <Link to="/login" className="text-accent font-medium hover:underline">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
