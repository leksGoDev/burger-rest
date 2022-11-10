import { useEffect } from "react";
import type { FC } from 'react';
import { useLocation, useParams } from "react-router-dom";
import type { Location } from "history";

import styles from "./ingredient-details.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks";
import IngredientDetailsArticle from "./ingredient-details-article/ingredient-details-article";
import { setDetails } from "../../services/store/slices/ingredient-details";

const IngredientDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation<{ background?: Location<unknown> }>();
    const { hasDeallocated, details, data } = useAppSelector(
        store => ({ ...store.ingredientDetails, ...store.ingredientsApi })
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!details && !hasDeallocated) {
            const ingredient = data.find(entry => entry._id === id);
            if (ingredient) {
                const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;
                dispatch(
                    setDetails({ image_large, name, calories, proteins, fat, carbohydrates })
                );
            }
        }
    }, [hasDeallocated, details, data, state, id, dispatch]);

    if (!details) {
        return null;
    }

    const { image_large, name, calories, proteins, fat, carbohydrates } = details;

    return (
        <>
            <header
                className={styles.header}
                style={{ justifyContent: state?.background ? "flex-start" : "center" }}
            >
                <p className="text text_type_main-large">Детали ингредиента</p>
            </header>

            <main>
                <figure className={styles.figure}>
                    <img className="pl-5 pr-5 mb-4" src={image_large} alt="image" />

                    <figcaption className="mb-8">
                        <p className={`${styles.name} text text_type_main-medium`}>{name}</p>
                    </figcaption>

                    <figcaption className={styles.stats}>
                        <IngredientDetailsArticle name="Калории,ккал" value={calories} width={120} />

                        <IngredientDetailsArticle name="Белки, г" value={proteins} width={112} />

                        <IngredientDetailsArticle name="Жиры, г" value={fat} width={112} />

                        <IngredientDetailsArticle name="Углеводы, г" value={carbohydrates} width={112} />
                    </figcaption>
                </figure>
            </main>
        </>
    );
};

export default IngredientDetails;
