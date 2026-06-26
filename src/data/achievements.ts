export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  condition: {
    type: string;
    target: number;
  };
}

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    name: '第一步',
    description: '完成你的第一节课程',
    icon: 'Footprints',
    rarity: 'common',
    condition: { type: 'lessons_completed', target: 1 }
  },
  {
    id: 'vocab-master',
    name: '词汇大师',
    description: '学习100个新单词',
    icon: 'BookOpen',
    rarity: 'rare',
    condition: { type: 'words_learned', target: 100 }
  },
  {
    id: 'streak-7',
    name: '连续7天',
    description: '保持连续7天学习',
    icon: 'Flame',
    rarity: 'rare',
    condition: { type: 'streak_days', target: 7 }
  },
  {
    id: 'streak-30',
    name: '坚持一个月',
    description: '保持连续30天学习',
    icon: 'Calendar',
    rarity: 'epic',
    condition: { type: 'streak_days', target: 30 }
  },
  {
    id: 'perfect-score',
    name: '满分达成',
    description: '在任意练习中获得100%正确率',
    icon: 'Trophy',
    rarity: 'rare',
    condition: { type: 'perfect_score', target: 1 }
  },
  {
    id: 'polyglot',
    name: '多语言达人',
    description: '同时学习3种或更多语言',
    icon: 'Globe',
    rarity: 'epic',
    condition: { type: 'languages_count', target: 3 }
  },
  {
    id: 'night-owl',
    name: '夜猫子',
    description: '在午夜后完成一次学习',
    icon: 'Moon',
    rarity: 'common',
    condition: { type: 'night_study', target: 1 }
  },
  {
    id: 'early-bird',
    name: '早起鸟',
    description: '在早上6点前开始学习',
    icon: 'Sunrise',
    rarity: 'common',
    condition: { type: 'early_study', target: 1 }
  },
  {
    id: 'grammar-guru',
    name: '语法大师',
    description: '完成所有语法练习',
    icon: 'GraduationCap',
    rarity: 'epic',
    condition: { type: 'grammar_completed', target: 50 }
  },
  {
    id: 'speak-up',
    name: '开口说',
    description: '完成10次口语练习',
    icon: 'Mic',
    rarity: 'rare',
    condition: { type: 'speaking_practice', target: 10 }
  },
  {
    id: '听力达人',
    name: '听力达人',
    description: '完成20次听力训练',
    icon: 'Headphones',
    rarity: 'rare',
    condition: { type: 'listening_practice', target: 20 }
  },
  {
    id: 'legendary',
    name: '语言大师',
    description: '达到C2级别',
    icon: 'Crown',
    rarity: 'legendary',
    condition: { type: 'reach_level', target: 6 }
  }
];

export const rarityColors: Record<Achievement['rarity'], { bg: string; border: string; glow: string }> = {
  common: { bg: 'bg-gray-100', border: 'border-gray-300', glow: 'shadow-gray-300' },
  rare: { bg: 'bg-blue-100', border: 'border-blue-400', glow: 'shadow-blue-400' },
  epic: { bg: 'bg-purple-100', border: 'border-purple-400', glow: 'shadow-purple-400' },
  legendary: { bg: 'bg-amber-100', border: 'border-amber-400', glow: 'shadow-amber-400' }
};
