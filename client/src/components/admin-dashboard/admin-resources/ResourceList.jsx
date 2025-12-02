import ResourceCard from "./ResourceCard";
import styles from "./AdminResources.module.css";

export default function ResourceList({ resources, onEdit, onDelete }) {
    return (
        <div className={styles.list}>
            {resources.map((r) => (
                <ResourceCard
                    key={r._id}
                    item={r}
                    onEdit={() => onEdit(r)}
                    onDelete={() => onDelete(r._id)}
                />
            ))}
        </div>
    );
}
