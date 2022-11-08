import type { ChangeEvent } from "react";

export enum InputType {
    Default,
    Email,
    Password
}

export interface InputData {
    type: InputType;
    inputProps: {
        name: string;
        type?: 'text' | 'email' | 'password';
        placeholder?: string;
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
}

export interface LinkRowData {
    paragraphText: string;
    buttonText: string;
    onClick: () => void;
}