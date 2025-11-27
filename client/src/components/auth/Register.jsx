import styles from "./Auth.module.css";
import { Link } from "react-router";
import { useFormFlow } from "../../hooks/useFormFlow.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useToast } from "../../hooks/useToast.js";
import { useNavigate } from "react-router";

export default function Register() {
    const { register } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    async function handleSubmit(prevState, formData) {
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

        try {
            await register(email, pass);
            toast.success("Успешно се регистрирахте и влязохте!");
            navigate('/', { replace: true });
        } catch (err) {
            return {
                email,
                error: err.message,
                success: false
            };
        };
    }
    const { isPending, status, submitAction } = useFormFlow(handleSubmit);
    console.log(status);


    return (
        <div className={styles.page}>
            <div className={styles.overlay}></div>

            <form
                className={`${styles.form} ${isPending ? styles.fadeOut : ""}`}
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
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Парола"
                    className={styles.input}
                    autoComplete="password"
                />
                <input
                    type="password"
                    name="confirm"
                    placeholder="Повтори парола"
                    className={styles.input}
                    autoComplete="password"
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
