'use client';

import { useState, FormEvent } from 'react';
import { login, isLockedOut } from '@/lib/adminAuth';
import styles from './AdminAuth.module.css';

interface AdminAuthProps {
    onSuccess: () => void;
}

export default function AdminAuth({ onSuccess }: AdminAuthProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Check lockout
        const lockStatus = isLockedOut();
        if (lockStatus.locked) {
            setError(`Locked out. Try again in ${Math.ceil(lockStatus.remainingTime / 60)} minutes.`);
            setIsLoading(false);
            return;
        }

        const result = await login(username, password);

        if (result.success) {
            onSuccess();
        } else {
            setError(result.error || 'Authentication failed');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.icon}>🔐</span>
                    <h1>Observatory Access</h1>
                    <p>Authorized personnel only</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Identifier</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            autoComplete="off"
                            autoFocus
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Access Key</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoComplete="off"
                            required
                        />
                    </div>

                    {error && (
                        <div className={styles.error}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles.spinner} />
                                Authenticating...
                            </>
                        ) : (
                            'Access Dashboard'
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Session expires after 30 minutes of inactivity</p>
                </div>
            </div>
        </div>
    );
}
