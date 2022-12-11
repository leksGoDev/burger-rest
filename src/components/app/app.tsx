import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import type { Location } from "history";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import ProtectedRoute from "../auth/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import { Home, NotFound, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient, Feed } from "../../pages";
import { useAppDispatch, useRefreshIngredientDetails } from "../../hooks";
import { fetchIngredients } from "../../services/store/slices/api/ingredients-api";
import { deleteIngredientDetails } from "../../services/store/slices/ingredient-details";
import { deleteOrderDetails } from "../../services/store/slices/feed-order-details";
import { fetchUser } from "../../services/store/slices/api/auth-api";

const App: FC = () => {
    useRefreshIngredientDetails();
    const dispatch = useAppDispatch();
    const location = useLocation<{ background?: Location<unknown> }>();
    const background = location.state?.background;
    const history = useHistory();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        dispatch(fetchIngredients(signal));
        dispatch(fetchUser(signal));

        return () => controller.abort();
    }, [dispatch]);

    const handleCloseDetails = useCallback(
        (type: "ingredient" | "order") => {
            if (type === "ingredient") {
                dispatch(deleteIngredientDetails());
            } else {
                dispatch(deleteOrderDetails())
            }

            history.goBack();
        },
        [dispatch, history]
    );

    return (
        <>
            <AppHeader />

            <Switch location={background ?? location}>
                <Route exact path="/" component={Home} />

                <Route exact path="/feed" component={Feed} />

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
                <>
                    <Route exact path="/ingredients/:id">
                        <Modal onClose={handleCloseDetails.bind(null, "ingredient")}>
                            <IngredientDetails />
                        </Modal>
                    </Route>

                    <Route exact path="/feed/:id">
                        <Modal onClose={handleCloseDetails.bind(null, "order")}>
                            <FeedOrderDetails />
                        </Modal>
                    </Route>
                </>}
        </>
    );
};

export default App;