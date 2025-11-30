import { useState } from 'react';
import { Link } from 'react-router'
import styles from './Reviews.module.css';
import { useCourseApi } from '../../../../hooks/useCoursesApi.js';
import { useAuth } from '../../../../hooks/useAuth.js';
import { useToast } from '../../../../hooks/useToast.js';

export default function ReviewForm({ courseId, onReviewCreated }) {
    const { isAuthenticated } = useAuth();
    const { request } = useCourseApi();
    const toast = useToast();

    const [authorName, setAuthorName] = useState("");
    const [text, setText] = useState("");

    if (!isAuthenticated) {
        return (
            <p className={styles.loginNote}>
                За да оставите отзив, моля <Link to={'/login'} style={{ color: "#C9A96E" }}>впишете се</Link>.
            </p >
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!authorName || !text) {
            toast.error("Моля попълнете всички полета.");
            return;
        }

        try {
            const review = await request("POST", "/data/reviews", {
                courseId,
                authorName,
                text,
            });

            onReviewCreated(review);
            setAuthorName("");
            setText("");
            toast.success("Благодарим за отзива!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h4 className={styles.formTitle}>Оставете вашия отзив</h4>

            <input
                className={styles.input}
                placeholder="Вашето име"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
            />

            <textarea
                className={styles.textarea}
                placeholder="Вашият отзив"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button className={styles.submitBtn}>Изпрати</button>
        </form>
    );
}
