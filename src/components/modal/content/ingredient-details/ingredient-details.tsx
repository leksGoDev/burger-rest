import * as React from 'react';

import styles from "./ingredient-details.module.css";
import { useAppSelector } from "../../../../hooks/redux";
import IngredientDetailsSection from "./ingredient-details-section/ingredient-details-section";


const IngredientDetails: React.FC = () => {
    const { details } = useAppSelector(store => store.ingredientDetails);
    const { image_large, name, calories, proteins, fat, carbohydrates } = details!;

    return (
        <figure className={styles.content}>
            <img className="pl-5 pr-5 mb-4" src={image_large} alt="image" />

            <figcaption>
                <p className={`${styles.name} text text_type_main-medium mb-8`}>{name}</p>
            </figcaption>

            <figcaption className={styles.stats}>
                <IngredientDetailsSection name="Калории,ккал" value={calories} width={120} />

                <IngredientDetailsSection name="Белки, г" value={proteins} width={112} />

                <IngredientDetailsSection name="Жиры, г" value={fat} width={112} />

                <IngredientDetailsSection name="Углеводы, г" value={carbohydrates} width={112} />
            </figcaption>
        </figure>
    );
};

export default IngredientDetails;
