import {useAppSelector} from "../../../redux/store";
import {getAuthStatus, getAuthUserId, getCaptchaUrl} from "../../../redux/ducks/auth/selectors";
import {login} from "../../../redux/ducks/auth/thunks";
import {useCallback} from "react";
import LoginForm from "./LoginForm";
import {useActions} from "../../../hooks/useActions";


const LoginFormContainer = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);

    const [loginD] = useActions([login]);

    type LoginFormData = {
        captcha: string;
        rememberMe: string;
        email:string;
        password:string;
    }
    //Login page reload often because every typed symbol call rerender
    const handleSubmit = useCallback((formData: LoginFormData) => {
        loginD(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }, [loginD]);

    //@ts-ignore
    return <LoginForm onSubmit={handleSubmit} captchaUrl={captchaUrl} isAuth={isAuth} id={id}/>;
}

export default LoginFormContainer;