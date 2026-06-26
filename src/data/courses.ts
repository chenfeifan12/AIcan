export interface Lesson {
  id: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  title: string;
  content: VocabularyContent | GrammarContent | SpeakingContent | ListeningContent;
  completed: boolean;
  expReward: number;
}

export interface VocabularyContent {
  words: Word[];
}

export interface Word {
  id: string;
  term: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
}

export interface GrammarContent {
  rules: GrammarRule[];
  exercises: GrammarExercise[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SpeakingContent {
  prompt: string;
  targetSentence: string;
  allowedAttempts: number;
}

export interface ListeningContent {
  audioUrl: string;
  transcript: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
}

export interface Course {
  id: string;
  language: 'english' | 'japanese' | 'korean';
  languageName: string;
  flag: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  levelName: string;
  description: string;
  units: Unit[];
  totalHours: number;
  enrolledCount: number;
  color: string;
}

export const courses: Course[] = [
  {
    id: 'en-a1',
    language: 'english',
    languageName: '英语',
    flag: '🇬🇧',
    level: 'A1',
    levelName: '初学者',
    description: '从零开始学习基础英语，掌握日常问候和简单交流',
    totalHours: 40,
    enrolledCount: 12580,
    color: '#4ecdc4',
    units: [
      {
        id: 'en-a1-u1',
        title: '打招呼与自我介绍',
        description: '学习如何用英语打招呼和介绍自己',
        progress: 60,
        lessons: [
          {
            id: 'en-a1-u1-l1',
            type: 'vocabulary',
            title: '基础问候语',
            completed: true,
            expReward: 20,
            content: {
              words: [
                { id: 'w1', term: 'Hello', translation: '你好', pronunciation: '/həˈloʊ/', example: 'Hello, how are you?', exampleTranslation: '你好，你好吗？' },
                { id: 'w2', term: 'Good morning', translation: '早上好', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/', example: 'Good morning, everyone!', exampleTranslation: '大家早上好！' },
                { id: 'w3', term: 'Good night', translation: '晚安', pronunciation: '/ɡʊd naɪt/', example: 'Good night, sweet dreams!', exampleTranslation: '晚安，好梦！' },
                { id: 'w4', term: 'Thank you', translation: '谢谢你', pronunciation: '/θæŋk juː/', example: 'Thank you for your help.', exampleTranslation: '谢谢你的帮助。' },
                { id: 'w5', term: 'Please', translation: '请', pronunciation: '/pliːz/', example: 'Please sit down.', exampleTranslation: '请坐下。' },
              ]
            }
          },
          {
            id: 'en-a1-u1-l2',
            type: 'grammar',
            title: 'be动词用法',
            completed: true,
            expReward: 25,
            content: {
              rules: [
                {
                  id: 'g1',
                  title: 'be动词的基本形式',
                  explanation: 'be动词有三种形式：am, is, are。I后用am，he/she/it后用is，you/we/they后用are。',
                  examples: ['I am a student.', 'She is a teacher.', 'They are friends.']
                }
              ],
              exercises: [
                {
                  id: 'ge1',
                  question: '选择正确的be动词：I ___ a student.',
                  options: ['am', 'is', 'are'],
                  correctAnswer: 'am',
                  explanation: '第一人称单数I后用am。'
                },
                {
                  id: 'ge2',
                  question: '选择正确的be动词：He ___ from China.',
                  options: ['am', 'is', 'are'],
                  correctAnswer: 'is',
                  explanation: '第三人称单数he后用is。'
                }
              ]
            }
          },
          {
            id: 'en-a1-u1-l3',
            type: 'speaking',
            title: '自我介绍练习',
            completed: false,
            expReward: 30,
            content: {
              prompt: '请用英语做一个简单的自我介绍，包括你的名字、国籍和职业。',
              targetSentence: 'My name is Li Ming. I am from China. I am a student.',
              allowedAttempts: 3
            }
          },
          {
            id: 'en-a1-u1-l4',
            type: 'listening',
            title: '日常对话听力',
            completed: false,
            expReward: 25,
            content: {
              audioUrl: '',
              transcript: 'A: Good morning! B: Good morning! A: How are you? B: I am fine, thank you. And you? A: I am good too!',
              questions: [
                {
                  id: 'lq1',
                  question: '他们在什么时间打招呼？',
                  options: ['早上', '下午', '晚上'],
                  correctAnswer: '早上'
                },
                {
                  id: 'lq2',
                  question: 'B感觉怎么样？',
                  options: ['很好', '不好', '不知道'],
                  correctAnswer: '很好'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'en-a1-u2',
        title: '数字与时间',
        description: '学习1-100的数字表达和时间的问法',
        progress: 30,
        lessons: [
          {
            id: 'en-a1-u2-l1',
            type: 'vocabulary',
            title: '数字1-20',
            completed: true,
            expReward: 20,
            content: {
              words: [
                { id: 'n1', term: 'One', translation: '一', pronunciation: '/wʌn/', example: 'One apple.', exampleTranslation: '一个苹果。' },
                { id: 'n2', term: 'Two', translation: '二', pronunciation: '/tuː/', example: 'Two books.', exampleTranslation: '两本书。' },
                { id: 'n3', term: 'Three', translation: '三', pronunciation: '/θriː/', example: 'Three cats.', exampleTranslation: '三只猫。' },
              ]
            }
          },
          {
            id: 'en-a1-u2-l2',
            type: 'vocabulary',
            title: '时间表达',
            completed: false,
            expReward: 20,
            content: {
              words: [
                { id: 't1', term: 'What time', translation: '什么时间', pronunciation: '/wɒt taɪm/', example: 'What time is it?', exampleTranslation: '现在几点了？' },
                { id: 't2', term: 'o\'clock', translation: '点钟', pronunciation: '/əˈklɒk/', example: 'It is three o\'clock.', exampleTranslation: '现在是三点。' },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'jp-a1',
    language: 'japanese',
    languageName: '日语',
    flag: '🇯🇵',
    level: 'A1',
    levelName: '初学者',
    description: '学习日语五十音图和基础会话',
    totalHours: 50,
    enrolledCount: 8920,
    color: '#ff6b35',
    units: [
      {
        id: 'jp-a1-u1',
        title: '五十音图入门',
        description: '学习日语基本假名发音',
        progress: 45,
        lessons: [
          {
            id: 'jp-a1-u1-l1',
            type: 'vocabulary',
            title: 'あ行假名',
            completed: true,
            expReward: 20,
            content: {
              words: [
                { id: 'ja1', term: 'あ', translation: 'a', pronunciation: 'ah', example: 'あおい (blue)', exampleTranslation: '蓝色的' },
                { id: 'ja2', term: 'い', translation: 'i', pronunciation: 'ee', example: 'いぬ (dog)', exampleTranslation: '狗' },
                { id: 'ja3', term: 'う', translation: 'u', pronunciation: 'oo', example: 'うみ (sea)', exampleTranslation: '大海' },
                { id: 'ja4', term: 'え', translation: 'e', pronunciation: 'eh', example: 'えき (station)', exampleTranslation: '车站' },
                { id: 'ja5', term: 'お', translation: 'o', pronunciation: 'oh', example: 'おとこ (man)', exampleTranslation: '男人' },
              ]
            }
          },
          {
            id: 'jp-a1-u1-l2',
            type: 'speaking',
            title: '日语自我介绍',
            completed: false,
            expReward: 30,
            content: {
              prompt: '请用日语做一个简单的自我介绍。',
              targetSentence: 'はじめまして。私の名前は田中です。',
              allowedAttempts: 3
            }
          }
        ]
      }
    ]
  },
  {
    id: 'kr-a1',
    language: 'korean',
    languageName: '韩语',
    flag: '🇰🇷',
    level: 'A1',
    levelName: '初学者',
    description: '学习韩文字母基础和日常表达',
    totalHours: 45,
    enrolledCount: 6540,
    color: '#1a1f3a',
    units: [
      {
        id: 'kr-a1-u1',
        title: '韩文字母 Hangul',
        description: '学习韩语基本字母发音',
        progress: 20,
        lessons: [
          {
            id: 'kr-a1-u1-l1',
            type: 'vocabulary',
            title: '基本子音',
            completed: true,
            expReward: 20,
            content: {
              words: [
                { id: 'kc1', term: 'ㄱ', translation: 'g/k', pronunciation: 'giyeok', example: '가다 (go)', exampleTranslation: '去' },
                { id: 'kc2', term: 'ㄴ', translation: 'n', pronunciation: 'nieun', example: '나 (me)', exampleTranslation: '我' },
                { id: 'kc3', term: 'ㄷ', translation: 'd/t', pronunciation: 'digeut', example: '다리 (leg)', exampleTranslation: '腿' },
              ]
            }
          }
        ]
      }
    ]
  }
];

export const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export const levelDescriptions: Record<string, { name: string; description: string }> = {
  'A1': { name: '初学者', description: '能够理解并使用日常用语和简单句子' },
  'A2': { name: '基础者', description: '能够进行简单的社交对话' },
  'B1': { name: '中级', description: '能够应对工作中简单的语言需求' },
  'B2': { name: '中高级', description: '能够流利地与母语者交流' },
  'C1': { name: '高级', description: '能够有效灵活地运用语言' },
  'C2': { name: '精通', description: '达到接近母语者的水平' },
};
