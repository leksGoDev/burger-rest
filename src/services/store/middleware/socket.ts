import type { Middleware, MiddlewareAPI } from "redux";

import type { TAppDispatch, TRootState } from "../index";
import { TAppActions } from "../../../models/redux";
import { connected, failed, closed, received } from "../slices/api/feed-socket-api";

const createSocketMiddleware = (url: string): Middleware => {
    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { dispatch } = store;

            if (action.type === "start") {
                socket = new WebSocket(url);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(connected());
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