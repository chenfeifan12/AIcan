import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  level: number;
  exp: number;
  joinDate: string;
  preferredLanguages: string[];
  achievements: string[];
  streak: number;
  lastStudyDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, nickname: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addExperience: (exp: number) => void;
}

const generateUser = (email: string, nickname: string): User => ({
  id: `user_${Date.now()}`,
  email,
  nickname,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
  level: 1,
  exp: 0,
  joinDate: new Date().toISOString(),
  preferredLanguages: [],
  achievements: [],
  streak: 0,
  lastStudyDate: new Date().toISOString().split('T')[0]
});

const calculateLevel = (exp: number): number => {
  return Math.floor(exp / 100) + 1;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // 模拟登录验证
        if (email && password.length >= 6) {
          const user = generateUser(email, email.split('@')[0]);
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (email: string, nickname: string, password: string) => {
        // 模拟注册
        if (email && nickname && password.length >= 6) {
          const user = generateUser(email, nickname);
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      addExperience: (exp: number) => {
        const { user } = get();
        if (user) {
          const newExp = user.exp + exp;
          const newLevel = calculateLevel(newExp);
          set({
            user: {
              ...user,
              exp: newExp,
              level: newLevel
            }
          });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
