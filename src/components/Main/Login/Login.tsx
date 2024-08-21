import {Field, reduxForm} from "redux-form";
import {FormError, ValidatedElement} from "../../common/FormControls/FormControls";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Navigate} from "react-router-dom";
import React from "react";

const Input = ValidatedElement("input");
const minLength = minLengthCreator(8);
const maxLength = maxLengthCreator(30);


export const LoginForm = ({handleSubmit, error, captchaUrl}: any) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Login
                    <Field
                        component={Input}
                        name={"email"}
                        type={"text"}
                        id={"textInput"}
                        placeholder={"Email"}
                        validate={[required, minLength, maxLength]}/>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <Field component={Input}
                           name={"password"}
                           type={"password"}
                           placeholder={"Password"}
                           validate={[required, minLength, maxLength]}/>
                </label>
            </div>
            <div>
                <label>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/>
                remember me</label>
            </div>

            {captchaUrl && <div>
                <img src={captchaUrl} alt="captcha"/>
                <Field component={Input} name={"captcha"} validation={[required]} placefolder={"captcha"}/>
            </div>}

            <div>
                <button type={"submit"}>Submit</button>
            </div>
            {
                error && <FormError error={error}/>
            }
        </form>)
}

const ReduxLoginForm = reduxForm({form: "login"})(LoginForm);

export const Login = ({isAuth, id, captchaUrl, login}: any) => {
    if (isAuth) return <Navigate to={`/profile/${id}`}/>;

    const onSubmit = (formData: any) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    return (
        <div>
            <h1>Login</h1>
            {   //@ts-ignore
                <ReduxLoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            }
        </div>
    )
}