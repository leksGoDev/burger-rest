import type { FC } from 'react';
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./auth-form.module.css";
import FormLinkRow from "./form-link-row/form-link-row";

interface Props {
    type: "register" | "login";
}

const AuthForm: FC<Props> = ({ type }) => {

    return (
        <main className={styles.layout}>
            <form className={`${styles.form} mb-20`}>
                <p className="text text_type_main-medium">
                    {type === 'login' ? 'Вход' : 'Регистрация'}
                </p>

                {
                    type === 'register' &&
                        <Input
                            name='name'
                            type="text"
                            placeholder='Имя'
                            value=""
                            onChange={() => null}
                        />
                }

                <EmailInput
                    name='email'
                    value={""}
                    onChange={() => null}
                />

                <PasswordInput
                    name='password'
                    value={""}
                    onChange={() => null}
                />

                <Button
                    htmlType="submit"
                >
                    {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </form>

            <aside className={styles.aside}>
                {
                    type === "login" ?
                        <>
                            <FormLinkRow
                                paragraphText='Вы — новый пользователь?'
                                buttonText='Зарегистрироваться'
                            />
                            <FormLinkRow
                                paragraphText='Забыли пароль?'
                                buttonText='Восстановить пароль'
                            />
                        </>
                        :
                        <FormLinkRow
                            paragraphText='Уже зарегистрированы?'
                            buttonText='Войти'
                        />
                }
            </aside>
        </main>
    );
};

export default AuthForm;