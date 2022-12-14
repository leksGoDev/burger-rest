import { useCallback, } from "react";
import type { FC, ReactNode } from 'react';
import { useLocation } from "react-router-dom";
import type { Location } from "history";

import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks";
import IngredientDetailsArticle from "./ingredient-details-article/ingredient-details-article";

const IngredientDetails: FC = () => {
    const { state } = useLocation<{ background?: Location<unknown> }>();
    const { details } = useAppSelector(store => store.ingredientDetails);

    const createWrapForModal = useCallback(
        (component: ReactNode) => state?.background ?
        <section className={styles.wrap}>
            {component}
        </section>
        : component,
        [state]
    );

    if (!details) {
        return null;
    }

    const { image_large, name, calories, proteins, fat, carbohydrates } = details;

    return (
        <>
            {createWrapForModal(
                <>
                    <header
                        className={styles.header}
                        style={{ justifyContent: state?.background ? "flex-start" : "center" }}
                    >
                        <p className="text text_type_main-large">Детали ингредиента</p>
                    </header>

                    <article>
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
                    </article>
                </>
            )}
        </>
    );
};

export default IngredientDetails;
