import styles from "./AdminCourseList.module.css";

export default function AdminCourseList({
    loading,
    courses,
    onEditClick,
    handleDelete
}) {
    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>Всички курсове</h2>

            {loading && courses.length === 0 && (
                <p className={styles.info}>Зареждане на курсове...</p>
            )}

            {!loading && courses.length === 0 && (
                <p className={styles.info}>
                    Няма създадени курсове. Добавете първия от формата вляво.
                </p>
            )}

            <ul className={styles.courseList}>
                {courses.map(course => (
                    <li key={course._id || course.id} className={styles.courseItem}>
                        <div className={styles.courseMain}>
                            <h3>{course.title}</h3>
                            <span className={styles.levelBadge}>
                                {course.level || "Ниво не е зададено"}
                            </span>
                        </div>
                        {course.duration && (
                            <p className={styles.courseMeta}>
                                Продължителност: {course.duration}
                            </p>
                        )}
                        {course.hasOnlineExam && (
                            <p className={styles.examBadge}>
                                Включва онлайн теоретичен изпит
                            </p>
                        )}
                        <div className={styles.courseActions}>
                            <button
                                type="button"
                                className={styles.smallButton}
                                onClick={() => onEditClick(course)}
                            >
                                Редакция
                            </button>
                            <button
                                type="button"
                                className={styles.smallButtonDanger}
                                onClick={() => handleDelete(course)}
                            >
                                Изтриване
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};