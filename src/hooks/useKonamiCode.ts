import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

export function useKonamiCode(callback: () => void) {
    const [input, setInput] = useState<string[]>([]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.code;

        setInput(prev => {
            const newInput = [...prev, key].slice(-KONAMI_CODE.length);

            if (newInput.join(',') === KONAMI_CODE.join(',')) {
                callback();
                return [];
            }

            return newInput;
        });
    }, [callback]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return input.length;
}
