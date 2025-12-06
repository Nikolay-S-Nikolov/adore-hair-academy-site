export default function formatDateTime(ts) {
    if (!ts) return "—";
    const d = new Date(ts);
    return d.toLocaleString("bg-BG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}