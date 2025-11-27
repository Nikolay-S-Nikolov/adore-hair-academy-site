import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isAuthenticated) {
        const redirectTo = location.state?.from || '/'
        return (
            <Navigate to={redirectTo} replace />
        );
    }

    return children;
};