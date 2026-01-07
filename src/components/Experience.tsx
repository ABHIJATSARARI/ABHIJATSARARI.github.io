'use client';

import { useState } from 'react';
import { experience } from '@/data/profile';
import styles from './Experience.module.css';

// Type definitions for experience data
interface Project {
    name: string;
    highlights: string[];
}

interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    location?: string;
    period: string;
    description: string;
    technologies: string[];
    current: boolean;
    projects?: Project[];
    highlights?: string[];
}

export default function Experience() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleNavigation = (index: number) => {
        if (index === activeIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsTransitioning(false);
        }, 300);
    };

    const currentExp = experience[activeIndex] as ExperienceItem;

    return (
        <section className={styles.section} id="experience">
            <div className={styles.header}>
                <h2>
                    Time <span className="text-gradient">Portal</span>
                </h2>
                <p>Journey through my professional timeline</p>
            </div>

            <div className={styles.container}>
                {/* Timeline navigation */}
                <div className={styles.timeline}>
                    <div className={styles.timelineLine}>
                        <div
                            className={styles.timelineProgress}
                            style={{ '--progress': `${(activeIndex / (experience.length - 1)) * 100}%` } as React.CSSProperties}
                        />
                    </div>

                    {experience.map((exp, index) => (
                        <button
                            key={exp.company}
                            className={`${styles.timelineNode} ${index === activeIndex ? styles.active : ''} ${index < activeIndex ? styles.passed : ''}`}
                            onClick={() => handleNavigation(index)}
                            aria-label={`View ${exp.company} experience`}
                        >
                            <div className={styles.nodeOuter}>
                                <div className={styles.nodeInner}>
                                    <span className={styles.nodeIcon}>{getCompanyIcon(exp.company)}</span>
                                </div>
                            </div>
                            <div className={styles.nodeLabel}>
                                <span className={styles.nodeYear}>{exp.period.split(' ')[0]}</span>
                                <span className={styles.nodeCompany}>{exp.company}</span>
                            </div>
                            {index === activeIndex && <div className={styles.nodePulse} />}
                        </button>
                    ))}
                </div>

                {/* Experience details */}
                <div className={`${styles.details} ${isTransitioning ? styles.transitioning : ''}`}>
                    {/* Portal frame */}
                    <div className={styles.portalFrame}>
                        <div className={styles.portalCorner} />
                        <div className={styles.portalCorner} />
                        <div className={styles.portalCorner} />
                        <div className={styles.portalCorner} />
                    </div>

                    {/* Content */}
                    <div className={styles.detailsContent}>
                        <div className={styles.detailsHeader}>
                            <div className={styles.companyBadge}>
                                <span className={styles.companyIcon}>{getCompanyIcon(currentExp.company)}</span>
                                <span>{currentExp.company}</span>
                            </div>
                            <span className={styles.period}>{currentExp.period}</span>
                        </div>

                        <h3 className={styles.role}>{currentExp.title}</h3>

                        {currentExp.location && (
                            <p className={styles.location}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {currentExp.location}
                            </p>
                        )}

                        <p className={styles.description}>{currentExp.description}</p>

                        {/* Projects */}
                        {currentExp.projects && currentExp.projects.length > 0 && (
                            <div className={styles.projects}>
                                {currentExp.projects.map((project) => (
                                    <div key={project.name} className={styles.project}>
                                        <div className={styles.projectHeader}>
                                            <span className={styles.projectIcon}>◈</span>
                                            <span className={styles.projectName}>{project.name}</span>
                                        </div>
                                        <ul className={styles.highlights}>
                                            {project.highlights.map((highlight, i) => (
                                                <li key={i}>
                                                    <span className={styles.highlightDot} />
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Highlights (for roles without projects) */}
                        {currentExp.highlights && currentExp.highlights.length > 0 && (
                            <ul className={styles.highlights}>
                                {currentExp.highlights.map((highlight, i) => (
                                    <li key={i}>
                                        <span className={styles.highlightDot} />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Technologies */}
                        <div className={styles.technologies}>
                            {currentExp.technologies.map((tech: string) => (
                                <span key={tech} className={styles.techTag}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Warp effect */}
                    <div className={styles.warpLines}>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={styles.warpLine} style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties} />
                        ))}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className={styles.navigation}>
                    <button
                        className={styles.navBtn}
                        onClick={() => handleNavigation(Math.max(0, activeIndex - 1))}
                        disabled={activeIndex === 0}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Previous</span>
                    </button>
                    <div className={styles.navIndicator}>
                        {activeIndex + 1} / {experience.length}
                    </div>
                    <button
                        className={styles.navBtn}
                        onClick={() => handleNavigation(Math.min(experience.length - 1, activeIndex + 1))}
                        disabled={activeIndex === experience.length - 1}
                    >
                        <span>Next</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

function getCompanyIcon(company: string): string {
    const icons: Record<string, string> = {
        'Wipro': '🏢',
        'Sciffer Analytics': '🤖',
        'IIT Kharagpur': '🎓',
        'CETPA Infotech': '💡',
    };
    return icons[company] || '◈';
}
