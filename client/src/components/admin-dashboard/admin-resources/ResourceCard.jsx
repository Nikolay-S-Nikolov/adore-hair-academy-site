import styles from "./AdminResources.module.css";

export default function ResourceCard({ item, onEdit, onDelete }) {
    return (
        <div className={styles.card}>
            <h3>{item.title}</h3>
            <p className={styles.type}>{item.type === "video" ? "🎬 Видео" : "📄 Файл"}</p>
            <p><strong>Курс:</strong> {item.course?.title}</p>

            <a href={item.url} target="_blank" className={styles.link}>
                Прегледай
            </a>

            <div className={styles.actions}>
                <button onClick={onEdit} className={styles.edit}>Редактирай</button>
                <button onClick={onDelete} className={styles.delete}>Изтрий</button>
            </div>
        </div>
    );
}
