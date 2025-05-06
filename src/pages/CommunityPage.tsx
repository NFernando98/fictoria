import React, { useState } from 'react';
import { MessageSquare, Users, Star, TrendingUp, Clock, Eye, MessageCircle, Heart } from 'lucide-react';

interface CommunityPageProps {
  isDarkMode: boolean;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  posts: number;
  icon: React.ElementType;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  likes: number;
  lastReply: string;
  isHot?: boolean;
  isPinned?: boolean;
}

const categories: ForumCategory[] = [
  {
    id: '1',
    name: 'Announcements',
    description: 'Official announcements and updates from the Fictoria team',
    topics: 45,
    posts: 892,
    icon: MessageSquare
  },
  {
    id: '2',
    name: 'General Discussion',
    description: 'Chat about anything related to manga, novels, and art',
    topics: 1234,
    posts: 15678,
    icon: Users
  },
  {
    id: '3',
    name: 'Creator Corner',
    description: 'Share your work, get feedback, and connect with other creators',
    topics: 567,
    posts: 8901,
    icon: Star
  },
  {
    id: '4',
    name: 'Trending Topics',
    description: 'Hot discussions about the latest releases and trends',
    topics: 789,
    posts: 12345,
    icon: TrendingUp
  }
];

const recentDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'The Evolution of Isekai Manga: A Deep Dive',
    author: 'MangaMaster',
    category: 'General Discussion',
    replies: 45,
    views: 1200,
    likes: 89,
    lastReply: '5 minutes ago',
    isHot: true
  },
  {
    id: '2',
    title: '[Official] New Contest Announcement - Spring Art Challenge',
    author: 'Admin',
    category: 'Announcements',
    replies: 23,
    views: 567,
    likes: 45,
    lastReply: '15 minutes ago',
    isPinned: true
  },
  {
    id: '3',
    title: 'Share Your Latest Artwork - March Edition',
    author: 'ArtistGuild',
    category: 'Creator Corner',
    replies: 78,
    views: 890,
    likes: 123,
    lastReply: '30 minutes ago'
  }
];

export default function CommunityPage({ isDarkMode }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<'categories' | 'recent'>('categories');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Community Forum
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'categories'
                  ? 'bg-[#1875c7] text-white'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'recent'
                  ? 'bg-[#1875c7] text-white'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Recent Discussions
            </button>
          </div>
        </div>

        {/* Categories */}
        {activeTab === 'categories' && (
          <div className="grid gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className={`${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <Icon className="h-6 w-6 text-[#1875c7]" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {category.name}
                      </h3>
                      <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {category.description}
                      </p>
                      <div className="flex items-center space-x-6">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {category.topics.toLocaleString()} topics
                        </span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {category.posts.toLocaleString()} posts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recent Discussions */}
        {activeTab === 'recent' && (
          <div className="space-y-4">
            {recentDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {discussion.isPinned && (
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                        Pinned
                      </span>
                    )}
                    {discussion.isHot && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        Hot
                      </span>
                    )}
                    <span className="px-2 py-1 bg-[#1875c7] text-white text-xs rounded-full">
                      {discussion.category}
                    </span>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="h-4 w-4 inline mr-1" />
                    {discussion.lastReply}
                  </span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {discussion.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    by {discussion.author}
                  </span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <Eye className="h-4 w-4 inline mr-1" />
                      {discussion.views}
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <MessageCircle className="h-4 w-4 inline mr-1" />
                      {discussion.replies}
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <Heart className="h-4 w-4 inline mr-1" />
                      {discussion.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}