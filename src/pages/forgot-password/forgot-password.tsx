import { useMemo, useCallback, useEffect } from "react";
import type { FC } from 'react';
import { useHistory } from "react-router-dom";

import { InputType } from "../../constants/form";
import Form from "../../components/form/form";
import { useInput, useAppDispatch, useAppSelector  } from "../../hooks";
import { checkEmail } from "../../services/store/slices/pass-reset-api/pass-reset-api";

const ForgotPassword: FC = () => {
    const { input: emailInput, state: email } = useInput({
        type: InputType.Email,
        inputProps: {
            name: 'email',
            placeholder: 'Укажите e-mail'
        }
    });
    const { isMailSent } = useAppSelector(store => store.passResetApi);
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isMailSent) {
            history.push("/reset-password");
        }
    }, [history, isMailSent]);

    const handleSubmit = useCallback(
        () => dispatch(checkEmail({ email })),
        [dispatch, email]
    );

    const linkRows = useMemo(() => [
        {
            paragraphText: 'Вспомнили пароль?',
            buttonText: 'Войти',
            onClick: () => history.push("/login")
        }
    ], [history]);

    return (
        <Form
            title="Восстановление пароля"
            buttonText="Восстановить"
            inputs={[emailInput]}
            linkRows={linkRows}
            onSubmit={handleSubmit}
        />
    );
};

export default ForgotPassword;