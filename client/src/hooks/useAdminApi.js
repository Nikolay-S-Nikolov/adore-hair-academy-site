import { useAuth } from "./useAuth";
import config from "../gonfig/config.js";
import { useCallback } from "react";

export function useAdminApi() {
    const { token } = useAuth();

    const baseUrl = config.BASE_URL;
    const request = useCallback(async (method, url, data = null) => {

        const options = {
            method,
            headers: {}
        };

        if (token) {
            options.headers["X-Authorization"] = token;
            options.headers["X-Admin"] = token;
        }

        if (data) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(data);
        }

        const res = await fetch(baseUrl + url, options);

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
    }, [token, baseUrl]);

    const getCourses = useCallback(() => request("GET", "/data/courses"), [request]);

    const createCourse = useCallback(
        (courseData) => request("POST", "/data/courses", courseData),
        [request]
    );

    const updateCourse = useCallback(
        (id, courseData) => request("PUT", `/data/courses/${id}`, courseData),
        [request]
    );

    const deleteCourse = useCallback(
        (id) => request("DELETE", `/data/courses/${id}`),
        [request]
    );

    return {
        request,
        getCourses,
        createCourse,
        updateCourse,
        deleteCourse
    };
}
