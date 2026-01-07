'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './FloatingNav.module.css';

const navItems = [
    { id: 'hero', label: 'Portal', icon: '◈' },
    { id: 'about', label: 'Identity', icon: '◉' },
    { id: 'skills', label: 'Neural', icon: '◎' },
    { id: 'experience', label: 'Timeline', icon: '◇' },
    { id: 'projects', label: 'Creations', icon: '◆' },
    { id: 'certifications', label: 'Badges', icon: '✧' },
    { id: 'publications', label: 'Writings', icon: '✦' },
    { id: 'contact', label: 'Connect', icon: '◈' },
];

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState('hero');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (navRef.current) {
                const rect = navRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left - rect.width / 2,
                    y: e.clientY - rect.top - rect.height / 2,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
            {/* Glowing orb background */}
            <div className={styles.orbBackground} />

            {/* Navigation items */}
            <div className={styles.items}>
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const isHovered = hoveredItem === item.id;

                    // Calculate magnetic offset
                    const magneticStrength = isHovered ? 0.3 : 0;
                    const offsetX = mousePosition.x * magneticStrength;
                    const offsetY = mousePosition.y * magneticStrength;

                    return (
                        <button
                            key={item.id}
                            className={`${styles.item} ${isActive ? styles.active : ''}`}
                            onClick={() => scrollToSection(item.id)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                transform: isHovered
                                    ? `translate(${offsetX}px, ${offsetY}px) scale(1.2)`
                                    : undefined,
                                animationDelay: `${index * 0.1}s`,
                            }}
                            aria-label={`Navigate to ${item.label}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>

                            {/* Active glow ring */}
                            {isActive && <div className={styles.activeRing} />}

                            {/* Hover tooltip */}
                            <div className={`${styles.tooltip} ${isHovered ? styles.tooltipVisible : ''}`}>
                                {item.label}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Current section indicator */}
            <div className={styles.indicator}>
                <span className={styles.indicatorDot} />
                <span className={styles.indicatorText}>
                    {navItems.find(item => item.id === activeSection)?.label}
                </span>
            </div>
        </nav>
    );
}
