import React, { useState } from 'react';
import { X, FolderPlus, Lock, Unlock, Plus } from 'lucide-react';
import type { BookmarkFolder } from '../types/firebase';
import { auth } from '../lib/firebase';
import { addWorkToFolder } from '../lib/firestore';

interface BookmarkFolderSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFolder: (folderId: string) => void;
  onCreateFolder: (name: string, isPublic: boolean) => void;
  folders: BookmarkFolder[];
  workId: string;
  isDarkMode: boolean;
}

export default function BookmarkFolderSelectionModal({
  isOpen,
  onClose,
  onSelectFolder,
  onCreateFolder,
  folders,
  workId,
  isDarkMode
}: BookmarkFolderSelectionModalProps) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isNewFolderPublic, setIsNewFolderPublic] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFolderName.trim()) {
      setError('Please enter a folder name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the parent component's onCreateFolder function
      await onCreateFolder(newFolderName.trim(), isNewFolderPublic);
      setNewFolderName('');
      setIsNewFolderPublic(false);
      setError('');
      setIsCreatingFolder(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to create folder');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFolder = async (folderId: string) => {
    if (!auth.currentUser || !workId) return;

    setIsLoading(true);
    try {
      // Add the work to the selected folder using the Firebase function
      await addWorkToFolder(auth.currentUser.uid, folderId, workId);
      onSelectFolder(folderId);
      onClose();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to add work to folder');
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
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${isDarkMode
              ? 'text-white hover:bg-gray-700'
              : 'text-gray-800 hover:bg-gray-100'
            }`}
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Save to Folder
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isCreatingFolder ? (
          <form onSubmit={handleCreateFolder} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}
              >
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Enter folder name"
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsNewFolderPublic(!isNewFolderPublic)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isNewFolderPublic
                    ? 'bg-[#1875c7] text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
              >
                {isNewFolderPublic ? (
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
                {isNewFolderPublic
                  ? 'Friends can see this folder'
                  : 'Only you can see this folder'
                }
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsCreatingFolder(false)}
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
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => setIsCreatingFolder(true)}
              disabled={isLoading}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
            >
              <Plus className="h-5 w-5" />
              <span>Create New Folder</span>
            </button>

            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => handleSelectFolder(folder.id)}
                disabled={isLoading}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <FolderPlus className="h-5 w-5" />
                  <span className="font-medium">{folder.name}</span>
                </div>
                {folder.isPublic ? (
                  <Unlock className="h-4 w-4 opacity-50" />
                ) : (
                  <Lock className="h-4 w-4 opacity-50" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}