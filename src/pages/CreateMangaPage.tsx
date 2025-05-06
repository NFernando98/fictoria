import React, { useState } from 'react';
import { Upload, Plus, X } from 'lucide-react';

interface CreateMangaPageProps {
  isDarkMode: boolean;
}

export default function CreateMangaPage({ isDarkMode }: CreateMangaPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [chapterFiles, setChapterFiles] = useState<File[]>([]);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
  ];

  const handleGenreAdd = () => {
    if (genre && !selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
      setGenre('');
    }
  };

  const handleGenreRemove = (genreToRemove: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genreToRemove));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleChapterFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setChapterFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-medium mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Create New Manga
        </h1>

        <div className="max-w-3xl">
          <form className="space-y-6">
            <div>
              <label 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
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
                placeholder="Enter manga title"
              />
            </div>

            <div>
              <label 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
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
                placeholder="Enter manga description"
              />
            </div>

            <div>
              <label 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Genres
              </label>
              <div className="flex gap-2 mb-2">
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                >
                  <option value="">Select genre</option>
                  {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleGenreAdd}
                  className="px-4 py-2 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3]"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedGenres.map(g => (
                  <span 
                    key={g}
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {g}
                    <button
                      type="button"
                      onClick={() => handleGenreRemove(g)}
                      className="hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Cover Image
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDarkMode 
                    ? 'border-gray-600' 
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                  id="cover-image"
                />
                <label 
                  htmlFor="cover-image"
                  className="cursor-pointer"
                >
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {coverImage ? coverImage.name : 'Click to upload cover image'}
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Chapter Files
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDarkMode 
                    ? 'border-gray-600' 
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChapterFilesChange}
                  className="hidden"
                  id="chapter-files"
                />
                <label 
                  htmlFor="chapter-files"
                  className="cursor-pointer"
                >
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
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
              Create Manga
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}