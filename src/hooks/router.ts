import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const useReplaceHistory = () => {
    const history = useHistory();

    return useCallback(
        (url: string) => {
            history.replace(`/${url}`);
        },
        [history]
    );
};