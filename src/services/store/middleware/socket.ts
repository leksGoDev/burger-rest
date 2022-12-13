import type { Middleware, MiddlewareAPI } from "redux";
import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

import type { TAppDispatch, TRootState } from "../index";
import { TAppActions } from "../../../models/redux";
import { SocketStartActionType } from "../../../constants/redux";

interface ISocketMiddlewareActions {
    opened: ActionCreatorWithoutPayload;
    failed: ActionCreatorWithoutPayload;
    closed: ActionCreatorWithoutPayload;
    received: ActionCreatorWithPayload<string>;
}

const createSocketMiddleware = (
    actionCreators: ISocketMiddlewareActions,
    startActionType: SocketStartActionType
): Middleware => {
    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { opened, failed, closed, received } = actionCreators;
            const { dispatch } = store;

            if (
                action.type === startActionType
                && (!socket || socket.readyState === 3)
            ) {
                socket = new WebSocket(action.payload);

                socket.onopen = () => {
                    dispatch(opened());
                };

                socket.onerror = () => {
                    dispatch(failed());
                };

                socket.onclose = () => {
                    dispatch(closed());
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    dispatch(received(data));
                };
            }

            next(action);
        }
    }
};

export default createSocketMiddleware;