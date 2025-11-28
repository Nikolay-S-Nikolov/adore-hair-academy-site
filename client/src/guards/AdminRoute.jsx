import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || user.role !== "staff") {
        return <Navigate to="/" replace />;
    }

    return children;
}
