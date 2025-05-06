import React, { useState } from 'react';
import { Search, ThumbsUp } from 'lucide-react';
import Masonry from 'react-masonry-css';

interface ArtPageProps {
  isDarkMode: boolean;
}

interface ArtworkItem {
  id: string;
  title: string;
  artist: string;
  image: string;
  tags: string[];
  likes: number;
  height: number;
  isLiked?: boolean;
}

const trendingArtworks: ArtworkItem[] = [
  {
    id: '1',
    title: 'Red Silk Dreams',
    artist: 'ArtisticSoul',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    tags: ['digital', 'abstract', 'red'],
    likes: 2453,
    height: 400
  },
  {
    id: '2',
    title: 'Crimson Flow',
    artist: 'ColorMaster',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    tags: ['traditional', 'painting', 'abstract'],
    likes: 1892,
    height: 600
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    artist: 'StreetCanvas',
    image: 'https://images.unsplash.com/photo-1581343109297-b0723701df09?w=800&q=80',
    tags: ['street art', 'urban', 'contemporary'],
    likes: 3211,
    height: 500
  },
  {
    id: '4',
    title: 'Nature\'s Palette',
    artist: 'EarthTones',
    image: 'https://images.unsplash.com/photo-1576153192621-7a3be10b356e?w=800&q=80',
    tags: ['landscape', 'watercolor', 'nature'],
    likes: 1567,
    height: 300
  }
];

const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1
};

export default function ArtPage({ isDarkMode }: ArtPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setFlippedCards(prev => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(id)) {
        newFlipped.delete(id);
      } else {
        newFlipped.add(id);
      }
      return newFlipped;
    });
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedArtworks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  const filteredArtworks = trendingArtworks.filter(artwork => {
    const searchLower = searchQuery.toLowerCase();
    return (
      artwork.title.toLowerCase().includes(searchLower) ||
      artwork.artist.toLowerCase().includes(searchLower) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className={`text-3xl font-medium mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Discover Art
          </h1>

          <div className="relative max-w-2xl mx-auto mb-16">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, artist, or tags..."
              className={`w-full px-6 py-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border-gray-700' 
                  : 'bg-white border-gray-200'
              } border-2 focus:outline-none focus:ring-2 focus:ring-[#1875c7] text-lg`}
            />
            <Search className={`absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>

          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredArtworks.map(artwork => (
              <div 
                key={artwork.id}
                className="mb-4"
              >
                <div 
                  className={`art-card group ${flippedCards.has(artwork.id) ? 'flipped' : ''}`}
                  style={{ height: artwork.height }}
                  onClick={() => toggleCard(artwork.id)}
                >
                  <div className="art-card-inner">
                    <div className="art-card-front rounded-xl overflow-hidden relative group">
                      <img 
                        src={artwork.image} 
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <button
                        onClick={(e) => toggleLike(e, artwork.id)}
                        className={`absolute bottom-4 left-4 p-2 rounded-full transition-all duration-300 ${
                          likedArtworks.has(artwork.id)
                            ? 'bg-[#1875c7] text-white'
                            : 'bg-white/80 hover:bg-white text-gray-700'
                        } opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                      </button>
                    </div>

                    <div 
                      className={`art-card-back rounded-xl overflow-hidden ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      } p-6 flex flex-col`}
                    >
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {artwork.title}
                      </h3>
                      <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        by {artwork.artist}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {artwork.tags.map(tag => (
                          <span 
                            key={tag}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDarkMode 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {(likedArtworks.has(artwork.id) ? artwork.likes + 1 : artwork.likes).toLocaleString()} likes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}