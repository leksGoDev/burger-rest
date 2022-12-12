import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedData } from "../../../../models/order";
import { SliceActions } from "../../../../models/redux";

interface IState {
    connectedUrl: string | null;
    hasError: boolean;
    messages: IFeedData[];
}

const initialState: IState = {
    connectedUrl: null,
    hasError: false,
    messages: []
};

export const startSocket = createAction<string>("feedSocketApi/start");

const feedSocketApi = createSlice({
    name: 'feedSocketApi',
    initialState: initialState,
    reducers: {
        opened(state, action: PayloadAction<string>) {
            state.connectedUrl = action.payload;
            state.hasError = false;
        },
        failed(state) {
            state.connectedUrl = null;
            state.hasError = true;
        },
        closed(state) {
            state.connectedUrl = null;
            state.hasError = false;
            state.messages = [];
        },
        received(state, action: PayloadAction<string>) {
            state.messages.push(JSON.parse(action.payload));
        }
    }
});

export const { opened, failed, closed, received } = feedSocketApi.actions;

export type TFeedSocketApiActions = SliceActions<typeof feedSocketApi.actions> | ReturnType<typeof startSocket>;

export default feedSocketApi.reducer;