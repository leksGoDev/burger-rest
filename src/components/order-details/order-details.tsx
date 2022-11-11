import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import type { Location } from "history";

import doneImg from "../../images/done.png";
import styles from "./order-details.module.css";
import { useAppSelector } from "../../hooks";

const OrderDetails: FC = () => {
    const { data } = useAppSelector(store => store.orderDetailsApi);
    const { state } = useLocation<{ background?: Location<unknown> }>();

    const createWrapForModal = useCallback(
        (component: ReactNode) => state?.background ?
            <section className={styles.wrap}>
                {component}
            </section>
            : component,
        [state]
    );

    if (!data) {
        return null;
    }

    return (
        <>
            {createWrapForModal(
                <>
                    <main className={styles.main}>
                        <p className="text text_type_digits-large mb-8">{data.order.number}</p>

                        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

                        <img src={doneImg} alt="image" />
                    </main>

                    <footer className="mt-15">
                        <p className={`${styles.text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>

                        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
                    </footer>
                </>
            )}
        </>
    )
};

export default OrderDetails;
