'use client';

import { useExternalData } from '@/contexts/ExternalDataContext';
import { publications as fallbackPubs } from '@/data/profile';
import styles from './Publications.module.css';

export default function Publications() {
    const { medium, isLoading } = useExternalData();

    // Use Medium articles if available, otherwise use fallback
    const displayPubs = medium.length > 0
        ? medium.map((article, index) => ({
            id: index + 1,
            title: article.title,
            publisher: 'Medium',
            type: 'Article',
            link: article.link,
            year: new Date(article.pubDate).getFullYear(),
        }))
        : fallbackPubs;

    return (
        <section className={styles.section} id="publications">
            <div className={styles.header}>
                <h2>
                    Knowledge <span className="text-gradient">Transmissions</span>
                </h2>
                <p>
                    Research papers, articles, and technical writings
                    {medium.length > 0 && (
                        <span className={styles.liveTag}> • LIVE from Medium</span>
                    )}
                </p>
            </div>

            {/* Loading state */}
            {isLoading && medium.length === 0 && (
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner} />
                    <span>Loading from Medium...</span>
                </div>
            )}

            <div className={styles.grid}>
                {displayPubs.map((pub, index) => (
                    <a
                        key={pub.title}
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.card}
                        style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                        {/* Type badge */}
                        <div className={styles.typeBadge}>
                            <span className={styles.typeIcon}>{getTypeIcon(pub.type)}</span>
                            <span>{pub.type}</span>
                        </div>

                        {/* Content */}
                        <h3 className={styles.title}>{pub.title}</h3>
                        <p className={styles.publisher}>{pub.publisher}</p>

                        {pub.year && (
                            <span className={styles.date}>{pub.year}</span>
                        )}

                        {/* Hover effect */}
                        <div className={styles.cardGlow} />

                        {/* Read indicator */}
                        <div className={styles.readLink}>
                            <span>Access</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>

            {/* View more */}
            <div className={styles.viewMore}>
                <a
                    href="https://medium.com/@AbhijatSarari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewMoreBtn}
                >
                    <span>Read All Articles on Medium</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

function getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
        'Research Paper': '📄',
        'Conference Paper': '🎤',
        'Technical Article': '📝',
        'Article': '📝',
        'Tutorial': '📚',
    };
    return icons[type] || '📖';
}
