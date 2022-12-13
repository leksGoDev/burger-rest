import type { FC } from 'react';

import styles from "./feed-order-list.module.css";
import FeedOrderListCard from "./feed-order-list-card/feed-order-list-card";
import { useSocketLastMessage } from "../../../../hooks";

const FeedOrderList: FC = () => {
    const data = useSocketLastMessage();

    return (
        <ol className={styles.content}>
            {
                data.orders.map((order, index) =>
                    <FeedOrderListCard key={index} {...order} />
                )
            }
        </ol>
    );
};

export default FeedOrderList;
