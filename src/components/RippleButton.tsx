'use client';

import { useRef, MouseEvent, ReactNode } from 'react';
import styles from './RippleButton.module.css';

interface RippleButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function RippleButton({
    children,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}: RippleButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = styles.ripple;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Remove existing ripples
        const existingRipples = button.getElementsByClassName(styles.ripple);
        while (existingRipples.length > 0) {
            existingRipples[0].remove();
        }

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        createRipple(e);
        onClick?.();
    };

    return (
        <button
            ref={buttonRef}
            type={type}
            className={`${styles.button} ${className}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
