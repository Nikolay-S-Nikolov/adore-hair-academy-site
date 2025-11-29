import styles from "./AdminCourseForm.module.css";
import { useFormAction } from "../../../../hooks/UseFormAction.js";
import { useEffect } from "react";

export default function AdminCourseForm({ isEdit, onSubmit, initialData, onCancel }) {

    const {
        state,
        register,
        resetForm,
        formAction,
        isPending,
    } = useFormAction(onSubmit, initialData);

    useEffect(() => {
        if (state.success && !isEdit) {
            resetForm({
                title: "",
                level: "",
                duration: "",
                description: "",
                details: "",
                imageUrl: "",
                hasOnlineExam: true,
            });
        }
    }, [state.success, isEdit, resetForm]);


    return (
        <section className={styles.card}>
            <h2 className={styles.cardTitle}>
                {isEdit ? "Редактиране на курс" : "Нов курс"}
            </h2>

            <form action={formAction} className={styles.form}>

                {state.error && <p className="error">{state.error}</p>}
                {state.success && <p className="success">Успешно записано!</p>}

                <label className={styles.label}>
                    Име на курса
                    <input
                        type="text"
                        {...register("title")}
                        className={styles.input}
                        placeholder="Пример: Курс за начинаещи – Дамско подстригване"
                    />
                </label>

                <label className={styles.label}>
                    Ниво
                    <input
                        type="text"
                        {...register("level")}
                        className={styles.input}
                        placeholder="Начинаещи / Напреднали / Мастър клас"
                    />
                </label>

                <label className={styles.label}>
                    Продължителност
                    <input
                        type="text"
                        {...register("duration")}
                        className={styles.input}
                        placeholder="Пример: 6 седмици / 12 занятия"
                    />
                </label>

                <label className={styles.label}>
                    Снимка
                    <input
                        type="text"
                        {...register("imageUrl")}
                        className={styles.input}
                        placeholder="Сложете линк към, снимката"
                    />
                </label>

                <label className={styles.label}>
                    Описание
                    <textarea
                        {...register("description")}
                        className={styles.textarea}
                        placeholder="Кратко описание на курса..."
                    />
                </label>

                <label className={styles.label}>
                    Детайли
                    <textarea
                        {...register("details")}
                        className={styles.textarea}
                        placeholder="Детайлно описание на курса..."
                    />
                </label>

                <label className={styles.checkboxRow}>
                    <input
                        type="hidden"
                        name="hasOnlineExam"
                        value="false"
                    />

                    <input
                        type="checkbox"
                        name={register("hasOnlineExam").name}
                        onChange={register("hasOnlineExam").onChange}
                        checked={register("hasOnlineExam").value ? true : false}
                    />

                    <span>Курсът включва онлайн теоретичен изпит</span>
                </label>

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={styles.primaryButton}
                        disabled={isPending}
                    >
                        {isEdit ? "Запази промените" : "Създай курс"}
                    </button>

                    {isEdit && (
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={onCancel}
                        >
                            Отказ
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};