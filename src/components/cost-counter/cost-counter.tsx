import { memo } from "react";
import type { FC } from 'react';

import styles from "./cost-counter.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    value: string | number;

    large?: boolean;
}

const CostCounter: FC<IProps> = memo(({ value, large }) => {

    return (
        <article className={styles.content}>
            <p className={`text ${large ? "text_type_digits-medium" : "text_type_digits-default"}`}>
                {value}
            </p>

            <span className={large ? styles.svgLarge : styles.svgDefault}>
                <CurrencyIcon type="primary" />
            </span>
        </article>
    );
});

export default CostCounter;
