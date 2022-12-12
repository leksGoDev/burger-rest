import type { Middleware, MiddlewareAPI } from "redux";
import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

import type { TAppDispatch, TRootState } from "../index";
import { TAppActions } from "../../../models/redux";

interface ISocketMiddlewareActions {
    opened: ActionCreatorWithPayload<string>;
    failed: ActionCreatorWithoutPayload;
    closed: ActionCreatorWithoutPayload;
    received: ActionCreatorWithPayload<string>;
}

const createSocketMiddleware = (actionCreators: ISocketMiddlewareActions): Middleware => {
    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { opened, failed, closed, received } = actionCreators;
            const { dispatch } = store;

            if (action.type === "feedSocketApi/start") {
                const createSocket = (url: string) => {
                    socket = new WebSocket(url);

                    socket.onopen = () => {
                        dispatch(opened(url));
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
                };

                if (socket instanceof WebSocket) {
                    if (socket.url !== action.payload) {
                        socket.onclose = () => {
                            dispatch(closed());
                            createSocket(action.payload);
                        };
                        socket.close();
                    }
                } else {
                    createSocket(action.payload);
                }
            }

            next(action);
        }
    }
};

export default createSocketMiddleware;