import type { FC } from 'react';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";

const Login: FC = () => {

    return (
        <main className={styles.main}>
            <form className={`${styles.form} mb-20`}>
                <p className="text text_type_main-medium">
                    Вход
                </p>

                <EmailInput
                    name='email'
                    isIcon={false}
                    value={""}
                    onChange={() => null}
                />

                <PasswordInput
                    name='password'
                    value={""}
                    onChange={() => null}
                />
                
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Войти
                </Button>
            </form>

            <aside className={styles.aside}>
                <div className={styles.linkWrap}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                    </p>

                    <Button
                        type="secondary"
                        htmlType="button"
                        style={{ padding: 0 }}
                    >
                        Зарегистрироваться
                    </Button>
                </div>

                <div className={styles.linkWrap}>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>

                    <Button
                        type="secondary"
                        htmlType="button"
                        style={{ padding: 0 }}
                    >
                        Восстановить пароль
                    </Button>
                </div>
            </aside>
        </main>
    );
};

export default Login;