import { configureStore } from '@reduxjs/toolkit';

import ingredientsApiSlice from "./slices/ingredientsApiSlice";
import burgerConstructorSlice from "./slices/burgerConstructorSlice";
import ingredientDetailsSlice from "./slices/ingredientDetailsSlice";
import orderDetailsSlice from "./slices/orderDetailsSlice";
import authApiSlice from "./slices/authApiSlice";

export const store = configureStore({
    reducer: {
        ingredientsApi: ingredientsApiSlice,
        burgerConstructor: burgerConstructorSlice,
        ingredientDetails: ingredientDetailsSlice,
        orderDetails: orderDetailsSlice,
        authApi: authApiSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;