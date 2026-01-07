'use client';

import styles from './AnimatedBlobs.module.css';

export default function AnimatedBlobs() {
    return (
        <div className={styles.container} aria-hidden="true">
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
            <div className={`${styles.blob} ${styles.blob3}`} />
            <div className={`${styles.blob} ${styles.blob4}`} />
        </div>
    );
}
