import type { FC } from 'react';
import { useCallback, useEffect} from 'react';
import type { Location } from "history";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { ModalType } from "../../constants/modal";
import AppHeader from "../app-header/app-header";
import ProtectedRoute from "../auth/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import FeedOrderDetails from "../feed/feed-order-details/feed-order-details";
import OrderDetails from "../order-details/order-details";
import { Feed, ForgotPassword, Home, Ingredient, Login, NotFound, Profile, Register, ResetPassword, Order } from "../../pages";
import {
    useAppDispatch,
    useRefreshFeedOrderDetails,
    useRefreshIngredientDetails,
    useRefreshNewOrderDetails
} from "../../hooks";
import { fetchIngredients } from "../../services/store/slices/ingredients-api/ingredients-api";
import { fetchUser } from "../../services/store/slices/auth-api/auth-api";
import { clearDetails as clearIngredientDetails } from "../../services/store/slices/ingredient-details/ingredient-details";
import { clearDetails as clearNewOrderDetails } from "../../services/store/slices/order-details-api/order-details-api";
import { clearDetails as clearFeedOrderDetails } from "../../services/store/slices/feed-order-details/feed-order-details";

const App: FC = () => {
    useRefreshIngredientDetails();
    useRefreshFeedOrderDetails();
    useRefreshNewOrderDetails();
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
        (type: ModalType) => {
            if (type === ModalType.Ingredient) {
                dispatch(clearIngredientDetails());
            } else if (type === ModalType.NewOrder) {
                dispatch(clearNewOrderDetails());
            }
            else {
                dispatch(clearFeedOrderDetails());
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

                <Route path="/feed" component={Feed} />

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
                    fromLocation={location}
                    component={<Profile />}
                />

                <ProtectedRoute
                     path="/orders/:id"
                     onlyUnAuth={false}
                     component={<Order />}
                />

                <Route exact path="/ingredients/:id" component={Ingredient} />

                <Route path="*" component={NotFound} />
            </Switch>

            {background &&
                <>
                    <Route exact path="/ingredients/:id">
                        <Modal onClose={handleCloseDetails.bind(null, ModalType.Ingredient)}>
                            <IngredientDetails />
                        </Modal>
                    </Route>

                    <Route exact path="/feed/:id">
                        <Modal onClose={handleCloseDetails.bind(null, ModalType.FeedOrder)}>
                            <FeedOrderDetails />
                        </Modal>
                    </Route>


                    <ProtectedRoute
                        exact
                        path="/profile/orders/:id"
                        onlyUnAuth={false}
                        component={
                            <Modal onClose={handleCloseDetails.bind(null, ModalType.ProfileOrder)}>
                                <FeedOrderDetails />
                            </Modal>
                        }
                    />

                    <ProtectedRoute
                        exact
                        path="/orders/:id"
                        onlyUnAuth={false}
                        component={
                            <Modal onClose={handleCloseDetails.bind(null, ModalType.NewOrder)}>
                                <OrderDetails />
                            </Modal>
                        }
                    />
                </>}
        </>
    );
};

export default App;