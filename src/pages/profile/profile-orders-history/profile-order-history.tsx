import { useEffect } from "react";
import type { FC } from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { WS_BASE_URL } from "../../../constants/api";
import FeedOrderList from "../../../components/feed/feed-main/feed-order-list/feed-order-list";
import { useAppDispatch } from "../../../hooks";
import { getCookie } from "../../../services/api/cookie";
import { startSocket, stopSocket } from "../../../services/store/slices/history-socket-api/history-socket-api";
import FeedOrder from "../../feed/feed-order/feed-order";

const ProfileOrderHistory: FC = () => {
    const { url } = useRouteMatch();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(startSocket(`${WS_BASE_URL}?token=${accessToken}`));

        return () => {
            dispatch(stopSocket());
        };
    }, [dispatch]);

    return (
        <Switch>
            <Route exact path={url}>
                <div style={{ marginTop: "44px" }}>
                    <FeedOrderList />
                </div>
            </Route>

            <Route exact path={`${url}/:id`} component={FeedOrder} />
        </Switch>
    );
};

export default ProfileOrderHistory;
