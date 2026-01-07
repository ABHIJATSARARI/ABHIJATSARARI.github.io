'use client';

import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import styles from './RevealOnScroll.module.css';

interface RevealOnScrollProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
    duration?: number;
    className?: string;
}

export default function RevealOnScroll({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.6,
    className = '',
}: RevealOnScrollProps) {
    const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

    const directionClass = {
        up: styles.fromBottom,
        down: styles.fromTop,
        left: styles.fromRight,
        right: styles.fromLeft,
        fade: styles.fade,
    }[direction];

    return (
        <div
            ref={ref}
            className={`${styles.reveal} ${directionClass} ${isInView ? styles.visible : ''} ${className}`}
            style={{
                transitionDelay: `${delay}s`,
                transitionDuration: `${duration}s`,
            }}
        >
            {children}
        </div>
    );
}
