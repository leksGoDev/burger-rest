import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import type { Location } from "history";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import ProtectedRoute from "../auth/protected-route";
import IngredientDetails from "../modal/content/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { Home, NotFound, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient } from "../../pages";
import { useAppDispatch } from "../../hooks";
import { fetchIngredients } from "../../services/store/slices/api/ingredients-api";
import { closeDetails } from "../../services/store/slices/ingredient-details";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<{ background?: Location<unknown> }>();
    const background = location.state?.background;
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    const handleCloseDetails = useCallback(
        () => {
            dispatch(closeDetails());
            history.goBack();
        },
        [dispatch, history]
    );

    return (
        <>
            <AppHeader />

            <Switch location={background ?? location}>
                <Route exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />

                <Route exact path="/register" component={Register} />

                <Route exact path="/forgot-password" component={ForgotPassword} />

                <Route exact path="/reset-password" component={ResetPassword} />

                <ProtectedRoute path="/profile" component={<Profile />} />

                <Route exact path="/ingredients/:id" component={Ingredient} />

                <Route path="*" component={NotFound} />
            </Switch>

            {background &&
                <Route exact path="/ingredients/:id">
                    <Modal title="Детали ингредиента" onClose={handleCloseDetails}>
                        <IngredientDetails />
                    </Modal>
                </Route>}
        </>
    );
};

export default App;