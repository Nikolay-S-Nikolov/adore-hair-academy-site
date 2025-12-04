import styles from "./AdminExams.module.css";

export default function QuestionBuilder({ questions, setQuestions }) {
    const addQuestion = () => {
        setQuestions(prev => [
            ...prev,
            {
                text: "",
                answers: ["", "", "", ""],
                correct: 0
            }
        ]);
    };

    const updateQuestion = (index, newData) => {
        setQuestions(prev => prev.map((q, i) => (i === index ? newData : q)));
    };

    const removeQuestion = (index) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.questionsSection}>
            <h3>Въпроси</h3>

            {questions.map((q, i) => (
                <div key={i} className={styles.questionCard}>
                    <div className={styles.questionHeader}>
                        <h4>Въпрос {i + 1}</h4>
                        <button type="button" className={styles.deleteSmall} onClick={() => removeQuestion(i)}>
                            ✕
                        </button>
                    </div>

                    <textarea
                        className={styles.input}
                        placeholder="Въведете въпрос"
                        value={q.text}
                        onChange={(e) =>
                            updateQuestion(i, { ...q, text: e.target.value })
                        }
                    />

                    <div className={styles.answers}>
                        {q.answers.map((ans, idx) => (
                            <label key={idx} className={styles.answerRow}>
                                <input
                                    type="radio"
                                    name={`correct-${i}`}
                                    checked={q.correct === idx}
                                    onChange={() =>
                                        updateQuestion(i, { ...q, correct: idx })
                                    }
                                />
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={ans}
                                    placeholder={`Отговор ${idx + 1}`}
                                    onChange={(e) => {
                                        const updatedAnswers = [...q.answers];
                                        updatedAnswers[idx] = e.target.value;
                                        updateQuestion(i, {
                                            ...q,
                                            answers: updatedAnswers
                                        });
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button type="button" className={styles.addQuestionButton} onClick={addQuestion}>
                + Добави въпрос
            </button>
        </div>
    );
}
