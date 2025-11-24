import ContactForm from "./contact-form/ContactForm.jsx";
import styles from "./Contact.module.css";
import FaqSection from "./faq-section/FaqSection.jsx";

export default function Contact() {
  return (
    <section className={styles.contactPage}>
      <div className="container">

        {/* HEADER */}
        <header className={styles.header}>
          <h1>Свържете се с ADORE Hair Academy</h1>
          <p className={styles.subtitle}>
            Ние сме тук, за да отговорим на всички въпроси, да ви консултираме
            и да ви помогнем да изберете най-подходящия курс.
          </p>
        </header>

        {/* INFO BLOCK */}
        <section className={styles.infoSection}>

          {/* CONTACT DETAILS */}
          <div className={styles.infoCard}>
            <h2>Контакти</h2>

            <div className={styles.infoList}>
              <p><strong>Адрес:</strong> ул. "Илю Войвода" 10, Велико Търново</p>
              <p><strong>Телефон:</strong>
                <a href="tel:+359888123456"> 0888 123 456</a>
              </p>
              <p><strong>Email:</strong>
                <a href="mailto:info@adoreacademy.bg"> info@adoreacademy.bg</a>
              </p>
              <p><strong>Работно време:</strong> Пон–Съб: 10:00 – 19:00</p>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className={styles.socials}>
              <a
                href="https://instagram.com"
                target="_blank"
                className={styles.socialButton}
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                className={styles.socialButton}
              >
                Facebook
              </a>
            </div>
          </div>

          {/* CONTACT FORM */}
          <ContactForm />

        </section>

        {/* MAP SECTION */}
        <section className={styles.mapSection}>
          <h2>Къде се намираме?</h2>
          <p className={styles.subtitle}>Лесно достъпна локация с удобен транспорт</p>

          <div className={styles.mapWrapper}>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1373.0010385017754!2d25.61614345548106!3d43.075409309902234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a92700504b7aa7%3A0x31f525eb0cfee60a!2z0KTRgNC40LfRjNC-0YDRgdC60L4g0LDRgtC10LvQuNC1IMKnINCc0LDQvdC40LrRjtGAICLQodGC0LXRhNC4INCV0LvQtdCz0LDQvdGBIg!5e0!3m2!1sbg!2sbg!4v1763916700767!5m2!1sbg!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FaqSection />

        {/* CTA BLOCK */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Готови сте да започнете?</h2>
            <p>Свържете се с нас и ще ви помогнем с избора на подходящото обучение.</p>
            <a href="/courses" className="cta-button hero-cta">Виж всички курсове →</a>
          </div>
        </section>

      </div>
    </section>
  );
}
