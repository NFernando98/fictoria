import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserCircle, Bookmark, Heart, Users, BookOpen, Upload, Edit, UserPlus, FolderPlus, Star, X } from 'lucide-react';
import UserSearch from '../components/UserSearch';
import EditProfileModal from '../components/Tabs/EditProfileModal';
import BookmarkFolderModal from '../components/BookmarkFolderModal';
import ProfileTabs from '../components/Tabs/ProfileTabs';
import TabContent from '../components/Tabs/TabContent';
import { auth } from "../lib/firebase";
import {
  getBookmarkFolders,
  createBookmarkFolder,
  deleteBookmarkFolder,
  addWorkToFolder,
  removeWorkFromFolder
} from '../lib/firestore';
import type { BookmarkFolder } from '../types/firebase';

interface ProfilePageProps {
  isDarkMode: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileData {
  id: string;
  username: string;
  pfpUrl: string;
  bannerColor: string;
  bio: string;
  socialLinks: SocialLink[];
  isOwnProfile: boolean;
  followersCount: number;
  followingCount: number;
  friendsCount: number;
  friendStatus: 'none' | 'pending' | 'friends' | 'requested';
  isFollowing: boolean;
  joinDate: string;
}

type TabType = 'posts' | 'bookmarks' | 'likes' | 'communities' | 'reading' | 'reviews';
type ReviewSortType = 'highest' | 'lowest' | 'recent';

interface Review {
  id: string;
  workId: string;
  workTitle: string;
  workCover: string;
  rating: number;
  content: string;
  createdAt: string;
}

const MAX_BIO_LENGTH = 100;
const MAX_SOCIAL_LINKS = 3;

const dummyProfiles: Record<string, ProfileData> = {
  'me': {
    id: 'me',
    username: 'MyUsername',
    pfpUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&q=80',
    bannerColor: '#1875c7',
    bio: 'My profile bio',
    socialLinks: [],
    isOwnProfile: true,
    followersCount: 128,
    followingCount: 256,
    friendsCount: 42,
    friendStatus: 'none',
    isFollowing: false,
    joinDate: 'April 2025'
  },
  'user1': {
    id: 'user1',
    username: 'ArtLover123',
    pfpUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&q=80',
    bannerColor: '#FF6B6B',
    bio: 'Art enthusiast and creator',
    socialLinks: [],
    isOwnProfile: false,
    followersCount: 1500,
    followingCount: 890,
    friendsCount: 156,
    friendStatus: 'none',
    isFollowing: false,
    joinDate: 'March 2025'
  }
};

const dummyReviews: Review[] = [
  {
    id: '1',
    workId: '1',
    workTitle: 'One Piece',
    workCover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=450&q=80',
    rating: 4.5,
    content: 'A masterpiece that continues to amaze with its world-building and character development.',
    createdAt: '2025-04-01T12:00:00Z'
  },
  {
    id: '2',
    workId: '2',
    workTitle: 'Wind Breaker',
    workCover: 'https://images.unsplash.com/photo-1590059913761-f8e37c24e56b?w=300&h=450&q=80',
    rating: 3.0,
    content: 'Good art but the story could use more depth.',
    createdAt: '2025-03-28T15:30:00Z'
  },
  {
    id: '3',
    workId: '3',
    workTitle: 'True Hero X',
    workCover: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=300&h=450&q=80',
    rating: 5.0,
    content: 'Absolutely incredible! The best series I\'ve read this year.',
    createdAt: '2025-03-25T09:15:00Z'
  }
];

export default function ProfilePage({ isDarkMode }: ProfilePageProps) {
  const { userId = 'me' } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [profileData, setProfileData] = useState<ProfileData>(dummyProfiles[userId] || dummyProfiles.me);
  const [tempProfileData, setTempProfileData] = useState<ProfileData>(profileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [bioError, setBioError] = useState('');
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [reviewSort, setReviewSort] = useState<ReviewSortType>('recent');
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);
  const [isFoldersLoading, setIsFoldersLoading] = useState(false);
  const [error, setError] = useState('');

  const tabs = [
    { id: 'posts' as TabType, label: 'Posts', icon: Upload, isPrivate: false },
    { id: 'bookmarks' as TabType, label: 'Bookmarks', icon: Bookmark, isPrivate: false },
    { id: 'likes' as TabType, label: 'Likes', icon: Heart, isPrivate: false },
    { id: 'communities' as TabType, label: 'Communities', icon: Users, isPrivate: false },
    { id: 'reading' as TabType, label: 'Reading', icon: BookOpen, isPrivate: false },
    { id: 'reviews' as TabType, label: 'Reviews', icon: Star, isPrivate: false }
  ];

  useEffect(() => {
    setProfileData(dummyProfiles[userId] || dummyProfiles.me);
    setActiveTab('posts');
  }, [userId]);

  useEffect(() => {
    const fetchFolders = async () => {
      if (!auth.currentUser) return;

      setIsFoldersLoading(true);
      try {
        const folders = await getBookmarkFolders(auth.currentUser.uid);
        setBookmarkFolders(folders);
        setError('');
      } catch (err) {
        console.error("Error fetching folders:", err);
        setError('Failed to load folders');
      } finally {
        setIsFoldersLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const handlePfpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempProfileData({ ...tempProfileData, pfpUrl: url });
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = e.target.value.slice(0, MAX_BIO_LENGTH);
    setTempProfileData({ ...tempProfileData, bio: newBio });

    if (newBio.includes('bad')) { // Simple profanity check
      setBioError('Bio contains inappropriate content');
    } else {
      setBioError('');
    }
  };

  const handleAddSocialLink = () => {
    if (newPlatform && newUrl && tempProfileData.socialLinks.length < MAX_SOCIAL_LINKS) {
      setTempProfileData({
        ...tempProfileData,
        socialLinks: [...tempProfileData.socialLinks, { platform: newPlatform, url: newUrl }]
      });
      setNewPlatform('');
      setNewUrl('');
    }
  };

  const handleSaveChanges = () => {
    if (!bioError) {
      setProfileData(tempProfileData);
      setIsEditModalOpen(false);
    }
  };

  const handleFollow = () => {
    setProfileData(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followersCount: prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
    }));
  };

  const handleFriendRequest = () => {
    setProfileData(prev => ({
      ...prev,
      friendStatus: prev.friendStatus === 'none' ? 'pending' : 'none'
    }));
  };

  const handleCreateFolder = async (name: string, isPublic: boolean) => {
    if (!auth.currentUser) return setError('Sign in required');

    try {
      console.log("Creating folder with:", {
        userId: auth.currentUser.uid,
        name,
        isPublic
      });

      const newFolder = await createBookmarkFolder(auth.currentUser.uid, {
        name,
        isPublic,
        works: []
      });

      console.log("Folder created successfully:", newFolder);

      // Force a refresh of folders after creating a new one
      const refreshedFolders = await getBookmarkFolders(auth.currentUser.uid);
      console.log("Refreshed folders:", refreshedFolders);

      setBookmarkFolders(refreshedFolders);
      setIsCreateFolderModalOpen(false);
      setError('');
    } catch (err: unknown) {
      console.error("Error creating folder:", err);
      setError(err instanceof Error
        ? `Failed to create folder: ${err.message}`
        : 'Failed to create folder: Unknown error');
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!auth.currentUser) return setError('Sign in required');

    try {
      await deleteBookmarkFolder(auth.currentUser.uid, folderId);
      setBookmarkFolders(prev => prev.filter(f => f.id !== folderId));
      if (selectedFolderId === folderId) {
        setSelectedFolderId(null);
      }
      setError('');
    } catch (err: unknown) {
      console.error("Error deleting folder:", err);
      setError(err instanceof Error ? err.message : 'Failed to delete folder');
    }
  };

  const handleAddWorkToFolder = async (workId: string) => {
    if (!auth.currentUser) return setError('Sign in required');
    if (!selectedFolderId) return setError('Please select a folder first');

    try {
      await addWorkToFolder(auth.currentUser.uid, selectedFolderId, workId);
      setBookmarkFolders(prev => prev.map(folder => {
        if (folder.id === selectedFolderId && !folder.works.includes(workId)) {
          return { ...folder, works: [...folder.works, workId] };
        }
        return folder;
      }));
      setError('');
    } catch (err: unknown) {
      console.error("Error adding work to folder:", err);
      setError(err instanceof Error ? err.message : 'Failed to add work to folder');
    }
  };

  const handleRemoveWorkFromFolder = async (workId: string) => {
    if (!auth.currentUser) return setError('Sign in required');
    if (!selectedFolderId) return setError('Please select a folder first');

    try {
      await removeWorkFromFolder(auth.currentUser.uid, selectedFolderId, workId);
      setBookmarkFolders(prev => prev.map(folder => {
        if (folder.id === selectedFolderId) {
          return { ...folder, works: folder.works.filter(id => id !== workId) };
        }
        return folder;
      }));
      setError('');
    } catch (err: unknown) {
      console.error("Error removing work from folder:", err);
      setError(err instanceof Error ? err.message : 'Failed to remove work from folder');
    }
  };

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolderId(folderId === selectedFolderId ? null : folderId);
  };

  return (
    <div className={`min-h-screen pt-24 ${isDarkMode ? 'bg-[#20262b]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <UserSearch isDarkMode={isDarkMode} />

        <div
          className="rounded-xl p-8 mb-8 relative"
          style={{ backgroundColor: profileData.bannerColor }}
        >
          {profileData.isOwnProfile ? (
            <button
              onClick={() => {
                setTempProfileData(profileData);
                setBioError('');
                setIsEditModalOpen(true);
              }}
              className="absolute top-4 right-4 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${profileData.isFollowing
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {profileData.isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={handleFriendRequest}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${profileData.friendStatus === 'friends'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : profileData.friendStatus === 'pending'
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <UserPlus className="h-4 w-4" />
                {profileData.friendStatus === 'friends'
                  ? 'Friends'
                  : profileData.friendStatus === 'pending'
                    ? 'Pending'
                    : 'Add Friend'
                }
              </button>
            </div>
          )}

          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <img
                src={profileData.pfpUrl}
                alt={profileData.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">
                {profileData.username}
              </h1>
              <div className="flex items-center gap-6 text-white/80">
                <span>{profileData.followersCount} followers</span>
                <span>{profileData.followingCount} following</span>
                <span>{profileData.friendsCount} friends</span>
              </div>
              <p className="mt-2 text-white/80">
                Joined {profileData.joinDate}
              </p>
              {profileData.bio && (
                <p className="mt-2 text-white/90 max-w-xl">
                  {profileData.bio}
                </p>
              )}
              {profileData.socialLinks.length > 0 && (
                <div className="flex gap-3 mt-3">
                  {profileData.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <EditProfileModal
          isOpen={isEditModalOpen}
          isDarkMode={isDarkMode}
          tempProfile={tempProfileData}
          bioError={bioError}
          newPlatform={newPlatform}
          newUrl={newUrl}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
          onPfpChange={handlePfpChange}
          onBannerChange={c => setTempProfileData({ ...tempProfileData, bannerColor: c })}
          onBioChange={handleBioChange}
          onAddSocial={handleAddSocialLink}
          onRemoveSocial={i =>
            setTempProfileData({
              ...tempProfileData,
              socialLinks: tempProfileData.socialLinks.filter((_, idx) => idx !== i)
            })
          }
          onPlatformChange={setNewPlatform}
          onUrlChange={setNewUrl}
        />

        <BookmarkFolderModal
          isOpen={isCreateFolderModalOpen}
          onClose={() => setIsCreateFolderModalOpen(false)}
          onCreateFolder={handleCreateFolder}
          isDarkMode={isDarkMode}
        />

        <ProfileTabs
          tabs={tabs}
          active={activeTab}
          isDarkMode={isDarkMode}
          isOwn={profileData.isOwnProfile}
          onSelect={setActiveTab}
        />

        <div className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {activeTab === 'bookmarks' && profileData.isOwnProfile && (
            <div className="mb-4 flex justify-between items-center">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                My Bookmark Folders
              </h2>
              <button
                onClick={() => setIsCreateFolderModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1875c7] text-white rounded-lg hover:bg-blue-600"
              >
                <FolderPlus size={16} />
                New Folder
              </button>
            </div>
          )}

          <TabContent
            active={activeTab}
            reviews={dummyReviews}
            sort={reviewSort}
            onSort={setReviewSort}
            folders={bookmarkFolders}
            selectedFolderId={selectedFolderId}
            onSelectFolder={handleSelectFolder}
            onDeleteFolder={handleDeleteFolder}
            onAddWork={handleAddWorkToFolder}
            onRemoveWork={handleRemoveWorkFromFolder}
            isDark={isDarkMode}
            isOwn={profileData.isOwnProfile}
            isLoading={isFoldersLoading}
          />
        </div>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}