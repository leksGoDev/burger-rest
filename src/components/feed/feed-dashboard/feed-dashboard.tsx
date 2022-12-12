import { useCallback } from "react";
import type { FC } from 'react';

import styles from "./feed-dashboard.module.css";
import { FeedOrderStatus } from "../../../constants/order";
import DashboardCounter from "./dashboard-counter/dashboard-counter";
import DashboardOrdersGroup from "./dashboard-orders-group/dashboard-orders-group";
import { useSocketLastMessage } from "../../../hooks";

const FeedDashboard: FC = () => {
    const data = useSocketLastMessage();
    const getOrdersNums = useCallback(
        (statusType: FeedOrderStatus) => data.orders
            .filter(({ status }) => status === statusType)
            .map(({ number }) => number)
        , [data]
    );

    return (
        <article className={styles.article}>
            <div className={styles.orders}>
                <DashboardOrdersGroup
                    type={FeedOrderStatus.done}
                    title="Готовы:"
                    numbers={getOrdersNums(FeedOrderStatus.done)}
                />

                <DashboardOrdersGroup
                    type={FeedOrderStatus.pending}
                    title="В работе:"
                    numbers={getOrdersNums(FeedOrderStatus.pending)}
                />
            </div>


            <DashboardCounter
                title="Выполнено за все время:"
                count={data.total}
            />

            <DashboardCounter
                title="Выполнено за сегодня:"
                count={data.totalToday}
            />
        </article>
    );
};

export default FeedDashboard;
