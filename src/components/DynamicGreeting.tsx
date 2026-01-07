'use client';

import { useState, useEffect } from 'react';
import styles from './DynamicGreeting.module.css';

export default function DynamicGreeting() {
    const [greeting, setGreeting] = useState('Hello');
    const [timeString, setTimeString] = useState('');
    const [emoji, setEmoji] = useState('👋');

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();

            if (hour >= 5 && hour < 12) {
                setGreeting('Good morning');
                setEmoji('☀️');
            } else if (hour >= 12 && hour < 17) {
                setGreeting('Good afternoon');
                setEmoji('🌤️');
            } else if (hour >= 17 && hour < 21) {
                setGreeting('Good evening');
                setEmoji('🌅');
            } else {
                setGreeting('Good night');
                setEmoji('🌙');
            }

            // Format time
            const now = new Date();
            setTimeString(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.greeting}>{greeting}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.time}>{timeString}</span>
            <span className={styles.location}>IST</span>
        </div>
    );
}
