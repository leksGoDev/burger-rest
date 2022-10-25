import * as React from 'react';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from './burger-ingredients-card.module.css'
import { Ingredient, IngredientType } from "../../../models/ingredient";
import { useAppSelector } from "../../../hooks/redux";
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/content/ingredient-details/ingredient-details";

interface Props {
    ingredient: Ingredient;
}

const BurgerIngredientsCard: React.FC<Props> = ({ ingredient }) => {
    const { _id, type, image, price, name, calories, proteins, fat, carbohydrates, image_large } = ingredient;

    const { bun, stuffing } = useAppSelector(store => store.burgerConstructor);

    const [isModalVisible, setModalVisible] = React.useState(false);

    const [, drag] = useDrag<Ingredient>({
        type: type === IngredientType.bun ? type : 'stuffing',
        item: ingredient
    }, [ingredient]);

    const count = React.useMemo(() => {
        if (type == IngredientType.bun) {
            return bun?._id === _id ? 1 : 0;
        } else {
            return stuffing.reduce((sum, el) => el._id === _id ? ++sum : sum, 0);
        }
    }, [bun, stuffing]);

    return (
        <li>
            <figure
                ref={drag}
                className={styles.content}
                onClick={() => setModalVisible(true)}
            >
                {!!count && <Counter count={count} />}

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