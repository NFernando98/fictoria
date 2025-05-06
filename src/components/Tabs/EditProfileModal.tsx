import React from 'react';
import { X, Link as LinkIcon } from 'lucide-react';

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

interface Props {
    isOpen: boolean;
    isDarkMode: boolean;
    tempProfile: ProfileData;
    bioError: string;
    newPlatform: string;
    newUrl: string;
    onClose: () => void;
    onSave: () => void;
    onPfpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBannerChange: (c: string) => void;
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onAddSocial: () => void;
    onRemoveSocial: (i: number) => void;
    onPlatformChange: (v: string) => void;
    onUrlChange: (v: string) => void;
}

export default function EditProfileModal({
    isOpen,
    isDarkMode,
    tempProfile,
    bioError,
    newPlatform,
    newUrl,
    onClose,
    onSave,
    onPfpChange,
    onBannerChange,
    onBioChange,
    onAddSocial,
    onRemoveSocial,
    onPlatformChange,
    onUrlChange
}: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } rounded-xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto`}
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

                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Edit Profile
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                            Profile Picture
                        </label>
                        <div className="flex items-center gap-4">
                            <img
                                src={tempProfile.pfpUrl}
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <label className={`cursor-pointer px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                                }`}>
                                Change
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={onPfpChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                            Banner Color
                        </label>
                        <input
                            type="color"
                            value={tempProfile.bannerColor}
                            onChange={(e) => onBannerChange(e.target.value)}
                            className="w-full h-10 rounded cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                            Bio
                        </label>
                        <textarea
                            value={tempProfile.bio}
                            onChange={onBioChange}
                            rows={3}
                            className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                            placeholder="Tell us about yourself..."
                        />
                        <div className="mt-2 flex justify-between items-center">
                            <span className={`text-sm ${bioError ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {tempProfile.bio.length}/100 characters
                            </span>
                            {bioError && (
                                <span className="text-sm text-red-500">{bioError}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                            Social Links ({tempProfile.socialLinks.length}/3)
                        </label>
                        <div className="space-y-3">
                            {tempProfile.socialLinks.map((link, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                        {link.platform}:
                                    </span>
                                    <span className={`flex-1 truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {link.url}
                                    </span>
                                    <button
                                        onClick={() => onRemoveSocial(index)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {tempProfile.socialLinks.length < 3 && (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={newPlatform}
                                        onChange={(e) => onPlatformChange(e.target.value)}
                                        placeholder="Platform"
                                        className={`w-full px-3 py-2 rounded-lg border ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                            } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newUrl}
                                            onChange={(e) => onUrlChange(e.target.value)}
                                            placeholder="URL"
                                            className={`flex-1 px-3 py-2 rounded-lg border ${isDarkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white'
                                                    : 'bg-white border-gray-300 text-gray-900'
                                                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                                        />
                                        <button
                                            onClick={onAddSocial}
                                            disabled={!newPlatform || !newUrl}
                                            className={`p-2 rounded-lg transition-colors ${!newPlatform || !newUrl
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-[#1875c7] hover:bg-[#145fa3]'
                                                } text-white`}
                                        >
                                            <LinkIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className={`flex-1 py-2 rounded-lg transition-colors ${isDarkMode
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="flex-1 bg-[#1875c7] text-white py-2 rounded-lg hover:bg-[#145fa3] transition-colors"
                            disabled={!!bioError}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}