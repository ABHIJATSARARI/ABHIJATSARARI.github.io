'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './CommandPalette.module.css';

interface Command {
    id: string;
    label: string;
    icon: string;
    action: () => void;
    keywords: string[];
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const commands: Command[] = [
        {
            id: 'home',
            label: 'Go to Home',
            icon: '🏠',
            action: () => scrollToSection('hero'),
            keywords: ['home', 'top', 'start', 'hero'],
        },
        {
            id: 'about',
            label: 'View About Me',
            icon: '👤',
            action: () => scrollToSection('about'),
            keywords: ['about', 'bio', 'info', 'me'],
        },
        {
            id: 'skills',
            label: 'Browse Skills',
            icon: '🧠',
            action: () => scrollToSection('skills'),
            keywords: ['skills', 'tech', 'stack', 'technologies'],
        },
        {
            id: 'experience',
            label: 'View Experience',
            icon: '💼',
            action: () => scrollToSection('experience'),
            keywords: ['experience', 'work', 'job', 'career'],
        },
        {
            id: 'achievements',
            label: 'See Achievements',
            icon: '🏆',
            action: () => scrollToSection('achievements'),
            keywords: ['achievements', 'awards', 'wins', 'trophies'],
        },
        {
            id: 'projects',
            label: 'Explore Projects',
            icon: '🚀',
            action: () => scrollToSection('projects'),
            keywords: ['projects', 'portfolio', 'work', 'builds'],
        },
        {
            id: 'certifications',
            label: 'View Certifications',
            icon: '📜',
            action: () => scrollToSection('certifications'),
            keywords: ['certifications', 'certificates', 'badges'],
        },
        {
            id: 'publications',
            label: 'Read Publications',
            icon: '📚',
            action: () => scrollToSection('publications'),
            keywords: ['publications', 'articles', 'blog', 'writing'],
        },
        {
            id: 'contact',
            label: 'Contact Me',
            icon: '📧',
            action: () => scrollToSection('contact'),
            keywords: ['contact', 'email', 'hire', 'connect'],
        },
        {
            id: 'github',
            label: 'Open GitHub',
            icon: '🐙',
            action: () => window.open('https://github.com/ABHIJATSARARI', '_blank'),
            keywords: ['github', 'code', 'repository'],
        },
        {
            id: 'linkedin',
            label: 'Open LinkedIn',
            icon: '💼',
            action: () => window.open('https://www.linkedin.com/in/abhijatsarari/', '_blank'),
            keywords: ['linkedin', 'profile', 'connect'],
        },
        {
            id: 'resume',
            label: 'Download Resume',
            icon: '📄',
            action: () => window.open('/resume.pdf', '_blank'),
            keywords: ['resume', 'cv', 'download'],
        },
        {
            id: 'theme',
            label: 'Change Theme',
            icon: '🎨',
            action: () => {
                const btn = document.querySelector('[aria-label="Toggle theme selector"]') as HTMLButtonElement;
                btn?.click();
            },
            keywords: ['theme', 'color', 'dark', 'light', 'mode'],
        },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const filteredCommands = commands.filter((cmd) => {
        if (!search) return true;
        const searchLower = search.toLowerCase();
        return (
            cmd.label.toLowerCase().includes(searchLower) ||
            cmd.keywords.some(k => k.includes(searchLower))
        );
    });

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Open with Cmd+K or Ctrl+K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(prev => !prev);
            setSearch('');
            setSelectedIndex(0);
        }

        if (!isOpen) return;

        // Close with Escape
        if (e.key === 'Escape') {
            setIsOpen(false);
        }

        // Navigate with arrows
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        }

        // Execute with Enter
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
        }
    }, [isOpen, filteredCommands, selectedIndex]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
            <div className={styles.palette}>
                <div className={styles.searchContainer}>
                    <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Type a command or search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />
                    <kbd className={styles.escKey}>ESC</kbd>
                </div>

                <div className={styles.commands}>
                    {filteredCommands.length === 0 ? (
                        <div className={styles.noResults}>No results found</div>
                    ) : (
                        filteredCommands.map((cmd, index) => (
                            <button
                                key={cmd.id}
                                className={`${styles.command} ${index === selectedIndex ? styles.selected : ''}`}
                                onClick={() => {
                                    cmd.action();
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <span className={styles.commandIcon}>{cmd.icon}</span>
                                <span className={styles.commandLabel}>{cmd.label}</span>
                                {index === selectedIndex && (
                                    <kbd className={styles.enterKey}>↵</kbd>
                                )}
                            </button>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <span><kbd>↑↓</kbd> to navigate</span>
                    <span><kbd>↵</kbd> to select</span>
                    <span><kbd>esc</kbd> to close</span>
                </div>
            </div>
        </>
    );
}
