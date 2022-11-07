import type { FC } from 'react';
import { Switch, Route } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileOrderHistory from "./profile-orders-history/profile-order-history";
import ProfileInformation from "./profile-information/profile-information";
import ProfileNavigation from "../../components/profile/profile-navigation/profile-navigation";

const Profile: FC = () => {

    return (
        <main className={styles.main}>
            <ProfileNavigation />

            <article>
                <Switch>
                    <Route exact path="/">
                        <ProfileInformation />
                    </Route>

                    <Route exact path="/orders">
                        <ProfileOrderHistory />
                    </Route>
                </Switch>
            </article>
        </main>
    );
};

export default Profile;