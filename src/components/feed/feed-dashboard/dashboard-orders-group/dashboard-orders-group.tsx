import type { FC } from 'react';

import styles from "./dashboard-orders-group.module.css";
import { IOrder, OrderStatus } from "../../../../models/order";

interface IProps {
    type: OrderStatus;
    title: string;
    numbers: IOrder["number"][];
}

const DashboardOrdersGroup: FC<IProps> = ({ type, title, numbers }) => {

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
                                style={{ color: type === OrderStatus.done ? "#00CCCC" : "white" }}
                            >
                                {number}
                            </p>
                        </li>
                    )
                }
            </ol>
        </section>
    );
};

export default DashboardOrdersGroup;
