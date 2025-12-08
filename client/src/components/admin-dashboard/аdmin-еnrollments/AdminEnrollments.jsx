import { useEffect, useState } from "react";
import styles from "./AdminEnrollments.module.css";
import { useAdminApi } from "../../../hooks/useAdminApi.js";
import { useToast } from "../../../hooks/useToast.js";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner.jsx";
import BackToBtn from "../back-to-btn/BackToBtn.jsx";

export default function AdminEnrollments() {
    const { getEnrollments, updateEnrollment } = useAdminApi();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        getEnrollments()
            .then(setEnrollments)
            .finally(() => setLoading(false));
    }, [getEnrollments]);

    const approve = async (item) => {
        const updated = await updateEnrollment(item._id, {
            status: "approved",
            // approvedOn: Date.now(),
        });

        updated.course = item.course;

        setEnrollments((prev) => prev.map(e => e._id === item._id ? updated : e));
        toast.success("Курсистът е одобрен!");
    };

    const reject = async (item) => {
        const updated = await updateEnrollment(item._id, { status: "rejected" });

        updated.course = item.course;

        setEnrollments((prev) => prev.map(e => e._id === item._id ? updated : e));
        toast.warning("Заявката е отказана.");
    };

    if (loading) return <LoadingSpinner text="Зареждане на заявките..." />;

    const pending = enrollments.filter(e => e.status === "pending");
    const approved = enrollments.filter(e => e.status === "approved");
    const rejected = enrollments.filter(e => e.status === "rejected");

    return (
        <div className={styles.page}>

            <BackToBtn />
            <h1 className={styles.title}>Заявки за записване</h1>

            {/* ---------- Pending ---------- */}
            <h2 className={styles.sectionTitle}>Чакащи заявки</h2>
            {pending.length === 0 && <p>Няма чакащи заявки.</p>}
            <div className={styles.list}>
                {pending.map(item => (
                    <div key={item._id} className={styles.card}>
                        <h3>{item.fullName}</h3>
                        <p><strong>Телефон:</strong> {item.phone}</p>
                        <p><strong>Курс:</strong> {item.course?.title}</p>

                        <div className={styles.actions}>
                            <button onClick={() => approve(item)} className={styles.approveBtn}>✔ Одобри</button>
                            <button onClick={() => reject(item)} className={styles.rejectBtn}>✖ Откажи</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---------- Approved ---------- */}
            <h2 className={styles.sectionTitle}>Одобрени</h2>
            <div className={styles.list}>
                {approved.map(item => (
                    <div key={item._id} className={styles.cardApproved}>
                        <h3>{item.fullName}</h3>
                        <p><strong>Телефон:</strong> {item.phone}</p>
                        <p><strong>Курс:</strong> {item.course?.title}</p>
                        <p className={styles.tagApproved}>ОДОБРЕН</p>
                    </div>
                ))}
            </div>

            {/* ---------- Rejected ---------- */}
            <h2 className={styles.sectionTitle}>Отказани</h2>
            <div className={styles.list}>
                {rejected.map(item => (
                    <div key={item._id} className={styles.cardRejected}>
                        <h3>{item.fullName}</h3>
                        <p><strong>Телефон:</strong> {item.phone}</p>
                        <p><strong>Курс:</strong> {item.course?.title}</p>
                        <p className={styles.tagRejected}>ОТХВЪРЛЕН</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
