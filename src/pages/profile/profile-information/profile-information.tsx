import { useState, useEffect, useCallback, useMemo } from "react";
import type { FC, ChangeEvent, FormEvent } from 'react';
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import styles from "./profile-information.module.css";
import { checkAuth, patchUser } from "../../../services/store/slices/auth-api/auth-api";

const ProfileInformation: FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.authApi);
    const [footerVisible, setFooterVisible] = useState(false);
    const [email, setEmail] = useState(user?.email ?? "");
    const [name, setName] = useState(user?.name ?? "");
    const [password, setPassword] = useState("");

    const handleReset = useCallback(
        () => {
            setPassword("");
            setEmail(user?.email ?? "");
            setName(user?.name ?? "");
        },
        [user, setPassword, setName, setEmail]
    );

    useEffect(() => {
        handleReset()
    }, [user]);

    useEffect(() => {
        const hasDifference =
            !!password.length
            || (email !== (user?.email ?? ""))
            || (name !== (user?.name ?? ""));

        setFooterVisible(hasDifference);
    }, [user, email, name, password]);

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(patchUser({ email, password, name }))
                .catch(() => {
                    dispatch(checkAuth())
                });
            setPassword("");
        },
        [dispatch, email, password, name, setPassword]
    );

    const isSubmitDisabled = useMemo(
        () => email.length < 5 || name.length < 3 || (!!password.length && password.length < 6),
        [email, name, password]
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
                required={true}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />

            <EmailInput
                name="email"
                placeholder="Логин"
                isIcon={true}
                minLength={5}
                required={true}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <PasswordInput
                name="password"
                icon="EditIcon"
                minLength={6}
                required={false}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            {
                footerVisible &&
                    <footer className={styles.footer}>
                        <Button
                            type="secondary"
                            htmlType="button"
                            onClick={handleReset}
                        >
                            Отмена
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitDisabled}
                        >
                            Сохранить
                        </Button>
                    </footer>
                }
        </form>
    );
};

export default ProfileInformation;
