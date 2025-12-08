import { Link } from "react-router";
import styles from "./BackToBtn.module.css";


export default function BackToBtn({backTo="/admin", text = "⟵ Обратно към админ панела"}) {
    return (
            <Link className={styles.backButton} to={backTo}>
                {text}
            </Link>
    );
};