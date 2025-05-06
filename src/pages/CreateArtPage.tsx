import React, { useState } from 'react';
import { Upload, Plus, X } from 'lucide-react';

interface CreateArtPageProps {
  isDarkMode: boolean;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB for artwork
const MAX_THUMBNAIL_SIZE = 2 * 1024 * 1024; // 2MB for thumbnail
const MAX_BACKGROUND_SIZE = 5 * 1024 * 1024; // 5MB for background
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function CreateArtPage({ isDarkMode }: CreateArtPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [artwork, setArtwork] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  const validateFile = (file: File, maxSize: number, type: string) => {
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

  const handleArtworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file, MAX_FILE_SIZE, 'artwork')) {
      setArtwork(file);
      setError('');
    }
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

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'} pt-24`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-medium mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Upload Artwork
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
                placeholder="Enter artwork title"
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
                placeholder="Describe your artwork"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3]"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span 
                    key={tag}
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Artwork (Max 20MB)
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleArtworkChange}
                  className="hidden"
                  id="artwork"
                  required
                />
                <label htmlFor="artwork" className="cursor-pointer">
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {artwork ? artwork.name : 'Click to upload artwork'}
                  </p>
                </label>
              </div>
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

            <button
              type="submit"
              className="w-full bg-[#1875c7] text-white py-3 rounded-lg hover:bg-[#145fa3] transition-colors"
            >
              Upload Artwork
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}