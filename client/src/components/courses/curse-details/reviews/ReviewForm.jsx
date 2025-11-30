import { useState } from 'react';
import { Link } from 'react-router'
import styles from './Reviews.module.css';
import { useCourseApi } from '../../../../hooks/useCoursesApi.js';
import { useAuth } from '../../../../hooks/useAuth.js';
import { useToast } from '../../../../hooks/useToast.js';
import validators from '../../../../utils/validators.js'

export default function ReviewForm({ courseId, onReviewCreated }) {
    const { isAuthenticated } = useAuth();
    const { request } = useCourseApi();
    const toast = useToast();
    const [errors, setErrors] = useState({});

    const [authorName, setAuthorName] = useState("");
    const [text, setText] = useState("");

    if (!isAuthenticated) {
        return (
            <p className={styles.loginNote}>
                За да оставите отзив, моля <Link to={'/login'} style={{ color: "#C9A96E" }}>впишете се</Link>.
            </p >
        );
    }

    function validate() {
        const { newErrors, hasErrors } = validators.validateReViewForm(authorName, text);
        console.log(hasErrors);
        console.log(newErrors);

        if (hasErrors) { setErrors(newErrors); };
        return hasErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (validate()) {
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
                className={`${styles.input} ${errors.authorName ? styles.inputError : ''}`}
                placeholder="Вашето име"
                value={authorName}
                onChange={(e) => {
                    setAuthorName(e.target.value);
                    if (errors.authorName) {
                        setErrors(prev => ({ ...prev, authorName: '' }));
                    }
                }}
            />

            {errors.authorName && (
                <span className={styles.error}>{errors.authorName}</span>
            )}

            <textarea
                className={`${styles.textarea} ${errors.text ? styles.inputError : ''}`}
                placeholder="Вашият отзив"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    if (errors.text) {
                        setErrors(prev => ({ ...prev, text: '' }));
                    }
                }}
            />

            {errors.text && (
                <span className={styles.error}>{errors.text}</span>
            )}

            <button className={styles.submitBtn}>Изпрати</button>
        </form>
    );
}
