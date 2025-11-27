import { createContext, useState, useCallback } from "react";

const AuthContext = createContext();
import config from '../gonfig/config.js'

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(() => localStorage.getItem('user'));
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
                if (res.status === 204) return;
                throw new Error(`Logout failed (status ${res.status})`);
            }

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Request failed");
            return result;
        } catch (err) {
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
