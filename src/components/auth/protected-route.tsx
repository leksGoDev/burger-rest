import { useEffect } from "react";
import type { FC, ReactNode } from 'react';
import { Route, Redirect } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser } from "../../services/store/slices/api/auth-api";

interface Props {
    component: ReactNode;
    path: string;
}

const ProtectedRoute: FC<Props> = ({ component, ...props }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.authApi);

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    return (
        <Route
            {...props}
            render={({ location }) =>
                user ? (
                        component
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default ProtectedRoute;