import { useMemo } from "react";
import type { FC, ChangeEvent } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useReplaceHistory } from "../../hooks/router";

const ForgotPassword: FC = () => {
    const replaceHistory = useReplaceHistory();

    const submitButton = useMemo(() => ({
        title: 'Восстановить',
        onClick: () => null
    }), []);

    const inputs = useMemo(() => [
        {
            type: InputType.Email,
            inputProps: {
                name: 'email',
                placeholder: 'Укажите e-mail',
                value: "",
                onChange: (e: ChangeEvent<HTMLInputElement>) => null
            }
        }
    ], []);

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Вспомнили пароль?',
            buttonText: 'Войти',
            onClick: replaceHistory.bind(null, "login")
        }
    ], [replaceHistory]);

    return (
        <AuthForm
            title="Восстановление пароля"
            submitButton={submitButton}
            inputs={inputs}
            linkRows={linkRows}
        />
    );
};

export default ForgotPassword;