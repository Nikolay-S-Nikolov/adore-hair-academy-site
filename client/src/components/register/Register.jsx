import { useActionState, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import styles from "./Register.module.css";

export default function Register() {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);

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
        return {
            email: '',
            error: null,
            success: true
        };


        // TODO send user registration to API
    };

    const [status, submitAction, isPending] = useActionState(handleSubmit, {
        email: '',
        error: null,
        success: false
    });


    useEffect(() => {
        if (status.success) {

            setTimeout(() => {
                setToast({ type: 'success', text: 'Успешна регистрация!' });
            }, 10);

            setTimeout(() => setFadeOut(true), 600);
            setTimeout(() => navigate('/'), 1500);
        }
    }, [status.success, navigate])

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 2500);
            return () => clearTimeout(timer);
        }
    }, [toast])

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
