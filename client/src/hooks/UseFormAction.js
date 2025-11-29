import { useActionState, useCallback, useEffect, useState } from "react";

export function useFormAction(actionHandler, initialValues = {}) {
    const [values, setValues] = useState(initialValues);

    const initialState = {
        success: false,
        error: null,
        result: null,
    };

    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            try {
                const body = Object.fromEntries(formData.entries());


                if ("hasOnlineExam" in body) {
                    body.hasOnlineExam = body.hasOnlineExam === "on";
                };

                const result = await actionHandler(body);

                return {
                    success: true,
                    error: null,
                    result,
                };
            } catch (err) {
                return {
                    success: false,
                    error: err.message,
                    result: prevState.result
                };
            }
        },
        initialState
    );

    const register = useCallback(
        (fieldName) => ({
            name: fieldName,
            value: values[fieldName],
            onChange: (e) => {
                const { name, value, type, checked } = e.target;
                setValues((v) => ({
                    ...v,
                    [name]: type === "checkbox" ? checked ? checked : '' : value,
                    [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                }));
            },
        }), [values]);

    const resetForm = useCallback((newValues = initialValues) => {
        setValues(newValues);
    }, [initialValues]);

    useEffect(() => {
        if (state.success && initialState._id == null) {
            resetForm({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.success]);
    const handleSubmit = (formData) => {
        return formAction(formData);
    };

    return {
        state,
        values,
        register,
        resetForm,
        handleSubmit,
        isPending,
        setValues
    };
}
