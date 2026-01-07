'use client';

import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    onComplete: () => void;
}

const bootMessages = [
    { text: 'Initializing quantum processors...', delay: 0 },
    { text: 'Loading neural pathways...', delay: 400 },
    { text: 'Connecting to skill matrix...', delay: 800 },
    { text: 'Syncing experience data...', delay: 1200 },
    { text: 'Calibrating holographic display...', delay: 1600 },
    { text: 'Establishing secure connection...', delay: 2000 },
    { text: 'System ready.', delay: 2400 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Boot messages
        bootMessages.forEach((msg, index) => {
            setTimeout(() => {
                setVisibleMessages((prev) => [...prev, index]);
            }, msg.delay);
        });

        // Complete after all messages
        setTimeout(() => {
            setIsComplete(true);
        }, 2800);

        // Exit animation
        setTimeout(() => {
            setIsExiting(true);
        }, 3200);

        // Call onComplete
        setTimeout(() => {
            onComplete();
        }, 3700);

        return () => clearInterval(progressInterval);
    }, [onComplete]);

    return (
        <div className={`${styles.loadingScreen} ${isExiting ? styles.exiting : ''}`}>
            {/* Grid background */}
            <div className={styles.gridBg} />

            {/* Glitch overlay on exit */}
            {isExiting && (
                <div className={styles.glitchOverlay}>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={styles.glitchLine} style={{ top: `${i * 5}%` }} />
                    ))}
                </div>
            )}

            <div className={styles.content}>
                {/* Logo/Name */}
                <div className={styles.logo}>
                    <span className={styles.logoText}>AS</span>
                    <div className={styles.logoRing} />
                    <div className={styles.logoRing} style={{ animationDelay: '-0.5s' }} />
                </div>

                <h1 className={styles.title}>
                    <span className={styles.glitchText} data-text="ABHIJAT SARARI">
                        ABHIJAT SARARI
                    </span>
                </h1>

                <p className={styles.subtitle}>SYSTEM ENGINEER • AI ARCHITECT</p>

                {/* Terminal output */}
                <div className={styles.terminal}>
                    {bootMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.terminalLine} ${visibleMessages.includes(index) ? styles.visible : ''}`}
                        >
                            <span className={styles.prompt}>&gt;</span>
                            <span className={index === bootMessages.length - 1 && isComplete ? styles.success : ''}>
                                {msg.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className={styles.progressGlow}
                            style={{ left: `${progress}%` }}
                        />
                    </div>
                    <span className={styles.progressText}>{progress}%</span>
                </div>

                {/* Status */}
                <div className={styles.status}>
                    {isComplete ? (
                        <span className={styles.ready}>
                            <span className={styles.statusDot} />
                            PORTAL READY - ENTERING...
                        </span>
                    ) : (
                        <span className={styles.loading}>
                            <span className={styles.spinner} />
                            INITIALIZING PORTFOLIO MATRIX
                        </span>
                    )}
                </div>
            </div>

            {/* Corner decorations */}
            <div className={`${styles.corner} ${styles.cornerTL}`} />
            <div className={`${styles.corner} ${styles.cornerTR}`} />
            <div className={`${styles.corner} ${styles.cornerBL}`} />
            <div className={`${styles.corner} ${styles.cornerBR}`} />
        </div>
    );
}
