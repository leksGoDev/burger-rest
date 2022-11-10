import { useMemo, useCallback, useEffect } from "react";
import type { FC } from 'react';
import { useHistory, Redirect, useLocation } from "react-router-dom";

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { LocationState } from "../../models/router";
import { useInput, useAppDispatch, useAppSelector  } from "../../hooks";
import { checkEmail } from "../../services/store/slices/api/pass-reset-api";

const ForgotPassword: FC = () => {
    const { input: emailInput, state: email } = useInput({
        type: InputType.Email,
        inputProps: {
            name: 'email',
            placeholder: 'Укажите e-mail'
        }
    });
    const { isMailSent, user } = useAppSelector(store => ({ ...store.passResetApi, ...store.authApi }));
    const history = useHistory();
    const { state } = useLocation<LocationState>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isMailSent) {
            history.push("/reset-password");
        }
    }, [history, isMailSent]);

    const handleSubmit = useCallback(
        () => dispatch(checkEmail(email)),
        [dispatch, email]
    );

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Вспомнили пароль?',
            buttonText: 'Войти',
            onClick: history.push.bind(null, "login")
        }
    ], [history]);

    if (user) {
        return (
            <Redirect to={state?.from ?? "/"} />
        )
    }

    return (
        <AuthForm
            title="Восстановление пароля"
            buttonText="Восстановить"
            inputs={[emailInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default ForgotPassword;