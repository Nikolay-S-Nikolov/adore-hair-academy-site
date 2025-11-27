import { useAuth } from "../../hooks/useAuth.js";
import ConfirmModal from "../modals/ConfirmModal.jsx";
import { useToast } from "../../hooks/useToast.js";

import { useNavigate } from "react-router";

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast()

    const handleConfirm = async () => {
        await logout();
        toast.success("Успешно излязохте от профила си!");
        navigate('/', { replace: true });
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <ConfirmModal
            title={'Изход'}
            message={'Сигурни ли сте, че искате да излезете?'}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};