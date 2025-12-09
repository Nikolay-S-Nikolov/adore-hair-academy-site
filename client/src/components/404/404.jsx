import { Link } from "react-router";
import styles from "./Page404.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Page404() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.animation}>
                <DotLottieReact
                    src="https://lottie.host/62d4808e-3ac5-4bb6-938e-c436ebd961c9/6gYrW7BcN3.lottie"
                    loop
                    autoplay
                    speed={0.4}
                />
            </div>

            <h1 className={styles.title}>Страницата не е намерена</h1>
            <p className={styles.text}>
                Изглежда се изгубихме...
                Нека те върнем обратно на сигурно място.
            </p>

            <Link to="/" className={styles.button}>
                ⟵ Обратно към началната страница
            </Link>
        </div>
    );
}