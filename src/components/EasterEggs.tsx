'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useKonamiCode } from '@/hooks/useKonamiCode';

const MatrixRain = dynamic(() => import('./MatrixRain'), { ssr: false });

export default function EasterEggs() {
    const [showMatrix, setShowMatrix] = useState(false);

    const handleKonami = useCallback(() => {
        setShowMatrix(true);
    }, []);

    useKonamiCode(handleKonami);

    return (
        <>
            {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
        </>
    );
}
