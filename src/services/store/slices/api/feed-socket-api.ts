import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedData } from "../../../../models/order";
import { SliceActions } from "../../../../models/redux";

interface IState {

}

const initialState: IState = {

};

export const start = createAction("start");

const feedSocketApi = createSlice({
    name: 'feedSocketApi',
    initialState: initialState,
    reducers: {
        connected(state) {

        },
        failed(state) {

        },
        closed(state) {

        },
        received(state, action: PayloadAction<IFeedData>) {

        }
    }
});

export const { connected, failed, closed, received } = feedSocketApi.actions;

export type TFeedSocketApiActions = SliceActions<typeof feedSocketApi.actions> | ReturnType<typeof start>;

export default feedSocketApi.reducer;