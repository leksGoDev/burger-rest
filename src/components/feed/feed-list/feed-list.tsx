import type { FC } from 'react';

import styles from "./feed-list.module.css";
import { IFeedOrder } from "../../../models/order";
import FeedListCard from "./feed-list-card/feed-list-card";

interface Props {
    orders: IFeedOrder[];
}

const FeedList: FC<Props> = ({ orders }) => {

    return (
        <article className={styles.article}>
            <ol className={styles.list}>
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
