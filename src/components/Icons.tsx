export function SolarMenuDotsBoldDuotone(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="white">
                <path d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"></path>
                <path
                    d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"
                    opacity=".5"
                ></path>
            </g>
        </svg>
    );
}

export function HeartIcon({
    liked = false,
    ...props
}: {
    liked?: boolean;
    [x: string]: any;
}) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {liked ? (
                <path
                    fill="#ef4444"
                    d="M240 94c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 220.66 16 164 16 94a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 40.88 157.35 32 178 32a62.07 62.07 0 0 1 62 62Z"
                ></path>
            ) : (
                <path
                    fill="#fff"
                    d="M178 32c-20.65 0-38.73 8.88-50 23.89C116.73 40.88 98.65 32 78 32a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 220.66 240 164 240 94a62.07 62.07 0 0 0-62-62Zm-50 174.8C109.74 196.16 32 147.69 32 94a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8Z"
                ></path>
            )}
        </svg>
    );
}

export function CommentsIcon(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.891 1 4.127L3 21l4.873-1c1.236.64 2.64 1 4.127 1Z"
            ></path>
        </svg>
    );
}

export function ShareIcon(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#fff"
                d="M20.33 3.67a1.45 1.45 0 0 0-1.47-.35L4.23 8.2A1.44 1.44 0 0 0 4 10.85l6.07 3l3 6.09a1.44 1.44 0 0 0 1.29.79h.1a1.43 1.43 0 0 0 1.26-1l4.95-14.59a1.41 1.41 0 0 0-.34-1.47ZM4.85 9.58l12.77-4.26l-7.09 7.09Zm9.58 9.57l-2.84-5.68l7.09-7.09Z"
            ></path>
        </svg>
    );
}

export function RibbonSave(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5v14.586c0 .89 1.077 1.337 1.707.707L12 14l6.293 6.293c.63.63 1.707.184 1.707-.707V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z"
            ></path>
        </svg>
    );
}

export function MoonIcon(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#fff"
                d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480Z"
            ></path>
        </svg>
    );
}

export function SunIcon(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="none">
                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
                <path
                    fill="#fff"
                    d="M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094l-.707.707a1 1 0 0 1-1.497-1.32l.083-.094l.707-.707ZM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12Zm-8 5a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 0-1.414Zm14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z"
                ></path>
            </g>
        </svg>
    );
}

export function SearchIcon(props) {
    return (
        <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#000000"
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            ></path>
        </svg>
    );
}
