import type { ChangeEvent } from "react";

export enum InputType {
    Default,
    Email,
    Password
}

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