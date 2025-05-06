export interface UserData {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  bannerColor: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  followersCount: number;
  followingCount: number;
  friendsCount: number;
  createdAt: string;
  updatedAt: string;
  bookmarkFolders: BookmarkFolder[];
}

export interface BookmarkFolder {
  id: string;
  name: string;
  isPublic: boolean;
  works: string[];
  createdAt: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  type: "manga" | "manhwa" | "novel" | "light-novel" | "art";
  coverUrl: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  status: "ongoing" | "completed";
  tags: string[];
  chapters?: {
    id: string;
    title: string;
    number: number;
    content: string;
    createdAt: string;
  }[];
  artworkUrl?: string; // For art type
}
