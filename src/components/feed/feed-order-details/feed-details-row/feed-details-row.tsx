import type { FC } from 'react';

import styles from "./feed-details-row.module.css";
import IngredientIcon from "../../ingredient-icon/ingredient-icon";
import CostCounter from "../../../cost-counter/cost-counter";
import { IFeedOrderIngredient } from "../../../../models/order";

const FeedDetailsRow: FC<IFeedOrderIngredient> = ({ count, details }) => {
    const { image, price, name } = details;

    return (
        <li className={styles.content}>
            <figure className={styles.figure}>
                <IngredientIcon src={image} />

                <figcaption className={styles.name}>
                    <p className="text text_type_main-default">
                        {name}
                    </p>
                </figcaption>
            </figure>

            <CostCounter value={`${count} x ${price}`} />
        </li>
    );
};

export default FeedDetailsRow;
