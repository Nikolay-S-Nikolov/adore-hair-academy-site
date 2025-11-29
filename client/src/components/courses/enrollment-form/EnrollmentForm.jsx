import { useParams, useNavigate } from "react-router";
import { useCourseApi } from "../../../hooks/useCoursesApi.js";
import { useToast } from "../../../hooks/useToast.js";
import styles from "./EnrollmentForm.module.css";
import { useAuth } from "../../../hooks/useAuth.js";

export default function EnrollmentForm() {
    const { courseId } = useParams();
    const { request } = useCourseApi();
    const toast = useToast();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {

            const existing = await request(
                "GET",
                `/data/enrollments?where=courseId%3D%22${courseId}%22%20AND%20userId%3D%22${user._id}%22`
            );
// ?where=recipeId%3D%228f414b4f-ab39-4d36-bedb-2ad69da9c830%22&load=author%3D_ownerId%3Ausers
            console.log(existing);
            

            if (existing.length > 0) {
                toast.warning("Вие вече сте подали заявка за този курс.");
                navigate(`/courses/${courseId}`);
                return;
            }

            await request("POST", "/data/enrollments", {
                ...data,
                courseId,
                userId: user._id,
                createdOn: Date.now()
            });

            toast.success("Вашата заявка е изпратена успешно!");
            navigate(`/courses/${courseId}`, { replace: true });

        } catch (err) {
            toast.error(err.message || "Възникна грешка.");
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Записване за курса</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Име и фамилия
                    <input
                        className={styles.input}
                        name="fullName"
                        type="text"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Телефон
                    <input
                        className={styles.input}
                        name="phone"
                        type="text"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Бележка (по желание)
                    <textarea
                        className={styles.textarea}
                        name="note"
                    />
                </label>

                <div className={styles.actions}>
                    <button className={styles.primaryBtn}>Записване</button>

                    <button
                        type="button"
                        className={styles.secondaryBtn}
                        onClick={() => navigate(-1)}
                    >
                        Отказ
                    </button>
                </div>
            </form>
        </div>
    );
}
