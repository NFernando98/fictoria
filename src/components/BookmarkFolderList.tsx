import React from 'react';
import { Folder, FolderOpen, Lock, Unlock, Trash } from 'lucide-react';
import { BookmarkFolder } from '../types/firebase';

interface BookmarkFolderListProps {
  folders: BookmarkFolder[];
  selectedFolderId?: string | null;
  onSelectFolder?: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  isDarkMode: boolean;
  isOwnProfile: boolean;
}

export default function BookmarkFolderList({
  folders,
  selectedFolderId = null,
  onSelectFolder = () => { },
  onDeleteFolder,
  isDarkMode,
  isOwnProfile
}: BookmarkFolderListProps) {
  return (
    <div className="space-y-2">
      {folders.map(folder => (
        <button
          key={folder.id}
          onClick={() => onSelectFolder(folder.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${selectedFolderId === folder.id
              ? 'bg-[#1875c7] text-white'
              : isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
            }`}
        >
          <div className="flex items-center gap-3">
            {selectedFolderId === folder.id ? (
              <FolderOpen className="h-5 w-5" />
            ) : (
              <Folder className="h-5 w-5" />
            )}
            <span className="font-medium">{folder.name}</span>
            {folder.isPublic ? (
              <Unlock className="h-4 w-4 opacity-50" />
            ) : (
              <Lock className="h-4 w-4 opacity-50" />
            )}
          </div>

          {isOwnProfile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(folder.id);
              }}
              className={`p-1 rounded-lg ${selectedFolderId === folder.id
                  ? 'hover:bg-white/20 text-white'
                  : isDarkMode
                    ? 'hover:bg-gray-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
            >
              <Trash className="h-4 w-4" />
            </button>
          )}
        </button>
      ))}

      {folders.length === 0 && (
        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
          {isOwnProfile
            ? "You don't have any folders yet"
            : "This user doesn't have any public folders"
          }
        </div>
      )}
    </div>
  );
}