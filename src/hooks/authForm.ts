import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";

import { InputData, InputType } from "../models/auth-form";

interface InputHookProps {
    type: InputType;
    inputProps: Omit<InputData["inputProps"], "minLength" | "value" | "onChange">;
}

export const useInput = (props: InputHookProps) => {
    const { type, inputProps } = props;
    const [state, setState] = useState("");

    const checkMinLength = () =>
        type === InputType.Password ? 6
            : type === InputType.Email ? 5
                : 3;

    const input = useMemo(() => ({
        type: type,
        inputProps: {
            ...inputProps,
            minLength: checkMinLength(),
            value: state,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)
        }
    }), [state, setState]);

    return { input, state };
};