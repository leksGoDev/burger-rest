import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css'
import AppHeader  from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { useAppDispatch } from "../../hooks/redux";
import { fetchIngredients } from "../../services/store/slices/ingredientsSlice";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    return (
        <>
            <AppHeader />

            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </>
    );
};

export default App;