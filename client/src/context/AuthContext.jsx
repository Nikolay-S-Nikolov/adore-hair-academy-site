import { createContext, useState, useCallback } from "react";
import config from '../gonfig/config.js'

const AuthContext = createContext({
    token: null,
    user: {
        _id: '',
        email: '',
        accessToken: '',        
    },
    loading: false,
    error: false,
    login() { },
    register() { },
    logout() { },
    isAuthenticated: false,
});

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : {};
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = config.BASE_URL;

    const authRequest = useCallback(async (method, url, data, isLogout = false) => {
        setLoading(true);
        setError(null);

        try {
            const opts = { method, headers: {} };

            if (data) {
                opts.headers["Content-Type"] = "application/json";
                opts.body = JSON.stringify(data);
            }

            if (token) {
                opts.headers["X-Authorization"] = token;
            }

            const res = await fetch(baseUrl + url, opts);

            if (isLogout) {
                if (res.status === 204 || res.status === 403) return;
                throw new Error(`Logout failed (status ${res.status})`);
            }

            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
                throw new Error("SESSION_EXPIRED");
            }

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.message || "Request failed");
            }

            return result;
        } catch (err) {
            // if (err.message === "SESSION_EXPIRED") {
            //     toast.warning("Вашата сесия е изтекла. Моля влезте отново.");
            //     navigate("/login");
            //     return;
            // }
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [token, baseUrl]);

    const register = useCallback(async (email, password) => {
        const res = await authRequest("POST", "/users/register", { email, password });
        localStorage.setItem("authToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res));
        setToken(res.accessToken);
        setUser(res);
    }, [authRequest]);

    const login = useCallback(async (email, password) => {
        const res = await authRequest("POST", "/users/login", { email, password });
        localStorage.setItem("authToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res));
        setToken(res.accessToken);
        setUser(res);
        return res;
    }, [authRequest]);

    const logout = useCallback(async () => {
        await authRequest("GET", "/users/logout", null, true);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }, [authRequest]);

    const value = {
        token,
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: Boolean(token),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
