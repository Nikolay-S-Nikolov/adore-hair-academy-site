import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return (
            <Navigate to={'/'} replace />
        );
    }

    return children;
};