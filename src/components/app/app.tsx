import { useEffect } from 'react';
import type { FC } from 'react';
import { Switch, Route } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import { Home, NotFound, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient } from "../../pages";
import { useAppDispatch } from "../../hooks";
import { fetchIngredients } from "../../services/store/slices/api/ingredients-api";

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    return (
        <>
            <AppHeader />

            <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />

                <Route exact path="/register" component={Register} />

                <Route exact path="/forgot-password" component={ForgotPassword} />

                <Route exact path="/reset-password" component={ResetPassword} />

                <Route path="/profile" component={Profile} />

                <Route exact path="/ingredients/:id" component={Ingredient} />

                <Route path="*" component={NotFound} />
            </Switch>
        </>
    );
};

export default App;