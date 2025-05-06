import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserSearchProps {
  isDarkMode: boolean;
}

interface User {
  id: string;
  username: string;
  avatar: string;
}

// Dummy data for demonstration
const dummyUsers: User[] = [
  {
    id: 'user1',
    username: 'artlover123',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&q=80'
  },
  {
    id: 'user2',
    username: 'mangaReader',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&q=80'
  },
  {
    id: 'user3',
    username: 'novelWriter',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&q=80'
  }
];

export default function UserSearch({ isDarkMode }: UserSearchProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<User[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Filter users based on search query
      const filtered = dummyUsers.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-[250px]">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search users by username"
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
        />
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
      </div>

      {isOpen && results.length > 0 && (
        <div className={`absolute w-full mt-2 rounded-lg shadow-lg overflow-hidden z-50 ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {results.map(user => (
            <button
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1875c7] hover:text-white transition-colors ${
                isDarkMode ? 'text-white hover:bg-[#1875c7]/80' : 'text-gray-900'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{user.username}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}