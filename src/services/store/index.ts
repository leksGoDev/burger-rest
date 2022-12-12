import { configureStore } from '@reduxjs/toolkit';

import ingredientsApi from "./slices/api/ingredients-api";
import constructor from "./slices/constructor";
import ingredientDetails from "./slices/ingredient-details";
import orderDetailsApi from "./slices/api/order-details-api";
import authApi from "./slices/api/auth-api";
import passResetApi from "./slices/api/pass-reset-api";
import feedOrderDetails from "./slices/feed-order-details";
import feedSocketApi, { opened, failed, closed, received } from "./slices/api/feed-socket-api";
import createSocketMiddleware from "./middleware/socket";

export const store = configureStore({
    reducer: {
        burgerConstructor: constructor,
        ingredientDetails: ingredientDetails,
        feedOrderDetails: feedOrderDetails,
        ingredientsApi: ingredientsApi,
        orderDetailsApi: orderDetailsApi,
        authApi: authApi,
        passResetApi: passResetApi,
        feedSocketApi: feedSocketApi
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        createSocketMiddleware({
            opened, failed, closed, received
        })
    )
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;