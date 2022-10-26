import * as React from 'react';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from './burger-ingredients-card.module.css'
import { Ingredient, IngredientType } from "../../../models/ingredient";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { closeDetails, openDetails } from "../../../services/store/slices/ingredientDetailsSlice";
import Modal from "../../modal/modal";
import IngredientDetails from "../../modal/content/ingredient-details/ingredient-details";

interface Props {
    ingredient: Ingredient;
}

const BurgerIngredientsCard: React.FC<Props> = ({ ingredient }) => {
    const { _id, type, image, price, name, calories, proteins, fat, carbohydrates, image_large } = ingredient;

    const dispatch = useAppDispatch();

    const { bun, stuffing, details } = useAppSelector(
        store => ({ ...store.burgerConstructor, ...store.ingredientDetails})
    );

    const [, drag] = useDrag<Ingredient>({
        type: type === IngredientType.bun ? type : 'stuffing',
        item: {...ingredient}
    }, [ingredient]);

    const count = React.useMemo(() => {
        if (type == IngredientType.bun) {
            return bun?._id === _id ? 1 : 0;
        } else {
            return stuffing.reduce((sum, el) => el._id === _id ? ++sum : sum, 0);
        }
    }, [bun, stuffing]);

    const handleOpenDetails = React.useCallback(
        () => dispatch(
            openDetails({ image_large, name, calories, proteins, fat, carbohydrates })
        ), [dispatch]);

    const handleCloseDetails = React.useCallback(
        () => dispatch(
            closeDetails()
        ), [dispatch]);

    return (
        <li>
            <figure
                ref={drag}
                className={styles.content}
                onClick={handleOpenDetails}
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

            {details &&
                <Modal title="Детали ингредиента" onClose={handleCloseDetails}>
                    <IngredientDetails />
                </Modal>}
        </li>
    );
};

export default BurgerIngredientsCard;