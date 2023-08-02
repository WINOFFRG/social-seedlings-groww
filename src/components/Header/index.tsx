import styles from './header.module.css';
import { BellIcon } from '../Icons';
import Link from 'next/link';
import { useStore } from '@/store';

export function Header() {
    const setTheme = useStore((state) => state.setTheme);
    const theme = useStore((state) => state.theme);

    const handleThemeSwitch = () => {
        document.body.classList.toggle('light-mode');
        setTheme(theme === 'dark' ? 'light' : 'dark');
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
