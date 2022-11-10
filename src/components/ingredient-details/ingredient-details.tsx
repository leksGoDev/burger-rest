import * as React from 'react';

import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../hooks";
import IngredientDetailsArticle from "./ingredient-details-article/ingredient-details-article";

const IngredientDetails: React.FC = () => {
    const { details } = useAppSelector(store => store.ingredientDetails);

    if (!details) {
        return null;
    }

    const { image_large, name, calories, proteins, fat, carbohydrates } = details;

    return (
        <>
            <header className={styles.header}>
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
