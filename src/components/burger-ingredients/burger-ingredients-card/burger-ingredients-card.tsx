import * as React from 'react';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from './burger-ingredients-card.module.css'
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/content/ingredient-details/ingredient-details";
import { Ingredient, IngredientType } from "../../../models/ingredient";

interface Props {
    ingredient: Ingredient;
    count?: number;
}

interface DragItem {
    id: Ingredient["_id"];
}

const BurgerIngredientsCard: React.FC<Props> = ({ ingredient, count }) => {
    const { _id, image, price, name, calories, proteins, fat, carbohydrates, image_large } = ingredient;
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [, drag] = useDrag<DragItem, null, null>({
        type: 'ingredient',
        item: { id: _id }
    });

    return (
        <li ref={drag}>
            <figure className={styles.content} onClick={() => setModalVisible(true)}>
                {count && <Counter count={count} />}

                <img className="pl-4 pr-4" src={image} alt="image" />

                <figcaption className={styles.price}>
                    <p className="text text_type_digits-default pr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </figcaption>

                <figcaption>
                    <p className={`${styles.name} text text_type_main-default pb-6`}>{name}</p>
                </figcaption>
            </figure>

            {isModalVisible &&
                <Modal title="Детали ингредиента" onClose={() => setModalVisible(false)}>
                    <IngredientDetails
                        image={image_large}
                        name={name}
                        calories={calories}
                        proteins={proteins}
                        fat={fat}
                        carbohydrates={carbohydrates}
                    />
                </Modal>}
        </li>
    );
};

export default BurgerIngredientsCard;