import { FC, useEffect } from "react";
import { bindedThunks, getAuthStatus, getAuthUserId, getCaptchaUrl, useAppSelector } from "../../../redux";
import { useNavigate } from "react-router-dom";
import { InputFL } from "../../../utils";
import { FormProvider, useForm } from "react-hook-form";
import { FormError } from "../../../api/Errors";


type FieldValues = {
    captcha: string;
    rememberMe: boolean;
    email: string;
    password: string;
    formError:string;
}
const Login: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);

    const { login } = bindedThunks.authThunks;
    const methods = useForm<FieldValues>();
    const { setError ,formState:{errors} } = methods;

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(`/profile/${id}`);
        }
    },[isAuth]);



    const handleLoginSubmit = async (formData: FieldValues) => {
        try {
           await login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        } catch (error) {
            if(error instanceof FormError){
                setError("formError",{message:error.message})
            } else {
                throw error;
            }
        }
    };


    return (<FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleLoginSubmit)}>
            <InputFL<FieldValues>
                name={"email"}
                type={"email"}
                labelText={"Login"}
                placeholder={"Email"}
                validateOptions={{ required: "Login is required" }} />
            <InputFL<FieldValues>
                name={"password"}
                type={"password"}
                labelText={"Password"}
                placeholder={"Email"}
                validateOptions={{ required: "Password is required" }} />
            <label>
                <InputFL<FieldValues>
                name={"rememberMe"}
                type={"checkbox"} />
                remember me
            </label>

            {captchaUrl && <div>
                <img src={captchaUrl} alt="captcha" />
                <InputFL<FieldValues>
                    name={"captcha"}
                    type={"checkbox"}
                    placeholder={"captcha"}
                    validateOptions={{required:"Captcha is required"}}
                />
            </div>}

            {errors.formError && <p>{errors.formError.message}</p>}
            <div>
                <button type={"submit"}>Submit</button>
            </div>
        </form>
    </FormProvider>);
};

export default Login;