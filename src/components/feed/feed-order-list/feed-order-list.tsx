import type { FC } from 'react';

import styles from "./feed-order-list.module.css";
import { IFeedOrder } from "../../../models/order";
import FeedOrderListCard from "./feed-order-list-card/feed-order-list-card";

interface Props {
    orders: IFeedOrder[];
}

const FeedOrderList: FC<Props> = ({ orders }) => {

    return (
        <article className={styles.article}>
            <ol className={styles.list}>
                {
                    orders.map((order, index) =>
                        <FeedOrderListCard key={index} {...order} />
                    )
                }
            </ol>
        </article>
    );
};

export default FeedOrderList;
