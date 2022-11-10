import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { Redirect, useHistory, useLocation } from "react-router-dom";

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useInput, useAppDispatch, useAppSelector } from "../../hooks";
import { register } from "../../services/store/slices/api/auth-api";

const Register: FC = () => {
    const { input: nameInput, state: name } = useInput({
        type: InputType.Default,
        inputProps: {
            name: 'name',
            type: "text" as "text",
            placeholder: 'Имя'
        }
    });
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
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { state } = useLocation<{ from?: string; }>();
    const { user } = useAppSelector(store => store.authApi);

    const handleSubmit = useCallback(
        () => dispatch(register(email, password, name)),
        [dispatch, email, password, name]
    );

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Уже зарегистрированы?',
            buttonText: 'Войти',
            onClick: () => history.push("/login")
        }
    ], [history]);

    if (user) {
        return (
            <Redirect to={state?.from ?? "/"} />
        )
    }

    return (
        <AuthForm
            title="Регистрация"
            buttonText="Зарегистрироваться"
            inputs={[nameInput, emailInput, passwordInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default Register;