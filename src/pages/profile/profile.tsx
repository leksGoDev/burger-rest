import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileOrderHistory from "./profile-orders-history/profile-order-history";
import ProfileInformation from "./profile-information/profile-information";
import ProfileNavigation from "../../components/profile/profile-navigation/profile-navigation";

const Profile: FC = () => {
    const { url } = useRouteMatch();
    const isOrderInstance = useRouteMatch(`${url}/orders/:id`);

    const createNavigationWrap = useCallback(
        (component: ReactNode) => !isOrderInstance ?
            <main className={styles.main}>
                <ProfileNavigation />

                <article>
                    {component}
                </article>
            </main>
            : component
        ,
        [isOrderInstance]
    );

    return (
        <>
            {createNavigationWrap(
                <Switch>
                    <Route exact path={url} component={ProfileInformation} />

                    <Route path={`${url}/orders`} component={ProfileOrderHistory} />
                </Switch>
            )}
        </>

    );
};

export default Profile;