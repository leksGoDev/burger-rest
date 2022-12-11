import type { FC } from 'react';

import styles from "./feed.module.css";
import FeedOrderList from "../../components/feed/feed-order-list/feed-order-list";
import FeedDashboard from "../../components/feed/feed-dashboard/feed-dashboard";
import { IFeedData, FeedOrderStatus } from "../../models/order";

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
                status: FeedOrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d4",
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce"
                ]
            },
            {
                _id: "6390b40199a25c001cd64f1b",
                number: "034535",
                name: "Бессмертный флюоресцентный бургер",
                createdAt: "2022-12-07T14:43:22.587Z",
                updatedAt: "2022-12-07T14:43:22.587Z",
                status: FeedOrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d4",
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce"
                ]
            },
            {
                _id: "6390b40199a25c001cd64f1b",
                number: "034535",
                name: "Бессмертный флюоресцентный бургер",
                createdAt: "2022-12-07T14:43:22.587Z",
                updatedAt: "2022-12-07T14:43:22.587Z",
                status: FeedOrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d4",
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce"
                ]
            },{
                _id: "6390b40199a25c001cd64f1b",
                number: "034535",
                name: "Бессмертный флюоресцентный бургер",
                createdAt: "2022-12-07T14:43:22.587Z",
                updatedAt: "2022-12-07T14:43:22.587Z",
                status: FeedOrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d4",
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce"
                ]
            }, {
                _id: "6390b40199a25c001cd64f1b",
                number: "034535",
                name: "Бессмертный флюоресцентный бургер",
                createdAt: "2022-12-07T14:43:22.587Z",
                updatedAt: "2022-12-07T14:43:22.587Z",
                status: FeedOrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d4",
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce"
                ]
            },
            {
                _id: "6390b40199a25c001cd64f1b",
                number: "034535",
                name: "Бессмертный флюоресцентный бургер",
                createdAt: "2022-12-07T14:43:22.587Z",
                updatedAt: "2022-12-07T14:43:22.587Z",
                status: FeedOrderStatus.done,
                ingredients: [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733d2",
                    "60d3b41abdacab0026a733d0",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d4",
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
        <section className={styles.wrap}>
            <header className="mt-10 mb-5">
                <p className="text text_type_main-large">
                    Лента заказов
                </p>
            </header>

            <main className={styles.main}>
                <FeedOrderList orders={data.orders} />
                <FeedDashboard data={data} />
            </main>
        </section>
    );
};

export default Feed;
