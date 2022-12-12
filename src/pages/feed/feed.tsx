import { useEffect } from "react";
import type { FC } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { WS_BASE_URL } from "../../constants/api";
import FeedMain from "../../components/feed/feed-main/feed-main";
import FeedOrder from "./feed-order/feed-order";
import { useAppDispatch } from "../../hooks";
import { startSocket } from "../../services/store/slices/api/feed-socket-api";

const Feed: FC = () => {
    const dispatch = useAppDispatch();
    const { url } = useRouteMatch();

    useEffect(() => {
        dispatch(startSocket(`${WS_BASE_URL}/all`));
    }, [dispatch]);

    return (
        <Switch>
            <Route exact path={url} component={FeedMain}/>

            <Route exact path={`${url}/:id`} component={FeedOrder} />
        </Switch>
    );
};

export default Feed;
