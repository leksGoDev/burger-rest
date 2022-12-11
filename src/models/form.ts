import type { ChangeEvent } from "react";
import { InputType } from "../constants/form";

export interface IInputData {
    type: InputType;
    inputProps: {
        name: string;
        minLength: number;
        required: boolean;
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;

        type?: 'text' | 'email' | 'password';
        placeholder?: string;
    };
}

export interface ILinkRowData {
    paragraphText: string;
    buttonText: string;
    onClick: () => void;
}