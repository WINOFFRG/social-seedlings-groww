import styles from './loading.module.css';

export function LoadingDots() {
    return (
        <div className={styles.spinnerBox}>
            <div className={styles.pulseContainer}>
                <div
                    className={styles.pulseBubble + ' ' + styles.pulseBubble1}
                ></div>
                <div
                    className={styles.pulseBubble + ' ' + styles.pulseBubble2}
                ></div>
                <div
                    className={styles.pulseBubble + ' ' + styles.pulseBubble3}
                ></div>
            </div>
        </div>
    );
}
