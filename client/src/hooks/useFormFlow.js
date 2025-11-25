import { useActionState, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useFormFlow(actionHandler, redirectTo = '/') {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);


    const [status, submitAction, isPending] = useActionState(actionHandler, {
        email: "",
        error: null,
        success: false
    });

    useEffect(() => {
        if (!status.success) return;
        Promise.resolve().then(() => {
            setToast({ type: "success", text: "Успешно влизане!" });
        });

        setTimeout(() => setFadeOut(true), 600);
        setTimeout(() => navigate(redirectTo), 1300);

    }, [status.success, navigate, redirectTo]);

    useEffect(() => {
        if (toast) {
            const t = setTimeout(() => setToast(null), 2500);
            return () => clearTimeout(t);
        }
    }, [toast]);

    return {
        toast,
        fadeOut,
        status,
        isPending,
        submitAction,
    };

}