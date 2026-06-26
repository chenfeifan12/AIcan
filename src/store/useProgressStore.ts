import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

interface LanguageProgress {
  language: string;
  completedLessons: string[];
  correctRate: {
    vocabulary: number;
    grammar: number;
    speaking: number;
    listening: number;
  };
  totalTime: number;
  lastStudyDate: string;
  currentStreak: number;
}

interface ProgressState {
  progress: Record<string, LanguageProgress>;
  dailyGoal: number;
  todayMinutes: number;
  
  completeLesson: (language: string, lessonId: string, score?: number) => void;
  updateCorrectRate: (language: string, module: 'vocabulary' | 'grammar' | 'speaking' | 'listening', rate: number) => void;
  addStudyTime: (minutes: number) => void;
  setDailyGoal: (minutes: number) => void;
  getProgress: (language: string) => LanguageProgress | null;
  updateStreak: (language: string) => void;
}

const createInitialProgress = (language: string): LanguageProgress => ({
  language,
  completedLessons: [],
  correctRate: {
    vocabulary: 0,
    grammar: 0,
    speaking: 0,
    listening: 0
  },
  totalTime: 0,
  lastStudyDate: '',
  currentStreak: 0
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      dailyGoal: 30,
      todayMinutes: 0,

      completeLesson: (language, lessonId, score) => {
        const { progress } = get();
        const langProgress = progress[language] || createInitialProgress(language);
        
        if (!langProgress.completedLessons.includes(lessonId)) {
          set({
            progress: {
              ...progress,
              [language]: {
                ...langProgress,
                completedLessons: [...langProgress.completedLessons, lessonId],
                lastStudyDate: new Date().toISOString().split('T')[0]
              }
            }
          });
        }
      },

      updateCorrectRate: (language, module, rate) => {
        const { progress } = get();
        const langProgress = progress[language] || createInitialProgress(language);
        
        set({
          progress: {
            ...progress,
            [language]: {
              ...langProgress,
              correctRate: {
                ...langProgress.correctRate,
                [module]: rate
              }
            }
          }
        });
      },

      addStudyTime: (minutes) => {
        const { todayMinutes } = get();
        set({ todayMinutes: todayMinutes + minutes });
      },

      setDailyGoal: (minutes) => {
        set({ dailyGoal: minutes });
      },

      getProgress: (language) => {
        return get().progress[language] || null;
      },

      updateStreak: (language) => {
        const { progress } = get();
        const langProgress = progress[language] || createInitialProgress(language);
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        let newStreak = langProgress.currentStreak;
        if (langProgress.lastStudyDate === yesterday) {
          newStreak += 1;
        } else if (langProgress.lastStudyDate !== today) {
          newStreak = 1;
        }
        
        set({
          progress: {
            ...progress,
            [language]: {
              ...langProgress,
              currentStreak: newStreak,
              lastStudyDate: today
            }
          }
        });
      }
    }),
    {
      name: 'progress-storage'
    }
  )
);
