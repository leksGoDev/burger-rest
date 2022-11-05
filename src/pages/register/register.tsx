import { useMemo } from "react";
import type { ChangeEvent, FC } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useReplaceHistory } from "../../hooks/router";

const Register: FC = () => {
    const replaceHistory = useReplaceHistory();

    const submitButton = useMemo(() => ({
        title: 'Зарегистрироваться',
        onClick: () => null
    }), []);

    const inputs = useMemo(() => [
        {
            type: InputType.Default,
            inputProps: {
                name: 'name',
                type: "text" as "text",
                placeholder: 'Имя',
                value: "",
                onChange: (e: ChangeEvent<HTMLInputElement>) => null
            }
        },
        {
            type: InputType.Email,
            inputProps: {
                name: 'email',
                value: "",
                onChange: (e: ChangeEvent<HTMLInputElement>) => null
            }
        },
        {
            type: InputType.Password,
            inputProps: {
                name: 'password',
                value: "",
                onChange: (e: ChangeEvent<HTMLInputElement>) => null
            }
        }
    ], []);

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Уже зарегистрированы?',
            buttonText: 'Войти',
            onClick: replaceHistory.bind(null, "login")
        }
    ], [replaceHistory]);

    return (
        <AuthForm
            title="Регистрация"
            submitButton={submitButton}
            inputs={inputs}
            linkRows={linkRows}
        />
    );
};

export default Register;