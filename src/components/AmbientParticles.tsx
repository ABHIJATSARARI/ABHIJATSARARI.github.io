'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './AmbientParticles.module.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    hue: number;
    pulseSpeed: number;
    pulsePhase: number;
}

interface Node {
    x: number;
    y: number;
    radius: number;
    pulseSpeed: number;
    phase: number;
    hue: number;
}

export default function AmbientParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const nodesRef = useRef<Node[]>([]);
    const animationRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const particleCount = Math.min(100, Math.floor((width * height) / 15000));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() * 60 + 180, // Cyan to purple range
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }

        particlesRef.current = particles;
    }, []);

    const initNodes = useCallback((width: number, height: number) => {
        const nodes: Node[] = [];
        const nodeCount = 5;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 30 + 20,
                pulseSpeed: Math.random() * 0.01 + 0.005,
                phase: Math.random() * Math.PI * 2,
                hue: Math.random() * 60 + 180,
            });
        }

        nodesRef.current = nodes;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            initParticles(window.innerWidth, window.innerHeight);
            initNodes(window.innerWidth, window.innerHeight);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        let time = 0;
        const animate = () => {
            time += 0.016;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            const particles = particlesRef.current;
            const nodes = nodesRef.current;
            const mouse = mouseRef.current;

            // Draw energy nodes
            nodes.forEach((node) => {
                node.phase += node.pulseSpeed;
                const pulseScale = 1 + Math.sin(node.phase) * 0.3;
                const radius = node.radius * pulseScale;

                // Outer glow
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, radius * 2
                );
                gradient.addColorStop(0, `hsla(${node.hue}, 80%, 60%, 0.3)`);
                gradient.addColorStop(0.5, `hsla(${node.hue}, 80%, 50%, 0.1)`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${node.hue}, 80%, 70%, 0.5)`;
                ctx.fill();
            });

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Mouse interaction
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    particle.vx -= (dx / distance) * force * 0.01;
                    particle.vy -= (dy / distance) * force * 0.01;
                }

                // Node attraction
                nodes.forEach((node) => {
                    const ndx = node.x - particle.x;
                    const ndy = node.y - particle.y;
                    const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

                    if (ndist < 200 && ndist > 30) {
                        const force = 0.0005;
                        particle.vx += (ndx / ndist) * force;
                        particle.vy += (ndy / ndist) * force;
                    }
                });

                // Apply velocity with damping
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Boundary wrapping
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                // Pulse opacity
                const pulse = Math.sin(time * particle.pulseSpeed * 60 + particle.pulsePhase);
                const currentOpacity = particle.opacity * (0.5 + pulse * 0.5);

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${currentOpacity})`;
                ctx.fill();

                // Draw connections to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const pdx = particle.x - other.x;
                    const pdy = particle.y - other.y;
                    const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

                    if (pdist < 100) {
                        const opacity = (1 - pdist / 100) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);

                        const gradient = ctx.createLinearGradient(
                            particle.x, particle.y,
                            other.x, other.y
                        );
                        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${opacity})`);
                        gradient.addColorStop(1, `hsla(${other.hue}, 70%, 60%, ${opacity})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            // Draw connections from particles to nearby nodes
            particles.forEach((particle) => {
                nodes.forEach((node) => {
                    const dx = particle.x - node.x;
                    const dy = particle.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(node.x, node.y);
                        ctx.strokeStyle = `hsla(${node.hue}, 80%, 60%, ${opacity})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initParticles, initNodes]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
        />
    );
}
