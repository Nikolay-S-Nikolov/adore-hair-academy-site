import { createContext, useState, useCallback } from "react";
import GlobalToast from "../components/ui/GlobalToast.jsx";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((type, message) => {
        setToast({ type, message });        
        setTimeout(() => setToast(null), 5000);
    }, []);

    const toastApi = {
        success: (msg) => showToast("success", msg),
        error: (msg) => showToast("error", msg),
        warning: (msg) => showToast("warning", msg),
    };

    return (
        <ToastContext.Provider value={toastApi}>
            {children}
            <GlobalToast toast={toast} />
        </ToastContext.Provider>
    );
}

export default ToastContext;
