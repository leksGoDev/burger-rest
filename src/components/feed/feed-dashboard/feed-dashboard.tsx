import type { FC } from 'react';

import styles from "./feed-dashboard.module.css";
import { IFeedData, OrderStatus } from "../../../models/order";
import DashboardCounter from "./dashboard-counter/dashboard-counter";
import DashboardOrdersGroup from "./dashboard-orders-group/dashboard-orders-group";

interface IProps {
    data: IFeedData;
}

const FeedDashboard: FC<IProps> = ({ data }) => {

    return (
        <article className={styles.article}>
            <div className={styles.orders}>
                <DashboardOrdersGroup
                    type={OrderStatus.done}
                    title="Готовы:"
                    numbers={data.orders.map(({ number }) => number)}
                />

                <DashboardOrdersGroup
                    type={OrderStatus.pending}
                    title="В работе:"
                    numbers={data.orders.map(({ number }) => number)}
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
