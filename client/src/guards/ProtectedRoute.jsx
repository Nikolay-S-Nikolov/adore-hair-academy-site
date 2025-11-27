import { useAuth } from "../hooks/useAuth.js";
import { Navigate, useLocation } from 'react-router';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation()


    if (!isAuthenticated) {
        return (
            <Navigate to={'/login'} state={{ from: location.pathname }} />
        );
    };

    return children;
};