'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { skills } from '@/data/profile';
import styles from './Skills.module.css';

interface Node {
    id: string;
    x: number;
    y: number;
    category: string;
    skill?: string;
    isCore: boolean;
    proficiency?: 'expert' | 'advanced' | 'intermediate';
}

interface Connection {
    from: string;
    to: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    progress: number;
    speed: number;
    color: string;
}

// Tech icons for popular skills (SVG paths or emoji fallback)
const skillIcons: Record<string, string> = {
    'Python': '🐍',
    'JavaScript': '⚡',
    'TypeScript': '📘',
    'React': '⚛️',
    'Next.js': '▲',
    'Node.js': '🟢',
    'AWS': '☁️',
    'Azure': '🔷',
    'Google Cloud': '🌐',
    'Docker': '🐳',
    'Kubernetes': '⎈',
    'TensorFlow': '🧠',
    'PyTorch': '🔥',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'Git': '📦',
    'Linux': '🐧',
    'Java': '☕',
    'C++': '⚙️',
    'SQL': '📊',
    'FastAPI': '⚡',
    'NLP': '💬',
    'Computer Vision': '👁️',
    'Deep Learning': '🧪',
    'Scikit-learn': '📈',
    'Pandas': '🐼',
    'Figma': '🎨',
    'VS Code': '💻',
    'Jupyter': '📓',
    'Postman': '📮',
    'Terraform': '🏗️',
    'Research': '🔬',
    'BERT': '🤖',
};

