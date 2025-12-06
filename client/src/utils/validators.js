export default {
    validatePhone(phone) {

        if (phone.startsWith('0')) {
            const isValid = phone.length === 10 && /^0\d{9}$/.test(phone);
            return !isValid;
        }

        if (phone.startsWith('+359')) {
            const isValid = phone.length === 13 && /^\+359\d{9}$/.test(phone);
            return !isValid;
        }

        if (phone.startsWith('359')) {
            const isValid = phone.length === 12 && /^359\d{9}$/.test(phone);
            return !isValid;
        }

        if (!phone) return true;

        return true;
    },

    validateName(name) {
        if (!name || name.trim().length < 5) return true;

        const parts = name.trim().split(/\s+/);
        if (parts.length < 2) return true;

        const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄє\- ]+$/;
        if (!nameRegex.test(name)) return true;

        for (let part of parts) {
            if (!/^[A-ZА-Я][a-zа-я-]*$/.test(part)) return true;
        }

        return false;
    },

    validateReViewForm(authorName, text) {

        const newErrors = {};

        if (!authorName.trim()) {
            newErrors.authorName = 'Името е задължително';
        } else if (authorName.trim().length < 2) {
            newErrors.authorName = 'Името трябва да е поне 2 символа';
        } else if (authorName.trim().length > 50) {
            newErrors.authorName = 'Името не може да бъде повече от 50 символа';
        }

        if (!text.trim()) {
            newErrors.text = 'Отзивът е задължителен';
        } else if (text.trim().length < 10) {
            newErrors.text = 'Отзивът трябва да е поне 10 символа';
        } else if (text.trim().length > 500) {
            newErrors.text = 'Отзивът не може да бъде повече от 500 символа';
        }
        return { newErrors, hasErrors: Object.keys(newErrors).length > 0 };
    },

    validateResource(data) {
        const newErrors = {};

        if (!data.title.trim() || data.title.length < 3) {
            newErrors.title = "Заглавието трябва да съдържа поне 3 символа.";
        }

        if (!["video", "file"].includes(data.type)) {
            newErrors.type = "Невалиден тип материал.";
        }

        if (!data.url.trim()) {
            newErrors.url = "Моля въведете URL адрес.";
        }

        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(data.url)) {
            newErrors.url = "Моля въведете валиден URL адрес (трябва да започва с http:// или https://)";
        }

        if (!data.courseId) {
            newErrors.courseId = "Моля изберете курс.";
        }

        return Object.keys(newErrors).length > 0 ? newErrors : null;
    },

    validateExamForm(data) {
        const newErrors = {};

        if (data.title?.trim().length < 3) {
            newErrors.title = "Заглавието трябва да е поне 3 символа.";
        }

        if (!data.courseId) {
            newErrors.courseId = "Трябва да изберете курс.";
        }

        if (!["finalExam", "demoExam"].includes(data.type)) {
            newErrors.type = "Невалиден тип изпит.";
        }

        const startMs = Date.parse(data.startAt);
        const endMs = Date.parse(data.endAt);

        if (startMs >= endMs) {
            newErrors.date = "Началният час трябва да е преди крайния.";
        }

        if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
            newErrors.date = "Невалиден формат на дата/час.";
        }

        if (!data.startAt || !data.endAt) {
            newErrors.date = "Моля, задайте начален и краен час на изпита.";
        }

        if (data.questions?.length === 0) {
            newErrors.questions = "Добавете поне един въпрос.";
        }

        if (data.questions) {

            for (const q of data.questions) {
                if (!q.text.trim() || q.answers.some(a => !a.trim())) {
                    newErrors.noText = "Не трябва да има въпрос иили отговор без текс.";
                }
            }
        }

        return Object.keys(newErrors).length > 0 ? newErrors : null;
    }

}