import { useMemo } from "react";
import type { FC } from 'react';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./feed-list-card.module.css";
import { IFeedOrder } from "../../../../models/order";
import IngredientsIcons from "./ingredients-icons/ingredients-icons";
import { useAppSelector } from "../../../../hooks";
import { IngredientType } from "../../../../models/ingredient";

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
        () => ingredientsInfo.map(ingredient => ingredient?.image)
        , [ingredientsInfo]
    );
    return (
        <li className={styles.wrap}>
            <article className={styles.content}>
                <div className={styles.numAndDate}>
                    <p className="text text_type_digits-default">
                        {`#${number}`}
                    </p>

                    <FormattedDate
                        className="text text_type_main-default text_color_inactive"
                        date={new Date(createdAt)}
                    />
                </div>

                <div className={styles.name}>
                    <p className="text text_type_main-medium">
                        {name}
                    </p>
                </div>

                <div className={styles.imgAndCost}>
                    <IngredientsIcons icons={ingredientsIcons} />

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
