'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import styles from './BentoGrid.module.css';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime: number;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(easeOutQuart * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
}

export default function BentoGrid() {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <section className={styles.section} id="about">
            <div className={styles.header}>
                <h2>
                    Digital <span className="text-gradient">Identity</span>
                </h2>
                <p className={styles.subtitle}>{profile.bio}</p>
            </div>

            <div className={styles.grid}>
                {/* Stats Card - Large */}
                <div
                    className={`${styles.card} ${styles.cardStats}`}
                    onMouseEnter={() => setActiveCard(0)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <div className={styles.statsGrid}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                <AnimatedCounter end={profile.stats.publications} />
                            </span>
                            <span className={styles.statLabel}>Publications</span>
                            <div className={styles.statBar}>
                                <div className={styles.statBarFill} style={{ '--width': '74%' } as React.CSSProperties} />
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                <AnimatedCounter end={profile.stats.projects} />
                            </span>
                            <span className={styles.statLabel}>Projects</span>
                            <div className={styles.statBar}>
                                <div className={styles.statBarFill} style={{ '--width': '36%' } as React.CSSProperties} />
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                <AnimatedCounter end={profile.stats.hackathons} />
                            </span>
                            <span className={styles.statLabel}>Hackathons</span>
                            <div className={styles.statBar}>
                                <div className={styles.statBarFill} style={{ '--width': '100%' } as React.CSSProperties} />
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                <AnimatedCounter end={profile.stats.certifications} suffix="+" />
                            </span>
                            <span className={styles.statLabel}>Certifications</span>
                            <div className={styles.statBar}>
                                <div className={styles.statBarFill} style={{ '--width': '100%' } as React.CSSProperties} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Role Card */}
                <div
                    className={`${styles.card} ${styles.cardRole}`}
                    onMouseEnter={() => setActiveCard(1)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <div className={styles.cardIcon}>💼</div>
                    <div className={styles.cardContent}>
                        <h3>Current Mission</h3>
                        <p className={styles.roleTitle}>System Engineer</p>
                        <p className={styles.roleCompany}>@ Wipro</p>
                        <div className={styles.roleTags}>
                            <span>Citibank</span>
                            <span>RBS</span>
                        </div>
                    </div>
                    <div className={styles.orbitalRing} />
                </div>

                {/* Education Card */}
                <div
                    className={`${styles.card} ${styles.cardEducation}`}
                    onMouseEnter={() => setActiveCard(2)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <div className={styles.cardIcon}>🎓</div>
                    <div className={styles.cardContent}>
                        <h3>Academic Path</h3>
                        <p className={styles.eduDegree}>Master&apos;s Degree</p>
                        <p className={styles.eduSchool}>BITS Pilani</p>
                        <p className={styles.eduField}>Computer Systems</p>
                    </div>
                    <div className={styles.dataStream} />
                </div>

                {/* Ambassador Card */}
                <div
                    className={`${styles.card} ${styles.cardAmbassador}`}
                    onMouseEnter={() => setActiveCard(3)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <div className={styles.microsoftLogo}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                        </svg>
                    </div>
                    <h3>Microsoft Learn</h3>
                    <p>Student Ambassador</p>
                    <div className={styles.holoPulse} />
                </div>

                {/* Tech Stack Preview */}
                <div
                    className={`${styles.card} ${styles.cardTech}`}
                    onMouseEnter={() => setActiveCard(4)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <h3>Core Stack</h3>
                    <div className={styles.techGrid}>
                        {[
                            { name: 'Python', icon: '🐍' },
                            { name: 'TensorFlow', icon: '🧠' },
                            { name: 'AWS', icon: '☁️' },
                            { name: 'Azure', icon: '⚡' },
                            { name: 'React', icon: '⚛️' },
                            { name: 'Docker', icon: '🐳' },
                        ].map((tech) => (
                            <div key={tech.name} className={styles.techItem}>
                                <span className={styles.techIcon}>{tech.icon}</span>
                                <span className={styles.techName}>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                    <a href="#skills" className={styles.viewAll}>
                        Explore Neural Network →
                    </a>
                </div>

                {/* Location Card */}
                <div
                    className={`${styles.card} ${styles.cardLocation}`}
                    onMouseEnter={() => setActiveCard(5)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <div className={styles.globeContainer}>
                        <div className={styles.globe}>🌏</div>
                        <div className={styles.globeRing} />
                        <div className={styles.globeRing} style={{ animationDelay: '-2s' }} />
                    </div>
                    <div>
                        <h3>Base Station</h3>
                        <p>India</p>
                    </div>
                </div>

                {/* Contact Card */}
                <div
                    className={`${styles.card} ${styles.cardContact}`}
                    onMouseEnter={() => setActiveCard(6)}
                    onMouseLeave={() => setActiveCard(null)}
                >
                    <div className={styles.cardGlow} />
                    <h3>Open Channel</h3>
                    <a href={`mailto:${profile.email}`} className={styles.emailLink}>
                        <div className={styles.emailIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <span className={styles.emailText}>{profile.email}</span>
                    </a>
                    <div className={styles.signalWaves}>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        </section>
    );
}
