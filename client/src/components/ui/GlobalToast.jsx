import styles from "./GlobalToast.module.css";

export default function GlobalToast({ toast }) {
    if (!toast) return null;

    return (
        <div className={`${styles['toast']} ${styles[toast.type]}`}>
            {toast.message}
        </div>
    );
}