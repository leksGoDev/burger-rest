import type { FC } from 'react';
import { Switch, Route } from "react-router-dom";

import ProfileOrderHistory from "./profile-orders-history/profile-order-history";
import ProfileInformation from "./profile-information/profile-information";
import ProfileNavigation from "../../components/profile/profile-navigation/profile-navigation";

const Profile: FC = () => {

    return (
        <main>
            <ProfileNavigation />

            <article>
                <Switch>
                    <Route path="/">
                        <ProfileInformation />
                    </Route>

                    <Route>
                        <ProfileOrderHistory />
                    </Route>
                </Switch>
            </article>
        </main>
    );
};

export default Profile;