import { useMemo } from "react";
import type { FC } from 'react';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./feed-list-card.module.css";
import { IFeedOrder } from "../../../../models/order";
import IngredientIcon from "../../ingredient-icon/ingredient-icon";
import { useAppSelector } from "../../../../hooks";

interface IProps extends IFeedOrder {

}

const FeedListCard: FC<IProps> = ({ number, name, createdAt, ingredients  }) => {
    const { data: ingredientsAll } = useAppSelector(store => store.ingredientsApi);

    const ingredientsInfo = useMemo(
        () => ingredients.map(id =>
            ingredientsAll.find(({ _id }) => _id === id)
        ), [ingredients, ingredientsAll]
    );

    const totalCost = useMemo(
        () => ingredientsInfo.reduce((acc, curr) => curr ? (curr.price + acc) : acc, 0)
        , [ingredientsInfo]);

    const ingredientsIcons = useMemo(
        () =>
            ingredientsInfo
                .slice(0, 6)
                .map((ingredient, index) =>
                    <span
                        key={index}
                        className={styles.iconWrap}
                        style={{ zIndex: ingredientsInfo.length - index }}
                    >
                        <IngredientIcon
                            src={ingredient?.image}
                            opacity={index === 5 ? .6 : 1}
                        />

                        {
                            index === 5 &&
                                <p className={`${styles.counter} text text_type_main-default`}>
                                    +{ingredientsInfo.length - 5}
                                </p>
                        }
                    </span>
            )
        , [ingredientsInfo]
    );

    return (
        <li className={styles.wrap}>
            <article className={styles.content}>
                <div className={styles.placement}>
                    <p className="text text_type_digits-default">
                        {`#${number}`}
                    </p>

                    <FormattedDate
                        className="text text_type_main-default text_color_inactive"
                        date={new Date(createdAt)}
                    />
                </div>

                <div className={styles.placement}>
                    <p className="text text_type_main-medium">
                        {name}
                    </p>
                </div>

                <div className={styles.placement}>
                    <article className={styles.iconsRow}>
                        {ingredientsIcons}
                    </article>

                    <article className={styles.cost}>
                        <p className="text text_type_digits-default">
                            {totalCost}
                        </p>

                        <CurrencyIcon type="primary" />
                    </article>
                </div>
            </article>
        </li>
    );
};

export default FeedListCard;
