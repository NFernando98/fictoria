import React, { useState } from 'react';
import { Upload, Plus, X } from 'lucide-react';

interface CreateManhwaPageProps {
  isDarkMode: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for chapter files
const MAX_THUMBNAIL_SIZE = 2 * 1024 * 1024; // 2MB for thumbnail
const MAX_BACKGROUND_SIZE = 5 * 1024 * 1024; // 5MB for background
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function CreateManhwaPage({ isDarkMode }: CreateManhwaPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [chapterFiles, setChapterFiles] = useState<File[]>([]);
  const [error, setError] = useState('');

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
  ];

  const validateFile = (file: File, maxSize: number, type: 'thumbnail' | 'background' | 'chapter') => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError(`Invalid file type. Only JPG, PNG, and WebP are allowed for ${type}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`File too large. Maximum size for ${type} is ${maxSize / (1024 * 1024)}MB`);
      return false;
    }
    return true;
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file, MAX_THUMBNAIL_SIZE, 'thumbnail')) {
      setThumbnail(file);
      setError('');
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file, MAX_BACKGROUND_SIZE, 'background')) {
      setBackgroundImage(file);
      setError('');
    }
  };

  const handleChapterFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => validateFile(file, MAX_FILE_SIZE, 'chapter'));
      if (validFiles.length === files.length) {
        setChapterFiles(validFiles);
        setError('');
      }
    }
  };

  const handleGenreAdd = () => {
    if (genre && !selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
      setGenre('');
    }
  };

  const handleGenreRemove = (genreToRemove: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genreToRemove));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-medium mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Create New Manhwa
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <div className="max-w-3xl">
          <form className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter manhwa title"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter manhwa description"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Thumbnail (Max 2MB, Square format recommended)
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnail"
                  required
                />
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {thumbnail ? thumbnail.name : 'Click to upload thumbnail'}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Background Image (Max 5MB)
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleBackgroundChange}
                  className="hidden"
                  id="background"
                  required
                />
                <label htmlFor="background" className="cursor-pointer">
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {backgroundImage ? backgroundImage.name : 'Click to upload background image'}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Chapter Files (Max 10MB each)
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleChapterFilesChange}
                  className="hidden"
                  id="chapter-files"
                  required
                />
                <label htmlFor="chapter-files" className="cursor-pointer">
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {chapterFiles.length 
                      ? `${chapterFiles.length} files selected` 
                      : 'Click to upload chapter files'
                    }
                  </p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1875c7] text-white py-3 rounded-lg hover:bg-[#145fa3] transition-colors"
            >
              Create Manhwa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}