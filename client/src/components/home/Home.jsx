import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCourseApi } from "../../hooks/useCoursesApi.js";
import LoadingSpinner from "../ui/loading-spinner/LoadingSpinner.jsx";

export default function Home() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { request } = useCourseApi()


    useEffect(() => {
        async function loadCourses() {
            try {
                setLoading(true);
                const data = await request("GET", "/data/courses/?sortBy=_createdOn%20desc");
                setCourses(data.slice(0, 3));
            } catch (err) {
                setError(`Грешка при зареждането ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        loadCourses();
    }, [request]);



    return (
        <>
            <section id="home" className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1>Стани професионален фризьор с нашите практически курсове</h1>
                        <p className="subtitle">Обучения, създадени за начинаещи и напреднали, с реална практика и лицензирани
                            инструктори.</p>
                        <a href="tel:0888123456" className="cta-button hero-cta">📞 Обади се и се запиши днес</a>
                        <small className="cta-note">Местата са ограничени – започваме нова група този месец!</small>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src="https://plus.unsplash.com/premium_photo-1669675936437-c4b6d12298ca"
                            alt="Фризьор стилизира коса в салон" />
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="container">
                    <h2>Защо да избереш нашата академия по фризьорство?</h2>
                    <div className="about-content">
                        <p>Повече от <strong>10 години</strong> подготвяме успешни фризьори, които днес работят в
                            най-добрите салони в
                            страната и чужбина.</p>
                        <p>Нашият екип вярва, че всеки може да се научи да създава красота — нужно е само желание и правилно
                            обучение.</p>
                        <div className="about-buttons">
                            <Link to="/about" className="secondary-button"> Научи повече за нас</Link>
                            <a href="#reviews" className="secondary-button"> Виж отзиви от курсисти</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="courses" className="courses-section">
                <div className="container">
                    <h2>Нашите курсове по фризьорство</h2>

                    {loading && <LoadingSpinner text="Зареждане на курсовете..." />}
                    {error && <p
                        style={{
                            'padding': '16px',
                            'background': 'rgba(231, 76, 60, 0.15)',
                            'color': '#e74c3c',
                            'border- radius': '12px',
                            'border': '1px solid rgba(231, 76, 60, 0.3)',
                            'margin-bottom': '20px',
                            'text-align': 'center'
                        }}
                    >{error}</p>}

                    <div className="course-cards">
                        {!loading && courses.map(c=>(
                            <article key={c._id}  className="course-card">
                                <img src={c.imageUrl}
                                    alt={`Снимка на ${c.title}`}/>
                                <h3>{c.title}</h3>
                                <p>{c.description}</p>
                                <small>Продължителност: {c.duration}</small>
                                <Link to={`/courses/${c._id}`} className="cta-button course-cta">Виж повече / Запиши се</Link>
                            </article>
                            ))}
                    </div>
                </div>
            </section >

            <section className="process-section">
                <div className="container">
                    <h2>Практика, индивидуален подход и реални резултати</h2>
                    <p className="intro-text">В нашите курсове ще работиш върху реални модели под ръководството на опитни
                        преподаватели. Всеки курс включва теория, демонстрации и практическа работа. След завършване
                        получаваш лицензиран сертификат и съдействие за работа.</p>

                    <div className="process-steps">
                        <div className="step-card">
                            <span className="icon">🎓</span>
                            <h3>Обучение с практика</h3>
                        </div>
                        <div className="step-card">
                            <span className="icon">🧑‍🏫</span>
                            <h3>Индивидуално внимание</h3>
                        </div>
                        <div className="step-card">
                            <span className="icon">🪪</span>
                            <h3>Сертификат и реализация</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section id="reviews" className="reviews-section">
                <div className="container">
                    <h2>Какво споделят нашите курсисти</h2>
                    <div className="review-cards">
                        <div className="review-card">
                            <p>„Започнах без никакъв опит, а днес работя в салон! Преподавателите са страхотни!“</p>
                            <p className="author">– <strong>Мария Т., София</strong> </p>
                        </div>
                        <div className="review-card">
                            <p>„Най-добрият курс, който съм посещавала – много практика и реална подготовка за работа.“</p>
                            <p className="author">– <strong>Ива П., Велико Търново</strong> </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact-section">
                <div className="container">
                    <h2>Готови ли сте да започнете своята професионална промяна?</h2>
                    <p>Обади се още днес и запази място в следващата група. Нашият екип ще отговори на всички твои въпроси.
                    </p>

                    <div className="contact-details">
                        <p>📍 <strong>Адрес:</strong> гр. Велико Търново, ул. „...“</p>
                        <p>📞 <strong>Телефон:</strong> <a href="tel:0888123456">0888 123 456</a></p>
                        <p>📧 <strong>Email:</strong> <a href="mailto:info@academyhair.bg">info@academyhair.bg</a></p>
                    </div>

                    <a href="tel:0888123456" className="cta-button contact-cta">📞 Обади се сега</a>

                </div>
            </section>
        </>
    );
};