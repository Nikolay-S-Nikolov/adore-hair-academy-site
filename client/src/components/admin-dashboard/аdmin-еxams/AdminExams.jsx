import { useEffect, useState } from "react";
import styles from "./AdminExams.module.css";

import { useExamApi } from "../../../hooks/useExamsApi.js";
import { useAdminApi } from "../../../hooks/useAdminApi.js";
import ExamForm from "./ExamForm.jsx";
import ExamList from "./ExamList.jsx";
import ConfirmModal from "../../modals/ConfirmModal.jsx";
import { useToast } from "../../../hooks/useToast.js";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner.jsx";
import BackToBtn from "../back-to-btn/BackToBtn.jsx";

export default function AdminExams() {
    const toast = useToast();

    const { getCourses } = useAdminApi()

    const {
        getExams,
        createExam,
        updateExam,
        deleteExam
    } = useExamApi();

    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingExam, setEditingExam] = useState(null);
    const [examToDelete, setExamToDelete] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const [c, e] = await Promise.all([getCourses(), getExams()]);
                setCourses(c);
                setExams(e);
            } catch (err) {
                setError(`Грешка при зареждането на данните. ${err.message}`);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [getCourses, getExams]);

    const handleCreate = async (data) => {
        try {
            const created = await createExam(data);
            const course = courses.find(c => c._id === created.courseId);
            created.course = { title: course.title };
            setExams(prev => [...prev, created]);
            toast.success("Изпитът е създаден успешно!");
        } catch (err) {
            toast.error(`Грешка при създаването на изпит.${err.message}`);
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            const updated = await updateExam(id, data);
            const course = courses.find(c => c._id === updated.courseId);
            updated.course = { title: course.title };
            setExams(prev => prev.map(exam => exam._id === id ? updated : exam));
            toast.success("Изпитът е обновен успешно!");
            setEditingExam(null);
        } catch (err) {
            toast.error(`Грешка при редактиране.${err.message}`);
        }
    };

    const handleDeleteClick = (exam) => {
        setExamToDelete(exam);
    };

    const confirmDelete = async () => {
        if (!examToDelete) return;
        try {
            await deleteExam(examToDelete._id);
            setExams(prev => prev.filter(e => e._id !== examToDelete._id));
            toast.warning("Изпитът беше изтрит.");
        } catch (err) {
            toast.error(`Грешка при изтриване.${err.message}`);
        }
        setExamToDelete(null);
    };

    const cancelDelete = () => setExamToDelete(null);


    if (loading) return <LoadingSpinner text="Зареждане на изпитите..." />;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.page}>
            <BackToBtn />
            <h1 className={styles.title}>Управление на изпити</h1>
            <p className={styles.subtitle}>Създаване, редактиране и изтриване на изпитни тестове.</p>

            <div className={styles.layout}>

                <ExamForm
                    isEdit={!!editingExam}
                    initialData={editingExam}
                    onSubmit={editingExam ? handleUpdate : handleCreate}
                    onCancel={() => setEditingExam(null)}
                    courses={courses}
                />

                <ExamList
                    exams={exams}
                    onEdit={setEditingExam}
                    onDelete={handleDeleteClick}
                />
            </div>

            {examToDelete && (
                <ConfirmModal
                    title="Изтриване на изпит"
                    message={`Сигурни ли сте, че искате да изтриете изпита "${examToDelete.title}"?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}
