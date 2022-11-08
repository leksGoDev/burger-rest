import { useState } from "react";
import type { FC } from 'react';
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-information.module.css";

const ProfileInformation: FC = () => {
    const [visible, setVisible] = useState(true);

    return (
        <form
            className={styles.form}
            onSubmit={() => null}
        >
            <Input
                type="text"
                name="name"
                placeholder="Имя"
                icon="EditIcon"
                value=""
                onChange={() => null}
            />

            <EmailInput
                name="email"
                placeholder="Логин"
                isIcon={true}
                value=""
                onChange={() => null}
            />

            <PasswordInput
                name="password"
                icon="EditIcon"
                value=""
                onChange={() => null}
            />

            {
                visible &&
                    <footer className={styles.footer}>
                        <Button
                            type="secondary"
                            htmlType="button"
                            onClick={() => null}
                        >
                            Отмена
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Сохранить
                        </Button>
                    </footer>
                }
        </form>
    );
};

export default ProfileInformation;
