import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedData } from "../../../../models/order";
import { SliceActions } from "../../../../models/redux";
import { SocketStartActionType, SocketStopActionType, SocketStoreName } from "../../../../constants/redux";

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

export const startActionType = SocketStartActionType.feed;
export const startSocket = createAction<string>(startActionType);
export const stopActionType = SocketStopActionType.feed;
export const stopSocket = createAction(stopActionType);

const feedSocketApi = createSlice({
    name: SocketStoreName.feed,
    initialState: initialState,
    reducers: {
        opened(state) {
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