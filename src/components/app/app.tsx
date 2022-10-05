import * as React from 'react';

import styles from './app.module.css'
import AppHeader  from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {

    return (
        <section>
            <AppHeader />

            <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </section>
    );
};

export default App;