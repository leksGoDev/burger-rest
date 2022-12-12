import type { FC } from 'react';

import styles from "./feed-order-list.module.css";
import FeedOrderListCard from "./feed-order-list-card/feed-order-list-card";
import { useSocketLastMessage } from "../../../hooks";

const FeedOrderList: FC = () => {
    const data = useSocketLastMessage();

    return (
        <article className={styles.article}>
            <ol className={styles.list}>
                {
                    data.orders.map((order, index) =>
                        <FeedOrderListCard key={index} {...order} />
                    )
                }
            </ol>
        </article>
    );
};

export default FeedOrderList;
