import * as React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './app-header.module.css';

const AppHeader = () => {

    return (
        <header className={styles.content}>
            <div className={styles.placement}>
                <div className={`${styles.placement} pt-4 pb-4 pr-5 pl-5`}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">Конструктор</p>
                </div>

                <div className={`${styles.placement} pt-4 pb-4 pr-5 pl-5`}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                </div>
            </div>

            <div className={styles.logo}>
                <Logo />
            </div>

            <div>
                <div className={`${styles.placement} pt-4 pb-4 pr-5 pl-5`}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;