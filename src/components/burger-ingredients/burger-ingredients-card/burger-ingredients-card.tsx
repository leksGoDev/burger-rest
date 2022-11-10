import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from './burger-ingredients-card.module.css'
import { Ingredient, IngredientType } from "../../../models/ingredient";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { closeDetails, openDetails } from "../../../services/store/slices/ingredient-details";

interface Props {
    ingredient: Ingredient;
}

const BurgerIngredientsCard: React.FC<Props> = ({ ingredient }) => {
    const { _id, type, image, price, name, calories, proteins, fat, carbohydrates, image_large } = ingredient;

    const location = useLocation();
    const dispatch = useAppDispatch();

    const { bun, stuffing } = useAppSelector(store => store.burgerConstructor);

    const [, drag] = useDrag<Ingredient>({
        type: type === IngredientType.bun ? type : 'stuffing',
        item: {...ingredient}
    }, [ingredient]);

    const count = React.useMemo(() => {
        if (type === IngredientType.bun) {
            return bun?._id === _id ? 2 : 0;
        } else {
            return stuffing.reduce((sum, el) => el._id === _id ? ++sum : sum, 0);
        }
    }, [type, _id, bun, stuffing]);

    const handleOpenDetails = React.useCallback(
        () => dispatch(
            openDetails({ image_large, name, calories, proteins, fat, carbohydrates })
        ), [image_large, name, calories, proteins, fat, carbohydrates, dispatch]);

    return (
        <Link to={{
            pathname: `/ingredients/${_id}`,
            state: {
                background: location
            }
        }}>
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
            </li>
        </Link>
    );
};

export default BurgerIngredientsCard;