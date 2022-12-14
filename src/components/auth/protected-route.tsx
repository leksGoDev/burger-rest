import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { Route, Redirect,  } from "react-router-dom";
import type { RouteComponentProps } from "react-router-dom";
import type { Location } from "history";

import { TFromState } from "../../models/router";
import { useAppSelector } from "../../hooks";

interface IProps {
    component: ReactNode;
    path: string;
    onlyUnAuth: boolean;

    exact?: boolean;
    fromLocation?: Location;
}

const ProtectedRoute: FC<IProps> = ({ component, onlyUnAuth, fromLocation, ...props  }) => {
    const { user } = useAppSelector(store => store.authApi);

    const chooseRender = useCallback(
        ({ location }: RouteComponentProps) => {
            const { state } = location as Location<TFromState>;

            if (onlyUnAuth) {
                return !user ? (
                    component
                ) : (
                    <Redirect to={ state?.from ?? "/" } />
                );
            } else {
                return user ? (
                    component
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: fromLocation ?? location }
                        }}
                    />
                );
            }
        },
        [user, component, onlyUnAuth]
    );

    return (
        <Route
            {...props}
            render={chooseRender}
        />
    );
};

export default ProtectedRoute;