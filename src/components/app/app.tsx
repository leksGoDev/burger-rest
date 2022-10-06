import * as React from 'react';

import styles from './app.module.css'
import data from '../../utils/data'
import AppHeader  from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Ingredient } from "../../models/ingredient";

const App = () => {

    return (
        <section>
            <AppHeader />

            <main className={styles.main}>
                <BurgerIngredients data={data as Ingredient[]} />
                <BurgerConstructor />
            </main>
        </section>
    );
};

export default App;