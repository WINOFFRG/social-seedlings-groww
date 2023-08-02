import { useState, useEffect, useRef } from 'react';

function getInitialValue(query: string) {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
        return window.matchMedia(query).matches;
    }

    return false;
}

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(getInitialValue(query));
    const queryRef = useRef<MediaQueryList>();

    useEffect(() => {
        if ('matchMedia' in window) {
            queryRef.current = window.matchMedia(query);
            setMatches(queryRef.current.matches);
        }

        return undefined;
    }, [query]);

    return matches;
}
