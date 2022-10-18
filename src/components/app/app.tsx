import * as React from 'react';

import styles from './app.module.css'
import AppHeader  from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Ingredient } from "../../models/ingredient";
import { DataContext } from "../../services/dataContext";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [data, setData] = React.useState<Ingredient[]>([]);

    React.useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then(res => res.json())
            .then(({ data, success }) => {
                if (success) setData(data);
                else setHasError(true);
            })
            .catch(err => {
                console.log(err.message)
                setHasError(true);
            })
            .finally(() => setIsLoading(false))
    }, []);


    return (
        <>
            <AppHeader />

            <main className={styles.main}>
                <DataContext.Provider value={{ data, setData }}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DataContext.Provider>
            </main>
        </>
    );
};

export default App;