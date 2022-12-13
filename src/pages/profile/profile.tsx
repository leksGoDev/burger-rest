import { useEffect } from "react";
import type { FC } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import styles from "./profile.module.css";
import { WS_BASE_URL } from "../../constants/api";
import ProfileOrderHistory from "./profile-orders-history/profile-order-history";
import ProfileInformation from "./profile-information/profile-information";
import ProfileNavigation from "../../components/profile/profile-navigation/profile-navigation";
import FeedOrder from "../feed/feed-order/feed-order";
import { getCookie } from "../../services/api/cookie";
import { useAppDispatch } from "../../hooks";
import { startSocket } from "../../services/store/slices/api/history-socket-api";

const Profile: FC = () => {
    const { url } = useRouteMatch();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(startSocket(`${WS_BASE_URL}?token=${accessToken}`));
    }, [dispatch]);

    return (
        <Switch>
            <Route exact path={`${url}/orders/:id`} component={FeedOrder} />

            <Route path={url}>
                <main className={styles.main}>
                    <ProfileNavigation />

                    <article>
                        <Switch>
                            <Route exact path={url} component={ProfileInformation} />

                            <Route exact path={`${url}/orders`} component={ProfileOrderHistory} />
                        </Switch>
                    </article>
                </main>
            </Route>
        </Switch>

    );
};

export default Profile;