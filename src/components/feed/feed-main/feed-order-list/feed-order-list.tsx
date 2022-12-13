import type { FC } from 'react';
import { useLocation } from "react-router-dom";

import styles from "./feed-order-list.module.css";
import { SocketStoreName } from "../../../../constants/redux";
import FeedOrderListCard from "./feed-order-list-card/feed-order-list-card";
import { useSocketLastMessage } from "../../../../hooks";

const FeedOrderList: FC = () => {
    const { pathname } = useLocation();
    const data = useSocketLastMessage(
        pathname.indexOf("feed") !== -1 ?
            SocketStoreName.feed
            : SocketStoreName.history
    );

    return (
        <ol className={pathname.indexOf("feed") !== -1 ? styles.inFeed : styles.inProfile}>
            {
                data.orders.map((order, index) =>
                    <FeedOrderListCard key={index} {...order} />
                )
            }
        </ol>
    );
};

export default FeedOrderList;
