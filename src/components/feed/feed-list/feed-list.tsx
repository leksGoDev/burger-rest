import type { FC } from 'react';

import styles from "./feed-list.module.css";
import { IOrder } from "../../../models/order";
import FeedListCard from "./feed-list-card/feed-list-card";

interface Props {
    orders: IOrder[];
}

const FeedList: FC<Props> = ({ orders }) => {

    return (
        <article className={styles.article}>
            <ol>
                {
                    orders.map(order =>
                        <FeedListCard key={order._id} {...order} />
                    )
                }
            </ol>
        </article>
    );
};

export default FeedList;
