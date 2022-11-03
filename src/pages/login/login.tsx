import type { FC } from 'react';

import AuthForm from "../../components/auth/auth-form/auth-form";

const Login: FC = () => {

    return (
        <AuthForm type="login" />
    );
};

export default Login;