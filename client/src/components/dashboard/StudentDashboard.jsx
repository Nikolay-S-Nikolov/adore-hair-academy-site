import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/loading-spinner/LoadingSpinner.jsx";

import styles from "./StudentDashboard.module.css";
import { useCourseApi } from "../../hooks/useCoursesApi.js";
import { useAuth } from "../../hooks/useAuth.js";

export default function StudentDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([])
    const [expanded, setExpanded] = useState({});
    const [resources, setResources] = useState({});
    const [loadingRes, setLoadingRes] = useState({});
    const { request } = useCourseApi()

    useEffect(() => {
        request("GET", `/data/enrollments?where=_ownerId%3D%22${user._id}%22%20&load=course%3DcourseId%3Acourses`)
            .then(setCourses)
            .finally(() => setLoading(false));
    }, [request, user._id]);

    async function toggleResources(courseId) {
        const isOpen = expanded[courseId];

        if (isOpen) {
            setExpanded(prev => ({ ...prev, [courseId]: false }));
            return;
        }

        setExpanded(prev => ({ ...prev, [courseId]: true }));
        setLoadingRes(prev => ({ ...prev, [courseId]: true }));

        try {
            const data = await request("GET", `/data/resources?where=courseId%3D%22${courseId}%22`)
            setResources(prev => ({ ...prev, [courseId]: data }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingRes(prev => ({ ...prev, [courseId]: false }));
        }
    }

    if (loading) return <LoadingSpinner />;

    const approved = courses.filter(e => e.status === "approved");
    const pending = courses.filter(e => e.status === "pending");
    const rejected = courses.filter(e => e.status === "rejected");

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Моите курсове</h1>

            {/* APPROVED */}
            <h2 className={styles.sectionTitle}>Одобрени обучения</h2>
            <ul className={styles.courseList}>
                {approved.length === 0 && <p>Нямате одобрени обучения.</p>}

                {approved.map(item => (
                    <li key={item._id} className={styles.courseItem}>
                        <div className={styles.courseHeader}>
                            <h3>{item.course.title}</h3>
                            <span className={`${styles.status} ${styles.in_progress}`}>
                                Одобрен
                            </span>
                        </div>

                        <p className={styles.nextLesson}>
                            Ниво: {item.course.level} • Продължителност: {item.course.duration}
                        </p>

                        <div className={styles.courseActions}>
                            <button
                                className={styles.linkButton}
                                onClick={() => toggleResources(item.course._id)}
                            >
                                Материали и уроци
                            </button>
                        </div>

                        {expanded[item.course._id] && (
                            <div className={styles.resourceList}>

                                {loadingRes[item.course._id] && (
                                    <p className={styles.loading}>Зареждане...</p>
                                )}

                                {!loadingRes[item.course._id] &&
                                    resources[item.course._id]?.map(r => (
                                        <div key={r._id} className={styles.resourceItem}>

                                            <div className={styles.resourceHeader}>
                                                <span className={
                                                    r.type === "video"
                                                        ? styles.videoTag
                                                        : styles.fileTag
                                                }>
                                                    {r.type === "video" ? "Видео" : "Файл"}
                                                </span>

                                                <a href={r.url} target="_blank" className={styles.resourceTitle}>
                                                    {r.title.length > 40 ? r.title.slice(0, 40) + "..." : r.title}
                                                </a>
                                            </div>

                                            {r.description && (
                                                <p className={styles.resourceDescription}>
                                                    {r.description.length > 90
                                                        ? r.description.slice(0, 90) + "..."
                                                        : r.description}
                                                </p>
                                            )}

                                            <button
                                                className={styles.secondaryButton}
                                                onClick={() => window.open(r.url, "_blank")}
                                            >
                                                {r.type === "video" ? "Пусни видеото" : "Отвори файла"}
                                            </button>

                                        </div>
                                    ))
                                }

                                {!loadingRes[item.course._id] &&
                                    resources[item.course._id]?.length === 0 && (
                                        <p className={styles.empty}>Все още няма добавени материали.</p>
                                    )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* PENDING */}
            <h2 className={styles.sectionTitle}>Очакващи одобрение</h2>
            <ul className={styles.courseList}>
                {pending.length === 0 && <p>Нямате чакащи заявки.</p>}

                {pending.map(item => (
                    <li key={item._id} className={styles.courseItem}>
                        <div className={styles.courseHeader}>
                            <h3>{item.course.title}</h3>
                            <span className={`${styles.status} ${styles.pending}`}>
                                Очаква одобрение
                            </span>
                        </div>

                        <p className={styles.nextLesson}>
                            Ниво: {item.course.level} • Продължителност: {item.course.duration}
                        </p>
                    </li>
                ))}
            </ul>

            {/* REJECTED */}
            <h2 className={styles.sectionTitle}>Отказани заявки</h2>
            <ul className={styles.courseList}>
                {rejected.length === 0 && <p>Нямате отказани заявки.</p>}

                {rejected.map(item => (
                    <li key={item._id} className={styles.courseItem}>
                        <div className={styles.courseHeader}>
                            <h3>{item.course.title}</h3>
                            <span className={`${styles.status} ${styles.rejected}`}>
                                Заявката е отказана
                            </span>
                        </div>

                        <p className={styles.nextLesson}>
                            Можете да опитате отново или да се свържете с администрацията.
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );

}
