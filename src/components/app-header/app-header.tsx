import * as React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './app-header.module.css';
import AppHeaderElement from "./app-header-element/app-header-element";

const AppHeader = () => {

    return (
        <header className={styles.content}>
            <section className={styles.placement}>
                <AppHeaderElement
                    icon={<BurgerIcon type="primary" />}
                    text="Конструктор"
                />

                <AppHeaderElement
                    textInactive
                    icon={<ListIcon type="secondary" />}
                    text="Лента заказов"
                />
            </section>

            <section className={styles.logo}>
                <Logo />
            </section>

            <section>
                <AppHeaderElement
                    textInactive
                    icon={<ProfileIcon type="secondary" />}
                    text="Личный кабинет"
                />
            </section>
        </header>
    );
};

export default AppHeader;