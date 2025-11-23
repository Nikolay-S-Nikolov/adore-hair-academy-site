import { useState } from "react";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Как да се запиша за курс?",
            answer: "Можете да се обадите директно или да изпратите съобщение през формата.",
        },
        {
            question: "Нужен ли е опит?",
            answer: "Не — имаме курсове за напълно начинаещи.",
        },
        {
            question: "Имате ли практика върху модели?",
            answer: "Да — практиката е ключова част от обучението.",
        },
        {
            question: "Получава ли се сертификат?",
            answer: "Да — след завършване на обученията се издава сертификат.",
        },
    ];
    return (
        <section className={styles.faqSection}>
            <h2 className={styles.title}>Често задавани въпроси</h2>

            <div className={styles.accordion}>
                {faqData.map((item, index) => (
                    <div key={index} className={styles.accordionItem}>

                        <button
                            className={styles.accordionButton}
                            onClick={() => toggleFAQ(index)}
                        >
                            <span>{item.question}</span>
                            <span className={styles.accordionIcon}>
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </button>

                        <div
                            className={`${styles.accordionContent} ${openIndex === index ? styles.open : ""
                                }`}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};