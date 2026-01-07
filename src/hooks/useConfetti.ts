'use client';

import { useCallback, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

const colors = [
    '#00f5ff', // cyan
    '#a855f7', // purple
    '#f0abfc', // pink
    '#ffd700', // gold
    '#00ff88', // green
    '#ff6b00', // orange
];

export function useConfetti() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);

    const createParticles = useCallback((x: number, y: number, count: number = 50) => {
        const particles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 5;

            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3, // Initial upward boost
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 4 + Math.random() * 4,
            });
        }

        return particles;
    }, []);

    const animate = useCallback(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current = particlesRef.current.filter((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // Gravity
            p.life -= 0.015;
            p.vx *= 0.98; // Air resistance

            if (p.life <= 0) return false;

            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;

            // Draw different shapes
            if (Math.random() > 0.5) {
                // Rectangle
                ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
            } else {
                // Circle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
            return true;
        });

        if (particlesRef.current.length > 0) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Remove canvas when done
            if (canvasRef.current) {
                canvasRef.current.remove();
                canvasRef.current = null;
            }
        }
    }, []);

    const fire = useCallback((x?: number, y?: number, count?: number) => {
        // Create canvas if needed
        if (!canvasRef.current) {
            const canvas = document.createElement('canvas');
            canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 100000;
      `;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);
            canvasRef.current = canvas;
        }

        // Default to center of screen
        const posX = x ?? window.innerWidth / 2;
        const posY = y ?? window.innerHeight / 2;

        // Add particles
        particlesRef.current = [
            ...particlesRef.current,
            ...createParticles(posX, posY, count),
        ];

        // Start animation if not already running
        if (!animationRef.current) {
            animate();
        }
    }, [createParticles, animate]);

    const fireFromElement = useCallback((element: HTMLElement, count?: number) => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        fire(x, y, count);
    }, [fire]);

    return { fire, fireFromElement };
}
