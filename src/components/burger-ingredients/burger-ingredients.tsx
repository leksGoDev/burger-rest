import * as React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients.module.css'

import { Ingredient, IngredientType, IngredientTypeName } from "../../models/ingredient";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";

interface Props {
    data: Ingredient[];
}

const BurgerIngredients: React.FC<Props> = ({ data }) => {
    const [tabValue, setTabValue] = React.useState<IngredientType>(IngredientType.bun);

    const buns = data.filter(el => el.type == IngredientType.bun);
    const sauces = data.filter(el => el.type == IngredientType.sauce);
    const main = data.filter(el => el.type == IngredientType.main);

    return (
        <article className={styles.article}>
            <nav className="mt-10 mb-10">
                <p className="text text_type_main-large mb-5">Соберите бургер</p>

                <div className={styles.tabs}>
                    <Tab
                        value={IngredientTypeName[IngredientType.bun]}
                        active={tabValue === IngredientType.bun}
                        onClick={setTabValue.bind(null, IngredientType.bun)}
                    >
                        {IngredientTypeName[IngredientType.bun]}
                    </Tab>
                    <Tab
                        value={IngredientTypeName[IngredientType.sauce]}
                        active={tabValue === IngredientType.sauce}
                        onClick={setTabValue.bind(null, IngredientType.sauce)}
                    >
                        {IngredientTypeName[IngredientType.sauce]}
                    </Tab>
                    <Tab
                        value={IngredientTypeName[IngredientType.main]}
                        active={tabValue === IngredientType.main}
                        onClick={setTabValue.bind(null, IngredientType.main)}
                    >
                        {IngredientTypeName[IngredientType.main]}
                    </Tab>
                </div>
            </nav>

            <section className={styles.content}>
                <BurgerIngredientsSection type={IngredientType.bun} data={buns} />

                <BurgerIngredientsSection type={IngredientType.sauce} data={sauces} />

                <BurgerIngredientsSection type={IngredientType.main} data={main} />
            </section>
        </article>
    );
};

export default BurgerIngredients;