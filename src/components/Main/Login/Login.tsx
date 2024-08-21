import {Field, reduxForm} from "redux-form";
import {FormError, ValidatedElement} from "../../common/FormControls/FormControls";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Navigate} from "react-router-dom";
import React from "react";

const Input = ValidatedElement("input");
const minLength = minLengthCreator(8);
const maxLength = maxLengthCreator(30);


export const LoginForm = ({handleSubmit, error}:any) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={"textInput"}>Login</label>
                <Field
                    component={Input}
                    name={"email"}
                    type={"text"}
                    id={"textInput"}
                    placeholder={"Email"}
                    validate={[required, minLength,maxLength]}
                />
            </div>
            <div>
                <label htmlFor={"passwordInput"}>Password</label>
                <Field component={Input}
                       name={"password"}
                       type={"password"}
                       id={"passwordInput"}
                       placeholder={"Password"}
                       validate={[required, minLength, maxLength]}
                />
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"} id={"rememberMeCheckbox"}/>
                <label htmlFor={"rememberMeCheckbox"}> remember me</label>
            </div>
            <div>
                <button type={"submit"}>Submit</button>
            </div>
            {
                error && <FormError error={error}/>
            }
        </form>)
}

const ReduxLoginForm = reduxForm({form: "login"})(LoginForm);

export const Login = (props: any) => {
    if (props.isAuth) return <Navigate to={`/profile/${props.id}`}/>;

    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    )
}