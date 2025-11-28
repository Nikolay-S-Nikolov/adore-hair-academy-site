import styles from "./AdminDashboard.module.css";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard() {
    const { user  } = useAuth();

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Администраторски панел</h1>

            <p className={styles.subtitle}>
                Добре дошъл, <span className={styles.highlight}>{user.username?user.username:user.email}</span>!  
                Оттук можете да управлявате курсове, заявки и ресурси.
            </p>

            <div className={styles.grid}>
                
                <Link to="/admin/courses" className={styles.card}>
                    <h2>Управление на курсове</h2>
                    <p>Добавяне, редактиране и изтриване на курсове.</p>
                </Link>

                <Link to="/admin/enrollments" className={styles.card}>
                    <h2>Заявки за записване</h2>
                    <p>Одобряване или отказване на нови студенти.</p>
                </Link>

                <Link to="/admin/resources" className={styles.card}>
                    <h2>Учебни материали</h2>
                    <p>Качване и организиране на PDF, видео и файлове.</p>
                </Link>

                <Link to="/admin/exams" className={styles.card}>
                    <h2>Изпити</h2>
                    <p>Създаване и управление на онлайн тестове.</p>
                </Link>
            </div>
        </div>
    );
}
