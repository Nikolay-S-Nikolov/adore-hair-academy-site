import { useEffect, useState } from "react";
import styles from "./Courses.module.css";
import { Link } from 'react-router'
import config from '../../gonfig/config.js'

export default function Courses() {
    const [beginnerCourses, setBeginnerCourses] = useState([]);
    const [advancedCourses, setAdvancedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [begRes, advRes] = await Promise.all([
                    fetch(`${config.BASE_URL}/data/courses?where=level%3D%22Начинаещ%22`),
                    fetch(`${config.BASE_URL}/data/courses?where=level%3D%22Напреднали%22`)
                ]);

                const beginners = await begRes.json();
                const advanced = await advRes.json();

                setBeginnerCourses(beginners);
                setAdvancedCourses(advanced);
            } catch (err) {
                console.error("Error loading courses:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [])

    if (loading) return <p>Зареждане...</p>;

    return (
        <section className={styles.coursesPage}>
            <div className="container">
                <header className={styles.coursesHeader}>
                    <p className={styles.coursesEyebrow}>Курсове по фризьорство ADORE</p>
                    <h1>Избери своя курс и стани търсен професионалист</h1>
                    <p className={styles.coursesIntro}>
                        В нашата академия ще откриеш практични обучения както за напълно
                        начинаещи, така и за фризьори с опит. Всички програми са изградени
                        така, че да комбинират теория, демонстрации и реална практика върху
                        модели.
                    </p>
                </header>

                {/* Група: Курсове за начинаещи */}
                <section className={styles.coursesGroup}>
                    <div className={styles.coursesGroupHeader}>
                        <h2>Курсове за начинаещи</h2>
                        <p>
                            Подходящи за хора без опит, които искат да направят първите си
                            стъпки в професионалното фризьорство.
                        </p>
                    </div>


                    <div className={styles.coursesGrid}>

                        {beginnerCourses.map(c => (
                            <article key={c._id} className={`${styles.courseCard} ${styles.courseCardBeginner}`}>
                                <div className={styles.courseCardHeader}>
                                    <span className={`${styles.courseTag} ${styles.courseTagBeginner}`}>
                                        Ниво: {c.level}
                                    </span>
                                    <h3>{c.title}</h3>
                                </div>
                                <img
                                    src={c.imageUrl}
                                    alt={`${c.title} image`}
                                    className={styles.courseImage}
                                />

                                <p className={styles.courseShort}>
                                    {c.description}
                                </p>

                                <Link to={`/courses/${c._id}`} className={styles.moreButton}>
                                    Виж детайлите →
                                </Link>

                                <div className={styles.courseMeta}>
                                    <span className={styles.courseDuration}>Продължителност: {c.duration}</span>
                                    <span className={styles.courseFormat}>Формат: Теория + практика</span>
                                </div>

                                <Link to="tel:0888123456" className="cta-button course-cta">
                                    📞 Обади се и се запиши
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.coursesGroup}>
                    <div className={styles.coursesGroupHeader}>
                        <h2>Курсове за напреднали</h2>
                        <p>
                            За фризьори с базови умения, които искат да надградят знанията си
                            с модерни техники и специализирани услуги.
                        </p>
                    </div>

                    <div className={styles.coursesGrid}>

                        {advancedCourses.map(c => (
                            <article key={c._id} className={`${styles.courseCard} ${styles.courseCardAdvanced}`}>
                                <div className={styles.courseCardHeader}>
                                    <span className={`${styles.courseTag} ${styles.courseTagAdvanced}`}>
                                        Ниво: {c.level}
                                    </span>
                                    <h3>{c.title}</h3>
                                </div>

                                <img
                                    src={c.imageUrl}
                                    alt={`${c.imageUrl} image`}
                                    className={styles.courseImage}
                                />

                                <p className={styles.courseShort}>
                                    {c.description}
                                </p>

                                <Link to={`/courses/${c._id}`} className={styles.moreButton}>
                                    Пълна информация за обучението
                                </Link>

                                <div className={styles.courseMeta}>
                                    <span className={styles.courseDuration}>Продължителност: {c.duration}</span>
                                    <span className={styles.courseFormat}>Формат: Майсторски клас + практика</span>
                                </div>

                                <a href="tel:0888123456" className="cta-button course-cta">
                                    📞 Запиши се за модерна колористика
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Долно CTA блокче */}
                <section className={styles.coursesCtaSection}>
                    <div className={styles.coursesCtaBox}>
                        <h2>Не знаеш кой курс е най-подходящ за теб?</h2>
                        <p>
                            Обади ни се и заедно ще изберем програмата според твоя опит,
                            свободно време и цел – работа в салон, собствен бизнес или
                            специализация.
                        </p>
                        <a href="tel:0888123456" className="cta-button course-cta">
                            📞 Консултация по телефон
                        </a>
                    </div>
                </section>
            </div>
        </section>
    );
}
