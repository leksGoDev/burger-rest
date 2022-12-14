import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";

import { InputType } from "../constants/form";
import { IInputData } from "../models/form";

interface IInputHookProps {
    type: InputType;
    inputProps: Omit<IInputData["inputProps"], "required" | "minLength" | "value" | "onChange">;
}

export const useInput = (props: IInputHookProps) => {
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
            required: true,
            value: state,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)
        }
    }), [state, setState]);

    return { input, state };
};