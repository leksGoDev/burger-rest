import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { useHistory } from "react-router-dom";

import Form from "../../components/form/form";
import { InputType } from "../../models/auth-form";
import { useInput, useAppDispatch } from "../../hooks";
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
    const dispatch = useAppDispatch();

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

    return (
        <Form
            title="Вход"
            buttonText="Войти"
            inputs={[emailInput, passwordInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default Login;