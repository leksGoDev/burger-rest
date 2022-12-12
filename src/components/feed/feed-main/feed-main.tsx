import type { FC } from 'react';

import styles from "./feed-main.module.css";
import FeedOrderList from "../feed-order-list/feed-order-list";
import FeedDashboard from "../feed-dashboard/feed-dashboard";

const FeedMain: FC = () => {

    return (
        <section className={styles.wrap}>
            <header className="mt-10 mb-5">
                <p className="text text_type_main-large">
                    Лента заказов
                </p>
            </header>

            <main className={styles.main}>
                <FeedOrderList />
                <FeedDashboard />
            </main>
        </section>
    );
};

export default FeedMain;
