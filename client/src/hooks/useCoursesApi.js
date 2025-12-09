import { useAuth } from "./useAuth";
import config from "../gonfig/config.js";
import { useCallback } from "react";

export function useCourseApi() {
    const { token, user, logout } = useAuth();

    const baseUrl = config.BASE_URL;
    const request = useCallback(async (method, url, data = null) => {
        const isStaff = user?.role === 'staff';
        const options = {
            method,
            headers: {}
        };

        if (token) {
            options.headers["X-Authorization"] = token;
        }

        if (isStaff) {
            options.headers["X-Admin"] = token;
        }

        if (data) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(data);
        }
        try {
            const res = await fetch(baseUrl + url, options);

            if (res.status === 403) {
                logout();
                return null;
            }

            //TODO check if 204
            if (res.status === 204) {
                return { success: true };
            }
            let json = null;
            try {
                json = await res.json();
            } catch {
                json = null;
            }

            if (!res.ok) {
                throw new Error(json?.message || `Request failed (${res.status})`);
            }
            return json;
        } catch (err) {
            throw new Error(err.message || "REQUEST_FAILED");
        }
    }, [token, baseUrl, user?.role, logout]);

    const getCourseById = useCallback((id) => request("GET", `/data/courses/${id}`), [request]);

    const updateCourse = useCallback(
        (id, courseData) => request("PUT", `/data/courses/${id}`, courseData),
        [request]
    );

    const createCourse = useCallback(
        (courseData) => request("POST", "/data/courses", courseData),
        [request]
    );


    const deleteCourse = useCallback(
        (id) => request("DELETE", `/data/courses/${id}`),
        [request]
    );

    const update = useCallback(
        (url, data) => request("PUT", url, data),
        [request]
    );

    return {
        request,
        getCourseById,
        createCourse,
        updateCourse,
        deleteCourse,
        update
    };
}