import styles from "./Register.module.css";

import { Link } from "react-router";
import { useFormFlow } from "../../hooks/useFormFlow.js";

export default function Register() {

    function handleSubmit(prevState, formData) {
        const email = formData.get("email").trim();
        const pass = formData.get("password").trim();
        const confirm = formData.get("confirm").trim();

        const handleError = (ErrMessage) => {
            return {
                email,
                error: ErrMessage,
                success: false
            };
        };

        if (!email || !pass || !confirm) {
            return handleError('Моля, попълнете всички полета.');
        }

        if (pass !== confirm) {
            return handleError('Паролите не съвпадат.');
        }

        // TODO: тук ще бъде реалното API login изпращане

        // демо – винаги успешен логин

        return {
            email: '',
            error: null,
            success: true
        };
    };

    const { toast, fadeOut, isPending, status, submitAction } = useFormFlow(handleSubmit)

    return (
        <div className={styles.page}>
            <div className={styles.overlay}></div>

            {toast && (
                <div
                    className={`${styles.toast} ${toast.type === "success"
                        ? styles.toastSuccess
                        : styles.toastError
                        }`}
                >
                    {toast.text}
                </div>
            )}

            <form
                className={`${styles.form} ${fadeOut ? styles.fadeOut : ""}`}
                action={submitAction}
            >
                <h2 className={styles.title}>Създайте профил</h2>

                {status.error && <p className={styles.error}>{status.error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Имейл адрес"
                    defaultValue={status.email}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Парола"
                    className={styles.input}
                />
                <input
                    type="password"
                    name="confirm"
                    placeholder="Повтори парола"
                    className={styles.input}
                />

                <div className={styles.haveAccount}>
                    Вече имате регистрация?
                    <Link to="/login" className={styles.loginLink}>Вход</Link>
                </div>

                <button className={styles.button} disabled={isPending}>
                    {isPending ? (
                        <div className={styles.loader}></div>
                    ) : (
                        "Регистрация"
                    )}
                </button>
            </form>
        </div>
    );
}
