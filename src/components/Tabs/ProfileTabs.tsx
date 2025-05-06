import React from 'react';

type TabType = 'posts' | 'bookmarks' | 'likes' | 'communities' | 'reading' | 'reviews';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ElementType;
  isPrivate: boolean;
}

interface ProfileTabsProps {
  tabs: Tab[];
  active: TabType;
  isDarkMode: boolean;
  isOwn: boolean;
  onSelect: (t: TabType) => void;
}

export default function ProfileTabs({ tabs, active, isDarkMode, isOwn, onSelect }: ProfileTabsProps) {
  return (
    <div className="flex border-b mb-8 overflow-x-auto">
      {tabs.map(({ id, label, icon: Icon, isPrivate }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          disabled={!isOwn && isPrivate}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${active === id
              ? 'border-[#1875c7] text-[#1875c7]'
              : `border-transparent ${!isOwn && isPrivate
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`
            }`}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </div>
  );
}