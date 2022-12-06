import type { FC } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const Home: FC = () => {

    return (
        <section className={styles.section}>
            <header className="mt-10 mb-5">
                <p className="text text_type_main-large">Соберите бургер</p>
            </header>

            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </section>
    );
};

export default Home;