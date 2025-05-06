import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BookOpen, Scroll, BookText, BookMarked, Search, Upload, Heart, Users, Filter, Sun, Moon, Menu, Trophy, Paintbrush as PaintBrush, X, ChevronLeft, ChevronRight, UserCircle, Bell, Eye } from 'lucide-react';
import ContestsPage from './pages/ContestsPage';
import BrowsePage from './pages/BrowsePage';
import SignInPopup from './components/SignInPopup';
import CommunityPage from './pages/CommunityPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CopyrightPage from './pages/CopyrightPage';
import FilterPage from './pages/FilterPage';
import ArtPage from './pages/ArtPage';
import AboutPage from './pages/AboutPage';
import CreatePostPage from './pages/CreatePostPage';
import CreateMangaPage from './pages/CreateMangaPage';
import CreateManhwaPage from './pages/CreateManhwaPage';
import CreateNovelPage from './pages/CreateNovelPage';
import CreateLightNovelPage from './pages/CreateLightNovelPage';
import CreateArtPage from './pages/CreateArtPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import WorkDetailPage from './pages/WorkDetailPage';
import SettingsPage from './pages/SettingsPage';

const GuidelinesPage = React.lazy(() => import('./pages/GuidelinesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

interface Notification {
  id: string;
  type: 'friend_request' | 'follow' | 'community_post' | 'friend_post';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1875c7]"></div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'friend_request',
      title: 'New Friend Request',
      message: 'ArtLover123 sent you a friend request',
      timestamp: '2025-04-01T12:00:00Z',
      read: false,
      link: '/profile/user1'
    },
    {
      id: '2',
      type: 'follow',
      title: 'New Follower',
      message: 'MangaMaster started following you',
      timestamp: '2025-04-01T11:30:00Z',
      read: false,
      link: '/profile/user2'
    },
    {
      id: '3',
      type: 'community_post',
      title: 'New Community Post',
      message: 'New post in Manga Lovers community',
      timestamp: '2025-04-01T10:45:00Z',
      read: false,
      link: '/community/manga-lovers'
    },
    {
      id: '4',
      type: 'friend_post',
      title: 'Friend Posted',
      message: 'NovelWriter shared a new chapter',
      timestamp: '2025-04-01T09:15:00Z',
      read: true,
      link: '/profile/user3'
    },
    {
      id: '5',
      type: 'community_post',
      title: 'Trending Discussion',
      message: 'Your post is trending in Art Community',
      timestamp: '2025-04-01T08:30:00Z',
      read: true,
      link: '/community/art'
    }
  ]);

  const artOfTheDay = {
    id: '1',
    title: "Ethereal Dreams",
    artist: "SkyCanvas",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80",
    description: "A mesmerizing digital artwork that explores the boundaries between reality and imagination, featuring ethereal landscapes and floating elements that create a dreamlike atmosphere.",
    likes: 1234,
    views: 5678,
    createdAt: "2025-04-01"
  };

  const featuredStories = [
    {
      title: "My Hero Academia: Vigilantes",
      author: "Hideyuki Furuhashi",
      type: "Manga",
      description: "Living in a superhuman society, it is hard to feel special. Even more so when the spotlight only shines on professional heroes, those legally authorized to use their special powers known as Quirks in public for the greater good. Kouichi Haimawari grew up aspiring to be a hero...",
      rating: 4.8,
      chapters: 126,
      releaseDate: "Apr 7, 2025",
      image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&q=80",
      duration: "24m"
    },
    {
      title: "The Dragon's Path",
      author: "Elena Chen",
      type: "Light Novel",
      description: "In a world where dragons rule the skies and humans struggle to survive, one girl discovers she holds the key to bridging the gap between species...",
      rating: 4.7,
      chapters: 45,
      releaseDate: "Apr 5, 2025",
      image: "https://images.unsplash.com/photo-1590059913761-f8e37c24e56b?w=1200&q=80",
      duration: "30m"
    },
    {
      title: "Neon Knights",
      author: "Marcus Kim",
      type: "Manhwa",
      description: "In the cyberpunk streets of Neo Seoul, a group of hackers uncover a conspiracy that threatens to reshape the very fabric of their society...",
      rating: 4.9,
      chapters: 78,
      releaseDate: "Apr 3, 2025",
      image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=1200&q=80",
      duration: "15m"
    }
  ];

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Contests', icon: Trophy, path: '/contests' },
    { name: 'Manga', icon: BookMarked, path: '/browse/manga' },
    { name: 'Novel', icon: BookText, path: '/browse/novel' },
    { name: 'Light Novel', icon: BookOpen, path: '/browse/light-novel' },
    { name: 'Manhwa', icon: Scroll, path: '/browse/manhwa' },
    { name: 'Art', icon: PaintBrush, path: '/browse/art' },
    { name: 'Community', icon: Users, path: '/community' },
  ];

  const nextStory = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === featuredStories.length - 1 ? 0 : prev + 1
    );
  };

  const prevStory = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === 0 ? featuredStories.length - 1 : prev - 1
    );
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setIsMegaMenuOpen(false);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setIsSignInOpen(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/create');
    } else {
      setIsSignInOpen(true);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    navigate(notification.link);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsIconClick = () => {
    if (!isNotificationsOpen) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#20262b]' : 'bg-white'}`}>
      <SignInPopup 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        isDarkMode={isDarkMode}
        onSignIn={handleSignIn}
      />

      {isMegaMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={() => setIsMegaMenuOpen(false)}
        >
          <div 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            ${isDarkMode ? 'bg-[#20262b]' : 'bg-white'} rounded-2xl p-8 w-full max-w-md shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMegaMenuOpen(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
                ${isDarkMode 
                  ? 'text-white hover:bg-gray-700' 
                  : 'text-gray-800 hover:bg-gray-100'
                }`}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col space-y-4">
              {menuItems.map(({ name, icon: Icon, path }) => (
                <button
                  key={name}
                  onClick={() => handleMenuItemClick(path)}
                  className={`flex items-center space-x-3 py-3 px-6 text-lg font-medium rounded-lg transition-colors
                    ${isDarkMode 
                      ? 'text-white hover:bg-gray-700' 
                      : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-5 w-5 text-[#1875c7]" />
                  <span>{name}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {!isAuthenticated && (
                  <button 
                    onClick={() => {
                      setIsMegaMenuOpen(false);
                      setIsSignInOpen(true);
                    }}
                    className="w-full py-3 px-6 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3] transition-colors"
                  >
                    Login / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled 
          ? `${isDarkMode ? 'bg-[#20262b]/60' : 'bg-white/60'} backdrop-blur-sm shadow-lg mt-2 w-[90%] max-w-5xl py-2`
          : `${isDarkMode ? 'bg-[#20262b]/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg mt-6 w-[95%] max-w-6xl py-4`
      } rounded-2xl`}>
        <div className="mx-auto flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-6 h-6">
                <svg viewBox="0 0 500 500" className="w-full h-full fill-[#1875c7]">
                  <path d="M250 50c-110.5 0-200 89.5-200 200s89.5 200 200 200 200-89.5 200-200S360.5 50 250 50zm0 50c82.8 0 150 67.2 150 150s-67.2 150-150 150-150-67.2-150-150 67.2-150 150-150zm-50 75v150l125-75-125-75z"/>
                </svg>
              </div>
              <span className="text-sm font-black tracking-wider text-[#1875c7]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                FICTORIA
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="relative flex items-center w-72">
              <input
                type="text"
                placeholder="Search"
                className={`w-full px-3 py-1.5 rounded-l-full border border-gray-300 focus:outline-none focus:border-[#1875c7] focus:ring-1 focus:ring-[#1875c7] text-sm ${
                  isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'
                }`}
              />
              <button 
                className="px-3 py-1.5 bg-[#1875c7] text-white rounded-r-full hover:bg-[#145fa3] border border-[#1875c7]"
                onClick={() => navigate('/filter')}
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-[#1875c7]" />
              ) : (
                <Moon className="h-4 w-4 text-[#1875c7]" />
              )}
            </button>

            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={handleNotificationsIconClick}
                  className={`p-1.5 rounded-full ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } relative`}
                >
                  <Bell className="h-4 w-4 text-[#1875c7]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div 
                    className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } overflow-hidden`}
                  >
                    <div className={`px-4 py-2 border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.slice(0, 5).map(notification => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`w-full text-left px-4 py-3 ${
                            isDarkMode 
                              ? 'hover:bg-[#1875c7]/80 text-white' 
                              : 'hover:bg-[#1875c7] hover:text-white'
                          } transition-colors ${
                            !notification.read && (isDarkMode ? 'bg-[#1875c7]/10' : 'bg-blue-50')
                          }`}
                        >
                          <p className={`font-medium text-sm ${
                            isDarkMode ? 'text-white' : 'text-current'
                          }`}>
                            {notification.title}
                          </p>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-current'
                          } opacity-80`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${
                            isDarkMode ? 'text-gray-400' : 'text-current'
                          } opacity-60`}>
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className={`px-4 py-2 border-t ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <button
                        onClick={() => {
                          navigate('/notifications');
                          setIsNotificationsOpen(false);
                        }}
                        className="text-[#1875c7] text-sm hover:underline w-full text-center"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`p-1.5 rounded-full ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <UserCircle className="h-6 w-6 text-[#1875c7]" />
                </button>
                {isProfileMenuOpen && (
                  <div 
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } py-1`}
                  >
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        navigate('/create');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm bg-[#1875c7] text-white hover:bg-[#145fa3]"
                    >
                      Post
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        navigate('/profile');
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-white hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        navigate('/settings');
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-white hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-white hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsSignInOpen(true)}
                className="px-3 py-1.5 text-[#1875c7] hover:text-[#145fa3] text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24">
        <Routes>
          <Route path="/contests" element={<ContestsPage isDarkMode={isDarkMode} />} />
          <Route path="/browse/:type" element={<BrowsePage isDarkMode={isDarkMode} />} />
          <Route path="/guidelines" element={
            <Suspense fallback={<LoadingSpinner />}>
              <GuidelinesPage isDarkMode={isDarkMode} />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ContactPage isDarkMode={isDarkMode} />
            </Suspense>
          } />
          <Route path="/community" element={<CommunityPage isDarkMode={isDarkMode} />} />
          <Route path="/terms" element={<TermsPage isDarkMode={isDarkMode} />} />
          <Route path="/privacy" element={<PrivacyPage isDarkMode={isDarkMode} />} />
          <Route path="/copyright" element={<CopyrightPage isDarkMode={isDarkMode} />} />
          <Route path="/filter" element={<FilterPage isDarkMode={isDarkMode} />} />
          <Route path="/browse/art" element={<ArtPage isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} />} />
          <Route path="/create" element={<CreatePostPage isDarkMode={isDarkMode} />} />
          <Route path="/create/manga" element={<CreateMangaPage isDarkMode={isDarkMode} />} />
          <Route path="/create/manhwa" element={<CreateManhwaPage isDarkMode={isDarkMode} />} />
          <Route path="/create/novel" element={<CreateNovelPage isDarkMode={isDarkMode} />} />
          <Route path="/create/light-novel" element={<CreateLightNovelPage isDarkMode={isDarkMode} />} />
          <Route path="/create/art" element={<CreateArtPage isDarkMode={isDarkMode} />} />
          <Route path="/profile/:userId?" element={<ProfilePage isDarkMode={isDarkMode} />} />
          <Route path="/notifications" element={<NotificationsPage isDarkMode={isDarkMode} />} />
          <Route path="/work/:workId" element={<WorkDetailPage isDarkMode={isDarkMode} />} />
          <Route path="/settings" element={<SettingsPage isDarkMode={isDarkMode} />} />
          <Route path="/" element={
            <div className={`min-h-screen bg-gradient-to-b ${isDarkMode ? 'from-[#20262b] to-[#20262b]' : 'from-[#1875c720] to-white'}`}>
              <section className="relative h-screen">
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#20262b]/40' : 'bg-white/20'} z-10`} />
                  <img 
                    src={featuredStories[currentFeaturedIndex].image} 
                    alt={featuredStories[currentFeaturedIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t 
                    ${isDarkMode 
                      ? 'from-[#20262b] via-[#20262b]/80 to-transparent' 
                      : 'from-[#1875c7]/50 via-[#1875c7]/20 to-transparent'
                    }`} 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r 
                    ${isDarkMode 
                      ? 'from-[#20262b]/80 via-transparent to-[#20262b]/80' 
                      : 'from-[#1875c7]/40 via-transparent to-[#1875c7]/40'
                    }`} 
                  />
                </div>

                <div className="relative h-full flex items-end pb-20 z-20">
                  <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                      <span className="inline-block px-3 py-1 bg-[#1875c7] text-white rounded-full text-sm mb-4">
                        #{currentFeaturedIndex + 1} Spotlight
                      </span>
                      <h1 className="text-4xl md:text-6xl font-medium text-white mb-4">
                        {featuredStories[currentFeaturedIndex].title}
                      </h1>
                      <div className="flex items-center space-x-4 text-white/80 text-sm mb-4">
                        <span>TV</span>
                        <span>{featuredStories[currentFeaturedIndex].duration}</span>
                        <span>{featuredStories[currentFeaturedIndex].releaseDate}</span>
                        <span className="px-2 py-0.5 bg-pink-500 rounded text-white">HD</span>
                        <div className="flex items-center">
                          <span className="px-2 py-0.5 bg-[#1875c7] rounded text-white mr-1">★ {featuredStories[currentFeaturedIndex].rating}</span>
                          <span className="px-2 py-0.5 border border-white/20 rounded">Ch. {featuredStories[currentFeaturedIndex].chapters}</span>
                        </div>
                      </div>
                      <p className="text-white/80 max-w-2xl mb-8">
                        {featuredStories[currentFeaturedIndex].description}
                      </p>
                      <div className="flex space-x-4">
                        <button className="px-6 py-3 bg-[#1875c7] text-white rounded-lg hover:bg-[#145fa3] flex items-center space-x-2">
                          <span>Watch Now</span>
                        </button>
                        <button className={`px-6 py-3 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'bg-white/10 hover:bg-white/20' 
                            : 'bg-[#1875c7]/20 hover:bg-[#1875c7]/30'
                        } text-white`}>
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={prevStory}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-colors ${
                    isDarkMode 
                      ? 'bg-[#20262b]/40 hover:bg-[#20262b]/60' 
                      : 'bg-[#1875c7]/40 hover:bg-[#1875c7]/60'
                  } text-white`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={nextStory}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-colors ${
                    isDarkMode 
                      ? 'bg-[#20262b]/40 hover:bg-[#20262b]/60' 
                      : 'bg-[#1875c7]/40 hover:bg-[#1875c7]/60'
                  } text-white`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                  {featuredStories.map((_,index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturedIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentFeaturedIndex  
                          ? 'bg-[#1875c7] w-4' 
                          : isDarkMode 
                            ? 'bg-white/50 hover: bg-white/70'
                            : 'bg-[#1875c7]/50 hover:bg-[#1875c7]/70'
                      }`}
                    />
                  ))}
                </div>
              </section>

              <section className={`py-20 ${isDarkMode ? 'bg-[#20262b]' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-3xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      New & Trending
                    </h2>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          const container = document.getElementById('trending-scroll');
                          if (container) {
                            container.scrollLeft -= container.offsetWidth;
                          }
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <ChevronLeft className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                      </button>
                      <button 
                        onClick={() => {
                          const container = document.getElementById('trending-scroll');
                          if (container) {
                            container.scrollLeft += container.offsetWidth;
                          }
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <ChevronRight className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    id="trending-scroll"
                    className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6 -mx-6 px-6"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {[
                      {
                        title: "One Piece",
                        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&q=80",
                        number: "01"
                      },
                      {
                        title: "Wind Breaker",
                        image: "https://images.unsplash.com/photo-1590059913761-f8e37c24e56b?w=400&h=600&q=80",
                        number: "02"
                      },
                      {
                        title: "True Hero X",
                        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=400&h=600&q=80",
                        number: "03"
                      },
                      {
                        title: "The Beginning",
                        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&q=80",
                        number: "04"
                      },
                      {
                        title: "The Unwavering",
                        image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=400&h=600&q=80",
                        number: "05"
                      },
                      {
                        title: "Solo Leveling",
                        image: "https://images.unsplash.com/photo-1616889415529-58ba37f7d4d8?w=400&h=600&q=80",
                        number: "06"
                      },
                      {
                        title: "The Brilliant Heist",
                        image: "https://images.unsplash.com/photo-1615474634824-f45fb12b24a8?w=400&h=600&q=80",
                        number: "07"
                      },
                      {
                        title: "The Apothecary",
                        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&q=80",
                        number: "08"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex-none w-[200px] group cursor-pointer"
                      >
                        <div className="relative h-[300px] mb-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity rounded-lg" />
                          <span className="absolute top-3 left-3 text-3xl font-bold text-white opacity-50">
                            {item.number}
                          </span>
                        </div>
                        <h3 className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-[#1875c7] transition-colors`}>
                          {item.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={`py-20 ${isDarkMode ? 'bg-[#20262b]' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-3xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Art of the Day
                    </h2>
                  </div>
                  
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl overflow-hidden`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative aspect-square">
                        <img 
                          src={artOfTheDay.image} 
                          alt={artOfTheDay.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {artOfTheDay.title}
                            </h3>
                            <span className="px-3 py-1 bg-[#1875c7] text-white text-sm rounded-full">
                              Featured
                            </span>
                          </div>
                          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            by <span className="text-[#1875c7]">{artOfTheDay.artist}</span>
                          </p>
                          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {artOfTheDay.description}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-6 mb-6">
                            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Heart className="h-5 w-5" />
                              {artOfTheDay.likes.toLocaleString()} likes
                            </div>
                            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Eye className="h-5 w-5" />
                              {artOfTheDay.views.toLocaleString()} views
                            </div>
                          </div>
                          <button className="w-full bg-[#1875c7] text-white py-3 rounded-lg hover:bg-[#145fa3] transition-colors">
                            View Artwork
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={`py-20 ${isDarkMode ? 'bg-[#20262b]' : 'bg-white'}`}>
                <div className="container mx-auto px-6">
                  <h2 className={`text-3xl font-medium text-center mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Discover Stories You'll Love</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#1875c720] rounded-full flex items-center justify-center">
                        <BookMarked className="h-8 w-8 text-[#1875c7]" />
                      </div>
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Manga</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Explore Japanese comics with rich storytelling and artwork</p>
                    </div>
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#1875c720] rounded-full flex items-center justify-center">
                        <Scroll className="h-8 w-8 text-[#1875c7]" />
                      </div>
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Manhwa</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Discover Korean comics with unique art styles and themes</p>
                    </div>
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#1875c720] rounded-full flex items-center justify-center">
                        <BookText className="h-8 w-8 text-[#1875c7]" />
                      </div>
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Novels</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Immerse yourself in captivating written stories</p>
                    </div>
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#1875c720] rounded-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-[#1875c7]" />
                      </div>
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Light Novels</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Experience Japanese novels with illustrations</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={`py-20 ${isDarkMode ? 'bg-[#20262b]' : 'bg-[#1875c720]'}`}>
                <div className="container mx-auto px-6">
                  <h2 className={`text-3xl font-medium text-center mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose Fictoria</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center">
                      <Search className="h-12 w-12 text-[#1875c7] mb-4" />
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Easy Discovery</h3>
                      <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find new stories with our smart recommendation system</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-[#1875c7] mb-4" />
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Simple Uploads</h3>
                      <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Share your work in just a few clicks</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="h-12 w-12 text-[#1875c7] mb-4" />
                      <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Vibrant Community</h3>
                      <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Connect with readers and creators worldwide</p>
                    </div>
                  </div>
                </div>
              </section>

              <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                      <div className="flex items-center space-x-2 mb-4">
                        <BookOpen className="h-8 w-8" />
                        <span className="text-2xl font-medium">Fictoria</span>
                      </div>
                      <p className="text-gray-400 max-w-sm">Your gateway to endless stories. Share, discover, and connect with storytellers worldwide.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      <div>
                        <h4 className="text-lg font-medium mb-4">Platform</h4>
                        <ul className="space-y-2">
                          <li><a href="/filter" className="text-gray-400 hover:text-white">Browse</a></li>
                          <li><button onClick={handleUploadClick} className="text-gray-400 hover:text-white">Upload</button></li>
                          <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-4">Support</h4>
                        <ul className="space-y-2">
                          <li><a href="/guidelines" className="text-gray-400 hover:text-white">Guidelines</a></li>
                          <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-4">Legal</h4>
                        <ul className="space-y-2">
                          <li><a href="/terms" className="text-gray-400 hover:text-white">Terms</a></li>
                          <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Fictoria. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;