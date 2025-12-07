import styles from "./AdminExams.module.css";
import formatDateTime from "../../../utils/formatDateTime.js"

export default function ExamList({ exams, onEdit, onDelete }) {

    if (exams.length === 0) {
        return <p className={styles.empty}>Все още няма създадени изпити.</p>;
    }

    return (
        <div className={styles.list}>
            {exams.map(exam => (
                <div key={exam._id} className={styles.listCard}>
                    <h3>{exam.title}</h3>
                    <p><strong>Курс:</strong> {exam.course?.title || "—"}</p>
                    <p><strong>Въпроси:</strong> {exam.questions?.length || 0}</p>
                    <p><strong>Продължителност:</strong> {exam.duration} мин.</p>
                    <p><strong>Начало:</strong> {formatDateTime(exam.startAt)}</p>
                    <p><strong>Край:</strong> {formatDateTime(exam.endAt)}</p>

                    <div className={styles.listActions}>
                        <button onClick={() => onEdit(exam)} className={styles.editButton}>Редактирай</button>
                        <button onClick={() => onDelete(exam)} className={styles.deleteButton}>Изтрий</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
