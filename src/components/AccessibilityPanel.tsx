'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './AccessibilityPanel.module.css';

export default function AccessibilityPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { reduceMotion, setReduceMotion, highContrast, setHighContrast } = useTheme();

    return (
        <>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Accessibility settings"
                aria-expanded={isOpen}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
            </button>

            <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h3>Accessibility</h3>
                    <button className={styles.close} onClick={() => setIsOpen(false)}>
                        ✕
                    </button>
                </div>

                <div className={styles.options}>
                    <label className={styles.option}>
                        <div className={styles.optionInfo}>
                            <span className={styles.optionIcon}>⚡</span>
                            <div>
                                <span className={styles.optionLabel}>Reduce Motion</span>
                                <span className={styles.optionDesc}>Disable animations</span>
                            </div>
                        </div>
                        <button
                            className={`${styles.toggle} ${reduceMotion ? styles.active : ''}`}
                            onClick={() => setReduceMotion(!reduceMotion)}
                            role="switch"
                            aria-checked={reduceMotion}
                        >
                            <span className={styles.toggleKnob} />
                        </button>
                    </label>

                    <label className={styles.option}>
                        <div className={styles.optionInfo}>
                            <span className={styles.optionIcon}>◐</span>
                            <div>
                                <span className={styles.optionLabel}>High Contrast</span>
                                <span className={styles.optionDesc}>Increase visibility</span>
                            </div>
                        </div>
                        <button
                            className={`${styles.toggle} ${highContrast ? styles.active : ''}`}
                            onClick={() => setHighContrast(!highContrast)}
                            role="switch"
                            aria-checked={highContrast}
                        >
                            <span className={styles.toggleKnob} />
                        </button>
                    </label>
                </div>

                <div className={styles.shortcuts}>
                    <h4>Keyboard Shortcuts</h4>
                    <div className={styles.shortcut}>
                        <kbd>↑</kbd><kbd>↓</kbd>
                        <span>Navigate sections</span>
                    </div>
                    <div className={styles.shortcut}>
                        <kbd>?</kbd>
                        <span>Show this panel</span>
                    </div>
                    <div className={styles.shortcut}>
                        <kbd>Esc</kbd>
                        <span>Close panels</span>
                    </div>
                </div>
            </div>

            {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}
        </>
    );
}
