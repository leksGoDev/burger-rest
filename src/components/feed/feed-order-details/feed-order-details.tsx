import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import type { Location } from "history";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./feed-order-details.module.css";
import { FeedOrderStatus, FeedOrderStatusView } from "../../../constants/order";
import { useAppSelector } from "../../../hooks";
import CostCounter from "../../cost-counter/cost-counter";
import FeedDetailsRow from "./feed-details-row/feed-details-row";

const FeedOrderDetails: FC = () => {
    const { state } = useLocation<{ background?: Location<unknown> }>();
    const { details } = useAppSelector(store => store.feedOrderDetails);

    const createWrapForModal = useCallback(
        (component: ReactNode) => state?.background ?
            <section className={styles.wrap}>
                {component}
            </section>
            : component,
        [state]
    );

    if (!details) {
        return null;
    }

    const { status, name, number, createdAt, totalCost, ingredients } = details;

    return (
        <>
            {createWrapForModal(
                <>
                    <header
                        className={styles.header}
                        style={{ justifyContent: state?.background ? "flex-start" : "center" }}
                    >
                        <p className="text text_type_digits-default">{`#${number}`}</p>
                    </header>

                    <article className={styles.article}>
                        <p className={`${styles.name} text text_type_main-medium mb-2`}>
                            {name}
                        </p>
                        <p
                            className="text text_type_main-default"
                            style={{ color: status === FeedOrderStatus.done ? "#00CCCC" : "FFFFF" }}
                        >
                            {FeedOrderStatusView[status]}
                        </p>
                    </article>

                    <section className="mb-10">
                        <header className="mb-6">
                            <p className="text text_type_main-medium">
                                Состав:
                            </p>
                        </header>

                        <ol className={styles.list}>
                            {
                                Object.values(ingredients).map((ingredient, index) =>
                                    <FeedDetailsRow key={index} details={ingredient.details} count={ingredient.count} />
                                )
                            }
                        </ol>
                    </section>

                    <footer className={styles.footer}>
                        <FormattedDate
                            className="text text_type_main-default text_color_inactive"
                            date={new Date(createdAt)}
                        />

                        <CostCounter value={totalCost} />
                    </footer>
                </>
            )}
        </>
    );
};

export default FeedOrderDetails;
