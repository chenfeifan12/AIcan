import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { posts, topics, Post, PostComment } from '../data/community';
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  Plus, Search, TrendingUp, Clock, Users, Filter
} from 'lucide-react';

export default function Community() {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'latest' | 'hot' | 'following'>('latest');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Record<string, PostComment[]>>(
    Object.fromEntries(posts.map(p => [p.id, p.comments]))
  );

  const filteredPosts = selectedTopic 
    ? posts.filter(p => p.language === selectedTopic)
    : posts;

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim() || !isAuthenticated) return;
    const comment: PostComment = {
      id: `c-new-${Date.now()}`,
      userId: user?.id || 'anonymous',
      userName: user?.nickname || '匿名',
      userAvatar: user?.avatar || '',
      content: newComment.trim(),
      createdAt: new Date().toISOString()
    };
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    setNewComment('');
  };

  const getLanguageTag = (lang: string) => {
    const colors: Record<string, string> = {
      english: 'bg-blue-100 text-blue-600',
      japanese: 'bg-pink-100 text-pink-600',
      korean: 'bg-purple-100 text-purple-600'
    };
    const labels: Record<string, string> = {
      english: '英语',
      japanese: '日语',
      korean: '韩语'
    };
    return { class: colors[lang] || 'bg-gray-100 text-gray-600', label: labels[lang] || lang };
  };

  const getTypeTag = (type: Post['type']) => {
    const config: Record<Post['type'], { class: string; label: string }> = {
      study_tip: { class: 'bg-success/10 text-success', label: '学习技巧' },
      question: { class: 'bg-accent/10 text-accent', label: '提问' },
      achievement: { class: 'bg-gold/20 text-amber-600', label: '成就' },
      daily: { class: 'bg-primary/10 text-primary', label: '日常' }
    };
    return config[type];
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="gradient-bg py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">学习社区</h1>
              <p className="text-white/70 text-sm mt-1">与全球学习者一起交流进步</p>
            </div>
            {isAuthenticated && (
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" />
                发布
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索话题、用户..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                { id: 'latest', label: '最新', icon: Clock },
                { id: 'hot', label: '热门', icon: TrendingUp },
                { id: 'following', label: '关注', icon: Users },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => {
                const isLiked = likedPosts.has(post.id);
                const isBookmarked = bookmarkedPosts.has(post.id);
                const langTag = getLanguageTag(post.language);
                const typeTag = getTypeTag(post.type);
                
                return (
                  <div 
                    key={post.id}
                    className="card p-5 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Post Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <img 
                        src={post.userAvatar} 
                        alt={post.userName}
                        className="w-10 h-10 rounded-full" 
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium text-primary dark:text-white">{post.userName}</span>
                          <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${langTag.class}`}>{langTag.label}</span>
                          <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${typeTag.class}`}>{typeTag.label}</span>
                        </div>
                        <p className="text-xs text-gray-400">{formatTime(post.createdAt)}</p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Post Actions */}
                    <div className="flex items-center gap-3 sm:gap-6 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          isLiked ? 'text-error' : 'text-gray-400 hover:text-error'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button 
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{(comments[post.id] || []).length}</span>
                      </button>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          isBookmarked ? 'text-accent' : 'text-gray-400 hover:text-accent'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors ml-auto">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Comments Section */}
                    {expandedPost === post.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-slide-up">
                        {(comments[post.id] || []).map(comment => (
                          <div key={comment.id} className="flex items-start gap-3 mb-3 last:mb-0">
                            <img 
                              src={comment.userAvatar} 
                              alt={comment.userName}
                              className="w-7 h-7 rounded-full mt-0.5" 
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{comment.userName}</span>
                                <span className="text-xs text-gray-400">{formatTime(comment.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                        {isAuthenticated && (
                          <div className="flex items-center gap-2 mt-3">
                            <input
                              type="text"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="写下你的评论..."
                              className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-accent"
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              disabled={!newComment.trim()}
                              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 transition-colors"
                            >
                              发送
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            {/* Topics */}
            <div className="card p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary dark:text-white">话题</h3>
                <Filter className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedTopic ? 'bg-accent/10 text-accent' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="font-medium">全部话题</span>
                </button>
                {topics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.name.toLowerCase().includes('英语') ? 'english' : 
                      topic.name.toLowerCase().includes('日语') ? 'japanese' : 
                      topic.name.toLowerCase().includes('韩语') ? 'korean' : null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                      selectedTopic === (topic.name.toLowerCase().includes('英语') ? 'english' : 
                        topic.name.toLowerCase().includes('日语') ? 'japanese' : 
                        topic.name.toLowerCase().includes('韩语') ? 'korean' : null)
                        ? 'bg-accent/10 text-accent' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xl">{topic.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-700 dark:text-gray-300">{topic.name}</p>
                      <p className="text-xs text-gray-400">{topic.postCount}帖子</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="card p-5">
              <h3 className="font-bold text-primary dark:text-white mb-4">活跃学习者</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah学英语', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', streak: 45 },
                  { name: '日语小白进化中', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki', streak: 30 },
                  { name: '韩语打卡小组', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minji', streak: 22 },
                ].map((u, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{u.name}</p>
                      <p className="text-xs text-gray-400">连续{u.streak}天</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/community" className="block mt-4 text-center text-sm text-accent hover:underline">
                查看更多
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
