import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import type { Location } from "history";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import ProtectedRoute from "../auth/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Home, NotFound, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient } from "../../pages";
import { useAppDispatch } from "../../hooks";
import { fetchIngredients } from "../../services/store/slices/api/ingredients-api";
import { deleteDetails } from "../../services/store/slices/ingredient-details";
import { fetchUser} from "../../services/store/slices/api/auth-api";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<{ background?: Location<unknown> }>();
    const background = location.state?.background;
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(fetchUser());
    }, [dispatch]);

    const handleCloseDetails = useCallback(
        () => {
            dispatch(deleteDetails());
            history.goBack();
        },
        [dispatch, history]
    );

    return (
        <>
            <AppHeader />

            <Switch location={background ?? location}>
                <Route exact path="/" component={Home} />

                <ProtectedRoute
                    exact
                    path="/login"
                    onlyUnAuth={true}
                    component={<Login />}
                />

                <ProtectedRoute
                    exact
                    path="/register"
                    onlyUnAuth={true}
                    component={<Register />}
                />

                <ProtectedRoute
                    exact
                    path="/forgot-password"
                    onlyUnAuth={true}
                    component={<ForgotPassword />}
                />

                <ProtectedRoute
                    exact
                    path="/reset-password"
                    onlyUnAuth={true}
                    component={<ResetPassword />}
                />

                <ProtectedRoute
                    path="/profile"
                    onlyUnAuth={false}
                    component={<Profile />}
                />

                <Route exact path="/ingredients/:id" component={Ingredient} />

                <Route path="*" component={NotFound} />
            </Switch>

            {background &&
                <Route exact path="/ingredients/:id">
                    <Modal onClose={handleCloseDetails}>
                        <IngredientDetails />
                    </Modal>
                </Route>}
        </>
    );
};

export default App;