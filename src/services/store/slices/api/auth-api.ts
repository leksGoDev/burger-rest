import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../index";
import { User } from "../../../../models/profile";
import { request } from "../../../api/request";
import { saveTokens } from "../../../api/cookie";

enum AuthStatus {
    Authorized,
    NotAuthorized,
    PassReset
}

interface State {
    isLoading: boolean;
    hasError: boolean;
    status: AuthStatus;
    user: User | null;
}

const BASE_URL = 'auth/';

const initialState: State = {
    isLoading: false,
    hasError: false,
    status: AuthStatus.NotAuthorized,
    user: null
};

const authApi = createSlice({
    name: 'authApi',
    initialState: initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        failedStatus(state) {
            state.hasError = true;
            state.isLoading = false;
            state.status = AuthStatus.NotAuthorized;
        },
        failedResetPass(state) {
            state.hasError = true;
            state.isLoading = false;
        },
        receivedStatus(state, action: PayloadAction<AuthStatus>) {
            state.hasError = false;
            state.isLoading = false;
            state.status = action.payload;
        },
        failedUser(state) {
            state.hasError = true;
            state.isLoading = false;
            state.user = null;
        },
        receivedUser(state, action: PayloadAction<User>) {
            state.hasError = false;
            state.isLoading = false;
            state.user = action.payload;
        }
    }
});

const { loading, failedStatus, receivedStatus, failedUser, receivedUser, failedResetPass } = authApi.actions;

export const register = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const body = JSON.stringify({ email, password, name });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        };
        const { success, user, accessToken, refreshToken } =
            await fetch("https://norma.nomoreparties.space/api/auth/register", options)
            .then(res => res.ok ?
                res.json()
                : res.json()
                    .then((err) => Promise.reject(err))
            );


        if (success) {
            saveTokens(accessToken, refreshToken);

            dispatch(receivedStatus(AuthStatus.Authorized));
            dispatch(receivedUser(user))
        }
        else {
            dispatch(failedStatus());
        }
    }
    catch (err) {
        dispatch(failedStatus());
    }
};


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loading());

    try {
        const body = JSON.stringify({ email, password });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        };
        const { success, user, accessToken, refreshToken } =
            await fetch("https://norma.nomoreparties.space/api/auth/login", options)
                .then(res => res.ok ?
                    res.json()
                    : res.json()
                        .then((err) => Promise.reject(err))
                );


        if (success) {
            saveTokens(accessToken, refreshToken);

            dispatch(receivedStatus(AuthStatus.Authorized));
            dispatch(receivedUser(user))
        }
        else {
            dispatch(failedStatus());
        }
    }
    catch (err) {
        dispatch(failedStatus());
    }
};

export default authApi.reducer;