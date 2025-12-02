import { useActionState } from "react";
import styles from "./AdminResources.module.css";

export default function ResourceForm({ isEdit, initialData, onSubmit, courses }) {
  const emptyData = {
    title: "",
    type: "video",
    url: "",
    description: "",
    courseId: "",
  };


  const defaultValues = isEdit && initialData ? initialData : emptyData;

  async function resourceAction(currentState, formData) {
    const data = Object.fromEntries(formData);

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
        console.log(initialData._id);


        await onSubmit(initialData._id, { ...prevData, ...data }, initialData.course.title);
      } else {
        await onSubmit(data);
      }

      return { success: true, error: null };
    } catch (err) {
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
      </label>

      <label>
        Тип материал
        <select name="type" defaultValue={defaultValues.type}>
          <option value="video">Видео (YouTube)</option>
          <option value="file">Файл (PDF / Drive)</option>
        </select>
      </label>

      <label>
        Линк (URL)
        <input
          type="text"
          name="url"
          defaultValue={defaultValues.url}
          required
        />
      </label>

      <label>
        Описание
        <textarea
          name="description"
          defaultValue={defaultValues.description}
        />
      </label>

      <label>
        Курс
        <select name="courseId" defaultValue={defaultValues.courseId || ''} required>

          {!isEdit&&<option value="">-- Изберете курс --</option>}
          {isEdit&&<option value={defaultValues.courseId}>{courses.find(c => c._id === defaultValues.courseId).title}</option>}
          {/* <option value="">-- Изберете курс --</option> */}
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <button disabled={isPending} className={styles.primaryButton}>
        {isPending ? "Записва се..." : isEdit ? "Запази" : "Добави"}
      </button>
    </form>
  );
}