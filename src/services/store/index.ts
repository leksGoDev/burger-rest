import { configureStore } from '@reduxjs/toolkit';

import ingredientsApi from "./slices/api/ingredients-api";
import constructor from "./slices/constructor";
import ingredientDetails from "./slices/ingredient-details";
import orderDetailsApi from "./slices/api/order-details-api";
import authApi from "./slices/api/auth-api";
import profileApi from "./slices/api/profile-api";
import passResetApi from "./slices/api/pass-reset-api";

export const store = configureStore({
    reducer: {
        burgerConstructor: constructor,
        ingredientDetails: ingredientDetails,
        ingredientsApi: ingredientsApi,
        orderDetailsApi: orderDetailsApi,
        authApi: authApi,
        profileApi: profileApi,
        resetPassApi: passResetApi
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;