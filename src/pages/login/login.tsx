import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { Redirect, useHistory, useLocation } from "react-router-dom";

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useInput, useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../services/store/slices/api/auth-api";

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
    const history = useHistory();
    const { state } = useLocation<{ from?: string; }>();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.authApi);

    const handleSubmit = useCallback(
        () => dispatch(login(email, password)),
        [dispatch, email, password]
    );

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Вы — новый пользователь?',
            buttonText: 'Зарегистрироваться',
            onClick: () => history.push("/register")
        },
        {
            paragraphText: 'Забыли пароль?',
            buttonText: 'Восстановить пароль',
            onClick: () => history.push("/forgot-password")
        }
    ], [history]);

    if (user) {
        return (
            <Redirect to={state?.from ?? "/"} />
        )
    }

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