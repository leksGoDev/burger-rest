import * as React from 'react';

import doneImg from "../../../../images/done.png";
import styles from "./order-details.module.css";

interface Props {
    orderNum: number;
}

const OrderDetails: React.FC<Props> = ({ orderNum }) => {

    return (
        <figure className={styles.content}>
            <figcaption>
                <p className={`${styles.text} text text_type_digits-large mb-8`}>{orderNum}</p>

                <p className={`${styles.text} text text_type_main-medium`}>идентификатор заказа</p>
            </figcaption>

            <img className="mt-15 mb-15" src={doneImg} alt="image" />

            <figcaption>
                <p className={`${styles.text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>

                <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
            </figcaption>
        </figure>
    );
};

export default OrderDetails;
