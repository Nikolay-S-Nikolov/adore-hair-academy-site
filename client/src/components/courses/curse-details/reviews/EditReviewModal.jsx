import { useState, useEffect } from 'react';
import styles from './EditReviewModal.module.css';
import { useCourseApi } from '../../../../hooks/useCoursesApi.js';
import { useToast } from '../../../../hooks/useToast.js';
import validators from '../../../../utils/validators.js'

export default function EditReviewModal({ review, onClose, onReviewUpdated }) {
    const { update } = useCourseApi();
    const toast = useToast();

    const [authorName, setAuthorName] = useState('');
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (review) {
            setAuthorName(review.authorName || '');
            setText(review.text || '');
        }
    }, [review]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

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

        setIsSubmitting(true);

        try {
            const updatedReview = await update(`/data/reviews/${review._id}`, {
                authorName: authorName.trim(),
                text: text.trim(),
            });

            toast.success('Отзивът е актуализиран успешно!');
            onReviewUpdated(updatedReview);
            onClose();
        } catch (err) {
            toast.error(err.message || 'Грешка при актуализиране на отзива');
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    if (!review) return null;

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Редактиране на отзив</h3>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Затвори"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="authorName" className={styles.label}>
                            Име
                        </label>
                        <input
                            id="authorName"
                            type="text"
                            className={`${styles.input} ${errors.authorName ? styles.inputError : ''}`}
                            value={authorName}
                            onChange={(e) => {
                                setAuthorName(e.target.value);
                                if (errors.authorName) {
                                    setErrors(prev => ({ ...prev, authorName: '' }));
                                }
                            }}
                            placeholder="Вашето име"
                            disabled={isSubmitting}
                        />
                        {errors.authorName && (
                            <span className={styles.error}>{errors.authorName}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="text" className={styles.label}>
                            Отзив
                        </label>
                        <textarea
                            id="text"
                            className={`${styles.textarea} ${errors.text ? styles.inputError : ''}`}
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                if (errors.text) {
                                    setErrors(prev => ({ ...prev, text: '' }));
                                }
                            }}
                            placeholder="Вашият отзив"
                            disabled={isSubmitting}
                        />
                        <div className={styles.charCount}>
                            {text.length} / 500
                        </div>
                        {errors.text && (
                            <span className={styles.error}>{errors.text}</span>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Отказ
                        </button>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Запазване...' : 'Запази промените'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}