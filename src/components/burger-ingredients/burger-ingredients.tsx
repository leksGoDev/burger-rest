import * as React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients.module.css'
import bun1 from '../../images/bun-01.png';
import bun2 from '../../images/bun-02.png';
import sauce1 from '../../images/sauce-01.png';
import sauce2 from '../../images/sauce-02.png';
import sauce3 from '../../images/sauce-03.png';
import sauce4 from '../../images/sauce-04.png';
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
            <nav className="mt-10 mb-10">
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
            </nav>

            <section className={styles.content}>
                <section className="mb-10">
                    <p className="text text_type_main-medium mb-6">Булки</p>

                    <ol className={`${styles.list} pl-4 pr-2`}>
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

                <section className="mb-10">
                    <p className="text text_type_main-medium mb-6">Соусы</p>

                    <ol className={`${styles.list} pl-4 pr-2`}>
                        <BurgerIngredientsCard
                            image={sauce2}
                            price={30}
                            name="Соус Spicy-X"
                        />

                        <BurgerIngredientsCard
                            image={sauce4}
                            price={30}
                            name="Соус фирменный Space Sauce"
                        />

                        <BurgerIngredientsCard
                            image={sauce3}
                            price={30}
                            name="Соус Spicy-X"
                            count={1}
                        />

                        <BurgerIngredientsCard
                            image={sauce1}
                            price={30}
                            name="Соус фирменный Space Sauce"
                        />
                    </ol>
                </section>
            </section>
        </article>
    );
};

export default BurgerIngredients;