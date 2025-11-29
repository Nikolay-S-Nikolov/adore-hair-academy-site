import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import styles from "./CourseDetails.module.css";
import { useCourseApi } from "../../../hooks/useCoursesApi.js";

export default function CourseDetails() {
    const { courseId } = useParams();
    const { getCourseById } = useCourseApi();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCourseById(courseId)
            .then(setCourse)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [courseId, getCourseById]);

    if (loading) return <p className={styles.loading}>Зареждане...</p>;
    if (error) return <p className={styles.error}>Грешка: {error}</p>;
    if (!course) return <p className={styles.error}>Курсът не е намерен.</p>;

    return (
        <section className={styles.page}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img
                        src={course.imageUrl || "/placeholder-course.jpg"}
                        alt={course.title}
                        className={styles.image}
                    />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{course.title}</h1>

                    <p className={styles.level}>
                        <strong>Ниво: </strong> {course.level}
                    </p>

                    <p className={styles.duration}>
                        <strong>Продължителност:</strong> {course.duration}
                    </p>

                    <p className={styles.description}>{course.description}</p>

                    <p className={styles.exam}>
                        {course.hasOnlineExam ? "✔ Включва онлайн изпит" : "✖ Без онлайн изпит"}
                    </p>

                    <p className={styles.description}>{course.details}</p>

                    <button className={styles.enrollButton}>
                        Запиши се
                    </button>

                    <Link to="/courses" className={styles.backLink}>
                        ← Обратно към курсовете
                    </Link>
                </div>
            </div>
        </section>
    );
}
