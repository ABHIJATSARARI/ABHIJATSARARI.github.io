'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'cyberpunk' | 'aurora' | 'neon' | 'minimal';

interface ThemeColors {
    holoCyan: string;
    holoBlue: string;
    holoPurple: string;
    holoPink: string;
    holoGreen: string;
    bgVoid: string;
    bgPrimary: string;
}

const themes: Record<ThemeMode, ThemeColors> = {
    cyberpunk: {
        holoCyan: '#00f5ff',
        holoBlue: '#00a8ff',
        holoPurple: '#a855f7',
        holoPink: '#f0abfc',
        holoGreen: '#00ff88',
        bgVoid: '#000000',
        bgPrimary: '#050508',
    },
    aurora: {
        holoCyan: '#00ff88',
        holoBlue: '#00d4aa',
        holoPurple: '#00a8ff',
        holoPink: '#88ffcc',
        holoGreen: '#00ff44',
        bgVoid: '#001408',
        bgPrimary: '#021a0d',
    },
    neon: {
        holoCyan: '#ff00ff',
        holoBlue: '#ff0080',
        holoPurple: '#ff6600',
        holoPink: '#ffff00',
        holoGreen: '#ff0040',
        bgVoid: '#0a0005',
        bgPrimary: '#120008',
    },
    minimal: {
        holoCyan: '#64748b',
        holoBlue: '#475569',
        holoPurple: '#6b7280',
        holoPink: '#9ca3af',
        holoGreen: '#4b5563',
        bgVoid: '#09090b',
        bgPrimary: '#0f0f12',
    },
};

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    colors: ThemeColors;
    reduceMotion: boolean;
    setReduceMotion: (value: boolean) => void;
    highContrast: boolean;
    setHighContrast: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>('cyberpunk');
    const [reduceMotion, setReduceMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    // Load saved preferences
    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') as ThemeMode;
        const savedReduceMotion = localStorage.getItem('reduce-motion') === 'true';
        const savedHighContrast = localStorage.getItem('high-contrast') === 'true';

        if (savedTheme && themes[savedTheme]) {
            setThemeState(savedTheme);
        }
        setReduceMotion(savedReduceMotion);
        setHighContrast(savedHighContrast);

        // Check system preference for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReduceMotion(true);
        }
    }, []);

    // Apply theme to CSS variables
    useEffect(() => {
        const colors = themes[theme];
        const root = document.documentElement;

        root.style.setProperty('--holo-cyan', colors.holoCyan);
        root.style.setProperty('--holo-blue', colors.holoBlue);
        root.style.setProperty('--holo-purple', colors.holoPurple);
        root.style.setProperty('--holo-pink', colors.holoPink);
        root.style.setProperty('--holo-green', colors.holoGreen);
        root.style.setProperty('--bg-void', colors.bgVoid);
        root.style.setProperty('--bg-primary', colors.bgPrimary);

        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    // Apply accessibility classes
    useEffect(() => {
        document.body.classList.toggle('reduce-motion', reduceMotion);
        localStorage.setItem('reduce-motion', String(reduceMotion));
    }, [reduceMotion]);

    useEffect(() => {
        document.body.classList.toggle('high-contrast', highContrast);
        localStorage.setItem('high-contrast', String(highContrast));
    }, [highContrast]);

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                colors: themes[theme],
                reduceMotion,
                setReduceMotion,
                highContrast,
                setHighContrast,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

export { themes };
