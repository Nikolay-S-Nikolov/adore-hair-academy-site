import { useActionState} from "react";

export function useFormFlow(actionHandler) {

    const [status, submitAction, isPending] = useActionState(actionHandler,{
        email: "",
        error: null,
        success: false
    });

    return {
        status,
        isPending,
        submitAction,
    };

}