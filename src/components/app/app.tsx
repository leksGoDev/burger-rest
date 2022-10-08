import * as React from 'react';

import styles from './app.module.css'
import AppHeader  from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Ingredient } from "../../models/ingredient";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [data, setData] = React.useState<Ingredient[]>([]);

    React.useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then(res => res.json())
            .then(({ data }) => setData(data))
            .catch(err => {
                console.log(err.message)
                setHasError(true);
            })
            .finally(() => setIsLoading(false))
    }, []);


    return (
        <section>
            <AppHeader />

            <main className={styles.main}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
            </main>
        </section>
    );
};

export default App;