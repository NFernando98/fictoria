import React from 'react';
import { Trophy } from 'lucide-react';

interface ContestPageProps {
  isDarkMode: boolean;
}

interface Contest {
  id: string;
  title: string;
  host: string;
  prize: string;
  type: 'Manga' | 'Manhwa' | 'Novel' | 'Light Novel' | 'Art';
  deadline: string;
  participants: number;
  description: string;
}

const contests: Contest[] = [
  {
    id: '1',
    title: 'Spring Fantasy Art Contest',
    host: 'ArtistGuild',
    prize: '$1000 + Featured Artist Spotlight',
    type: 'Art',
    deadline: 'Apr 30, 2025',
    participants: 234,
    description: 'Create an original artwork that captures the essence of spring fantasy. Open to digital and traditional mediums.'
  },
  {
    id: '2',
    title: 'Rising Stars Manga Competition',
    host: 'MangaPro Publishing',
    prize: 'Publishing Contract + $5000',
    type: 'Manga',
    deadline: 'May 15, 2025',
    participants: 567,
    description: 'Submit your original manga series pilot chapter (25-45 pages) for a chance to get published.'
  },
  {
    id: '3',
    title: 'Light Novel Writing Challenge',
    host: 'LightNovel Writers Association',
    prize: 'Professional Editing Package + $2000',
    type: 'Light Novel',
    deadline: 'Jun 1, 2025',
    participants: 345,
    description: 'Write the first chapter of your light novel series with anime-style illustrations.'
  }
];

export default function ContestsPage({ isDarkMode }: ContestPageProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Trophy className="h-8 w-8 text-[#1875c7] mr-3" />
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Active Contests</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contest.title}</h2>
                  <span className="px-3 py-1 bg-[#1875c7] text-white text-sm rounded-full">
                    {contest.type}
                  </span>
                </div>
                <div className="space-y-3">
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{contest.description}</p>
                  <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Host:</span>
                    <span className="ml-2">{contest.host}</span>
                  </div>
                  <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Prize:</span>
                    <span className="ml-2">{contest.prize}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Deadline:</span>
                      <span className="ml-2">{contest.deadline}</span>
                    </div>
                    <div className="text-[#1875c7]">
                      {contest.participants} participants
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full bg-[#1875c7] text-white py-2 rounded-lg hover:bg-[#145fa3] transition-colors">
                  Join Contest
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}