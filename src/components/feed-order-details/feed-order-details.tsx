import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import { Location } from "history";

import styles from "./feed-order-details.module.css";
import { useAppSelector } from "../../hooks";

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

   /* if (!details) {
        return null;
    }*/

    return (
        <>
            {createWrapForModal(
                <>
                    <header
                        className={styles.header}
                        style={{ justifyContent: state?.background ? "flex-start" : "center" }}
                    >
                        <p className="text text_type_digits-default">#034533</p>
                    </header>

                    <article className="mt-5">
                        <p className="text text_type_main-medium mb-2">
                            Black Hole Singularity острый бургер
                        </p>
                        <p className="text text_type_main-default" style={{ color: "#00CCCC" }}>
                            Выполнен
                        </p>
                    </article>

                    <section>
                        <header>

                        </header>

                        <ol>

                        </ol>
                    </section>

                    <footer>

                    </footer>
                </>
            )}
        </>
    );
};

export default FeedOrderDetails;
