import type { FC } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import FeedMain from "../../components/feed/feed-main/feed-main";
import FeedOrder from "./feed-order/feed-order";

const Feed: FC = () => {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={url} component={FeedMain}/>

            <Route exact path={`${url}/:id`} component={FeedOrder} />
        </Switch>
    );
};

export default Feed;
