import { useMemo } from "react";
import type { FC, ChangeEvent } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useReplaceHistory } from "../../hooks/router";

const Login: FC = () => {
    const replaceHistory = useReplaceHistory();

    const submitButton = useMemo(() => ({
        title: 'Войти',
        onClick: () => null
    }), []);

    const inputs = useMemo(() => [
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
            paragraphText: 'Вы — новый пользователь?',
            buttonText: 'Зарегистрироваться',
            onClick: replaceHistory.bind(null, "register")
        },
        {
            paragraphText: 'Забыли пароль?',
            buttonText: 'Восстановить пароль',
            onClick: replaceHistory.bind(null, "forgot-password")
        }
    ], [replaceHistory]);

    return (
        <AuthForm
            title="Вход"
            submitButton={submitButton}
            inputs={inputs}
            linkRows={linkRows}
        />
    );
};

export default Login;