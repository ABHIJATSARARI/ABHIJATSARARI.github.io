'use client';

import { useEffect, useRef } from 'react';
import styles from './MatrixRain.module.css';

interface MatrixRainProps {
    onClose: () => void;
}

export default function MatrixRain({ onClose }: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Matrix characters
        const chars = 'ABHIJATSARARI01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = Array(columns).fill(1);

        // Animation
        let animationId: number;
        const draw = () => {
            // Fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw characters
            ctx.fillStyle = '#00f5ff';
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;

                // Random color variation
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#fff';
                } else if (Math.random() > 0.95) {
                    ctx.fillStyle = '#a855f7';
                } else {
                    ctx.fillStyle = '#00f5ff';
                }

                ctx.fillText(char, x, y * fontSize);

                // Reset drop or move down
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        // Handle escape key
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationId);
        };
    }, [onClose]);

    return (
        <div className={styles.container} onClick={onClose}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.overlay}>
                <div className={styles.message}>
                    <h2>🔓 SECRET UNLOCKED</h2>
                    <p>You found the Konami Code Easter Egg!</p>
                    <p className={styles.code}>↑↑↓↓←→←→BA</p>
                    <span className={styles.dismiss}>Click anywhere or press ESC to exit</span>
                </div>
            </div>
        </div>
    );
}
