import { useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { Route, Redirect,  } from "react-router-dom";
import type { RouteComponentProps } from "react-router-dom";
import type { Location } from "history";

import { useAppSelector } from "../../hooks";

interface Props {
    component: ReactNode;
    exact?: boolean;
    path: string;
    onlyUnAuth: boolean;
}

const ProtectedRoute: FC<Props> = ({ component, onlyUnAuth, ...props  }) => {
    const { user } = useAppSelector(store => store.authApi);

    const chooseRender = useCallback(
        (props: RouteComponentProps) => {
            const { location } = props;
            const { state } = location as Location<{ from?: Location<unknown>; }>;

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
                            state: { from: location }
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