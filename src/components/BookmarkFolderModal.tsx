import React, { useState } from 'react';
import { X, FolderPlus, Lock, Unlock } from 'lucide-react';
import { auth } from '../lib/firebase';
import { createBookmarkFolder } from '../lib/firestore';

interface BookmarkFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (name: string, isPublic: boolean) => void;
  isDarkMode: boolean;
}

export default function BookmarkFolderModal({
  isOpen,
  onClose,
  onCreateFolder,
  isDarkMode
}: BookmarkFolderModalProps) {
  const [folderName, setFolderName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) {
      setError('Please enter a folder name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log("Submitting folder creation:", {
        name: folderName.trim(),
        isPublic
      });
      await onCreateFolder(folderName.trim(), isPublic);
    } catch (error: unknown) {
      console.error("Error in modal during folder creation:", error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-6 w-full max-w-md relative`}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${isDarkMode
            ? 'text-white hover:bg-gray-700'
            : 'text-gray-800 hover:bg-gray-100'
            }`}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <FolderPlus className="h-6 w-6 text-[#1875c7]" />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create New Folder
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
            >
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
              placeholder="Enter folder name"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isPublic
                ? 'bg-[#1875c7] text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
                }`}
            >
              {isPublic ? (
                <>
                  <Unlock className="h-4 w-4" />
                  Public
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Private
                </>
              )}
            </button>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isPublic
                ? 'Friends can see this folder'
                : 'Only you can see this folder'
              }
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-[#1875c7] text-white rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#145fa3]'
                }`}
            >
              {isLoading ? 'Creating...' : 'Create Folder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}