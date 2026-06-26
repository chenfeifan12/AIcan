export interface PostComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  language: string;
  content: string;
  type: 'study_tip' | 'question' | 'achievement' | 'daily';
  likes: number;
  comments: PostComment[];
  createdAt: string;
  isLiked: boolean;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  postCount: number;
  icon: string;
}

export const topics: Topic[] = [
  { id: 't1', name: '英语学习', description: '英语学习技巧与经验分享', postCount: 1250, icon: '🇬🇧' },
  { id: 't2', name: '日语学习', description: '日语能力考试JLPT讨论', postCount: 890, icon: '🇯🇵' },
  { id: 't3', name: '韩语学习', description: '韩语TOPIK备考交流', postCount: 670, icon: '🇰🇷' },
  { id: 't4', name: '学习方法', description: '高效语言学习方法探讨', postCount: 2100, icon: '📚' },
  { id: 't5', name: '留学移民', description: '语言考试与留学准备', postCount: 430, icon: '✈️' },
  { id: 't6', name: '文化交流', description: '语言背后的文化故事', postCount: 780, icon: '🌍' },
];

export const posts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: 'Sarah学英语',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    language: 'english',
    content: '🎉 终于通过了CET-6考试！分享我的备考经验：每天早晚各30分钟听力训练，配合真题练习，效果真的很明显！',
    type: 'achievement',
    likes: 234,
    isLiked: false,
    comments: [
      {
        id: 'c1',
        userId: 'u2',
        userName: '英语爱好者',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        content: '恭喜恭喜！请问用的什么听力材料？',
        createdAt: '2024-01-15T10:30:00Z'
      }
    ],
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: 'p2',
    userId: 'u3',
    userName: '日语小白进化中',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
    language: 'japanese',
    content: '📝 今日学习打卡：五十音图终于背下来了！推荐用「日语五十音图app」练习发音，交互设计很友好～',
    type: 'daily',
    likes: 89,
    isLiked: true,
    comments: [],
    createdAt: '2024-01-14T21:00:00Z'
  },
  {
    id: 'p3',
    userId: 'u4',
    userName: '韩语打卡小组',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minji',
    language: 'korean',
    content: '❓ 求问：TOPIK II 写作部分有什么技巧吗？每次时间都不够用😢',
    type: 'question',
    likes: 56,
    isLiked: false,
    comments: [
      {
        id: 'c2',
        userId: 'u5',
        userName: '韩语外教',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TeacherKim',
        content: '建议先列提纲再写作，控制好每部分的时间分配。',
        createdAt: '2024-01-14T19:30:00Z'
      }
    ],
    createdAt: '2024-01-14T18:00:00Z'
  },
  {
    id: 'p4',
    userId: 'u6',
    userName: '多语言学习者',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Poly',
    language: 'english',
    content: '💡 背单词小技巧：不要孤立背单词，要放在例句和语境中记忆。推荐「间隔重复法」，利用遗忘曲线科学复习！',
    type: 'study_tip',
    likes: 312,
    isLiked: true,
    comments: [],
    createdAt: '2024-01-14T12:00:00Z'
  }
];
