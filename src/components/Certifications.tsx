'use client';

import { useState } from 'react';
import { useExternalData } from '@/contexts/ExternalDataContext';
import { certifications as fallbackCerts } from '@/data/profile';
import styles from './Certifications.module.css';

// Color mapping for issuers
const issuerColors: Record<string, string> = {
    'Amazon Web Services': '#FF9900',
    'Microsoft': '#00A4EF',
    'Google': '#4285F4',
    'IBM': '#0F62FE',
    'Coursera': '#0056D2',
    'default': '#00f5ff',
};

function getIssuerColor(issuer: string): string {
    for (const [key, value] of Object.entries(issuerColors)) {
        if (issuer.toLowerCase().includes(key.toLowerCase())) {
            return value;
        }
    }
    return issuerColors.default;
}

export default function Certifications() {
    const [isPaused, setIsPaused] = useState(false);
    const { credly, isLoading } = useExternalData();

    // Use Credly data if available, otherwise use fallback
    const displayCerts = credly.length > 0
        ? credly.slice(0, 20) // Limit to 20 for marquee
        : fallbackCerts;

    const certCount = credly.length > 0 ? credly.length : 600;

    return (
        <section className={styles.section} id="certifications">
            <div className={styles.header}>
                <h2>
                    Digital <span className="text-gradient">Credentials</span>
                </h2>
                <p>{certCount}+ certifications validating expertise across domains</p>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{certCount}+</span>
                        <span className={styles.statLabel}>Certifications</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>15+</span>
                        <span className={styles.statLabel}>Issuers</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>6+</span>
                        <span className={styles.statLabel}>Domains</span>
                    </div>
                    {credly.length > 0 && (
                        <>
                            <div className={styles.statDivider} />
                            <div className={styles.statItem}>
                                <span className={styles.liveIndicator}>● LIVE</span>
                                <span className={styles.statLabel}>from Credly</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Loading state */}
            {isLoading && credly.length === 0 && (
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner} />
                    <span>Loading from Credly...</span>
                </div>
            )}

            {/* Infinite marquee */}
            <div
                className={styles.marqueeContainer}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={`${styles.marquee} ${isPaused ? styles.paused : ''}`}>
                    {/* First set */}
                    {displayCerts.map((cert, index) => {
                        const isCredly = 'image_url' in cert;
                        const name = isCredly ? cert.name : cert.name;
                        const issuer = isCredly ? cert.issuer_name : cert.issuer;
                        const color = getIssuerColor(issuer);
                        const imageUrl = isCredly ? cert.image_url : null;

                        return (
                            <a
                                key={`${name}-1-${index}`}
                                href={isCredly ? cert.badge_url : cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.certCard}
                                style={{ '--index': index } as React.CSSProperties}
                            >
                                <div className={styles.certIcon} style={{ background: `${color}20`, borderColor: `${color}40` }}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={name} className={styles.badgeImage} />
                                    ) : (
                                        <span>📜</span>
                                    )}
                                </div>
                                <div className={styles.certContent}>
                                    <h3 className={styles.certName}>{name}</h3>
                                    <p className={styles.certIssuer} style={{ color }}>{issuer}</p>
                                </div>
                                <div className={styles.certGlow} style={{ background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)` }} />
                            </a>
                        );
                    })}

                    {/* Duplicate for seamless loop */}
                    {displayCerts.map((cert, index) => {
                        const isCredly = 'image_url' in cert;
                        const name = isCredly ? cert.name : cert.name;
                        const issuer = isCredly ? cert.issuer_name : cert.issuer;
                        const color = getIssuerColor(issuer);
                        const imageUrl = isCredly ? cert.image_url : null;

                        return (
                            <a
                                key={`${name}-2-${index}`}
                                href={isCredly ? cert.badge_url : cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.certCard}
                                style={{ '--index': index } as React.CSSProperties}
                            >
                                <div className={styles.certIcon} style={{ background: `${color}20`, borderColor: `${color}40` }}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={name} className={styles.badgeImage} />
                                    ) : (
                                        <span>📜</span>
                                    )}
                                </div>
                                <div className={styles.certContent}>
                                    <h3 className={styles.certName}>{name}</h3>
                                    <p className={styles.certIssuer} style={{ color }}>{issuer}</p>
                                </div>
                                <div className={styles.certGlow} style={{ background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)` }} />
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* View all link */}
            <div className={styles.viewAll}>
                <a
                    href="https://www.credly.com/users/abhijatsarari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewAllBtn}
                >
                    <span>View All on Credly</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
