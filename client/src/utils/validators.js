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

}