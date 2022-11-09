import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { User } from "../../../../models/profile";
import { AuthResponse, AuthResponseWithUser, LoginBodyData, RefreshBodyData } from "../../../../models/api";
import { request } from "../../../api/request";
import { getCookie, saveTokens } from "../../../api/cookie";

interface State {
    isLoading: boolean;
    hasError: boolean;
    isAuthorized: boolean;
}

const BASE_URL = 'auth';

const initialState: State = {
    isLoading: false,
    hasError: false,
    isAuthorized: false
};

const authApi = createSlice({
    name: 'authApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failed(state, action: PayloadAction<boolean | undefined> ) {
            state.hasError = true;
            state.isLoading = false;
            state.isAuthorized = action?.payload ?? state.isAuthorized;
        },
        received(state, action: PayloadAction<boolean>) {
            state.hasError = false;
            state.isLoading = false;
            state.isAuthorized = action.payload;
        }
    }
});

const { loading, failed, received } = authApi.actions;

const checkRequestResult = (data: AuthResponseWithUser, dispatch: AppDispatch) => {
    const { success, user, accessToken, refreshToken } = data;

    if (success) {
        saveTokens(accessToken, refreshToken);
        dispatch(received(true));
    } else {
        dispatch(failed());
    }
};

export const register = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const bodyData = { email, password, name };
        const data = await request<AuthResponseWithUser, User>(`${BASE_URL}/register`, bodyData);
        checkRequestResult(data, dispatch);
    }
    catch (err) {
        dispatch(failed());
    }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const bodyData = { email, password };
        const data = await request<AuthResponseWithUser, LoginBodyData>(`${BASE_URL}/login`, bodyData);
        checkRequestResult(data, dispatch);
    }
    catch (err) {
        dispatch(failed());
    }
};

export const refresh = () => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const token = getCookie("refreshToken");
        if (token) {
            const bodyData = { token };
            const { success, accessToken, refreshToken }
                = await request<AuthResponse, RefreshBodyData>(`${BASE_URL}/token`, bodyData);
            if (success) {
                saveTokens(accessToken, refreshToken);
                dispatch(received(true));
            } else {
                dispatch(failed(false));
            }
        } else {
            dispatch(received(false));
        }
    } catch (err) {
        dispatch(failed(false));
    }
};

export default authApi.reducer;