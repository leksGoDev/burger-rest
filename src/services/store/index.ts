import { configureStore } from '@reduxjs/toolkit';

import ingredientsApiSlice from "./slices/ingredientsApiSlice";
import burgerConstructorSlice from "./slices/burgerConstructorSlice";
import ingredientDetailsSlice from "./slices/ingredientDetailsSlice";

export const store = configureStore({
    reducer: {
        ingredientsApi: ingredientsApiSlice,
        burgerConstructor: burgerConstructorSlice,
        ingredientDetails: ingredientDetailsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;