import { useState, useEffect } from 'react';

export function useWindowEvent<K extends string = keyof WindowEventMap>(
    type: K,
    listener: K extends keyof WindowEventMap
        ? (this: Window, ev: WindowEventMap[K]) => void
        : (this: Window, ev: CustomEvent) => void,
    options?: boolean | AddEventListenerOptions,
) {
    useEffect(() => {
        // @ts-ignore
        window.addEventListener(type, listener, options);

        return () => {
            // @ts-ignore
            window.removeEventListener(type, listener, options);
        };
    }, [type, listener]);
}

interface ScrollPosition {
    x: number;
    y: number;
}

function getScrollPosition(): ScrollPosition {
    return typeof window !== 'undefined'
        ? { x: window.pageXOffset, y: window.pageYOffset }
        : { x: 0, y: 0 };
}

function scrollTo({ x, y }: Partial<ScrollPosition>) {
    if (typeof window !== 'undefined') {
        const scrollOptions: ScrollToOptions = { behavior: 'smooth' };

        if (typeof x === 'number') {
            scrollOptions.left = x;
        }

        if (typeof y === 'number') {
            scrollOptions.top = y;
        }

        window.scrollTo(scrollOptions);
    }
}

export function useWindowScroll() {
    const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

    useWindowEvent('scroll', () => setPosition(getScrollPosition()));
    useWindowEvent('resize', () => setPosition(getScrollPosition()));

    useEffect(() => {
        setPosition(getScrollPosition());
    }, []);

    return [position, scrollTo] as const;
}
