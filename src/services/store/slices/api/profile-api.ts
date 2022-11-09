import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Order } from "../../../../models/order";

interface State {
    isLoading: boolean;
    hasError: boolean;
    data: Order | null;
}

const initialState: State = {
    isLoading: false,
    hasError: false,
    data: null
};

const profileApi = createSlice({
    name: 'profileApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
            state.data = null;
        },
        received(state, action: PayloadAction<Order>) {
            state.hasError = false;
            state.isLoading = false;
            state.data = action.payload;
        },
        closeDetails(state) {
            state.data = null;
        }
    }
});

const { loading, failed, received } = profileApi.actions;

export const { closeDetails } = profileApi.actions;

export default profileApi.reducer;