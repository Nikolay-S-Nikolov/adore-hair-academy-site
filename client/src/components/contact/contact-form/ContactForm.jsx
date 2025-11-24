import { useActionState, useEffect, useState } from "react";

import styles from './ContactForm.module.css'

export default function ContactForm() {
    const [toast, setToast] = useState(null);

    async function sendEmailAction(prevState, formData) {

        const handleError = (ErrMessage) => {
            return {
                ...prevState,
                error: ErrMessage
            };
        };

        if (formData.get('website')?.length > 0) {
            return handleError('Активирана бот защита.');
        }

        if (!formData.get('name').trim() || !formData.get('message').trim()) {
            return handleError('Полетата име и съобщение не могат да бъдат празни');
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (!result.success) {
                throw new Error('Грешка при изпращане. Опитайте отново.')
            }

        } catch (err) {
            console.error(err.message)
            return handleError('Грешка при изпращане. Опитайте отново.')
        }

        return {
            name: '',
            email: '',
            tel: '',
            message: '',
            error: null,
            success: true
        };
    }

    const [status, submitAction, isPending] = useActionState(sendEmailAction, {
        name: '',
        email: '',
        tel: '',
        message: '',
        error: null,
        success: false
    });

    useEffect(() => {
        if (status.success) {
            setToast({ type: "success", text: "Съобщението е изпратено успешно!" });
        }
        if (status.error) {
            setToast({ type: "error", text: status.error });
        }
    }, [status]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [toast])

    return (
        <div className={styles.formCard}>
            <h2>Изпратете ни съобщение</h2>

            {toast &&
                <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
                    {toast.text}
                </div >
            }

            <form action={submitAction} className={styles.form}>
                <input type="hidden" name="access_key" value="ef6c567c-dd1b-4c11-b5a7-f31c638a5827" ></input>
                <input type="text" name="website" className={styles.honeypot} tabIndex="-1" autoComplete="off" />
                <input type="text" name="name" placeholder="Вашето име" required defaultValue={status.name} />
                <input type="email" name="email" placeholder="Имейл адрес" required defaultValue={status.email} />
                <input type="tel" name="tel" placeholder="Телефон (по желание)" defaultValue={status.tel} />
                <textarea name="message" placeholder="Вашето съобщение" rows="5" required defaultValue={status.message}></textarea>
                <button type="submit" disabled={isPending} className={`${styles.sendButton} ${isPending ? styles.loading : ''}`}>
                    {isPending ? 'Изпращане...' : 'Изпрати'}
                </button>
            </form>
        </div>
    );
};