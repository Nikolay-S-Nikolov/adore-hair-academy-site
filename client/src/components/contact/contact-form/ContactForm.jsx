import { useActionState } from "react";

import styles from './ContactForm.module.css'

export default function ContactForm() {
    async function sendEmailAction(prevState, formData) {

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
            return {
                name: formData.get('name'),
                email: formData.get('email'),
                tel: formData.get('tel'),
                message: formData.get('message'),
                error: 'Грешка при изпращане. Опитайте отново.',
                success: false
            }
        }

        return {
            name: '',
            email: '',
            tel: '',
            message: '',
            error: null,
            success: true
        }
    }

    const [status, submitAction, isPending] = useActionState(sendEmailAction, {
        name: '',
        email: '',
        tel: '',
        message: '',
        error: null,
        success: false

    })

    return (
        <div className={styles.formCard}>
            <h2>Изпратете ни съобщение</h2>
            {status.success && <p>message send</p>}
            {!status.success && <p>{status.error}</p>}

            <form action={submitAction} className={styles.form}>
                <input type="hidden" name="access_key" value="7605f6af-86e2-41fb-9155-bf4c0fc88251" ></input>
                <input type="text" name="name" placeholder="Вашето име" required defaultValue={status.name} />
                <input type="email" name="email" placeholder="Имейл адрес" required defaultValue={status.email} />
                <input type="tel" name="tel" placeholder="Телефон (по желание)" defaultValue={status.tel} />
                <textarea name="message" placeholder="Вашето съобщение" rows="5" required defaultValue={status.message}></textarea>
                <button type="submit" disabled={isPending} className={styles.sendButton}>
                    {isPending ? 'Изпращане' : 'Изпрати'}
                </button>
            </form>
        </div>
    );
};