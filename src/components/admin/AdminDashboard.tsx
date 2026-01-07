'use client';

import { useState } from 'react';
import { profile, experience, projects, skills, certifications, publications, testimonials, achievements } from '@/data/profile';
import { destroySession } from '@/lib/adminAuth';
import styles from './AdminDashboard.module.css';

interface AdminDashboardProps {
    onLogout: () => void;
}

type DataSection = 'profile' | 'experience' | 'projects' | 'skills' | 'certifications' | 'publications' | 'testimonials' | 'achievements';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
    const [activeSection, setActiveSection] = useState<DataSection>('profile');

    const handleLogout = () => {
        destroySession();
        onLogout();
    };

    const handleExportJSON = () => {
        const allData = {
            profile,
            experience,
            projects,
            skills,
            certifications,
            publications,
            testimonials,
            achievements,
        };

        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopyTypeScript = () => {
        const code = `// Profile Data Export
// Generated: ${new Date().toISOString()}

export const profile = ${JSON.stringify(profile, null, 2)};

export const experience = ${JSON.stringify(experience, null, 2)};

export const projects = ${JSON.stringify(projects, null, 2)};

export const skills = ${JSON.stringify(skills, null, 2)};

export const certifications = ${JSON.stringify(certifications, null, 2)};

export const publications = ${JSON.stringify(publications, null, 2)};

export const testimonials = ${JSON.stringify(testimonials, null, 2)};

export const achievements = ${JSON.stringify(achievements, null, 2)};
`;
        navigator.clipboard.writeText(code);
        alert('TypeScript code copied to clipboard!');
    };

    const sections: { key: DataSection; label: string; icon: string }[] = [
        { key: 'profile', label: 'Profile', icon: '👤' },
        { key: 'experience', label: 'Experience', icon: '💼' },
        { key: 'projects', label: 'Projects', icon: '🚀' },
        { key: 'skills', label: 'Skills', icon: '🛠️' },
        { key: 'certifications', label: 'Certifications', icon: '📜' },
        { key: 'publications', label: 'Publications', icon: '📝' },
        { key: 'testimonials', label: 'Testimonials', icon: '💬' },
        { key: 'achievements', label: 'Achievements', icon: '🏆' },
    ];

    const getSectionData = () => {
        switch (activeSection) {
            case 'profile': return profile;
            case 'experience': return experience;
            case 'projects': return projects;
            case 'skills': return skills;
            case 'certifications': return certifications;
            case 'publications': return publications;
            case 'testimonials': return testimonials;
            case 'achievements': return achievements;
        }
    };

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>🔮 Observatory</h1>
                    <span className={styles.badge}>Admin Panel</span>
                </div>
                <div className={styles.headerRight}>
                    <button onClick={handleExportJSON} className={styles.actionBtn}>
                        📥 Export JSON
                    </button>
                    <button onClick={handleCopyTypeScript} className={styles.actionBtn}>
                        📋 Copy TypeScript
                    </button>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        🚪 Logout
                    </button>
                </div>
            </header>

            <div className={styles.content}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        {sections.map((section) => (
                            <button
                                key={section.key}
                                className={`${styles.navItem} ${activeSection === section.key ? styles.active : ''}`}
                                onClick={() => setActiveSection(section.key)}
                            >
                                <span className={styles.navIcon}>{section.icon}</span>
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main content */}
                <main className={styles.main}>
                    <div className={styles.sectionHeader}>
                        <h2>
                            {sections.find(s => s.key === activeSection)?.icon}{' '}
                            {sections.find(s => s.key === activeSection)?.label}
                        </h2>
                        <p className={styles.hint}>
                            Edit <code>src/data/profile.ts</code> to update this data
                        </p>
                    </div>

                    <div className={styles.dataViewer}>
                        <pre>{JSON.stringify(getSectionData(), null, 2)}</pre>
                    </div>
                </main>
            </div>

            {/* Instructions panel */}
            <div className={styles.instructions}>
                <h3>📖 How to Update Data</h3>
                <ol>
                    <li>Open <code>src/data/profile.ts</code> in your code editor</li>
                    <li>Edit the relevant section (profile, experience, etc.)</li>
                    <li>Save the file - changes reflect immediately in dev mode</li>
                    <li>Commit and push to deploy changes</li>
                </ol>
            </div>
        </div>
    );
}
