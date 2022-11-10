import { useEffect } from "react";
import type { FC, ReactNode } from 'react';
import { Route, Redirect } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser } from "../../services/store/slices/api/auth-api";

interface Props {
    children: ReactNode;
    path: string;
}

const ProtectedRoute: FC<Props> = ({ children, ...props }) => {
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
                        children
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