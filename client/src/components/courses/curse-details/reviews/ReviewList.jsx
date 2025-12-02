import { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { useCourseApi } from "../../../../hooks/useCoursesApi.js";
import { useAuth } from "../../../../hooks/useAuth.js";
import { useToast } from "../../../../hooks/useToast.js";
import EditReviewModal from "./EditReviewModal.jsx";
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner.jsx";

export default function ReviewList({ courseId, newReview }) {
    const { request } = useCourseApi();
    const { user } = useAuth();
    const toast = useToast();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        request(
            "GET",
            `/data/reviews?where=courseId%3D%22${courseId}%22&sortBy=_createdOn`
        )
            .then(setReviews)
            .finally(() => setLoading(false));
    }, [courseId, request, newReview]);

    async function handleDelete(id) {
        if (!window.confirm('Сигурни ли сте, че искате да изтриете този отзив?')) {
            return;
        }
        try {
            await request("DELETE", `/data/reviews/${id}`);
            setReviews(r => r.filter(x => x._id !== id));
            toast.success("Отзивът е изтрит.");
        } catch (err) {
            toast.error(err.message);
        }
    }

    function handleEdit(review) {
        setEditingReview(review);
    }
    function handleReviewUpdated(updatedReview) {
        setReviews(prev =>
            prev.map(r => (r._id === updatedReview._id ? updatedReview : r))
        );
    }

    return (
        <>
            <div className={styles.listWrapper}>
                <h3 className={styles.sectionTitle}>Отзиви</h3>

                {loading && <LoadingSpinner text="Зареждане на отзивите..."/>}
                {/* {loading && <p className={styles.loading}>Зареждане на отзивите...</p>} */}

                {!loading && reviews.length === 0 && (
                    <p className={styles.noReviews}>Все още няма отзиви.</p>
                )}

                <ul className={styles.list}>
                    {reviews.map(r => (
                        <li key={r._id} className={styles.reviewCard}>
                            <div className={styles.headerRow}>
                                <p className={styles.author}>{r.authorName}</p>
                                <span className={styles.date}>
                                    {new Date(r._createdOn).toLocaleDateString("bg-BG")}
                                </span>
                            </div>

                            <p className={styles.text}>{r.text}</p>

                            {user && user._id === r._ownerId && (
                                <div className={styles.actions}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => handleEdit(r)}
                                    >
                                        Редактирай
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(r._id)}
                                    >
                                        Изтрий
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {editingReview && (
                <EditReviewModal
                    review={editingReview}
                    onClose={() => setEditingReview(null)}
                    onReviewUpdated={handleReviewUpdated}
                />
            )}
        </>
    );
}
