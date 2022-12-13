import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";

import styles from "./profile-navigation.module.css";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../../services/store/slices/api/auth-api";

const ProfileNavigation: FC = () => {
    const location = useLocation();
    const { url } = useRouteMatch();
    const dispatch = useAppDispatch();

    const linkClassesProps = useMemo(
        () => ({
            className: `${styles.link} text text_type_main-medium text_color_inactive`,
            activeClassName: styles.activeLink
        }),
        []
    );

    const handleLogout = useCallback(
        () => dispatch(logout()),
        [dispatch]
    );

    return (
        <section className={styles.content}>
            <nav>
                <NavLink exact to={url} {...linkClassesProps}>
                    Профиль
                </NavLink>

                <NavLink to={`${url}/orders`} {...linkClassesProps}>
                    История заказов
                </NavLink>

                <button
                    className={`${styles.button} text text_type_main-medium text_color_inactive`}
                    onClick={handleLogout}
                >
                    Выход
                </button>
            </nav>

            <aside className="mt-20">
                <p className={`${styles.asideText} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете&nbsp;
                    {
                        location.pathname.indexOf("orders") !== -1 ?
                            "\nпросмотреть свою историю заказов"
                            : "\nизменить свои персональные данные"
                    }
                </p>
            </aside>
        </section>
    );
};

export default ProfileNavigation;
