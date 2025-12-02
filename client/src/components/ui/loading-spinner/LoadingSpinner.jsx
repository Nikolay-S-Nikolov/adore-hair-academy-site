import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ text = "Зареждане..." }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>{text}</p>
        </div>
    );
}
