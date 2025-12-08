import { useEffect, useState } from "react";
import { Link } from 'react-router'
import styles from "./AdminCourses.module.css";
// import AdminCourseForm from "./courses-form/AdminCourseForm.jsx";
import { useAdminApi } from "../../../hooks/useAdminApi.js";
import AdminCourseList from "./courses-list/AdminCourseList.jsx";
import AdminCourseForm from "./courses-form/AdminCourseForm.jsx";
import ConfirmModal from "../../modals/ConfirmModal.jsx";
import { useToast } from "../../../hooks/useToast.js";
import BackToBtn from "../back-to-btn/BackToBtn.jsx";

export default function AdminCourses() {
    const { getCourses, createCourse, updateCourse, deleteCourse } = useAdminApi();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingCourse, setEditingCourse] = useState(null);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const toast = useToast()


    useEffect(() => {
        getCourses()
            .then(setCourses)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [getCourses]);



    const handleUpdate = async (formData) => {
        const updated = await updateCourse(editingCourse._id, { ...editingCourse, ...formData });
        setCourses(prev => prev.map(c => (c._id === editingCourse._id ? updated : c)));
        setEditingCourse(null);
        toast.success('Курсът е променен успешно!');
    };

    function onEditClickHandler(course) {
        setEditingCourse(course);

    }

    const onCancelEdit = () => {
        setEditingCourse(null);
    };

    const handleDelete = (course) => {
        setCourseToDelete(course)
    };


    const handleCreate = async (data) => {
        const newCourse = await createCourse(data);
        setCourses(prev => [...prev, newCourse]);
        toast.success('Курсът е създаден успешно!');
    };

    const confirmDelete = async () => {
        await deleteCourse(courseToDelete._id);
        setCourses(prev => prev.filter(c => c._id !== courseToDelete._id));
        setCourseToDelete(null);
        toast.success('Курсът е изтрит успешно!');

    }

    const cancelDelete = () => setCourseToDelete(null);


    return (

        <div className={styles.page}>

            <BackToBtn/>

            <h1 className={styles.title}>Управление на курсове</h1>
            <p className={styles.subtitle}>
                Добавяйте, редактирайте и изтривайте курсове във вашата академия.
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.layout}>

                <AdminCourseForm
                    key={editingCourse?._id || 'new'}
                    isEdit={Boolean(editingCourse)}
                    onSubmit={editingCourse ? handleUpdate : handleCreate}
                    onCancel={onCancelEdit}
                    initialData={editingCourse ? editingCourse :
                        {
                            _ownerId: '',
                            title: '',
                            level: '',
                            description: '',
                            duration: '',
                            imageUrl: '',
                            hasOnlineExam: false,
                            _createdOn: 0
                        }
                    } />

                <AdminCourseList loading={loading} courses={courses} onEditClick={onEditClickHandler} handleEdit={handleUpdate}
                    handleDelete={handleDelete} />

                {courseToDelete && (
                    <ConfirmModal
                        title="Изтриване на курс"
                        message={`Сигурни ли сте, че искате да изтриете курса ${courseToDelete.title}`}
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                )}
            </div>
        </div>
    );
}
