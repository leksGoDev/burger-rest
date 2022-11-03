import { useEffect } from 'react';
import type { FC } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import { Home } from "../../pages";
import { useAppDispatch } from "../../hooks/redux";
import { fetchIngredients } from "../../services/store/slices/ingredientsApiSlice";

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    return (
        <BrowserRouter>
            <AppHeader />

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;