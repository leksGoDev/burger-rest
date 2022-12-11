import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IOrder } from "../../../../models/order";
import { IOrderResponse, IOrderBodyData } from "../../../../models/api";
import { SliceActions } from "../../../../models/redux";
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

export const makeOrder = createAsyncThunk<IOrder, IOrderBodyData>(
    'orderDetailsApi/makeOrder',
    async (data) => {
        const options = createOptionsWithJSON<IOrderBodyData>("POST", data);
        const res = await requestWithAuth<IOrderResponse>('orders', options);

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

export type TOrderDetailsApiActions = SliceActions<typeof orderDetailsApi.actions>;

export default orderDetailsApi.reducer;