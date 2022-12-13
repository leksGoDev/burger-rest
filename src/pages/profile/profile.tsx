import type { FC } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileOrderHistory from "./profile-orders-history/profile-order-history";
import ProfileInformation from "./profile-information/profile-information";
import ProfileNavigation from "../../components/profile/profile-navigation/profile-navigation";
import FeedOrder from "../feed/feed-order/feed-order";

const Profile: FC = () => {
    const { url } = useRouteMatch();

    return (
        <main className={styles.main}>
            <ProfileNavigation />

            <article>
                <Switch>
                    <Route exact path={url} component={ProfileInformation} />

                    <Route exact path={`${url}/orders`} component={ProfileOrderHistory} />

                    <Route exact path={`${url}/orders/:id`} component={FeedOrder} />
                </Switch>
            </article>
        </main>
    );
};

export default Profile;