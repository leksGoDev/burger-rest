import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../index";
import { request } from "../../api/request";

interface State {
    isLoading: boolean;
    hasError: boolean;
    isAuthorized: boolean;
}

const BASE_URL = 'auth/';

const initialState: State = {
    isLoading: false,
    hasError: false,
    isAuthorized: false
};

const authApiSlice = createSlice({
    name: 'authApiSlice',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state) {
            state.hasError = true;
            state.isLoading = false;
        },
        changeAuthStatus(state, action: PayloadAction<boolean>) {
            state.hasError = false;
            state.isLoading = false;
            state.isAuthorized = action.payload;
        }
    }
});

const { loading, failed, changeAuthStatus } = authApiSlice.actions;

export const register = () => async (dispatch: AppDispatch) => {
   /* dispatch(loading());

    try {
        const { data, success } = await request<>(`${BASE_URL}register`);
        if (success) {
            dispatch(received(data));
        }
        else dispatch(failed());
    }
    catch (err) {
        dispatch(failed());
    }*/
};

export default authApiSlice.reducer;