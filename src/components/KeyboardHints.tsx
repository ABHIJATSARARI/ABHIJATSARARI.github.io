'use client';

import { useState, useEffect } from 'react';
import styles from './KeyboardHints.module.css';

export default function KeyboardHints() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user has seen hints before
        const hasSeen = localStorage.getItem('keyboard-hints-seen');
        if (hasSeen) {
            setIsDismissed(true);
            return;
        }

        // Show hints after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        // Auto-hide after 10 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
            setIsDismissed(true);
            localStorage.setItem('keyboard-hints-seen', 'true');
        }, 15000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        localStorage.setItem('keyboard-hints-seen', 'true');
    };

    if (isDismissed) return null;

    return (
        <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.content}>
                <span className={styles.title}>⌨️ Keyboard Shortcuts</span>
                <div className={styles.shortcuts}>
                    <div className={styles.shortcut}>
                        <kbd>⌘</kbd><kbd>K</kbd>
                        <span>Command Palette</span>
                    </div>
                    <div className={styles.shortcut}>
                        <kbd>↑</kbd><kbd>↓</kbd>
                        <span>Navigate</span>
                    </div>
                </div>
                <button className={styles.dismiss} onClick={dismiss}>Got it!</button>
            </div>
        </div>
    );
}
