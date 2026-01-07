'use client';

import { useRef, useEffect, useCallback } from 'react';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
}

export default function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    onClick,
    href,
    target,
    rel,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        const button = buttonRef.current;
        if (!button) return;
        button.style.transform = 'translate(0, 0)';
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const parent = button.parentElement;
        if (!parent) return;

        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            parent.removeEventListener('mousemove', handleMouseMove);
            parent.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    const style = {
        transition: 'transform 0.2s ease-out',
        willChange: 'transform',
    };

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                target={target}
                rel={rel}
                className={className}
                style={style}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            className={className}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
