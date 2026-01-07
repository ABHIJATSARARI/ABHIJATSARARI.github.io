'use client';

import styles from './Achievements.module.css';

const achievements = [
    {
        id: 1,
        title: 'SustainaPal',
        event: 'Microsoft Imagine Cup 2024',
        type: 'Global Winner',
        icon: '🏆',
        color: '#FFD700',
        description: 'World finals recognition for sustainability innovation',
    },
    {
        id: 2,
        title: 'CLIMA.AI',
        event: 'Dell Hackathon',
        type: 'First Place',
        icon: '🥇',
        color: '#FFD700',
        description: 'Climate intelligence platform using AI',
    },
    {
        id: 3,
        title: 'BridgeQuest',
        event: 'Google Cloud Hackathon',
        type: 'Winner',
        icon: '🏅',
        color: '#00D4AA',
        description: 'Educational bridge-building gamification',
    },
    {
        id: 4,
        title: 'Microsoft Ambassador',
        event: 'Microsoft Learn',
        type: 'Student Ambassador',
        icon: '⭐',
        color: '#0078D4',
        description: 'Selected as campus tech leader',
    },
    {
        id: 5,
        title: '148+ Hackathons',
        event: 'Global Competitions',
        type: 'Participant',
        icon: '🚀',
        color: '#A855F7',
        description: 'Extensive competitive experience',
    },
    {
        id: 6,
        title: '600+ Certifications',
        event: 'Various Platforms',
        type: 'Certified',
        icon: '📜',
        color: '#00F5FF',
        description: 'Continuous learning achievement',
    },
    {
        id: 7,
        title: 'Olifie',
        event: 'InnoHacks 2024',
        type: 'Top 10',
        icon: '✨',
        color: '#EC4899',
        description: 'AI-powered personal assistant',
    },
    {
        id: 8,
        title: 'Research Author',
        event: 'IEEE/ACM Publications',
        type: 'Published',
        icon: '📚',
        color: '#10B981',
        description: 'Technical research contributions',
    },
];

export default function Achievements() {
    return (
        <section className={styles.section} id="achievements">
            <div className={styles.header}>
                <h2>
                    Hall of <span className="text-gradient-cosmic">Fame</span>
                </h2>
                <p>Recognitions and milestones from the innovation journey</p>
            </div>

            <div className={styles.grid}>
                {achievements.map((achievement, index) => (
                    <div
                        key={achievement.id}
                        className={styles.card}
                        style={{
                            '--delay': `${index * 0.1}s`,
                            '--accent': achievement.color,
                        } as React.CSSProperties}
                    >
                        {/* Glow effect */}
                        <div className={styles.glow} />

                        {/* Icon */}
                        <div className={styles.iconContainer}>
                            <span className={styles.icon}>{achievement.icon}</span>
                            <div className={styles.iconRing} />
                        </div>

                        {/* Content */}
                        <div className={styles.content}>
                            <span className={styles.type}>{achievement.type}</span>
                            <h3 className={styles.title}>{achievement.title}</h3>
                            <p className={styles.event}>{achievement.event}</p>
                            <p className={styles.description}>{achievement.description}</p>
                        </div>

                        {/* Shine effect */}
                        <div className={styles.shine} />
                    </div>
                ))}
            </div>
        </section>
    );
}
