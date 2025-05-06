import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Eye, Share2, Bookmark, Star, MessageCircle } from 'lucide-react';
import BookmarkFolderSelectionModal from '../components/BookmarkFolderSelectionModal';
import SignInPopup from '../components/SignInPopup';
import { auth } from '../lib/firebase';
import { addWorkToFolder, createBookmarkFolder } from '../lib/firestore';

interface WorkDetailPageProps {
  isDarkMode: boolean;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
}

export default function WorkDetailPage({ isDarkMode }: WorkDetailPageProps) {
  const { workId } = useParams<{ workId: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [error, setError] = useState('');

  // Dummy data - In production, this would be fetched from your database
  const work = {
    id: workId,
    title: "One Piece",
    type: "Manga",
    author: "Eiichiro Oda",
    coverImage: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
    description: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world...",
    rating: 4.9,
    totalRatings: 15678,
    likes: 45678,
    views: 123456,
    status: "Ongoing",
    releaseDate: "2025-04-01",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    chapters: [
      { id: "1", number: 1, title: "Romance Dawn", releaseDate: "2025-04-01" },
      { id: "2", number: 2, title: "That Guy, Straw Hat Luffy", releaseDate: "2025-04-02" },
      { id: "3", number: 3, title: "Enter Zoro", releaseDate: "2025-04-03" }
    ] as Chapter[]
  };

  // Dummy bookmark folders - In production, these would be fetched from your database
  const bookmarkFolders = [
    {
      id: '1',
      name: 'Favorites',
      isPublic: true,
      works: [],
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Read Later',
      isPublic: false,
      works: [],
      createdAt: new Date().toISOString()
    }
  ];

  const handleLike = () => {
    if (!auth.currentUser) {
      setIsSignInOpen(true);
      return;
    }
    setIsLiked(!isLiked);
  };

  const handleBookmarkClick = () => {
    if (!auth.currentUser) {
      setIsSignInOpen(true);
      return;
    }
    setIsBookmarkModalOpen(true);
  };

  const handleSelectFolder = async (folderId: string) => {
    try {
      if (!auth.currentUser) {
        throw new Error('You must be signed in to bookmark works');
      }
      
      if (!workId) {
        throw new Error('Work ID is missing');
      }

      await addWorkToFolder(auth.currentUser.uid, folderId, workId);
      setIsBookmarked(true);
      setIsBookmarkModalOpen(false);
      setError('');
    } catch (error: any) {
      console.error('Error adding work to folder:', error);
      setError(error.message);
    }
  };

  const handleCreateFolder = async (name: string, isPublic: boolean) => {
    try {
      if (!auth.currentUser) {
        throw new Error('You must be signed in to create folders');
      }

      if (!workId) {
        throw new Error('Work ID is missing');
      }

      // First create the folder
      const newFolder = await createBookmarkFolder(auth.currentUser.uid, {
        name,
        isPublic,
        works: []
      });

      // Then add the work to the new folder
      await addWorkToFolder(auth.currentUser.uid, newFolder.id, workId);
      
      setIsBookmarked(true);
      setIsBookmarkModalOpen(false);
      setError('');
    } catch (error: any) {
      console.error('Error creating folder:', error);
      setError(error.message);
    }
  };

  const handleSignIn = () => {
    setIsSignInOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : isDarkMode
              ? 'text-gray-600'
              : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <SignInPopup
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
        isDarkMode={isDarkMode}
      />

      <BookmarkFolderSelectionModal
        isOpen={isBookmarkModalOpen}
        onClose={() => setIsBookmarkModalOpen(false)}
        onSelectFolder={handleSelectFolder}
        onCreateFolder={handleCreateFolder}
        folders={bookmarkFolders}
        isDarkMode={isDarkMode}
      />

      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
            {/* Left Column - Cover Image and Actions */}
            <div className="space-y-4">
              <div className="aspect-[2/3] rounded-xl overflow-hidden">
                <img 
                  src={work.coverImage}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleLike}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm mt-1">Like</span>
                </button>
                <button
                  onClick={handleBookmarkClick}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-[#1875c7] text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span className="text-sm mt-1">Save</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Share2 className="h-6 w-6" />
                  <span className="text-sm mt-1">Share</span>
                </button>
              </div>
            </div>

            {/* Right Column - Details and Chapters */}
            <div>
              <div className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {work.title}
                    </h1>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      by <span className="text-[#1875c7]">{work.author}</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#1875c7] text-white text-sm rounded-full">
                    {work.type}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(work.rating)}</div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      ({work.totalRatings.toLocaleString()})
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Heart className="h-4 w-4" />
                    {work.likes.toLocaleString()}
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Eye className="h-4 w-4" />
                    {work.views.toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {work.genres.map(genre => (
                    <span
                      key={genre}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="mb-6">
                  <h2 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Synopsis
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {work.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Status
                    </span>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {work.status}
                    </p>
                  </div>
                  <div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Release Date
                    </span>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(work.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Chapters
                    </h2>
                    <button className="text-[#1875c7] hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {work.chapters.map(chapter => (
                      <button
                        key={chapter.id}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Chapter {chapter.number}: {chapter.title}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Released {new Date(chapter.releaseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <MessageCircle className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}