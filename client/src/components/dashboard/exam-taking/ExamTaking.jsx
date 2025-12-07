import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "./ExamTaking.module.css";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner.jsx";
import { useCourseApi } from "../../../hooks/useCoursesApi.js"

export default function ExamTaking() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { request } = useCourseApi();


  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadExam() {
      try {
        setLoading(true);
        const data = await request('GET', `/data/exams/${examId}`);
        setExam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadExam();
  }, [examId, request]);

  if (loading) return <LoadingSpinner text="Зареждане на изпита..." />

  if (error || !exam) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.error}>{error || "Изпитът не е намерен."}</p>
        </div>
      </div>
    );
  }

  // const now = Date.now();
  // if (exam.startAt && now < exam.startAt) {
  //   return (
  //     <div className={styles.page}>
  //       <div className={styles.card}>
  //         <h2>{exam.title}</h2>
  //         <p>Изпитът все още не е започнал.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (exam.endAt && now > exam.endAt) {
  //   return (
  //     <div className={styles.page}>
  //       <div className={styles.card}>
  //         <h2>{exam.title}</h2>
  //         <p>Изпитният прозорец е затворен.</p>
  //       </div>
  //     </div>
  //   );
  // }

  const question = exam.questions[index];
  const total = exam.questions.length;

  const handleSelect = (answerIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: answerIdx,
    }));
  };

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    setIndex((i) => Math.min(total - 1, i + 1));
  };

  const handleSubmit = async () => {
    let correct = 0;

    exam.questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        correct++;
      }
    });

    const score = Math.round((correct / total) * 100);

    try {
      const data = await request('POST', `/data/examResults`,
        {
          examId: exam._id,
          courseId: exam.courseId,
          score,
          totalQuestions: total,
          answers,
          submittedAt: Date.now(),
        }
      )

      navigate(`/dashboard/exam-result/${data._id}`, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const currentAnswer = answers[index];

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1>{exam.title}</h1>
          <p className={styles.subtitle}>
            Въпрос {index + 1} от {total}
          </p>
        </header>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.questionBox}>
          <h3 className={styles.questionText}>{question.text}</h3>

          <ul className={styles.answers}>
            {question.answers.map((a, idx) => (
              <li key={idx}>
                <label className={styles.answerLabel}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    checked={currentAnswer === idx}
                    onChange={() => handleSelect(idx)}
                  />
                  <span>{a}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.navButtons}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={goPrev}
            disabled={index === 0}
          >
            Назад
          </button>

          {index < total - 1 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={goNext}
              disabled={currentAnswer == null}
            >
              Следващ
            </button>
          ) : (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
            >
              Предай теста
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
