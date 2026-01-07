'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CursorEffects.module.css';

interface Trail {
    id: number;
    x: number;
    y: number;
}

export default function CursorEffects() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trails, setTrails] = useState<Trail[]>([]);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const trailId = useRef(0);
    const rippleId = useRef(0);
    const lastTrailTime = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add trail particles with throttling
            const now = Date.now();
            if (now - lastTrailTime.current > 20) {
                lastTrailTime.current = now;
                const newTrail: Trail = {
                    id: trailId.current++,
                    x: e.clientX,
                    y: e.clientY,
                };

                setTrails(prev => [...prev.slice(-15), newTrail]);
            }

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .magnetic');
            setIsHovering(!!isInteractive);
        };

        const handleMouseDown = (e: MouseEvent) => {
            setIsClicking(true);

            // Add ripple effect
            const newRipple = {
                id: rippleId.current++,
                x: e.clientX,
                y: e.clientY,
            };
            setRipples(prev => [...prev, newRipple]);

            // Remove ripple after animation
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== newRipple.id));
            }, 600);
        };

        const handleMouseUp = () => {
            setIsClicking(false);
        };

        const handleMouseLeave = () => {
            setTrails([]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Clean up old trails
    useEffect(() => {
        const cleanup = setInterval(() => {
            setTrails(prev => prev.slice(-10));
        }, 100);
        return () => clearInterval(cleanup);
    }, []);

    return (
        <div className={styles.cursorContainer} aria-hidden="true">
            {/* Trail particles */}
            {trails.map((trail, index) => (
                <div
                    key={trail.id}
                    className={styles.trail}
                    style={{
                        left: trail.x,
                        top: trail.y,
                        opacity: (index + 1) / trails.length * 0.6,
                        transform: `translate(-50%, -50%) scale(${(index + 1) / trails.length})`,
                    }}
                />
            ))}

            {/* Click ripples */}
            {ripples.map(ripple => (
                <div
                    key={ripple.id}
                    className={styles.ripple}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                />
            ))}

            {/* Main cursor dot */}
            <div
                className={`${styles.cursorDot} ${isClicking ? styles.clicking : ''}`}
                style={{
                    left: position.x,
                    top: position.y,
                }}
            />

            {/* Cursor ring */}
            <div
                className={`${styles.cursorRing} ${isHovering ? styles.hovering : ''} ${isClicking ? styles.clicking : ''}`}
                style={{
                    left: position.x,
                    top: position.y,
                }}
            >
                {/* Inner glow */}
                <div className={styles.innerGlow} />
            </div>

            {/* Magnetic field indicator */}
            {isHovering && (
                <div
                    className={styles.magneticField}
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                />
            )}
        </div>
    );
}
