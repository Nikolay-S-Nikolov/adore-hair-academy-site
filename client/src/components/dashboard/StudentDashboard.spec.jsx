import { it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import StudentDashboard from "./StudentDashboard.jsx";
import { useCourseApi } from "../../hooks/useCoursesApi.js";
import { useAuth } from "../../hooks/useAuth.js";

vi.mock("../../hooks/useCoursesApi.js");
vi.mock("../../hooks/useAuth.js");

const mockUser = {
    _id: "123",
    email: "test@test.com",
    role: "student",
};


beforeEach(() => {

    useAuth.mockReturnValue({
        user: mockUser,
    });

    useCourseApi.mockReturnValue({
        request: vi.fn(),
    });
});

it("Show LoadingSpinner after initial load", () => {
    useCourseApi().request.mockResolvedValue([]);

    render(<StudentDashboard />);

    expect(screen.getByText(/Зареждане/i)).toBeTruthy();
});

it("Shows message when no approved courses", async () => {
    useCourseApi().request.mockResolvedValue([]);

    render(<StudentDashboard />);

    await waitFor(() => {
        expect(screen.getByText("Нямате одобрени обучения.")).toBeTruthy();
    });
});

it("Renders a course that is approved", async () => {
    const coursesMock = [
        {
            _id: "course1",
            status: "approved",
            course: {
                _id: "c1",
                title: "Основи на дамското подстригване",
                level: "Начинаещ",
                duration: "2 месеца",
            },
        },
    ];

    useCourseApi().request.mockResolvedValue(coursesMock);

    render(<StudentDashboard />);

    await waitFor(() => {
        expect(
            screen.getByText("Основи на дамското подстригване")
        ).toBeTruthy();
    });

    expect(screen.getByText(/Одобрен/i, {selector: "span"})).toBeTruthy();
});

it("Opens resources section when clicked", async () => {
    const coursesMock = [
        {
            _id: "course1",
            status: "approved",
            course: {
                _id: "c1",
                title: "Дамски прически",
                level: "Средно",
                duration: "3 месеца",
            },
        },
    ];

    useCourseApi().request
        .mockResolvedValueOnce(coursesMock) // first load: enrollments
        .mockResolvedValueOnce([]) // resources
        .mockResolvedValueOnce([]); // exams

    render(<StudentDashboard />);

    await waitFor(() => {
        expect(screen.getByText("Дамски прически")).toBeTruthy();
    });

    const btn = screen.getByText("Материали, уроци и изпити");
    fireEvent.click(btn);

    await waitFor(() => {
        expect(screen.getByText("Все още няма добавени материали.")).toBeTruthy();
    });
});
