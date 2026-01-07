'use client';

import { useState, useEffect } from 'react';
import styles from './CurrentlyLearning.module.css';

interface LearningItem {
    id: number;
    name: string;
    icon: string;
    progress: number;
    category: string;
    description: string;
    startDate: string;
}

const learningItems: LearningItem[] = [
    {
        id: 1,
        name: 'Rust',
        icon: '🦀',
        progress: 35,
        category: 'Language',
        description: 'Systems programming for high-performance applications',
        startDate: 'Dec 2024',
    },
    {
        id: 2,
        name: 'LangChain',
        icon: '🔗',
        progress: 60,
        category: 'AI/ML',
        description: 'Building LLM-powered applications and agents',
        startDate: 'Nov 2024',
    },
    {
        id: 3,
        name: 'WebGPU',
        icon: '🎮',
        progress: 25,
        category: 'Graphics',
        description: 'Next-gen GPU compute in the browser',
        startDate: 'Jan 2025',
    },
    {
        id: 4,
        name: 'Kubernetes Advanced',
        icon: '⎈',
        progress: 45,
        category: 'Cloud',
        description: 'Service mesh, operators, and GitOps',
        startDate: 'Dec 2024',
    },
];

export default function CurrentlyLearning() {
    const [animatedProgress, setAnimatedProgress] = useState<Record<number, number>>({});

    useEffect(() => {
        // Animate progress bars
        const timer = setTimeout(() => {
            const animated: Record<number, number> = {};
            learningItems.forEach(item => {
                animated[item.id] = item.progress;
            });
            setAnimatedProgress(animated);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.section} id="learning">
            <div className={styles.header}>
                <h2>
                    Currently <span className="text-gradient">Learning</span>
                </h2>
                <p>Expanding my knowledge with cutting-edge technologies</p>
            </div>

            <div className={styles.grid}>
                {learningItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={styles.card}
                        style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.icon}>{item.icon}</span>
                            <div className={styles.cardInfo}>
                                <h3>{item.name}</h3>
                                <span className={styles.category}>{item.category}</span>
                            </div>
                            <span className={styles.progressText}>
                                {animatedProgress[item.id] || 0}%
                            </span>
                        </div>

                        <p className={styles.description}>{item.description}</p>

                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: `${animatedProgress[item.id] || 0}%`,
                                    '--progress': animatedProgress[item.id] || 0,
                                } as React.CSSProperties}
                            />
                        </div>

                        <div className={styles.cardFooter}>
                            <span className={styles.startDate}>Started {item.startDate}</span>
                            <div className={styles.statusDot} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
