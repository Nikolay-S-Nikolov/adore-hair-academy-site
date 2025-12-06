import { useEffect, useState } from "react";

import { useAdminApi } from "../../../hooks/useAdminApi.js";

import styles from "./AdminExams.module.css";
import QuestionBuilder from "./QuestionBuilder.jsx";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner.jsx";
import validators from "../../../utils/validators.js";

export default function ExamForm({ isEdit, initialData, onSubmit, onCancel, courses }) {
    const { request } = useAdminApi()

    const [title, setTitle] = useState(initialData?.title || "");
    const [courseId, setCourseId] = useState(initialData?.courseId || "");
    const [duration, setDuration] = useState(initialData?.duration || 30);
    const [type, setType] = useState(initialData?.type || "finalExam");
    const [startAt, setStartAt] = useState(initialData?.startAt || "");
    const [endAt, setEndAt] = useState(initialData?.endAt || "");
    const [questions, setQuestions] = useState(initialData?.questions || []);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isEdit && initialData) {
            request('GET', `/data/exams/${initialData._id}`)
                .then((exam) => {
                    setTitle(exam.title || "");
                    setCourseId(exam.courseId || "");
                    setDuration(exam.duration || 30);
                    setType(exam.type || "finalExam");
                    setQuestions(exam.questions || []);

                    const s = new Date(exam.startAt ? exam.startAt : Date.now());
                    setStartAt(s.toISOString().slice(0, 16) || "");

                    const e = new Date(exam.endAt ? exam.endAt : Date.now());
                    setEndAt(e.toISOString().slice(0, 16) || "");
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false))
        }

    }, [isEdit, initialData, request]);

    function resetInitialData() {
        setTitle("");
        setCourseId("");
        setDuration(30);
        setQuestions([]);
        setError(null);
        setStartAt("");
        setEndAt("");
        setType("finalExam");


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = validators.validateExamForm({
            title,
            courseId,
            questions,
            type,
            startAt,
            endAt
        })
        if (err) {
            setError(err);
            console.log(err);
            return;
        }

        const examData = {
            title,
            courseId,
            duration: Number(duration),
            questions,
            type,
            startAt,
            endAt,

        };
        isEdit ? await onSubmit(initialData._id, examData) : await onSubmit(examData);

        resetInitialData();
    };

    if (loading && isEdit) return <LoadingSpinner text="Зареждане на въпросите..." />;

    return (
        <form className={styles.formCard} onSubmit={handleSubmit}>
            <h2>{isEdit ? "Редактиране на изпит" : "Нов изпит"}</h2>

            {/* {error && <p className={styles.error}>{error}</p>} */}

            <label>
                Заглавие на изпита
                {error?.title && <p className={styles.errorText}>{error.title}</p>}

                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        const title = e.target.value;
                        setTitle(title);
                        if (error?.title) {
                            const val = validators.validateExamForm({ title });
                            setError(prev => ({ ...prev, title: val?.title ? val.title : null }));
                        }
                    }}
                    className={`${styles.input} ${error?.title ? styles.inputError : ''}`}
                />
            </label>

            <label>
                Изберете курс
                {error?.courseId && <p className={styles.errorText}>{error.courseId}</p>}
                <select
                    name="courseId"
                    value={courseId}
                    onChange={(e) => {
                        const newCourseId = e.target.value;
                        setCourseId(newCourseId);
                        const val = validators.validateExamForm({ courseId: newCourseId });
                        setError(prev => ({ ...prev, courseId: val?.courseId ? val.courseId : null }));
                    }}
                    className={styles.input}
                >
                    <option value="">-- Изберете курс --</option>
                    {courses.map(c => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                </select>
            </label>

            <label>
                Тип изпит
                <select
                    className={styles.input}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="finalExam">Финален изпит</option>
                    <option value="demoExam">Демо тест</option>
                </select>
            </label>

            <label>
                Продължителност (в минути)
                <input
                    type="number"
                    min="5"
                    max="120"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className={styles.input}
                />
            </label>

            <div className={styles.twoCols}>
                <label>
                    Начало на изпита
                    {error?.date && <p className={styles.errorText}>{error.date}</p>}
                    {startAt && (
                        <span className={styles.datePreview}>
                            {new Date(startAt).toLocaleString('bg-BG', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    )}
                    <input
                        type="datetime-local"
                        className={styles.input}
                        style={{ "color-scheme": "dark" }}
                        value={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                    />

                </label>

                <label>
                    Край на изпита
                    {error?.date && <p className={styles.errorText}>{error.date}</p>}
                    {endAt && (
                        <span className={styles.datePreview}>
                            {new Date(endAt).toLocaleString('bg-BG', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    )}
                    <input
                        type="datetime-local"
                        className={styles.input}
                        style={{ "color-scheme": "dark" }}
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                    />
                </label>
            </div>


            <QuestionBuilder questions={questions} setQuestions={setQuestions} />

            {error?.questions === "Добавете поне един въпрос." && <p className={styles.errorText}>{error.questions}</p>}

            {!error?.questions && error?.noText && <p className={styles.errorText}>{error.noText}</p>}

            <div className={styles.actions}>
                <button type="submit" className={styles.primaryButton}>
                    {isEdit ? "Запази" : "Създай"}
                </button>

                {isEdit && (
                    <button type="button" className={styles.secondaryButton} onClick={() => {
                        onCancel();
                        resetInitialData();
                    }}>
                        Отказ
                    </button>
                )}
            </div>
        </form>
    );
}
