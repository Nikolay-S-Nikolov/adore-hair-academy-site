import styles from "./About.module.css";
import about from '..//../assets/about-hero.jpg'
import aboutA from '..//../assets/about1.jpg'
import aboutB from '..//../assets/about2.jpg'
import aboutC from '..//../assets/about3.jpg'

export default function About() {
  return (
    <section className={styles.aboutPage}>
      
      {/* HERO SECTION */}
      <div className={styles.heroSection}>
        <img
          src={about}
          alt="ADORE Hair Academy"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>ADORE Hair Academy</h1>
          <p>Where talent transforms into mastery.</p>
        </div>
      </div>

      <div className="container">

        {/* MISSION SECTION */}
        <section className={styles.missionSection}>
          <h2 className={styles.title}>Нашата мисия</h2>
          <p className={styles.subtitle}>
            Създаваме професионалисти, вдъхновени от изкуството на фризьорството.
          </p>

          <div className={styles.missionGrid}>
            <p>
              ADORE Hair Academy е място, където съвременните техники,
              елегантната естетика и професионализмът се срещат. Нашите обучения
              са създадени така, че не просто да обучават — а да изграждат
              увереност, стил и истинско майсторство.
            </p>
            <p>
              Работим с малки групи, индивидуален подход и изцяло практически
              насочени методи. Всеки курсист получава внимание, подкрепа и
              реални умения, които водят до успешна кариера.
            </p>
          </div>
        </section>

        {/* IMAGE COLLAGE */}
        <section className={styles.collageSection}>
          <div className={styles.collageGrid}>
            <img
              src={aboutA}
              alt=""
            />
            <img
              src={aboutB}
              alt=""
            />
            <img
              src={aboutC}
              alt=""
            />
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className={styles.teamSection}>
          <h2 className={styles.title}>Екипът ни</h2>
          <p className={styles.subtitle}>Опит. Професионализъм. Стил.</p>

          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img
                src="https://images.unsplash.com/photo-1607569708758-0270aa4651bd"
                alt="Instructor 1"
              />
              <h3>Мария Колева</h3>
              <p>Инструктор по дамски техники</p>
            </div>

            <div className={styles.teamMember}>
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
                alt="Instructor 2"
              />
              <h3>Ева Николова</h3>
              <p>Специалист по колористика</p>
            </div>

            <div className={styles.teamMember}>
              <img
                src="https://images.unsplash.com/photo-1595294572864-ddb46d169dbb"
                alt="Instructor 3"
              />
              <h3>Десислав Огнянов</h3>
              <p>Барбър & мъжки подстригвания</p>
            </div>
          </div>
        </section>

        {/* ACADEMY INTERIOR GALLERY */}
        <section className={styles.gallerySection}>
          <h2 className={styles.title}>ADORE Academy Отвътре</h2>

          <div className={styles.galleryGrid}>
            <img src="https://images.unsplash.com/photo-1579643046891-3386be56709c" alt="" />
            <img src="https://images.unsplash.com/photo-1703792686756-c82bf734c89b" alt="" />
            <img src="https://images.unsplash.com/photo-1623171678074-1b04ff0e694f" alt="" />
            <img src="https://images.unsplash.com/photo-1706629503650-cade709d15e3" alt="" />
            <img src="https://images.unsplash.com/photo-1703792686930-9efa64a9c6c5" alt="" />
          </div>
        </section>

        {/* CTA BLOCK */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Готови ли сте да започнете своето обучение?</h2>
            <p>
              Свържете се с нас за лична консултация и насоки към най-подходящия
              курс.
            </p>
            <a href="/courses" className="cta-button hero-cta">
              Виж всички курсове →
            </a>
          </div>
        </section>

      </div>
    </section>
  );
}
