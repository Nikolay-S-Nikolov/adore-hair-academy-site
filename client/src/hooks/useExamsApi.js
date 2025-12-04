import { useCallback } from "react";
import { useAdminApi } from "./useAdminApi.js"



export function useExamApi() {
    const { request } = useAdminApi()
    const getExams = useCallback(() => request("GET", "/data/exams?load=course%3DcourseId%3Acourses"), [request]);

    const createExam = useCallback(
        (examData) => request("POST", "/data/exams", examData),
        [request]
    );

    const updateExam = useCallback(
        (id, examData) => request("PUT", `/data/exams/${id}`, examData),
        [request]
    );

    const deleteExam = useCallback(
        (id) => request("DELETE", `/data/exams/${id}`),
        [request]
    );


    return {
        getExams,
        createExam,
        updateExam,
        deleteExam
    }
}