import { useActionState, useState } from "react";
import styles from "./AdminResources.module.css";
import validate from "../../../utils/validators.js"
import { useToast } from "../../../hooks/useToast.js";

export default function ResourceForm({ isEdit, initialData, onSubmit, courses }) {
  const [errors, setErrors] = useState({});
  const emptyData = {
    title: "",
    type: "video",
    url: "",
    description: "",
    courseId: "",
  };
  const [newData, setNewData] = useState(emptyData);
  const toast = useToast()

  const defaultValues = isEdit && initialData ? initialData : newData;

  function resetData(){
    setNewData(emptyData);
  }

  async function resourceAction(currentState, formData) {
    const data = Object.fromEntries(formData);

    const validationErrors = validate.validateResource(data);
    if (validationErrors) {
      setErrors(validationErrors);
      toast.error("Поправете грешките във формата.");
      setNewData(data)
      return { success: false, error: "Поправете грешките във формата." };
    }

    setErrors({});


    try {

      if (isEdit) {
        const prevData = {
          _ownerId: initialData._ownerId,
          title: initialData.title,
          type: initialData.type,
          url: initialData.url,
          description: initialData.description,
          courseId: initialData.courseId,
          _createdOn: initialData._createdOn
        };

        await onSubmit(initialData._id, { ...prevData, ...data }, initialData.course.title);
      } else {
        await onSubmit(data);
      }
      toast.success(isEdit?'Успешно променихте ресурса':'Създадохте нов ресурс!');
      resetData();
      return { success: true, error: null };
      
    } catch (err) {
      toast.error(err.message || "Нещо се обърка");
      return { success: false, error: err.message || "Нещо се обърка" };
    }
  }

  const [state, formAction, isPending] = useActionState(resourceAction, {
    success: false,
    error: null,
  });

  return (
    <form className={styles.form} action={formAction}>
      <h2>{isEdit ? "Редактиране" : "Нов материал"}</h2>

      {state.error && <p className={styles.error}>{state.error}</p>}
      {state.success && <p className={styles.success}>Успешно запазено!</p>}

      {isEdit && initialData?._id && (
        <input type="hidden" name="_id" value={initialData._id} />
      )}

      <label>
        Заглавие
        <input
          type="text"
          name="title"
          defaultValue={defaultValues.title}
          required
        />
        {errors.title && <p className={styles.errorText}>{errors.title}</p>}
      </label>

      <label>
        Тип материал
        <select name="type" defaultValue={defaultValues.type}>
          <option value="video">Видео (YouTube)</option>
          <option value="file">Файл (PDF / Drive)</option>
        </select>
        {errors.type && <p className={styles.errorText}>{errors.type}</p>}
      </label>

      <label>
        Линк (URL)
        <input
          type="text"
          name="url"
          defaultValue={defaultValues.url}
          required
        />
        {errors.url && <p className={styles.errorText}>{errors.url}</p>}
      </label>

      <label>
        Описание
        <textarea
          name="description"
          defaultValue={defaultValues.description}
        />
        {errors.description && <p className={styles.errorText}>{errors.description}</p>}
      </label>

      <label>
        Курс
        <select name="courseId" defaultValue={defaultValues.courseId} required>
          <option value="" disabled>-- Изберете курс --</option>
          {courses.map((c) => (
            <option key={c._id} value={String(c._id)}>
              {c.title}
            </option>
          ))}
        </select>
        {errors.courseId && <p className={styles.errorText}>{errors.courseId}</p>}
      </label>

      <button disabled={isPending} className={styles.primaryButton}>
        {isPending ? "Записва се..." : isEdit ? "Запази" : "Добави"}
      </button>
    </form>
  );
}