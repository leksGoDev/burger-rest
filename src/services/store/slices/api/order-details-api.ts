import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { INewOrder } from "../../../../models/order";
import { INewOrderResponse, IOrderBodyData } from "../../../../models/api";
import { createOptionsWithJSON, requestWithAuth } from "../../../api/request";

interface IState {
    isLoading: boolean;
    hasError: boolean;
    data: INewOrder | null;
}

const initialState: IState = {
    isLoading: false,
    hasError: false,
    data: null
};

export const makeOrder = createAsyncThunk<INewOrder, IOrderBodyData>(
    'orderDetailsApi/makeOrder',
    async (data) => {
        const options = createOptionsWithJSON<IOrderBodyData>("POST", data);
        const res = await requestWithAuth<INewOrderResponse>('orders', options);

        return res;
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