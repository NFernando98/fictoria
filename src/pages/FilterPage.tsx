import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FilterPageProps {
  isDarkMode: boolean;
}

interface FilterOption {
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  { label: 'Type', options: ['All', 'Manga', 'Manhwa', 'Novel', 'Light Novel'] },
  { label: 'Status', options: ['All', 'Ongoing', 'Completed'] },
  { label: 'Rating', options: ['All', '5 Stars', '4+ Stars', '3+ Stars'] },
  { label: 'Sort', options: ['Popularity', 'Latest', 'Rating', 'Title'] }
];

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
  'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller',
  'Historical', 'Martial Arts', 'Mecha', 'Psychological', 'School Life',
  'Seinen', 'Shoujo', 'Shounen', 'Isekai', 'Magic', 'Military', 'Music',
  'Demons', 'Vampire', 'Game', 'Harem', 'Josei', 'Kids', 'Parody', 'Police',
  'Samurai', 'Space', 'Super Power', 'Tragedy', 'Youth', 'Gender Bender'
];

const dummyResults = [
  {
    id: '1',
    title: 'One Piece',
    cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&q=80',
    type: 'Manga',
    rating: 4.9,
    status: 'Ongoing',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy']
  },
  {
    id: '2',
    title: 'Wind Breaker',
    cover: 'https://images.unsplash.com/photo-1590059913761-f8e37c24e56b?w=400&h=600&q=80',
    type: 'Manhwa',
    rating: 4.8,
    status: 'Ongoing',
    genres: ['Action', 'School Life', 'Sports']
  },
  {
    id: '3',
    title: 'True Hero X',
    cover: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=400&h=600&q=80',
    type: 'Light Novel',
    rating: 4.7,
    status: 'Completed',
    genres: ['Fantasy', 'Adventure', 'Magic']
  },
  {
    id: '4',
    title: 'The Beginning',
    cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&q=80',
    type: 'Novel',
    rating: 4.6,
    status: 'Ongoing',
    genres: ['Mystery', 'Thriller', 'Psychological']
  }
];

export default function FilterPage({ isDarkMode }: FilterPageProps) {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [excludedGenres, setExcludedGenres] = useState<Set<string>>(new Set());

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => {
      const newSelected = new Set(prev);
      if (excludedGenres.has(genre)) {
        setExcludedGenres(prev => {
          const newExcluded = new Set(prev);
          newExcluded.delete(genre);
          return newExcluded;
        });
        return newSelected;
      }
      if (newSelected.has(genre)) {
        newSelected.delete(genre);
        setExcludedGenres(prev => new Set(prev).add(genre));
      } else {
        newSelected.add(genre);
      }
      return newSelected;
    });
  };

  const getGenreButtonStyle = (genre: string) => {
    if (selectedGenres.has(genre)) {
      return `bg-[#1875c7] text-white`;
    }
    if (excludedGenres.has(genre)) {
      return `bg-red-500/10 text-red-500 border-red-500/30`;
    }
    return isDarkMode 
      ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
  };

  const filteredResults = dummyResults.filter(result => {
    // Filter by selected genres
    if (selectedGenres.size > 0) {
      const hasAllSelectedGenres = Array.from(selectedGenres).every(genre => 
        result.genres.includes(genre)
      );
      if (!hasAllSelectedGenres) return false;
    }
    
    // Filter by excluded genres
    if (excludedGenres.size > 0) {
      const hasExcludedGenre = Array.from(excludedGenres).some(genre => 
        result.genres.includes(genre)
      );
      if (hasExcludedGenre) return false;
    }

    // Filter by search query
    if (searchQuery) {
      return result.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  const handleWorkClick = (workId: string) => {
    navigate(`/work/${workId}`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className={`text-3xl font-medium mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Browse All Stories
          </h1>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-4 mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search titles, authors, or keywords..."
                className={`w-full px-4 py-2 pr-10 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border-gray-700' 
                    : 'bg-white border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
              />
              <Search className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            
            <div className="flex gap-4">
              {filterOptions.map((filter) => (
                <div key={filter.label} className="relative min-w-[140px]">
                  <select
                    className={`w-full appearance-none px-4 py-2 pr-10 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-700' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                    value={selectedFilters[filter.label] || filter.options[0]}
                    onChange={(e) => setSelectedFilters(prev => ({...prev, [filter.label]: e.target.value}))}
                  >
                    {filter.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div className="mb-8">
            <h2 className={`text-xl font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Genres
            </h2>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-lg border transition-all ${getGenreButtonStyle(genre)}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredResults.map(result => (
              <div 
                key={result.id}
                onClick={() => handleWorkClick(result.id)}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
              >
                <div className="relative aspect-[2/3]">
                  <img 
                    src={result.cover} 
                    alt={result.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#1875c7] text-white text-xs rounded-full">
                    {result.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`font-medium mb-2 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {result.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#1875c7]">★ {result.rating}</span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {result.status}
                    </span>
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