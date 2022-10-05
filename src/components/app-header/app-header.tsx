import * as React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './app-header.module.css';
import AppHeaderElement from "../app-header-element/app-header-element";

const AppHeader = () => {

    return (
        <header className={styles.content}>
            <div className={styles.placement}>
                <AppHeaderElement
                    icon={<BurgerIcon type="primary" />}
                    text="Конструктор"
                />

                <AppHeaderElement
                    textInactive
                    icon={<ListIcon type="secondary" />}
                    text="Лента заказов"
                />
            </div>

            <div className={styles.logo}>
                <Logo />
            </div>

            <div>
                <AppHeaderElement
                    textInactive
                    icon={<ProfileIcon type="secondary" />}
                    text="Личный кабинет"
                />
            </div>
        </header>
    );
};

export default AppHeader;