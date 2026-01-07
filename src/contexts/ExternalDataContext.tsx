'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    fetchCredlyBadges,
    fetchMediumArticles,
    fetchGitHubStats,
    CredlyBadge,
    MediumArticle,
    GitHubStats
} from '@/lib/externalApis';

interface ExternalData {
    github: GitHubStats | null;
    credly: CredlyBadge[];
    medium: MediumArticle[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: Date | null;
}

interface ExternalDataContextType extends ExternalData {
    refresh: () => Promise<void>;
}

const ExternalDataContext = createContext<ExternalDataContextType | null>(null);

// Your usernames - update these as needed
const PROFILES = {
    github: 'ABHIJATSARARI',
    credly: 'abhijatsarari',
    medium: 'AbhijatSarari',
};

export function ExternalDataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<ExternalData>({
        github: null,
        credly: [],
        medium: [],
        isLoading: true,
        error: null,
        lastUpdated: null,
    });

    const fetchData = async () => {
        setData(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const [github, credly, medium] = await Promise.all([
                fetchGitHubStats(PROFILES.github),
                fetchCredlyBadges(PROFILES.credly),
                fetchMediumArticles(PROFILES.medium),
            ]);

            setData({
                github,
                credly,
                medium,
                isLoading: false,
                error: null,
                lastUpdated: new Date(),
            });
        } catch (error) {
            setData(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch data',
            }));
        }
    };

    useEffect(() => {
        fetchData();

        // Refresh every 30 minutes
        const interval = setInterval(fetchData, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ExternalDataContext.Provider value={{ ...data, refresh: fetchData }}>
            {children}
        </ExternalDataContext.Provider>
    );
}

export function useExternalData() {
    const context = useContext(ExternalDataContext);
    if (!context) {
        throw new Error('useExternalData must be used within ExternalDataProvider');
    }
    return context;
}