// Proficiency levels for skills
const skillProficiency: Record<string, 'expert' | 'advanced' | 'intermediate'> = {
    'Python': 'expert',
    'JavaScript': 'expert',
    'React': 'expert',
    'TensorFlow': 'advanced',
    'AWS': 'advanced',
    'TypeScript': 'advanced',
    'Docker': 'advanced',
    'Node.js': 'advanced',
    'Next.js': 'advanced',
    'MongoDB': 'intermediate',
    'PostgreSQL': 'intermediate',
    'Kubernetes': 'intermediate',
};

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [particles, setParticles] = useState<Particle[]>([]);
    const animationRef = useRef<number | null>(null);
    const particleIdRef = useRef(0);

    const categoryColors: Record<string, string> = {
        'AI/ML': '#00f5ff',
        'Cloud': '#a855f7',
        'Languages': '#f0abfc',
        'Web': '#00ff88',
        'Tools': '#ffd700',
    };

    const getCategoryColor = (categoryName: string) => {
        return categoryColors[categoryName] || '#00f5ff';
    };

    const getSkillIcon = (skill: string) => {
        return skillIcons[skill] || '◈';
    };

    const getProficiencySize = (skill: string, baseSize: number) => {
        const prof = skillProficiency[skill];
        if (prof === 'expert') return baseSize * 1.4;
        if (prof === 'advanced') return baseSize * 1.2;
        return baseSize;
    };

    // Generate neural network layout
    const generateNetwork = useCallback(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || 800;
        const height = Math.max(rect.height, 550);
        setDimensions({ width, height });

        const centerX = width / 2;
        const centerY = height / 2;
        const categoryRadius = Math.min(width, height) * 0.32;

        const newNodes: Node[] = [];
        const newConnections: Connection[] = [];

        // Core node
        newNodes.push({
            id: 'core',
            x: centerX,
            y: centerY,
            category: 'core',
            isCore: true,
        });

        // Category nodes in a circle around core
        skills.categories.forEach((category, catIndex) => {
            const catAngle = (catIndex / skills.categories.length) * Math.PI * 2 - Math.PI / 2;
            const catX = centerX + Math.cos(catAngle) * categoryRadius;
            const catY = centerY + Math.sin(catAngle) * categoryRadius;
            const catId = `cat-${catIndex}`;

            newNodes.push({
                id: catId,
                x: catX,
                y: catY,
                category: category.name,
                isCore: false,
            });

            // Connect to core
            newConnections.push({ from: 'core', to: catId });

            // Skill nodes in orbital arrangement
            const skillRadius = Math.min(width, height) * 0.1;
            category.skills.forEach((skill, skillIndex) => {
                const skillAngle = catAngle + ((skillIndex - (category.skills.length - 1) / 2) / Math.max(category.skills.length, 1)) * Math.PI * 0.7;
                const orbitOffset = (skillIndex % 2 === 0 ? 1 : 1.3) * skillRadius;
                const skillX = catX + Math.cos(skillAngle) * orbitOffset;
                const skillY = catY + Math.sin(skillAngle) * orbitOffset;
                const skillId = `skill-${catIndex}-${skillIndex}`;

                newNodes.push({
                    id: skillId,
                    x: skillX,
                    y: skillY,
                    category: category.name,
                    skill: skill,
                    isCore: false,
                    proficiency: skillProficiency[skill] || 'intermediate',
                });

                newConnections.push({ from: catId, to: skillId });
            });

            // Connect adjacent categories
            const nextCatIndex = (catIndex + 1) % skills.categories.length;
            newConnections.push({ from: catId, to: `cat-${nextCatIndex}` });
        });

        setNodes(newNodes);
        setConnections(newConnections);
    }, []);

    // Particle animation system
    useEffect(() => {
        if (nodes.length === 0) return;

        const spawnParticle = () => {
            const validConnections = connections.filter(c => c.from === 'core');
            if (validConnections.length === 0) return;

            const connection = validConnections[Math.floor(Math.random() * validConnections.length)];
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);

            if (!fromNode || !toNode) return;

            const newParticle: Particle = {
                id: particleIdRef.current++,
                x: fromNode.x,
                y: fromNode.y,
                targetX: toNode.x,
                targetY: toNode.y,
                progress: 0,
                speed: 0.005 + Math.random() * 0.01,
                color: getCategoryColor(toNode.category),
            };

            setParticles(prev => [...prev.slice(-15), newParticle]);
        };

        const animate = () => {
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        progress: p.progress + p.speed,
                        x: p.x + (p.targetX - p.x) * p.speed * 3,
                        y: p.y + (p.targetY - p.y) * p.speed * 3,
                    }))
                    .filter(p => p.progress < 1)
            );
            animationRef.current = requestAnimationFrame(animate);
        };

        const spawnInterval = setInterval(spawnParticle, 300);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            clearInterval(spawnInterval);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [nodes, connections]);

    useEffect(() => {
        generateNetwork();

        const handleResize = () => {
            generateNetwork();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [generateNetwork]);

    const isNodeActive = (node: Node) => {
        if (!activeCategory) return true;
        return node.category === activeCategory || node.isCore;
    };

    const isConnectionActive = (connection: Connection) => {
        if (!activeCategory) return true;
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        return (fromNode?.category === activeCategory || fromNode?.isCore) &&
            (toNode?.category === activeCategory || toNode?.isCore);
    };

    // Generate bezier curve path
    const getBezierPath = (from: Node, to: Node) => {
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const curvature = dist * 0.15;

        // Perpendicular offset for curve
        const cx = midX - (dy / dist) * curvature;
        const cy = midY + (dx / dist) * curvature;

        return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
    };

    const totalSkills = skills.categories.reduce((acc, cat) => acc + cat.skills.length, 0);

    return (
        <section className={styles.section} id="skills">
            <div className={styles.header}>
                <h2>
                    Neural <span className="text-gradient">Network</span>
                </h2>
                <p>Technologies interconnected in my skill ecosystem</p>

                {/* Skill count badge */}
                <div className={styles.skillBadge}>
                    <span className={styles.skillCount}>{totalSkills}</span>
                    <span>Technologies Mastered</span>
                </div>
            </div>

            {/* Category filter */}
            <div className={styles.categoryFilter}>
                <button
                    className={`${styles.filterBtn} ${!activeCategory ? styles.active : ''}`}
                    onClick={() => setActiveCategory(null)}
                >
                    <span className={styles.filterIcon}>◈</span>
                    All
                </button>
                {skills.categories.map((category) => (
                    <button
                        key={category.name}
                        className={`${styles.filterBtn} ${activeCategory === category.name ? styles.active : ''}`}
                        onClick={() => setActiveCategory(category.name)}
                        style={{ '--category-color': getCategoryColor(category.name) } as React.CSSProperties}
                    >
                        <span className={styles.filterIcon}>{getCategoryIcon(category.name)}</span>
                        {category.name.split('/')[0]}
                    </button>
                ))}
            </div>

            {/* Neural network visualization */}
            <div ref={containerRef} className={styles.networkContainer}>
                <svg
                    className={styles.networkSvg}
                    width={dimensions.width}
                    height={dimensions.height}
                    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                >
                    {/* Enhanced gradient definitions */}
                    <defs>
                        {skills.categories.map((category, index) => (
                            <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={getCategoryColor(category.name)} stopOpacity="1" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
                            </linearGradient>
                        ))}

                        <radialGradient id="core-gradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                            <stop offset="40%" stopColor="#00f5ff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                        </radialGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Curved Bezier connection lines */}
                    {connections.map((connection, index) => {
                        const fromNode = nodes.find(n => n.id === connection.from);
                        const toNode = nodes.find(n => n.id === connection.to);
                        if (!fromNode || !toNode) return null;

                        const isActive = isConnectionActive(connection);
                        const isCoreConnection = fromNode.isCore || toNode.isCore;
                        const color = getCategoryColor(toNode.category);

                        return (
                            <g key={index}>
                                {/* Base curved line */}
                                <path
                                    d={getBezierPath(fromNode, toNode)}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth={isCoreConnection ? 2 : 1}
                                    strokeOpacity={isActive ? 0.3 : 0.08}
                                    className={`${styles.connection} ${isActive ? styles.connectionActive : ''}`}
                                />
                                {/* Animated pulse for core connections */}
                                {isCoreConnection && isActive && (
                                    <path
                                        d={getBezierPath(fromNode, toNode)}
                                        fill="none"
                                        stroke={color}
                                        strokeWidth={3}
                                        strokeOpacity={0.6}
                                        className={styles.pulseLine}
                                        strokeDasharray="8 12"
                                    />
                                )}
                            </g>
                        );
                    })}

                    {/* Data flow particles */}
                    {particles.map(particle => (
                        <circle
                            key={particle.id}
                            cx={particle.x}
                            cy={particle.y}
                            r={4}
                            fill={particle.color}
                            opacity={1 - particle.progress}
                            filter="url(#glow)"
                        />
                    ))}

                    {/* Enhanced Nodes with icons */}
                    {nodes.map((node) => {
                        const isActive = isNodeActive(node);
                        const isHovered = hoveredNode === node.id;
                        const color = node.isCore ? '#00f5ff' : getCategoryColor(node.category);
                        const baseSize = node.isCore ? 35 : node.skill ? 10 : 18;
                        const size = node.skill ? getProficiencySize(node.skill, baseSize) : baseSize;

                        return (
                            <g
                                key={node.id}
                                className={`${styles.node} ${isActive ? styles.nodeActive : ''} ${isHovered ? styles.nodeHovered : ''}`}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => !node.isCore && !node.skill && setActiveCategory(node.category === activeCategory ? null : node.category)}
                                style={{ cursor: node.skill ? 'default' : 'pointer' }}
                            >
                                {/* Orbital rings for core */}
                                {node.isCore && (
                                    <>
                                        <circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={size + 15}
                                            fill="none"
                                            stroke="url(#core-gradient)"
                                            strokeWidth={2}
                                            strokeDasharray="6 4"
                                            className={styles.orbitRing}
                                            opacity={0.5}
                                        />
                                        <circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={size + 25}
                                            fill="none"
                                            stroke="#a855f7"
                                            strokeWidth={1}
                                            strokeDasharray="4 8"
                                            className={styles.orbitRingOuter}
                                            opacity={0.3}
                                        />
                                    </>
                                )}

                                {/* Glow effect */}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={size * (node.isCore ? 2.5 : 2)}
                                    fill={color}
                                    opacity={isHovered ? 0.4 : node.isCore ? 0.2 : 0.1}
                                    className={styles.nodeGlow}
                                />

                                {/* Pulse ring on hover */}
                                {isHovered && (
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={size * 1.5}
                                        fill="none"
                                        stroke={color}
                                        strokeWidth={2}
                                        className={styles.pulseRing}
                                    />
                                )}

                                {/* Main node */}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={size}
                                    fill={node.isCore ? 'url(#core-gradient)' : color}
                                    opacity={isActive ? 1 : 0.3}
                                    filter={isHovered || node.isCore ? 'url(#glow)' : undefined}
                                    className={node.isCore ? styles.coreNode : ''}
                                />

                                {/* Skill icon */}
                                {node.skill && (
                                    <text
                                        x={node.x}
                                        y={node.y + 1}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className={styles.skillIcon}
                                        fontSize={size * 1.2}
                                        opacity={isActive ? 1 : 0.3}
                                    >
                                        {getSkillIcon(node.skill)}
                                    </text>
                                )}

                                {/* Core icon */}
                                {node.isCore && (
                                    <text
                                        x={node.x}
                                        y={node.y + 2}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className={styles.coreIcon}
                                        fontSize="22"
                                    >
                                        ⚡
                                    </text>
                                )}

                                {/* Category icon */}
                                {!node.skill && !node.isCore && (
                                    <text
                                        x={node.x}
                                        y={node.y + size + 18}
                                        textAnchor="middle"
                                        className={styles.categoryLabel}
                                        opacity={isActive ? 1 : 0.3}
                                        fontSize="14"
                                    >
                                        {getCategoryIcon(node.category)}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Floating tooltips */}
                {hoveredNode && (
                    <div
                        className={styles.tooltip}
                        style={{
                            left: nodes.find(n => n.id === hoveredNode)?.x || 0,
                            top: (nodes.find(n => n.id === hoveredNode)?.y || 0) - 55,
                        }}
                    >
                        <span className={styles.tooltipIcon}>
                            {nodes.find(n => n.id === hoveredNode)?.skill
                                ? getSkillIcon(nodes.find(n => n.id === hoveredNode)?.skill || '')
                                : getCategoryIcon(nodes.find(n => n.id === hoveredNode)?.category || '')}
                        </span>
                        <span>
                            {nodes.find(n => n.id === hoveredNode)?.skill ||
                                nodes.find(n => n.id === hoveredNode)?.category ||
                                'Core Skills'}
                        </span>
                        {nodes.find(n => n.id === hoveredNode)?.skill && (
                            <span className={styles.tooltipProficiency}>
                                {skillProficiency[nodes.find(n => n.id === hoveredNode)?.skill || ''] || 'Intermediate'}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className={styles.legend}>
                <h4>Categories</h4>
                <div className={styles.legendItems}>
                    {skills.categories.map((category) => (
                        <div
                            key={category.name}
                            className={styles.legendItem}
                            onClick={() => setActiveCategory(category.name === activeCategory ? null : category.name)}
                        >
                            <span
                                className={styles.legendDot}
                                style={{ backgroundColor: getCategoryColor(category.name) }}
                            />
                            <span>{category.name}</span>
                            <span className={styles.legendCount}>({category.skills.length})</span>
                        </div>
                    ))}
                </div>
                <div className={styles.proficiencyLegend}>
                    <span className={styles.proficiencyItem}>
                        <span className={styles.profDot} style={{ width: 14, height: 14 }} /> Expert
                    </span>
                    <span className={styles.proficiencyItem}>
                        <span className={styles.profDot} style={{ width: 11, height: 11 }} /> Advanced
                    </span>
                    <span className={styles.proficiencyItem}>
                        <span className={styles.profDot} style={{ width: 8, height: 8 }} /> Intermediate
                    </span>
                </div>
            </div>

            {/* Active category skills list */}
            {activeCategory && (
                <div className={styles.skillsList}>
                    <h3 style={{ color: getCategoryColor(activeCategory) }}>
                        {getCategoryIcon(activeCategory)} {activeCategory}
                    </h3>
                    <div className={styles.skillTags}>
                        {skills.categories.find(c => c.name === activeCategory)?.skills.map((skill, index) => (
                            <span
                                key={skill}
                                className={styles.skillTag}
                                style={{
                                    animationDelay: `${index * 0.05}s`,
                                    borderColor: getCategoryColor(activeCategory),
                                    '--glow-color': getCategoryColor(activeCategory),
                                } as React.CSSProperties}
                            >
                                <span className={styles.tagIcon}>{getSkillIcon(skill)}</span>
                                {skill}
                                {skillProficiency[skill] === 'expert' && (
                                    <span className={styles.expertBadge}>★</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

function getCategoryIcon(name: string): string {
    const icons: Record<string, string> = {
        'AI/ML': '🧠',
        'Cloud': '☁️',
        'Languages': '💻',
        'Web': '🌐',
        'Tools': '🛠️',
        'core': '⚡',
    };
    return icons[name] || '◈';
}
