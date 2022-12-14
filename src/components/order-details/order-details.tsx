import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import type { Location } from "history";

import stroke from "../../images/doneIcon/stroke.svg";
import layout1 from "../../images/doneIcon/layout1.svg";
import layout2 from "../../images/doneIcon/layout2.svg";
import layout3 from "../../images/doneIcon/layout3.svg";
import styles from "./order-details.module.css";
import { useAppSelector } from "../../hooks";

const OrderDetails: FC = () => {
    const { orderNumber } = useAppSelector(store => store.orderDetailsApi);
    const { state } = useLocation<{ background?: Location<unknown> }>();

    const createWrapForModal = useCallback(
        (component: ReactNode) => state?.background ?
            <section className={styles.wrap}>
                {component}
            </section>
            : component,
        [state]
    );

    if (!orderNumber) {
        return null;
    }

    return (
        <>
            {createWrapForModal(
                <>
                    <article className={styles.article}>
                        <p className={`${styles.number} text text_type_digits-large`}>{orderNumber}</p>

                        <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>

                        <figure className={styles.iconWrap}>
                            <div style={{ opacity: state?.background ? .5 : 1 }}>
                                <img className={styles.iconLayout} src={layout1} alt="image" />
                                <img className={styles.iconLayout} src={layout2} alt="image" />
                                <img className={styles.iconLayout} src={layout3} alt="image" />
                            </div>
                            <img className={styles.iconStroke} src={stroke} alt="image" />
                        </figure>
                    </article>

                    <aside className="mt-15">
                        <p className={`${styles.asideText} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>

                        <p className={`${styles.asideText} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
                    </aside>
                </>
            )}
        </>
    )
};

export default OrderDetails;
