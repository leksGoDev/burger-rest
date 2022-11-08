import { useMemo, useCallback } from "react";
import type { FC } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useInput, useReplaceHistory, useAppDispatch } from "../../hooks";
import { resetPassword } from "../../services/store/slices/authApiSlice";

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
    const replaceHistory = useReplaceHistory();
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        () => dispatch(resetPassword(password, code)),
        [dispatch, password, code]
    );

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
            buttonText="Сохранить"
            inputs={[passwordInput, codeInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default ResetPassword;