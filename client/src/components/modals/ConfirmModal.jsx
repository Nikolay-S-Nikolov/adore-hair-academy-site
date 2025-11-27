import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{title}</h2>
                <p>{message}</p>

                <div className={styles.actions}>
                    <button className={styles.cancel} onClick={onCancel}>
                        Отказ
                    </button>

                    <button className={styles.confirm} onClick={onConfirm}>
                        Потвърди
                    </button>
                </div>
            </div>
        </div>
    );
}
