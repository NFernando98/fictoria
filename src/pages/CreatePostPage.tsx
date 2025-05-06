import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Scroll, BookText, BookMarked, Paintbrush as PaintBrush } from 'lucide-react';

interface CreatePostPageProps {
  isDarkMode: boolean;
}

const contentTypes = [
  { name: 'Manga', icon: BookMarked, path: '/create/manga' },
  { name: 'Manhwa', icon: Scroll, path: '/create/manhwa' },
  { name: 'Novel', icon: BookText, path: '/create/novel' },
  { name: 'Light Novel', icon: BookOpen, path: '/create/light-novel' },
  { name: 'Art', icon: PaintBrush, path: '/create/art' }
];

export default function CreatePostPage({ isDarkMode }: CreatePostPageProps) {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-medium mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Create New Post
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {contentTypes.map(({ name, icon: Icon, path }) => (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 bg-[#1875c720] rounded-full flex items-center justify-center">
                  <Icon className="h-8 w-8 text-[#1875c7]" />
                </div>
                <h3 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {name}
                </h3>
                <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create a new {name.toLowerCase()} post
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}