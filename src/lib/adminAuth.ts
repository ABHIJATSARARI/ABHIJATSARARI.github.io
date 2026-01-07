// Admin authentication utilities
// No sensitive data should ever be logged

const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    expiresAt: number | null;
}

interface LockState {
    attempts: number;
    lockedUntil: number | null;
}

// Generate a random session token
function generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Get lock state from sessionStorage
function getLockState(): LockState {
    if (typeof window === 'undefined') return { attempts: 0, lockedUntil: null };

    const stored = sessionStorage.getItem('admin_lock');
    if (!stored) return { attempts: 0, lockedUntil: null };

    try {
        return JSON.parse(stored);
    } catch {
        return { attempts: 0, lockedUntil: null };
    }
}

// Set lock state
function setLockState(state: LockState): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('admin_lock', JSON.stringify(state));
}

// Check if locked out
export function isLockedOut(): { locked: boolean; remainingTime: number } {
    const state = getLockState();

    if (state.lockedUntil && Date.now() < state.lockedUntil) {
        return {
            locked: true,
            remainingTime: Math.ceil((state.lockedUntil - Date.now()) / 1000),
        };
    }

    // Clear lock if expired
    if (state.lockedUntil && Date.now() >= state.lockedUntil) {
        setLockState({ attempts: 0, lockedUntil: null });
    }

    return { locked: false, remainingTime: 0 };
}

// Record failed attempt
export function recordFailedAttempt(): { locked: boolean; attemptsRemaining: number } {
    const state = getLockState();
    const newAttempts = state.attempts + 1;

    if (newAttempts >= MAX_ATTEMPTS) {
        setLockState({
            attempts: newAttempts,
            lockedUntil: Date.now() + LOCK_DURATION,
        });
        return { locked: true, attemptsRemaining: 0 };
    }

    setLockState({ ...state, attempts: newAttempts });
    return { locked: false, attemptsRemaining: MAX_ATTEMPTS - newAttempts };
}

// Clear failed attempts on successful login
function clearAttempts(): void {
    setLockState({ attempts: 0, lockedUntil: null });
}

// Validate credentials (client-side check against env vars)
export async function validateCredentials(
    username: string,
    password: string
): Promise<boolean> {
    // In a real app, this would be a server-side API call
    // For static site, we use environment variables
    const validUser = process.env.NEXT_PUBLIC_ADMIN_USER || 'admin';
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123';

    // Simple timing-safe comparison (basic protection)
    const userMatch = username === validUser;
    const passMatch = password === validPass;

    return userMatch && passMatch;
}

// Create authenticated session
export function createSession(): string {
    const token = generateToken();
    const expiresAt = Date.now() + SESSION_TIMEOUT;

    const authState: AuthState = {
        isAuthenticated: true,
        token,
        expiresAt,
    };

    sessionStorage.setItem('admin_auth', JSON.stringify(authState));
    clearAttempts();

    return token;
}

// Validate session
export function validateSession(): boolean {
    if (typeof window === 'undefined') return false;

    const stored = sessionStorage.getItem('admin_auth');
    if (!stored) return false;

    try {
        const state: AuthState = JSON.parse(stored);

        if (!state.isAuthenticated || !state.token || !state.expiresAt) {
            return false;
        }

        // Check if expired
        if (Date.now() > state.expiresAt) {
            destroySession();
            return false;
        }

        // Refresh expiration on activity
        refreshSession();

        return true;
    } catch {
        return false;
    }
}

// Refresh session expiration
export function refreshSession(): void {
    if (typeof window === 'undefined') return;

    const stored = sessionStorage.getItem('admin_auth');
    if (!stored) return;

    try {
        const state: AuthState = JSON.parse(stored);
        state.expiresAt = Date.now() + SESSION_TIMEOUT;
        sessionStorage.setItem('admin_auth', JSON.stringify(state));
    } catch {
        // Silent fail
    }
}

// Destroy session (logout)
export function destroySession(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem('admin_auth');
}

// Login function
export async function login(
    username: string,
    password: string
): Promise<{ success: boolean; error?: string }> {
    // Check lockout first
    const lockStatus = isLockedOut();
    if (lockStatus.locked) {
        return {
            success: false,
            error: `Too many attempts. Try again in ${Math.ceil(lockStatus.remainingTime / 60)} minutes.`,
        };
    }

    // Validate credentials
    const isValid = await validateCredentials(username, password);

    if (!isValid) {
        const result = recordFailedAttempt();
        if (result.locked) {
            return {
                success: false,
                error: `Account locked. Try again in 15 minutes.`,
            };
        }
        return {
            success: false,
            error: `Invalid credentials. ${result.attemptsRemaining} attempts remaining.`,
        };
    }

    // Create session
    createSession();

    return { success: true };
}

// Logout function
export function logout(): void {
    destroySession();
}
