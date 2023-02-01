import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { Redirect, useHistory, useLocation } from "react-router-dom";

import Form from "../../components/form/form";
import { InputType } from "../../constants/form";
import { TFromState } from "../../models/router";
import { useInput, useAppDispatch, useAppSelector } from "../../hooks";
import { resetPassword } from "../../services/store/slices/pass-reset-api/pass-reset-api";

const ResetPassword: FC = () => {
    const { input: passwordInput, state: password } = useInput({
        type: InputType.Password,
        inputProps: {
            name: 'password',
            placeholder: 'Введите новый пароль'
        }
    });
    const { input: codeInput, state: code } = useInput({
        type: InputType.Default,
        inputProps: {
            name: 'code',
            placeholder: 'Введите код из письма'
        }
    });
    const { isMailSent } = useAppSelector(store => ({ ...store.passResetApi, ...store.authApi }));
    const { state } = useLocation<TFromState>();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        () => dispatch(resetPassword({ password, token: code })),
        [dispatch, password, code]
    );

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Вспомнили пароль?',
            buttonText: 'Войти',
            onClick: () => history.push("/login")
        }
    ], [history]);

    if (!isMailSent) {
        return (
            <Redirect to={state?.from ?? "/"} />
        );
    }

    return (
        <Form
            title="Восстановление пароля"
            buttonText="Сохранить"
            inputs={[passwordInput, codeInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;