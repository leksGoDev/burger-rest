import { useEffect } from 'react';
import type { FC } from 'react';
import { Switch, Route } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import { Home, NotFound, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient } from "../../pages";
import { useAppDispatch } from "../../hooks/redux";
import { fetchIngredients } from "../../services/store/slices/ingredientsApiSlice";

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    return (
        <>
            <AppHeader />

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path="/forgot-password">
                    <ForgotPassword />
                </Route>

                <Route exact path="/reset-password">
                    <ResetPassword />
                </Route>

                <Route exact path="/profile">
                    <Profile />
                </Route>

                <Route exact path="/ingredients/:id">
                    <Ingredient />
                </Route>

                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
};

export default App;