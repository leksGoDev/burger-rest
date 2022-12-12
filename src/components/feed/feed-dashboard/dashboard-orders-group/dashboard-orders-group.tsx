import { memo } from "react";
import type { FC } from 'react';

import styles from "./dashboard-orders-group.module.css";
import { FeedOrderStatus } from "../../../../constants/order";
import { IFeedOrder } from "../../../../models/order";

interface IProps {
    type: FeedOrderStatus;
    title: string;
    numbers: IFeedOrder["number"][];
}

const DashboardOrdersGroup: FC<IProps> = memo(({ type, title, numbers }) => {

    return (
        <section className={styles.content}>
            <header>
                <p className="text text_type_main-medium">{title}</p>
            </header>

            <ol className={styles.list}>
                {
                    numbers.slice(0, 10).map((number, index) =>
                        <li key={index}>
                            <p
                                className="text text_type_digits-default"
                                style={{ color: type === FeedOrderStatus.done ? "#00CCCC" : "white" }}
                            >
                                {number}
                            </p>
                        </li>
                    )
                }
            </ol>
        </section>
    );
});

export default DashboardOrdersGroup;
