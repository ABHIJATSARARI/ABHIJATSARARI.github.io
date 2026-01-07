'use client';

import { useTheme, themes, ThemeMode } from '@/contexts/ThemeContext';
import styles from './ThemeSwitcher.module.css';
import { useState } from 'react';

const themeIcons: Record<ThemeMode, string> = {
    cyberpunk: '🔮',
    aurora: '🌌',
    neon: '🔥',
    minimal: '🌙',
};

const themeLabels: Record<ThemeMode, string> = {
    cyberpunk: 'Cyberpunk',
    aurora: 'Aurora',
    neon: 'Neon',
    minimal: 'Minimal',
};

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themeOptions: ThemeMode[] = ['cyberpunk', 'aurora', 'neon', 'minimal'];

    return (
        <div className={styles.container}>
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle theme selector"
                aria-expanded={isOpen}
            >
                <span className={styles.icon}>{themeIcons[theme]}</span>
                <span className={styles.arrow} style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}>
                    ▼
                </span>
            </button>

            <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                <div className={styles.menuHeader}>Select Theme</div>
                {themeOptions.map((option) => (
                    <button
                        key={option}
                        className={`${styles.option} ${theme === option ? styles.active : ''}`}
                        onClick={() => {
                            setTheme(option);
                            setIsOpen(false);
                        }}
                    >
                        <span className={styles.optionIcon}>{themeIcons[option]}</span>
                        <span className={styles.optionLabel}>{themeLabels[option]}</span>
                        <span
                            className={styles.colorPreview}
                            style={{ background: `linear-gradient(135deg, ${themes[option].holoCyan}, ${themes[option].holoPurple})` }}
                        />
                        {theme === option && <span className={styles.check}>✓</span>}
                    </button>
                ))}
            </div>

            {/* Backdrop */}
            {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}
        </div>
    );
}
