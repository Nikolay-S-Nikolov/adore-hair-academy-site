import styles from "./auth.module.css";
import { useFormFlow } from "../../hooks/useFormFlow.js";

export default function Login() {

    function handleLogin(prevState, formData) {
        const email = formData.get("email")?.trim();
        const password = formData.get("password")?.trim();

        const handleError = (msg) => ({
            email,
            error: msg,
            success: false
        });

        if (!email || !password) {
            return handleError("Моля, попълнете всички полета.");
        }

        // TODO: тук ще бъде реалното API login изпращане

        // демо – винаги успешен логин
        return {
            email: "",
            error: null,
            success: true
        };
    }

    const { toast,fadeOut,status,isPending,submitAction} = useFormFlow(handleLogin)



    return (
        <div className={styles.page}>
            <div className={styles.overlay}></div>

            {/* Toast */}
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
                <h2 className={styles.title}>Вход</h2>

                {status.error && (
                    <p className={styles.error}>{status.error}</p>
                )}

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

                {/* 🔥 Линк към регистрация */}
                <div className={styles.haveAccount}>
                    Нямате акаунт?
                    <a href="/register" className={styles.loginLink}>Регистрация</a>
                </div>

                <button className={styles.button} disabled={isPending}>
                    {isPending ? <div className={styles.loader}></div> : "Вход"}
                </button>
            </form>
        </div>
    );
}
