import { useNavigate, useParams } from "react-router";
import styles from "./ExamResult.module.css";
import { useEffect, useState } from "react";
import { useCourseApi } from "../../../hooks/useCoursesApi.js";

export default function ExamResult() {
  const { request } = useCourseApi();

  const navigate = useNavigate();
  const { resultId } = useParams();
  const [result, setResult] = useState({

    examId: "",
    courseId: "",
    score: 0,
    totalQuestions: 0,
    answers: {},
    submittedAt: 0,
    _createdOn: 0,
    course:{title:''}
  });
  const [err, setErr] = useState(null);

  useEffect(() => {
    request('GET', `/data/examResults/${resultId}?&load=course%3DcourseId%3Acourses`)
      .then(setResult)
      .catch(setErr)
  }, [request, resultId])

  const passed = result.score >= 70;

  if (err) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.error}>{`${err.message} Възникна грешка.`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Резултат от изпита</h1>

        <h2 className={styles.course} >{result.course?.title}</h2>

        <p className={styles.score}>{result.score}%</p>

        <p className={passed ? styles.pass : styles.fail}>
          {passed
            ? "Поздравления! Успешно взехте изпита."
            : "За съжаление не достигнахте минималния необходим резултат."}
        </p>

        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          Обратно към моето обучение
        </button>
      </div>
    </div>
  );
}
