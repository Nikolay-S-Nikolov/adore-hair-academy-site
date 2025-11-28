import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router";
import styles from "./StudentDashboard.module.css";

export default function StudentDashboard() {
    const { user } = useAuth();

    // TODO: fetch to server
    const enrolledCourses = [
        {
            id: "c1",
            title: "Курс за начинаещи – Дамско подстригване",
            status: "in_progress", // enrolled | in_progress | completed
            nextLesson: "Модул 3: Техники за филиране",
        },
        {
            id: "c2",
            title: "Боядисване – Основно ниво",
            status: "enrolled",
            nextLesson: "Начало: 15 март 2026",
        },
    ];

    const upcomingExams = [
        {
            id: "e1",
            courseId: "c1",
            courseTitle: "Курс за начинаещи – Дамско подстригване",
            title: "Теоретичен изпит – Ниво 1",
            date: "25 февруари 2026",
        }
    ];

    const quickResources = [
        {
            id: "r1",
            courseId: "c1",
            title: "PDF: Основни форми на подстригване",
        },
        {
            id: "r2",
            courseId: "c1",
            title: "Видео: Работа с ножица и гребен",
        },
    ];

    const userName = typeof user === "object" && user?.email
        ? user.email.split("@")[0]
        : "курсист";

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Моето обучение</h1>
            <p className={styles.subtitle}>
                Здравей, <span className={styles.highlight}>{userName}</span>!
                Тук ще намериш всички курсове, изпити и материали, които са свързани с твоето обучение.
            </p>

            <div className={styles.grid}>
                {/* Лява колона – курсове */}
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>Моите курсове</h2>
                    {enrolledCourses.length === 0 && (
                        <p className={styles.empty}>
                            Все още не сте записани в курс. Разгледайте <Link to="/courses">наличните курсове</Link>.
                        </p>
                    )}

                    <ul className={styles.courseList}>
                        {enrolledCourses.map(course => (
                            <li key={course.id} className={styles.courseItem}>
                                <div className={styles.courseHeader}>
                                    <h3>{course.title}</h3>
                                    <span className={`${styles.status} ${styles[course.status]}`}>
                                        {course.status === "in_progress" && "В процес"}
                                        {course.status === "enrolled" && "Предстоящ"}
                                        {course.status === "completed" && "Завършен"}
                                    </span>
                                </div>
                                {course.nextLesson && (
                                    <p className={styles.nextLesson}>
                                        Следващо занятие: {course.nextLesson}
                                    </p>
                                )}
                                <div className={styles.courseActions}>
                                    <Link to={`/dashboard/courses/${course.id}`} className={styles.linkButton}>
                                        Материали и уроци
                                    </Link>
                                    <Link
                                        to={`/dashboard/courses/${course.id}#exam`}
                                        className={styles.secondaryButton}
                                    >
                                        Теоретичен изпит
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Дясна колона – изпити + ресурси */}
                <div className={styles.sideColumn}>
                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>Предстоящи изпити</h2>
                        {upcomingExams.length === 0 && (
                            <p className={styles.empty}>Нямате предстоящи изпити.</p>
                        )}
                        <ul className={styles.examList}>
                            {upcomingExams.map(exam => (
                                <li key={exam.id} className={styles.examItem}>
                                    <p className={styles.examCourse}>{exam.courseTitle}</p>
                                    <p className={styles.examTitle}>{exam.title}</p>
                                    <p className={styles.examDate}>Дата: {exam.date}</p>
                                    <Link
                                        to={`/dashboard/courses/${exam.courseId}#exam`}
                                        className={styles.linkButtonSmall}
                                    >
                                        Към изпита
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>Бърз достъп до материали</h2>
                        {quickResources.length === 0 && (
                            <p className={styles.empty}>Все още няма последно отваряни материали.</p>
                        )}
                        <ul className={styles.resourceList}>
                            {quickResources.map(res => (
                                <li key={res.id} className={styles.resourceItem}>
                                    <Link to={`/dashboard/courses/${res.courseId}#resources`}>
                                        {res.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
