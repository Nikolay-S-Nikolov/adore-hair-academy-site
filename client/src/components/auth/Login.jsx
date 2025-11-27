import styles from "./Auth.module.css";
import { useFormFlow } from "../../hooks/useFormFlow.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useToast } from "../../hooks/useToast.js";
import { useNavigate } from "react-router";

export default function Login() {
    const { login } = useAuth();
    const successToast = useToast();
    const navigate = useNavigate();

    async function handleLogin(prevState, formData) {
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

        try {
            await login(email, password);
            successToast.success("Успешно влизане!");
            navigate('/', { replace: true });
        } catch (err) {
            return {
                email,
                error: err.message,
                success: false
            };
        }
    }


    const { status, isPending, submitAction } = useFormFlow(handleLogin);

    return (
        <div className={styles.page}>
            <div className={styles.overlay}></div>

            <form className={styles.form} action={submitAction} >

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
                    autoComplete="email"

                />

                <input
                    type="password"
                    name="password"
                    placeholder="Парола"
                    className={styles.input}
                    autoComplete="password"
                />

                <div className={styles.haveAccount}>
                    Нямате акаунт?
                    <a href="/register" className={styles.loginLink}>Регистрация</a>
                </div>

                <button type="submit" className={styles.button} disabled={isPending}>
                    {isPending ? <div className={styles.loader}></div> : "Вход"}
                </button>
            </form>
        </div>
    );
}
