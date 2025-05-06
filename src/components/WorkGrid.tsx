import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getWorkById } from '../lib/firestore';
import type { Work } from '../types/firebase';

interface WorkGridProps {
    workIds: string[];
    isDarkMode: boolean;
    onRemove?: (workId: string) => void;
}

export default function WorkGrid({ workIds, isDarkMode, onRemove }: WorkGridProps) {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWorks = async () => {
            setLoading(true);
            try {
                const workPromises = workIds.map(id => getWorkById(id));
                const resolvedWorks = await Promise.all(workPromises);
                // Filter out any null results (works that might have been deleted)
                setWorks(resolvedWorks.filter(Boolean) as Work[]);
            } catch (err) {
                console.error('Error fetching bookmarked works:', err);
                setError('Failed to load bookmarked works');
            } finally {
                setLoading(false);
            }
        };

        if (workIds.length > 0) {
            fetchWorks();
        } else {
            setWorks([]);
            setLoading(false);
        }
    }, [workIds]);

    if (loading) {
        return (
            <div className="text-center py-8">
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading works...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (works.length === 0) {
        return (
            <div className="text-center py-8">
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>No works in this folder</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {works.map(work => (
                <div
                    key={work.id}
                    className={`relative rounded-lg overflow-hidden shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'
                        }`}
                >
                    {onRemove && (
                        <button
                            onClick={() => onRemove(work.id)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 z-10"
                        >
                            <X size={16} />
                        </button>
                    )}
                    <img
                        src={work.coverUrl}
                        alt={work.title}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                        <h3 className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {work.title}
                        </h3>
                        <p className={`text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {work.authorName}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}