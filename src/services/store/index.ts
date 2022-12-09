import { configureStore } from '@reduxjs/toolkit';

import ingredientsApi from "./slices/api/ingredients-api";
import constructor from "./slices/constructor";
import ingredientDetails from "./slices/ingredient-details";
import orderDetailsApi from "./slices/api/order-details-api";
import authApi from "./slices/api/auth-api";
import passResetApi from "./slices/api/pass-reset-api";
import feedOrderDetails from "./slices/feed-order-details";

export const store = configureStore({
    reducer: {
        burgerConstructor: constructor,
        ingredientDetails: ingredientDetails,
        ingredientsApi: ingredientsApi,
        orderDetailsApi: orderDetailsApi,
        authApi: authApi,
        passResetApi: passResetApi,
        feedOrderDetails: feedOrderDetails
    }
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;