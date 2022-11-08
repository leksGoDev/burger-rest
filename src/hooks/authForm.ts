import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { IInputData, InputType } from "../models/auth-form";

interface IInputHookProps {
    type: InputType;
    inputProps: Omit<IInputData["inputProps"], "value" | "onChange">;
}

export const useInput = (props: IInputHookProps) => {
    const { type, inputProps } = props;
    const [state, setState] = useState("");

    const input = useMemo(() => ({
        type: type,
        inputProps: {
            ...inputProps,
            value: state,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)
        }
    }), [state, setState]);

    return { input, state };
};