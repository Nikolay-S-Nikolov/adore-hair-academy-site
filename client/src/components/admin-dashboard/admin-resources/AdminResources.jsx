import { useEffect, useState } from "react";
import { useAdminApi } from "../../../hooks/useAdminApi";
import styles from "./AdminResources.module.css";

import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner.jsx";
import ResourceForm from "./ResourceForm.jsx";
import ResourceList from "./ResourceList.jsx";
import { useToast } from "../../../hooks/useToast.js";
import BackToBtn from "../back-to-btn/BackToBtn.jsx";
import ConfirmModal from "../../modals/ConfirmModal.jsx";

export default function AdminResources() {
    const { getCourses, request } = useAdminApi();

    const [resources, setResources] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [resourceToDelete, setresourceToDelete] = useState(null);

    const toast = useToast()

    useEffect(() => {
        Promise.all([
            request("GET", "/data/resources?load=course%3DcourseId%3Acourses"),
            getCourses()
        ])
            .then(([resData, coursesData]) => {
                setResources(resData);
                setCourses(coursesData);
            })
            .finally(() => setLoading(false));
    }, [request, getCourses]);

    const handleCreate = async (data) => {
        const newRes = await request("POST", "/data/resources", data);
        const course = courses.find(c => c._id === data.courseId);

        newRes.course = { title: course.title };

        setResources(prev => [...prev, newRes]);
        toast.success('Ресурса е създаден успешно!');
    };

    const handleUpdate = async (id, data) => {

        const updated = await request("PUT", `/data/resources/${id}`, data);
        const course = courses.find(c => c._id === data.courseId);
        updated.course = { title: course.title };

        setResources(prev => prev.map(r => r._id === data._id ? updated : r));
        setEditing(null);
        toast.success('Ресурса е променен успешно!');
    };

    const handleDelete = (resource) => {
        setresourceToDelete(resource);
    };

    const confirmDelete = async () => {
        await request("DELETE", `/data/resources/${resourceToDelete._id}`),
            setResources(prev => prev.filter(r => r._id !== resourceToDelete._id));
        setresourceToDelete(null);
        toast.success('Ресурса е изтрит успешно!');
    }

    const cancelDelete = () => setresourceToDelete(null);

    if (loading) return <LoadingSpinner />

    return (
        <div className={styles.page}>
            <BackToBtn />
            <h1 className={styles.title}>Учебни материали</h1>
            <p className={styles.subtitle}>Добавяне на видео уроци и PDF файлове към курсовете.</p>

            <div className={styles.layout}>
                <ResourceForm
                    isEdit={!!editing}
                    initialData={editing}
                    courses={courses}
                    onSubmit={editing ? handleUpdate : handleCreate}
                />

                <ResourceList
                    resources={resources}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                />
            </div>
            {resourceToDelete && (
                <ConfirmModal
                    title="Изтриване на ресурс"
                    message={`Сигурни ли сте, че искате да изтриете ресурса ${resourceToDelete.type}: ${resourceToDelete.title}`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}
