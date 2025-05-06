import React, { useState } from 'react';
import { Bell, Filter } from 'lucide-react';

interface NotificationsPageProps {
  isDarkMode: boolean;
}

interface Notification {
  id: string;
  type: 'friend_request' | 'follow' | 'community_post' | 'friend_post';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

export default function NotificationsPage({ isDarkMode }: NotificationsPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'friend_request',
      title: 'New Friend Request',
      message: 'ArtLover123 sent you a friend request',
      timestamp: '2025-04-01T12:00:00Z',
      read: false,
      link: '/profile/user1'
    },
    {
      id: '2',
      type: 'follow',
      title: 'New Follower',
      message: 'MangaMaster started following you',
      timestamp: '2025-04-01T11:30:00Z',
      read: false,
      link: '/profile/user2'
    },
    {
      id: '3',
      type: 'community_post',
      title: 'New Community Post',
      message: 'New post in Manga Lovers community',
      timestamp: '2025-04-01T10:45:00Z',
      read: false,
      link: '/community/manga-lovers'
    },
    {
      id: '4',
      type: 'friend_post',
      title: 'Friend Posted',
      message: 'NovelWriter shared a new chapter',
      timestamp: '2025-04-01T09:15:00Z',
      read: true,
      link: '/profile/user3'
    },
    {
      id: '5',
      type: 'community_post',
      title: 'Trending Discussion',
      message: 'Your post is trending in Art Community',
      timestamp: '2025-04-01T08:30:00Z',
      read: true,
      link: '/community/art'
    }
  ]);

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-[#1875c7]" />
              <h1 className={`text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Filter className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                className={`px-3 py-1.5 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-sm overflow-hidden`}
              >
                <div className={`px-6 py-4 ${
                  !notification.read && (isDarkMode ? 'bg-[#1875c7]/10' : 'bg-blue-50')
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="px-2 py-1 bg-[#1875c7] text-white text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}