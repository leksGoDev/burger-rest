import type { FC } from 'react';
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-list-card.module.css";
import { IOrder } from "../../../../models/order";
import IngredientsIcons from "./ingredients-icons/ingredients-icons";

interface IProps extends IOrder {

}

const FeedListCard: FC<IProps> = ({ number, name, createdAt, ingredients  }) => {

    return (
        <li>
            <div className={styles.content}>
                <article className={styles.header}>
                    <p className="text text_type_digits-default">
                        {`#${number}`}
                    </p>

                    <FormattedDate
                        className="text text_type_main-default text_color_inactive"
                        date={new Date(createdAt)}
                    />
                </article>

                <article className={styles.name}>
                    <p className="text text_type_main-medium">
                        {name}
                    </p>
                </article>

                <article className={styles.imgAndCost}>
                    <IngredientsIcons ids={ingredients} />
                </article>
            </div>
        </li>
    );
};

export default FeedListCard;
