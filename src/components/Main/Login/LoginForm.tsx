import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils";
import {FormError, ValidatedElement} from "../../common";
import {Navigate} from "react-router-dom";
import {FC} from "react";

const Input = ValidatedElement("input");
const minLength = minLengthCreator(8);
const maxLength = maxLengthCreator(30);


type LoginFormOwnProps = {
    captchaUrl: string | null;
    isAuth: boolean;
    id: number | null;
}
type LoginFormType = FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>;
const LoginForm: LoginFormType = ({handleSubmit, error, captchaUrl, isAuth, id}) => {
    return (
        isAuth
        ?<Navigate to={`/profile/${id}`}/>
        :<form onSubmit={handleSubmit}>
            <div>
                <label>
                    <h1>Login</h1>
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

type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}
export default reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm);