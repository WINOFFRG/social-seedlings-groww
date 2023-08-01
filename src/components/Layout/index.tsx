import { Inter } from 'next/font/google';
import styles from './layout.module.css';
import { Header } from '../Header';

const inter = Inter({ subsets: ['latin'] });

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className={`${styles.main} ${inter.className}`}>
                <svg className={styles.svg} width="100%" height="100%">
                    <filter id="pedroduarteisalegend">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.80"
                            numOctaves="4"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect
                        width="100%"
                        height="100%"
                        filter="url(#pedroduarteisalegend)"
                    ></rect>
                </svg>
                <div className={styles.sectionWrapper}>{children}</div>

                <div className={styles.gradient}>
                    <div className={styles.background}></div>
                </div>
            </main>
        </>
    );
}
