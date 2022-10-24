import { configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from "./slices/ingredientsSlice";
import burgerConstructorSlice from "./slices/burgerConstructorSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        burgerConstructor: burgerConstructorSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;