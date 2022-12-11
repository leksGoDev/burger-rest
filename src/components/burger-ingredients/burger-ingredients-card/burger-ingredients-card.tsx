import { useMemo, useCallback } from "react";
import type { FC } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import styles from './burger-ingredients-card.module.css'
import { IIngredient, IngredientType } from "../../../models/ingredient";
import CostCounter from "../../cost-counter/cost-counter";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { setIngredientDetails } from "../../../services/store/slices/ingredient-details";

interface IProps {
    ingredient: IIngredient;
}

const BurgerIngredientsCard: FC<IProps> = ({ ingredient }) => {
    const { _id, type, image, price, name, calories, proteins, fat, carbohydrates, image_large } = ingredient;

    const location = useLocation();
    const dispatch = useAppDispatch();

    const { bun, stuffing } = useAppSelector(store => store.burgerConstructor);

    const [, drag] = useDrag<IIngredient>({
        type: type === IngredientType.bun ? type : 'stuffing',
        item: {...ingredient}
    }, [ingredient]);

    const count = useMemo(() => {
        if (type === IngredientType.bun) {
            return bun?._id === _id ? 2 : 0;
        } else {
            return stuffing.reduce((sum, el) => el._id === _id ? ++sum : sum, 0);
        }
    }, [type, _id, bun, stuffing]);

    const handleOpenDetails = useCallback(
        () => dispatch(
            setIngredientDetails({ image_large, name, calories, proteins, fat, carbohydrates })
        ), [image_large, name, calories, proteins, fat, carbohydrates, dispatch]);

    return (
        <li>
            <Link to={{
                pathname: `/ingredients/${_id}`,
                state: { background: location }
            }}>
                <figure
                    ref={drag}
                    className={styles.content}
                    onClick={handleOpenDetails}
                >
                    {!!count && <Counter count={count} />}

                    <img className="pl-4 pr-4" src={image} alt="image" />

                    <figcaption>
                        <CostCounter value={price} />
                    </figcaption>

                    <figcaption>
                        <p className={`${styles.name} text text_type_main-default pb-6`}>{name}</p>
                    </figcaption>
                </figure>
            </Link>
        </li>
    );
};

export default BurgerIngredientsCard;