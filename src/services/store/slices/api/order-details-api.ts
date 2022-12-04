import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IOrder } from "../../../../models/order";
import { IIngredient } from "../../../../models/ingredient";
import { IOrderResponse, IOrderBodyData } from "../../../../models/api";
import { createOptionsWithJSON, requestWithAuth } from "../../../api/request";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    data: IOrder | null;
}

const initialState: IState = {
    isLoading: false,
    hasError: false,
    data: null
};

export const makeOrder = createAsyncThunk<IOrder, IIngredient["_id"][]>(
    'orderDetailsApi/makeOrder',
    async (ingredients) => {
        const options = createOptionsWithJSON<IOrderBodyData>("POST", { ingredients });
        const data = await requestWithAuth<IOrderResponse>('orders', options);

        return data;
    }
);

const orderDetailsApi = createSlice({
    name: 'orderDetailsApi',
    initialState: initialState,
    reducers: {
        closeDetails(state) {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makeOrder.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
                state.data = null;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.data = action.payload;
            })
    }
});

export const { closeDetails } = orderDetailsApi.actions;

export default orderDetailsApi.reducer;