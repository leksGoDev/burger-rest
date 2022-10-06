import * as React from 'react';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients-card.module.css'

interface Props {
    image: string;
    price: number;
    name: string;
    count?: number;
}

const BurgerIngredientsCard: React.FC<Props> = ({ image, price, name, count }) => {

    return (
        <li>
            <figure className={styles.content}>
                {count && <Counter count={count} />}

                <img className="pl-4 pr-4" src={image} alt={image} />

                <figcaption className={styles.price}>
                    <p className="text text_type_digits-default pr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </figcaption>

                <figcaption>
                    <p className={`${styles.name} text text_type_main-default pb-6`}>{name}</p>
                </figcaption>
            </figure>
        </li>
    );
};

export default BurgerIngredientsCard;