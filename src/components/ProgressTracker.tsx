'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import styles from './ProgressTracker.module.css';

interface ProgressContextType {
    visitedSections: Set<string>;
    totalSections: number;
    percentage: number;
    addVisited: (id: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'achievements', 'projects', 'certifications', 'publications', 'contact'];

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set(['hero']));

    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem('portfolio-progress');
        if (saved) {
            setVisitedSections(new Set(JSON.parse(saved)));
        }

        // Set up intersection observers for all sections
        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        if (entries[0].isIntersecting) {
                            setVisitedSections((prev) => {
                                const newSet = new Set(prev);
                                newSet.add(sectionId);
                                localStorage.setItem('portfolio-progress', JSON.stringify([...newSet]));
                                return newSet;
                            });
                        }
                    },
                    { threshold: 0.3 }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    const addVisited = (id: string) => {
        setVisitedSections((prev) => {
            const newSet = new Set(prev);
            newSet.add(id);
            localStorage.setItem('portfolio-progress', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    const percentage = Math.round((visitedSections.size / SECTIONS.length) * 100);

    return (
        <ProgressContext.Provider value={{ visitedSections, totalSections: SECTIONS.length, percentage, addVisited }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider');
    }
    return context;
}

export default function ProgressTracker() {
    const { visitedSections, totalSections, percentage } = useProgress();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.container}>
            {/* Mini progress bar */}
            <button
                className={styles.miniBar}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="View exploration progress"
            >
                <div className={styles.progressRing}>
                    <svg viewBox="0 0 36 36">
                        <path
                            className={styles.ringBg}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className={styles.ringProgress}
                            strokeDasharray={`${percentage}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <span className={styles.ringText}>{percentage}%</span>
                </div>
            </button>

            {/* Expanded panel */}
            <div className={`${styles.panel} ${isExpanded ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h4>Exploration Progress</h4>
                    <span className={styles.count}>{visitedSections.size}/{totalSections}</span>
                </div>

                <div className={styles.sections}>
                    {SECTIONS.map((section) => {
                        const visited = visitedSections.has(section);
                        return (
                            <button
                                key={section}
                                className={`${styles.section} ${visited ? styles.visited : ''}`}
                                onClick={() => {
                                    const el = document.getElementById(section);
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                    setIsExpanded(false);
                                }}
                            >
                                <span className={styles.sectionIcon}>
                                    {visited ? '✓' : '○'}
                                </span>
                                <span className={styles.sectionName}>
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {percentage === 100 && (
                    <div className={styles.complete}>
                        🎉 You&apos;ve explored everything!
                    </div>
                )}
            </div>
        </div>
    );
}
