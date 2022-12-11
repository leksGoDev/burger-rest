import { memo } from "react";
import type { FC } from 'react';

import styles from "./cost-counter.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    count: number;

    large?: boolean;
}

const CostCounter: FC<IProps> = memo(({ count, large }) => {

    return (
        <article className={styles.content}>
            <p className={`text ${large ? "text_type_digits-medium" : "text_type_digits-default"}`}>
                {count}
            </p>

            <span className={large ? styles.svgLarge : styles.svgDefault}>
                <CurrencyIcon type="primary" />
            </span>
        </article>
    );
});

export default CostCounter;
