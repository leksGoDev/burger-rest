import { useMemo, useCallback } from "react";
import type { FC } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useInput, useReplaceHistory, useAppDispatch } from "../../hooks";
import { login } from "../../services/store/slices/authApiSlice";

const Login: FC = () => {
    const { input: emailInput, state: email } = useInput({
        type: InputType.Email,
        inputProps: {
            name: 'email'
        }
    });
    const { input: passwordInput, state: password } = useInput({
        type: InputType.Password,
        inputProps: {
            name: 'password'
        }
    });
    const replaceHistory = useReplaceHistory();
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        () => dispatch(login(email, password)),
        [dispatch, email, password]
    );

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
            buttonText="Войти"
            inputs={[emailInput, passwordInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default Login;