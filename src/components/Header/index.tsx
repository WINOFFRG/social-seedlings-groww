import styles from './header.module.css';
import { BellIcon, MoonIcon, SunIcon } from '../Icons';
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
                        <BellIcon />
                    </div>
                    <input
                        title="Toggle Theme"
                        id="toggle"
                        className="toggle"
                        type="checkbox"
                        onClick={handleThemeSwitch}
                    />
                </div>
            </div>
        </header>
    );
}
