import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from "./slices/ingredientsSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;