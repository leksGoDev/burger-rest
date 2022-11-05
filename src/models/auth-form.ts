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
        type?: 'text' | 'email' | 'password';
        placeholder?: string;
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
}

export interface ILinkRowData {
    paragraphText: string;
    buttonText: string;
    onClick: () => void;
}