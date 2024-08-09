import {Field, reduxForm} from "redux-form";

export const LoginForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor={"textInput"}>Login</label>
                <Field component={"input"} name={"login"} type={"text"} id={"textInput"} aria-placeholder={"Login"}/>
            </div>
            <div>
                <label htmlFor={"passwordInput"}>Password</label>
                <Field component={"input"} name={"password"} type={"password"} id={"passwordInput"} aria-placeholder={"Password"}/>
            </div>
            <div>
                <Field  component={"input"} name={"rememberMe"} type={"checkbox"} id={"rememberMeCheckbox"}/>
                <label htmlFor={"rememberMeCheckbox"}> remember me</label>
            </div>
            <div>
                <button type={"submit"}>Submit</button>
            </div>
        </form>)
}

const ReduxLoginForm = reduxForm({form:"login"})(LoginForm);

export const Login = () => {
    const onSubmit = (values: any) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, `${value}`);
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    )
}