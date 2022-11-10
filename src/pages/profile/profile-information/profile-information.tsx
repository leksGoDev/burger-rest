import { useState, useEffect, useCallback } from "react";
import type { FC, ChangeEvent, FormEvent } from 'react';
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import styles from "./profile-information.module.css";
import { patchUser } from "../../../services/store/slices/api/auth-api";

const ProfileInformation: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.authApi);
    const [footerVisible, setFooterVisible] = useState(false);
    const [email, setEmail] = useState(user!.email);
    const [name, setName] = useState(user!.name);
    const [password, setPassword] = useState("");

    useEffect(() => {
        const hasDifference = !!password.length || (email !== user!.email) || (name !== user!.name);
        setFooterVisible(hasDifference);
    }, [user, email, name, password]);

    const handleCancel = useCallback(
        () => {
            setPassword("");
            setEmail(user!.email);
            setName(user!.name);
        },
        [user, setPassword, setName, setEmail]
    );

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(patchUser(email, password, name));
            setPassword("");
        },
        [dispatch, email, password, name, setPassword]
    );

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <Input
                type="text"
                name="name"
                placeholder="Имя"
                icon="EditIcon"
                minLength={3}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />

            <EmailInput
                name="email"
                placeholder="Логин"
                isIcon={true}
                minLength={5}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <PasswordInput
                name="password"
                icon="EditIcon"
                minLength={6}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            {
                footerVisible &&
                    <footer className={styles.footer}>
                        <Button
                            type="secondary"
                            htmlType="button"
                            onClick={handleCancel}
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
