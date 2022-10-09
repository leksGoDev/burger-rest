import * as React from 'react';

import styles from "./ingredient-details.module.css";
import { Ingredient } from "../../../../models/ingredient";

interface Props {
    image: Ingredient["image_large"];
    name: Ingredient["name"];
    calories: Ingredient["calories"];
    proteins: Ingredient["proteins"];
    fat: Ingredient["fat"];
    carbohydrates: Ingredient["carbohydrates"];
}

const IngredientDetails: React.FC<Props> = ({ image, name, calories, proteins, fat, carbohydrates }) => {

    return (
        <figure className={styles.content}>
            <img className="pl-5 pr-5 mb-4" src={image} alt={image} />

            <figcaption>
                <p className={`${styles.name} text text_type_main-medium mb-8`}>{name}</p>
            </figcaption>

            <figcaption className={styles.stats}>
                <section className={styles.statsSection} style={{ width: "120px" }}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {calories}
                    </p>
                </section>

                <section className={styles.statsSection} style={{ width: "112px" }}>
                    <p className="text text_type_main-default text_color_inactive ">
                        Белки, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive ">
                        {proteins}
                    </p>
                </section>

                <section className={styles.statsSection} style={{ width: "112px" }}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {fat}
                    </p>
                </section>

                <section className={styles.statsSection} style={{ width: "112px" }}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {carbohydrates}
                    </p>
                </section>
            </figcaption>
        </figure>
    );
};

export default IngredientDetails;
