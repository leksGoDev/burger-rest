import { memo } from "react";
import type { FC } from 'react';

import styles from "./dashboard-counter.module.css";

interface IProps {
    title: string;
    count: number;
}

const DashboardCounter: FC<IProps> = memo(({ title, count }) => {

    return (
        <section>
            <header>
                <p className="text text_type_main-medium">{title}</p>
            </header>

            <article>
                <p className={`${styles.text} text text_type_digits-large`}>
                    {count.toLocaleString('ru')}
                </p>
            </article>
        </section>
    );
});

export default DashboardCounter;
