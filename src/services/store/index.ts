import { configureStore } from '@reduxjs/toolkit';

import ingredientsApi from "./slices/ingredients-api/ingredients-api";
import constructor from "./slices/constructor/constructor";
import ingredientDetails from "./slices/ingredient-details/ingredient-details";
import orderDetailsApi from "./slices/order-details-api/order-details-api";
import authApi from "./slices/auth-api/auth-api";
import passResetApi from "./slices/pass-reset-api/pass-reset-api";
import feedOrderDetails from "./slices/feed-order-details/feed-order-details";
import feedSocketApi, {
    opened as feedOpened,
    failed as feedFailed,
    closed as feedClosed,
    received as feedReceived,
    startActionType as feedStartActionType,
    stopActionType as feedStopActionType
} from "./slices/feed-socket-api/feed-socket-api";
import historySocketApi, {
    opened as historyOpened,
    failed as historyFailed,
    closed as historyClosed,
    received as historyReceived,
    startActionType as historyStartActionType,
    stopActionType as historyStopActionType
} from "./slices/history-socket-api/history-socket-api";
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
        feedSocketApi: feedSocketApi,
        historySocketApi: historySocketApi
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        createSocketMiddleware(
            {
                opened: feedOpened,
                failed: feedFailed,
                closed: feedClosed,
                received: feedReceived
            },
            feedStartActionType,
            feedStopActionType
        ),
        createSocketMiddleware(
            {
                opened: historyOpened,
                failed: historyFailed,
                closed: historyClosed,
                received: historyReceived
            },
            historyStartActionType,
            historyStopActionType
        )
    )
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;