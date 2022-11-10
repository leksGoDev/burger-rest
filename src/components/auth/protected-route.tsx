import { useEffect, useCallback } from "react";
import type { FC, ReactNode } from 'react';
import { Route, Redirect,  } from "react-router-dom";
import type { RouteComponentProps } from "react-router-dom";
import type { Location } from "history";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser } from "../../services/store/slices/api/auth-api";

interface Props {
    component: ReactNode;
    exact?: boolean;
    path: string;
    onlyUnAuth: boolean;
}

const ProtectedRoute: FC<Props> = ({ component, onlyUnAuth, ...props  }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.authApi);

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    const chooseRender = useCallback(
        (props: RouteComponentProps) => {
            const { location } = props;
            const { state } = location as Location<{ from?: string; }>;

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