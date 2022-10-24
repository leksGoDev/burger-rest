import { useEffect } from 'react';

import styles from './app.module.css'
import AppHeader  from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { DataContext } from "../../services/dataContext";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchIngredients } from "../../services/store/slices/ingredientsSlice";

const App = () => {
    const { data } = useAppSelector(store => store.ingredients);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    return (
        <>
            <AppHeader />

            <main className={styles.main}>
                <DataContext.Provider value={{ data }}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DataContext.Provider>
            </main>
        </>
    );
};

export default App;