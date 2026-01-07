import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useInView<T extends Element>(
    options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<T | null>(null);
    const [isInView, setIsInView] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        hasTriggered.current = true;
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        if (!hasTriggered.current) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isInView];
}
