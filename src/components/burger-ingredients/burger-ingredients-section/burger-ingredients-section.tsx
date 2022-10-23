import * as React from 'react';

import styles from './burger-ingredients-section.module.css'
import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card";
import { Ingredient, IngredientType, IngredientTypeName } from "../../../models/ingredient";

interface Props {
    type: IngredientType;
    data: Ingredient[];
}

const BurgerIngredientsSection = React.forwardRef<HTMLElement, Props>(({ type, data }, ref) => {

    return (
        <section ref={ref} className="mb-10">
            <p className="text text_type_main-medium mb-6">{IngredientTypeName[type]}</p>

            <ol className={`${styles.list} pl-4 pr-2`}>
                {data.map(element =>
                    <BurgerIngredientsCard
                        key={element._id}
                        ingredient={element}
                        count={((element._id == "60666c42cc7b410027a1a9b2" || element._id == "60666c42cc7b410027a1a9b8") && 1) as number}
                    />
                )}
            </ol>
        </section>
    );
});

export default BurgerIngredientsSection;