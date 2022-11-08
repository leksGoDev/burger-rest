import { useMemo, useCallback } from "react";
import type { FC } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";
import { InputType } from "../../models/auth-form";
import { useInput, useAppDispatch, useReplaceHistory  } from "../../hooks";
import { checkEmail } from "../../services/store/slices/api/pass-reset-api";

const ForgotPassword: FC = () => {
    const { input: emailInput, state: email } = useInput({
        type: InputType.Email,
        inputProps: {
            name: 'email',
            placeholder: 'Укажите e-mail'
        }
    });
    const replaceHistory = useReplaceHistory();
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        () => dispatch(checkEmail(email)),
        [dispatch, email]
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
            buttonText="Восстановить"
            inputs={[emailInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default ForgotPassword;