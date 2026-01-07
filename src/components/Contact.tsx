'use client';

import { useState, useEffect } from 'react';
import { profile } from '@/data/profile';
import styles from './Contact.module.css';

export default function Contact() {
    const [terminalLines, setTerminalLines] = useState<string[]>([
        '> Initializing communication protocol...',
        '> Connection established.',
        '> Ready to receive transmission.',
    ]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) {
            setTerminalLines(prev => [
                ...prev.slice(-4),
                '> Preparing secure channel...',
            ]);
        }
    }, [isHovered]);

    const handleEmailClick = () => {
        setTerminalLines(prev => [
            ...prev.slice(-4),
            '> Opening mail client...',
            '> Secure channel ready.',
        ]);
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                {/* Left side - Info */}
                <div className={styles.info}>
                    <h2>
                        Open <span className="text-gradient-cosmic">Channel</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Ready to collaborate on the next breakthrough? Send a transmission and let&apos;s create something extraordinary together.
                    </p>

                    {/* Terminal display */}
                    <div className={styles.terminal}>
                        <div className={styles.terminalHeader}>
                            <div className={styles.terminalDots}>
                                <span />
                                <span />
                                <span />
                            </div>
                            <span className={styles.terminalTitle}>transmission_log.sh</span>
                        </div>
                        <div className={styles.terminalBody}>
                            {terminalLines.map((line, i) => (
                                <div
                                    key={i}
                                    className={styles.terminalLine}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    {line}
                                </div>
                            ))}
                            <span className={styles.terminalCursor}>_</span>
                        </div>
                    </div>

                    {/* Social grid */}
                    <div className={styles.socialGrid}>
                        {Object.entries(profile.social).map(([name, url]) => (
                            <a
                                key={name}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                {getSocialIcon(name)}
                                <span>{name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right side - Email CTA */}
                <div className={styles.emailCta}>
                    {/* Holographic border */}
                    <div className={styles.formBorder} />

                    <div className={styles.ctaContent}>
                        <div className={styles.ctaIcon}>📧</div>
                        <h3>Get In Touch</h3>
                        <p>Click below to send me an email directly.</p>

                        <a
                            href={`mailto:${profile.email}?subject=Hello from your Portfolio`}
                            className={styles.emailBtn}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleEmailClick}
                        >
                            <span className={styles.btnContent}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                                Send Email
                            </span>
                            <div className={styles.btnGlow} />
                        </a>

                        <div className={styles.emailDisplay}>
                            <span className={styles.emailLabel}>Direct Line</span>
                            <span className={styles.emailValue}>{profile.email}</span>
                        </div>
                    </div>

                    {/* Location & availability */}
                    <div className={styles.availability}>
                        <div className={styles.availItem}>
                            <span className={styles.availIcon}>📍</span>
                            <span>{profile.location}</span>
                        </div>
                        <div className={styles.availItem}>
                            <span className={`${styles.statusDot} ${styles.online}`} />
                            <span>Available for opportunities</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerMain}>
                        Designed & Engineered by <span>Abhijat Sarari</span>
                    </p>
                    <p className={styles.footerSub}>
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>
                <div className={styles.footerDecor}>
                    <span />
                    <span />
                    <span />
                </div>
            </footer>
        </section>
    );
}

function getSocialIcon(name: string): string {
    const icons: Record<string, string> = {
        linkedin: '💼',
        github: '💻',
        twitter: '🐦',
        medium: '📝',
        devpost: '🚀',
        dribbble: '🎨',
        instagram: '📷',
        youtube: '🎬',
    };
    return icons[name.toLowerCase()] || '🔗';
}
