import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedData } from "../../../../models/order";
import { SliceActions } from "../../../../models/redux";

interface IState {
    connected: boolean;
    hasError: boolean;
    messages: IFeedData[];
}

const initialState: IState = {
    connected: false,
    hasError: false,
    messages: []
};

export const startSocket = createAction<string>("feedSocketApi/start");

const feedSocketApi = createSlice({
    name: 'feedSocketApi',
    initialState: initialState,
    reducers: {
        connected(state) {
            state.connected = true;
            state.hasError = false;
        },
        failed(state) {
            state.connected = false;
            state.hasError = true;
        },
        closed(state) {
            state.connected = false;
            state.hasError = false;
        },
        received(state, action: PayloadAction<string>) {
            state.messages.push(JSON.parse(action.payload));
        }
    }
});

export const { connected, failed, closed, received } = feedSocketApi.actions;

export type TFeedSocketApiActions = SliceActions<typeof feedSocketApi.actions> | ReturnType<typeof startSocket>;

export default feedSocketApi.reducer;