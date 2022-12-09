import { memo, useCallback } from "react";
import type { FC } from "react";
import { useLocation} from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './app-header.module.css';
import AppHeaderElement from "./app-header-element/app-header-element";

const AppHeader: FC = memo(() => {
    const { pathname } = useLocation();

    const checkActive = useCallback(
        (route: string, strict?: boolean) => strict ? pathname === route : pathname.includes(route),
        [pathname]
    );

    const checkIconType = useCallback(
        (route: string, strict?: boolean) => checkActive(route, strict) ? "primary" : "secondary",
        [checkActive]
    );

    return (
        <header className={styles.wrap}>
            <div className={styles.content}>
                <section className={styles.leftSection}>
                    <AppHeaderElement
                        textInactive={!checkActive("/", true)}
                        icon={<BurgerIcon type={checkIconType("/", true)} />}
                        text="Конструктор"
                        linkRoute="/"
                    />

                    <AppHeaderElement
                        textInactive={!checkActive("feed")}
                        icon={<ListIcon type={checkIconType("feed")} />}
                        text="Лента заказов"
                        linkRoute="/feed"
                    />
                </section>

                <article className={styles.logo}>
                    <Logo />
                </article>

                <AppHeaderElement
                    textInactive={!checkActive("/profile")}
                    icon={<ProfileIcon type={checkIconType("/profile")} />}
                    text="Личный кабинет"
                    linkRoute="/profile"
                />
            </div>
        </header>
    );
});

export default AppHeader;