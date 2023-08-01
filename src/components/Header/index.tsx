import styles from './header.module.css';
import { MoonIcon, SearchIcon, SunIcon } from '../Icons';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
    const [isLightMode, setIsLightMode] = useState(false);

    const handleThemeSwitch = () => {
        document.body.classList.toggle('light-mode');
        setIsLightMode((prev) => !prev);
    };

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.blur} />
            <div className={styles.headerInner}>
                <Link className={styles.textLogo} href={'/'}>
                    Social Seedlings
                </Link>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search"></input>
                </div>
                <div className={styles.header__rightSection}>
                    <div className={styles.notification}>
                        <span className={styles.notificationNumber}>3</span>
                        🔔
                    </div>
                    <button
                        className={styles.themeSwitcher}
                        onClick={handleThemeSwitch}
                    >
                        {isLightMode ? <SunIcon /> : <MoonIcon />}
                    </button>
                    {/* <Image
                        src={
                            'https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
                        }
                        height={32}
                        width={32}
                        alt="Profile Image"
                        className={styles.profileImg}
                    /> */}
                </div>
            </div>
        </header>
    );
}
