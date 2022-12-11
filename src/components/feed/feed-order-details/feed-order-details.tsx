import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import type { Location } from "history";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./feed-order-details.module.css";
import { useAppSelector } from "../../../hooks";
import CostCounter from "../../cost-counter/cost-counter";
import FeedDetailsRow from "./feed-details-row/feed-details-row";

const FeedOrderDetails: FC = () => {
    const { state } = useLocation<{ background?: Location<unknown> }>();
    const details =
        {
            "60d3b41abdacab0026a733c7": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Флюоресцентная булка R2-D3"
                }
            },
            "60d3b41abdacab0026a733c1": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Флюоресцентная булка R2-D3"
                }
            },
            "60d3b41abdacab0026a733c2": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Флюоресцентная булка R2-D3"
                }
            },
            "60d3b41abdacab0026a733c3": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Филе Люминесцентного тетраодонтимформа"
                }
            },
            "60d3b41abdacab0026a733c4": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Флюоресцентная булка R2-D3"
                }
            },
            "60d3b41abdacab0026a733c5": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Флюоресцентная булка R2-D3"
                }
            },
            "60d3b41abdacab0026a733c6": {
                count: 2,
                details: {
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    price: 988,
                    name: "Флюоресцентная булка R2-D3"
                }
            }
        }

        //useAppSelector(store => store.feedOrderDetails);

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

    // @ts-ignore
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

                    <article className="mt-5 mb-15">
                        <p className="text text_type_main-medium mb-2">
                            Black Hole Singularity острый бургер
                        </p>
                        <p className="text text_type_main-default" style={{ color: "#00CCCC" }}>
                            Выполнен
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
                                Object.values(details).map((entry, index) =>
                                    <FeedDetailsRow details={entry.details} count={entry.count} />
                                )
                            }
                        </ol>
                    </section>

                    <footer className={styles.footer}>
                        <p className="text text_type_main-default text_color_inactive">
                            Вчера, 13:50
                        </p>

                        <CostCounter value={510} />
                    </footer>
                </>
            )}
        </>
    );
};

export default FeedOrderDetails;
