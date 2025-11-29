import { useEffect, useState } from "react";
import styles from "./AdminCourses.module.css";
// import AdminCourseForm from "./courses-form/AdminCourseForm.jsx";
import { useAdminApi } from "../../../hooks/useAdminApi.js";
import AdminCourseList from "./courses-list/AdminCourseList.jsx";
import AdminCourseForm from "./courses-form/AdminCourseForm.jsx";

export default function AdminCourses() {
    const { getCourses, createCourse, updateCourse, deleteCourse } = useAdminApi();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        getCourses()
            .then(setCourses)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [getCourses]);



    const handleUpdate = async (formData) => {
        const updated = await updateCourse(editingCourse._id, {...editingCourse,...formData });
        setCourses(prev => prev.map(c => (c._id === editingCourse._id ? updated : c)));
        setEditingCourse(null);
    };

    function onEditClickHandler(course) {
        setEditingCourse(course);

    }

    const handleDelete = async (id) => {
        await deleteCourse(id);
        setCourses(prev => prev.filter(c => c._id !== id));
    };


    const handleCreate = async (data) => {
        const newCourse = await createCourse(data);
        setCourses(prev => [...prev, newCourse]);
    };


    return (

        <div className={styles.page}>
            <h1 className={styles.title}>Управление на курсове</h1>
            <p className={styles.subtitle}>
                Добавяйте, редактирайте и изтривайте курсове във вашата академия.
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.layout}>

                <AdminCourseForm
                    key={editingCourse?._id || "new"}
                    isEdit={Boolean(editingCourse)}
                    onSubmit={editingCourse ? handleUpdate : handleCreate}
                    initialData={editingCourse ? editingCourse :
                        {
                            _ownerId: '',
                            title: '',
                            level: '',
                            description: '',
                            duration: '',
                            hasOnlineExam: false,
                            _createdOn: 0
                        }
                    } />

                <AdminCourseList loading={loading} courses={courses} onEditClick={onEditClickHandler} handleEdit={handleUpdate}
                    handleDelete={handleDelete} />
            </div>
        </div>
    );
}
