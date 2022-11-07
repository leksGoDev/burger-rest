import { useMemo } from "react";
import type { FC } from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";

import styles from "./profile-navigation.module.css";

const ProfileNavigation: FC = () => {
    const { url } = useRouteMatch();

    const linkClassesProps = useMemo(
        () => ({
            className: `${styles.link} text text_type_main-medium text_color_inactive`,
            activeClassName: styles.activeLink
        }),
        []
    );

    return (
        <section>
            <nav>
                <NavLink exact to={url} {...linkClassesProps}>
                    Профиль
                </NavLink>

                <NavLink to={`${url}/orders`} {...linkClassesProps}>
                    История заказов
                </NavLink>

                <button className={`${styles.button} text text_type_main-medium text_color_inactive`}>
                    Выход
                </button>
            </nav>

            <aside className="mt-20">
                <p className={`${styles.asideText} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете &nbsp;
                    изменить свои персональные данные
                </p>
            </aside>
        </section>
    );
};

export default ProfileNavigation;
