import { useEffect, useState } from "react";
import { Link } from "react-router"
import LoadingSpinner from "../ui/loading-spinner/LoadingSpinner.jsx";

import styles from "./StudentDashboard.module.css";
import { useCourseApi } from "../../hooks/useCoursesApi.js";
import { useAuth } from "../../hooks/useAuth.js";
import formatDate from "../../utils/formatDateTime.js";

export default function StudentDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([])
    const [expanded, setExpanded] = useState({});
    const [resources, setResources] = useState({});
    const [exams, setExams] = useState({});
    const [demoExams, setDemoExams] = useState({});

    const [loadingRes, setLoadingRes] = useState({});
    const { request } = useCourseApi();

    useEffect(() => {
        request("GET", `/data/enrollments?where=_ownerId%3D%22${user._id}%22%20&load=course%3DcourseId%3Acourses`)
            .then(data => setCourses(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, [request, user._id]);

    const currentTime = Date.now();

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
            const exam = await request("GET", `/data/exams?where=courseId%3D%22${courseId}%22&sortBy=_createdOn%20desc`)

            setExams(prev => ({ ...prev, [courseId]: exam.filter(e => e.type === "finalExam")[0] }));
            setDemoExams(prev => ({ ...prev, [courseId]: exam.filter(e => e.type === "demoExam")[0] }));
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

    function converDateTime(dateTime) {
        return new Date(dateTime).getTime()
    }

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
                                Материали, уроци и изпити
                            </button>

                        </div>

                        {expanded[item.course._id] && (
                            <div className={styles.resourceList}>

                                {loadingRes[item.course._id] && (
                                    <p className={styles.loading}>Зареждане...</p>
                                )}

                                {!loadingRes[item.course._id] && exams[item.course._id] && (
                                    currentTime >= converDateTime(exams[item.course._id].startAt) && currentTime <= converDateTime(exams[item.course._id].endAt) ?
                                        (<Link
                                            to={`/dashboard/exam/${exams[item.course._id]._id}`}
                                            className={styles.examLink}
                                        >
                                            Линк към изпит :{exams[item.course._id].title}
                                        </Link>
                                        ) : currentTime < converDateTime(exams[item.course._id].startAt) ? (
                                            <p className={styles.examInfo}>
                                                Изпитът започва на {formatDate(exams[item.course._id].startAt)}
                                            </p>
                                        ) : (
                                            <p className={styles.examClosed}>
                                                Изпитният прозорец е затворен.
                                            </p>
                                        )
                                )}

                                {!loadingRes[item.course._id] && !exams[item.course._id] && (
                                    <p className={styles.empty}>Все още няма добавени изпит.</p>
                                )}

                                {!loadingRes[item.course._id] && demoExams[item.course._id] &&
                                    (<Link
                                        to={`/dashboard/exam/${demoExams[item.course._id]._id}`}
                                        className={styles.demoExamLink}
                                    >
                                        Линк към демо изпит :{demoExams[item.course._id].title}
                                    </Link>)

                                }

                                {!loadingRes[item.course._id] && !demoExams[item.course._id] && (
                                    <p className={styles.empty}>Все още няма добавен демо изпит.</p>
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
