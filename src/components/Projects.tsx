'use client';

import { useState, useRef, useEffect } from 'react';
import { projects } from '@/data/profile';
import styles from './Projects.module.css';

export default function Projects() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <section className={styles.section} id="projects">
            <div className={styles.header}>
                <h2>
                    Holographic <span className="text-gradient-cosmic">Creations</span>
                </h2>
                <p>Award-winning projects from the innovation frontier</p>

                {/* Stats badges */}
                <div className={styles.statBadges}>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>🏆</span>
                        <span className={styles.badgeText}>8+ Wins</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>🚀</span>
                        <span className={styles.badgeText}>36 Projects</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>⚡</span>
                        <span className={styles.badgeText}>148 Hackathons</span>
                    </div>
                </div>
            </div>

            <div ref={containerRef} className={styles.grid}>
                {projects.map((project, index) => {
                    const isHovered = hoveredProject === index;

                    // Calculate 3D tilt based on mouse position
                    const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
                    const rotateY = isHovered ? (mousePosition.x - 0.5) * -20 : 0;

                    return (
                        <a
                            key={project.id}
                            href={project.liveUrl || project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                            style={{
                                '--delay': `${index * 0.1}s`,
                                '--rotateX': `${rotateX}deg`,
                                '--rotateY': `${rotateY}deg`,
                            } as React.CSSProperties}
                        >
                            {/* Holographic border */}
                            <div className={styles.holoBorder} />

                            {/* Winner badge */}
                            {project.award && (
                                <div className={styles.winnerBadge}>
                                    <span className={styles.winnerIcon}>🏆</span>
                                    <span>{project.award}</span>
                                </div>
                            )}

                            {/* Card image/icon area */}
                            <div className={styles.cardVisual}>
                                <div className={styles.iconContainer}>
                                    <span className={styles.projectIcon}>
                                        {getProjectEmoji(project.title)}
                                    </span>
                                </div>

                                {/* Holographic shimmer */}
                                <div className={styles.shimmer} />
                            </div>

                            {/* Card content */}
                            <div className={styles.cardContent}>
                                <h3 className={styles.projectName}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>

                                {/* Tags */}
                                <div className={styles.tags}>
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className={styles.tag}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className={styles.cardFooter}>
                                    {project.featured && (
                                        <div className={styles.featured}>
                                            <span>⭐</span>
                                            <span>Featured</span>
                                        </div>
                                    )}
                                    <div className={styles.viewLink}>
                                        <span>Explore</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div className={styles.cardGlow} />
                        </a>
                    );
                })}
            </div>

            {/* View more link */}
            <div className={styles.viewMore}>
                <a
                    href="https://devpost.com/AbhijatSarari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewMoreBtn}
                >
                    <span>View All on DevPost</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

function getProjectEmoji(title: string): string {
    const emojis: Record<string, string> = {
        'SustainaPal': '🌱',
        'CLIMA.AI': '🌍',
        'BridgeQuest': '🎮',
        'Olifie': '🤖',
    };
    return emojis[title] || '🚀';
}
