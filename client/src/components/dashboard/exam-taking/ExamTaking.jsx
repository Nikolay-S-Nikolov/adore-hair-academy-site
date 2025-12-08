import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "./ExamTaking.module.css";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner.jsx";
import { useCourseApi } from "../../../hooks/useCoursesApi.js";
import { useToast } from "../../../hooks/useToast.js";

export default function ExamTaking() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { request } = useCourseApi();
  const toast = useToast();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleSubmit = useCallback(async (isAutoSubmit = false) => {
    if (isSubmitting) return; 
    
    setIsSubmitting(true);

    let correct = 0;
    const total = exam.questions.length;

    exam.questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        correct++;
      }
    });

    const score = Math.round((correct / total) * 100);

    try {
      const data = await request('POST', '/data/examResults', {
        examId: exam._id,
        courseId: exam.courseId,
        score,
        totalQuestions: total,
        correctAnswers: correct,
        answers,
        submittedAt: Date.now(),
        isAutoSubmitted: isAutoSubmit,
      });

      if (isAutoSubmit) {
        toast.warning("Времето изтече! Изпитът е предаден автоматично.");
      } else {
        toast.success("Изпитът е предаден успешно!");
      }

      navigate(`/dashboard/exam-result/${data._id}`, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Грешка при предаване на изпита");
      setIsSubmitting(false);
    }
  }, [exam, answers, request, navigate, toast, isSubmitting]);


  useEffect(() => {
    async function loadExam() {
      try {
        setLoading(true);
        const data = await request('GET', `/data/exams/${examId}`);
        setExam(data);
        

        if (data.duration) {
          startTimeRef.current = Date.now();
          setTimeLeft(data.duration * 60); 
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadExam();
  }, [examId, request]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isSubmitting) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, isSubmitting, handleSubmit]);


  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSubmitting && exam) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitting, exam]);


  function formatTime(seconds) {
    if (seconds === null) return null;
    
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }


  function getTimerClass() {
    if (timeLeft === null) return '';
    if (timeLeft <= 60) return styles.timerCritical; 
    if (timeLeft <= 300) return styles.timerWarning;
    return styles.timerNormal;
  }

  if (loading) return <LoadingSpinner text="Зареждане на изпита..." />;

  if (error || !exam) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.error}>{error || "Изпитът не е намерен."}</p>
        </div>
      </div>
    );
  }

  const question = exam.questions[index];
  const total = exam.questions.length;
  const currentAnswer = answers[index];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = total - answeredCount;

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

  const handleManualSubmit = () => {
    if (unansweredCount > 0) {
      const confirmed = window.confirm(
        `Имате ${unansweredCount} неотговорени въпрос(а). Сигурни ли сте, че искате да предадете изпита?`
      );
      if (!confirmed) return;
    }
    handleSubmit(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1>{exam.title}</h1>
            {timeLeft !== null && (
              <div className={`${styles.timer} ${getTimerClass()}`}>
                <span className={styles.timerIcon}>⏱</span>
                <span className={styles.timerText}>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className={styles.progress}>
            <p className={styles.subtitle}>
              Въпрос {index + 1} от {total}
            </p>
            <p className={styles.answeredInfo}>
              Отговорени: {answeredCount} / {total}
            </p>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(answeredCount / total) * 100}%` }}
            />
          </div>
        </header>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.questionBox}>
          <h3 className={styles.questionText}>
            {index + 1}. {question.text}
          </h3>

          <ul className={styles.answers}>
            {question.answers.map((a, idx) => (
              <li key={idx}>
                <label className={styles.answerLabel}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    checked={currentAnswer === idx}
                    onChange={() => handleSelect(idx)}
                    disabled={isSubmitting}
                  />
                  <span>{a}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>


        <div className={styles.questionDots}>
          {exam.questions.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${
                idx === index ? styles.dotActive : ''
              } ${answers[idx] !== undefined ? styles.dotAnswered : ''}`}
              onClick={() => setIndex(idx)}
              disabled={isSubmitting}
              title={`Въпрос ${idx + 1}`}
            />
          ))}
        </div>

        <div className={styles.navButtons}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={goPrev}
            disabled={index === 0 || isSubmitting}
          >
            ← Назад
          </button>

          {index < total - 1 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={goNext}
              disabled={isSubmitting}
            >
              Следващ →
            </button>
          ) : (
            <button
              type="button"
              className={styles.submitButton}
              onClick={handleManualSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Предаване...' : 'Предай теста'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}