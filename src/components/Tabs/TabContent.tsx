import React, { useState } from 'react';
import { UserCircle, Folder, FolderOpen } from 'lucide-react';
import BookmarkFolderList from '../BookmarkFolderList';
import WorkGrid from '../WorkGrid'; // You'll need to create this component
import { BookmarkFolder } from '../../types/firebase';

interface Review {
    id: string;
    workId: string;
    workTitle: string;
    workCover: string;
    rating: number;
    content: string;
    createdAt: string;
}

type ReviewSortType = 'highest' | 'lowest' | 'recent';

interface TabContentProps {
    active: string;
    reviews: Review[];
    sort: ReviewSortType;
    onSort: (v: ReviewSortType) => void;
    folders: BookmarkFolder[];
    selectedFolderId: string | null;
    onSelectFolder: (id: string) => void;
    onDeleteFolder: (id: string) => void;
    onAddWork?: (workId: string) => void;
    onRemoveWork?: (workId: string) => void;
    isDark: boolean;
    isOwn: boolean;
    isLoading?: boolean;
}

export default function TabContent({
    active,
    reviews,
    sort,
    onSort,
    folders,
    selectedFolderId,
    onSelectFolder,
    onDeleteFolder,
    onAddWork,
    onRemoveWork,
    isDark,
    isOwn,
    isLoading = false
}: TabContentProps) {
    if (!isOwn && active === 'private') {
        return (
            <div className="text-center py-12">
                <UserCircle className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    This content is private
                </p>
            </div>
        );
    }

    switch (active) {
        case 'reviews':
            return (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Reviews
                        </h2>
                        <select
                            value={sort}
                            onChange={(e) => onSort(e.target.value as ReviewSortType)}
                            className={`px-3 py-1.5 rounded-lg ${isDark
                                ? 'bg-gray-700 text-white border-gray-600'
                                : 'bg-white text-gray-900 border-gray-300'
                                } border`}
                        >
                            <option value="recent">Most Recent</option>
                            <option value="highest">Highest Rated</option>
                            <option value="lowest">Lowest Rated</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={review.workCover}
                                        alt={review.workTitle}
                                        className="w-16 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {review.workTitle}
                                        </h3>
                                        <div className="flex items-center my-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <UserCircle
                                                    key={star}
                                                    className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {review.rating}
                                            </span>
                                        </div>
                                        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                            {review.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'bookmarks': {
            const selectedFolder = folders.find(f => f.id === selectedFolderId);

            return (
                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
                    <div>
                        {isLoading ? (
                            <div className={`py-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Loading folders...
                            </div>
                        ) : folders.length > 0 ? (
                            <BookmarkFolderList
                                folders={folders}
                                selectedFolderId={selectedFolderId}
                                onSelectFolder={onSelectFolder}
                                onDeleteFolder={onDeleteFolder}
                                isDarkMode={isDark}
                                isOwnProfile={isOwn}
                            />
                        ) : (
                            <div className={`py-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {isOwn
                                    ? "You haven't created any bookmark folders yet"
                                    : "This user hasn't created any public folders"}
                            </div>
                        )}
                    </div>

                    <div>
                        {selectedFolder ? (
                            <>
                                <div className="mb-4 flex items-center gap-2">
                                    {selectedFolder.isPublic ? (
                                        <div className="flex items-center gap-2">
                                            <FolderOpen className="h-5 w-5" />
                                            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {selectedFolder.name} (Public)
                                            </h3>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-5 w-5" />
                                            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {selectedFolder.name} (Private)
                                            </h3>
                                        </div>
                                    )}
                                </div>

                                {selectedFolder.works.length > 0 ? (
                                    <WorkGrid
                                        workIds={selectedFolder.works}
                                        isDarkMode={isDark}
                                        onRemove={isOwn ? onRemoveWork : undefined}
                                    />
                                ) : (
                                    <p className={`text-center py-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        No works in this folder yet
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className={`text-center py-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Select a folder to view its contents
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        default:
            return (
                <div className="text-center py-12">
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {isOwn
                            ? "You haven't added any content to this section yet"
                            : "This user hasn't added any content to this section yet"
                        }
                    </p>
                </div>
            );
    }
}