'use client';

import { useState, useEffect } from 'react';
import styles from './TextReveal.module.css';
import { useInView } from '@/hooks/useInView';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.03,
    tag: Tag = 'span',
}: TextRevealProps) {
    const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.5, triggerOnce: true });
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setIsAnimating(true), delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay]);

    const characters = text.split('');

    return (
        <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`${styles.container} ${className}`}>
            {characters.map((char, index) => (
                <span
                    key={index}
                    className={`${styles.char} ${isAnimating ? styles.visible : ''}`}
                    style={{
                        transitionDelay: `${index * staggerDelay}s`,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </Tag>
    );
}
