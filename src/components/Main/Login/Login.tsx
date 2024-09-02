import { FC, useCallback } from "react";
import LoginForm from "./LoginForm";
import {
    bindedThunks, useAppSelector,
    getAuthStatus, getAuthUserId, getCaptchaUrl
} from "../../../redux";


const Login: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);

    const { login } = bindedThunks.authThunks;

    type LoginFormData = {
        captcha: string;
        rememberMe: boolean;
        email: string;
        password: string;
    }
    //Login page reload often because every typed symbol call rerender
    const handleSubmit = useCallback((formData: LoginFormData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }, [login]);

    return <LoginForm onSubmit={handleSubmit} captchaUrl={captchaUrl} isAuth={isAuth} id={id} />;
};

export default Login;