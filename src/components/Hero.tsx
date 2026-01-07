'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import styles from './Hero.module.css';

export default function Hero() {
    const [currentTagline, setCurrentTagline] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    // Typing effect for taglines
    useEffect(() => {
        const tagline = profile.taglines[currentTagline];

        if (isTyping) {
            if (displayText.length < tagline.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(tagline.slice(0, displayText.length + 1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => setIsTyping(false), 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            if (displayText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 30);
                return () => clearTimeout(timeout);
            } else {
                setCurrentTagline((prev) => (prev + 1) % profile.taglines.length);
                setIsTyping(true);
            }
        }
    }, [displayText, isTyping, currentTagline]);

    // Parallax mouse effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <section ref={heroRef} className={styles.hero} id="hero">
            {/* Aurora background layers */}
            <div className={styles.auroraContainer}>
                <div
                    className={`${styles.aurora} ${styles.aurora1}`}
                    style={{
                        transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                    }}
                />
                <div
                    className={`${styles.aurora} ${styles.aurora2}`}
                    style={{
                        transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                    }}
                />
                <div
                    className={`${styles.aurora} ${styles.aurora3}`}
                    style={{
                        transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -15}px)`,
                    }}
                />
            </div>

            {/* Floating geometric shapes */}
            <div className={styles.geometrics}>
                <div
                    className={`${styles.shape} ${styles.hexagon}`}
                    style={{
                        transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px) rotate(${mousePosition.x * 20}deg)`,
                    }}
                />
                <div
                    className={`${styles.shape} ${styles.circle}`}
                    style={{
                        transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
                    }}
                />
                <div
                    className={`${styles.shape} ${styles.triangle}`}
                    style={{
                        transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * 30}px) rotate(${mousePosition.y * -15}deg)`,
                    }}
                />
                <div
                    className={`${styles.shape} ${styles.ring}`}
                    style={{
                        transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * -25}px)`,
                    }}
                />
            </div>

            {/* Grid overlay */}
            <div className={styles.gridOverlay} />

            {/* Main content */}
            <div className={styles.content}>
                {/* Status badge */}
                <div className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusText}>Available for Opportunities</span>
                </div>

                {/* Ambassador badge */}
                <div className={styles.ambassadorBadge}>
                    <div className={styles.microsoftIcon}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                        </svg>
                    </div>
                    <span>Microsoft Learn Student Ambassador</span>
                </div>

                {/* Main heading */}
                <h1 className={styles.heading}>
                    <span className={styles.greeting}>Hello, I&apos;m</span>
                    <span className={styles.name}>
                        <span className={styles.firstName}>{profile.name.split(' ')[0]}</span>
                        <span className={styles.lastName}>{profile.name.split(' ')[1]}</span>
                    </span>
                </h1>

                {/* Title */}
                <p className={styles.title}>{profile.title}</p>

                {/* Typing tagline */}
                <div className={styles.taglineContainer}>
                    <span className={styles.taglinePrefix}>&gt;</span>
                    <span className={styles.tagline}>{displayText}</span>
                    <span className={styles.cursor}>_</span>
                </div>

                {/* Stats ribbon */}
                <div className={styles.statsRibbon}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{profile.stats.hackathons}</span>
                        <span className={styles.statLabel}>Hackathons</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{profile.stats.projects}</span>
                        <span className={styles.statLabel}>Projects</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{profile.stats.certifications}+</span>
                        <span className={styles.statLabel}>Certifications</span>
                    </div>
                </div>

                {/* CTA buttons */}
                <div className={styles.cta}>
                    <a href="#projects" className={styles.primaryBtn}>
                        <span className={styles.btnGlow} />
                        <span className={styles.btnContent}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            Explore Creations
                        </span>
                    </a>
                    <a href="/resume.pdf" download className={styles.outlineBtn}>
                        <span className={styles.btnBorder} />
                        <span className={styles.btnContent}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                            </svg>
                            Download CV
                        </span>
                    </a>
                </div>

                {/* Social links */}
                <div className={styles.social}>
                    {Object.entries(profile.social).slice(0, 4).map(([name, url]) => (
                        <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label={name}
                        >
                            {getSocialIcon(name)}
                            <span className={styles.socialGlow} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                className={styles.scrollIndicator}
                onClick={scrollToNext}
                aria-label="Scroll to explore"
            >
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollWheel} />
                </div>
                <span className={styles.scrollText}>Enter the Portal</span>
                <div className={styles.scrollArrows}>
                    <span />
                    <span />
                    <span />
                </div>
            </button>

            {/* Corner decorations */}
            <div className={styles.cornerTL} />
            <div className={styles.cornerTR} />
            <div className={styles.cornerBL} />
            <div className={styles.cornerBR} />
        </section>
    );
}

function getSocialIcon(name: string) {
    const icons: Record<string, React.ReactNode> = {
        linkedin: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        github: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        medium: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
        ),
        devpost: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.002 1.61L0 12.004L6.002 22.39H17.78L24 12.004L17.78 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853H10.112z" />
            </svg>
        ),
    };
    return icons[name] || null;
}
