import type { FC } from 'react';

import styles from "./feed.module.css";
import FeedList from "../../components/feed/feed-list/feed-list";
import FeedDashboard from "../../components/feed/feed-dashboard/feed-dashboard";
import { IFeedData, OrderStatus } from "../../models/order";

const Feed: FC = () => {
    const data: IFeedData = {
        total: 28752,
        totalToday: 138,
        orders: [
            {
                _id: "6390b40199a25c001cd64f1b",
                number: "034535",
                name: "Бессмертный флюоресцентный бургер",
                createdAt: "2022-12-07T14:43:22.587Z",
                updatedAt: "2022-12-07T14:43:22.587Z",
                status: OrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce"
                ]
            }
        ]
    };

    return (
        <section className={styles.section}>
            <header className="mt-10 mb-5">
                <p className="text text_type_main-large">
                    Лента заказов
                </p>
            </header>

            <main className={styles.main}>
                <FeedList orders={data.orders} />
                <FeedDashboard />
            </main>
        </section>
    );
};

export default Feed;
