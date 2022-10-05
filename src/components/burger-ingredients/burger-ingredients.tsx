import * as React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients.module.css'
import bun1 from '../../images/bun-01.png';
import bun2 from '../../images/bun-02.png';
import BurgerIngredientsCard from "./burger-ingredients-card/burger-ingredients-card";

enum Tabs {
    Buns,
    Sauces,
    Stuffings
}

const BurgerIngredients = () => {
    const [tabValue, setTabValue] = React.useState<Tabs>(Tabs.Buns);

    return (
        <article>
            <section className="mt-10 mb-10">
                <p className="text text_type_main-large mb-5">Соберите бургер</p>

                <div style={{ display: "flex" }}>
                    <Tab value="Булки" active={tabValue === Tabs.Buns} onClick={setTabValue.bind(null, Tabs.Buns)}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={tabValue === Tabs.Sauces} onClick={setTabValue.bind(null, Tabs.Sauces)}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={tabValue === Tabs.Stuffings} onClick={setTabValue.bind(null, Tabs.Stuffings)}>
                        Начинки
                    </Tab>
                </div>
            </section>

            <section className="mb-10">
                <p className="text text_type_main-medium mb-6">Булки</p>

                <ol className={`${styles.cardSection} pl-4 pr-4`}>
                    <BurgerIngredientsCard
                        image={bun2}
                        price={20}
                        name="Краторная булка N-200i"
                        count={1}
                    />

                    <BurgerIngredientsCard
                        image={bun1}
                        price={20}
                        name="Флюоресцентная булка R2-D3"
                    />
                </ol>
            </section>

            <section className="mt-10 mb-10">

            </section>

        </article>
    );
};

export default BurgerIngredients;