import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { User, UserInfo } from "../../../../models/profile";
import {AuthResponse, AuthResponseWithUser, LoginBodyData, RefreshBodyData, UserResponse} from "../../../../models/api";
import {createOptionsWithJSON, request, requestWithAuth} from "../../../api/request";
import { getCookie, saveTokens } from "../../../api/cookie";

interface State {
    status: {
        isLoading: boolean;
        hasError: boolean;
        isAuthorized: boolean;
    };
    user: {
        isLoading: boolean;
        hasError: boolean;
        user: UserInfo | null;
    }
}

const BASE_URL = 'auth';

const initialState: State = {
    status: {
        isLoading: false,
        hasError: false,
        isAuthorized: false
    },
    user: {
        isLoading: false,
        hasError: false,
        user: null
    }
};

const authApi = createSlice({
    name: 'authApi',
    initialState: initialState,
    reducers: {
        statusLoading(state) {
            state.status.isLoading = true;
        },
        userLoading(state) {
            state.user.isLoading = true;
        },
        statusFailed(state, action: PayloadAction<boolean | undefined> ) {
            state.status.hasError = true;
            state.status.isLoading = false;
            state.status.isAuthorized = action?.payload ?? state.status.isAuthorized;
        },
        userFailed(state) {
            state.user.hasError = true;
            state.user.isLoading = false;
            state.user.user = null;
            state.status.isAuthorized = false;
        },
        statusReceived(state, action: PayloadAction<boolean>) {
            state.status.hasError = false;
            state.status.isLoading = false;
            state.status.isAuthorized = action.payload;
        },
        userReceived(state, action: PayloadAction<UserInfo | null>) {
            state.user.hasError = false;
            state.user.isLoading = false;
            state.user.user = action.payload;
        }
    }
});

const { statusLoading, userLoading, statusFailed, userFailed, statusReceived, userReceived } = authApi.actions;

export const register = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(statusLoading());

    try {
        const options = createOptionsWithJSON<User>("POST", { email, password, name });
        const { user } = await request<AuthResponseWithUser>(`${BASE_URL}/register`, options);
        dispatch(statusReceived(true));
        dispatch(userReceived(user));
    }
    catch (err) {
        dispatch(statusFailed());
    }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(statusLoading());

    try {
        const options = createOptionsWithJSON<LoginBodyData>("POST", { email, password });
        const { user } = await request<AuthResponseWithUser>(`${BASE_URL}/login`, options);
        dispatch(statusReceived(true));
        dispatch(userReceived(user));
    }
    catch (err) {
        dispatch(statusFailed());
    }
};

export const logout = () => async (dispatch: AppDispatch) => {

};

export const refresh = () => async (dispatch: AppDispatch) => {
    dispatch(statusLoading());

    try {
        const token = getCookie("refreshToken");
        if (token) {
            const options = createOptionsWithJSON<RefreshBodyData>("POST", { token });
            await request<AuthResponse>(`${BASE_URL}/token`, options);
            dispatch(statusReceived(true));
        } else {
            dispatch(statusReceived(false));
        }
    } catch (err) {
        dispatch(statusFailed(false));
    }
};

export const getUser = () => async (dispatch: AppDispatch) => {
    dispatch(userLoading());

    try {
        const { user } = await requestWithAuth<UserResponse>(`${BASE_URL}/user`);
        dispatch(userReceived(user));
    } catch (err) {
        dispatch(userFailed());
    }
};

export const pathUser = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(userLoading());

    try {
        const options = createOptionsWithJSON<User>("PATH", { email, password, name });
        const { user } = await requestWithAuth<UserResponse>(`${BASE_URL}/user`, options);
        dispatch(userReceived(user));
    } catch (err) {
        dispatch(userFailed());
    }
};

export default authApi.reducer;