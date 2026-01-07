'use client';

import { useState, useEffect } from 'react';
import styles from './SectionProgress.module.css';

export default function SectionProgress() {
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = [
            'hero', 'about', 'skills', 'experience', 'achievements',
            'projects', 'testimonials', 'certifications', 'publications', 'contact'
        ];

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            setProgress(scrollProgress);

            // Find active section
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top progress bar */}
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Section label */}
            {activeSection && (
                <div className={styles.sectionLabel}>
                    <span className={styles.dot} />
                    <span className={styles.text}>
                        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                    </span>
                </div>
            )}
        </>
    );
}
