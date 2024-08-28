import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {FormError, ValidatedElement} from "../../common/FormControls/FormControls";
import {Navigate} from "react-router-dom";

const Input = ValidatedElement("input");
const minLength = minLengthCreator(8);
const maxLength = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error, captchaUrl, isAuth, id}: any) => {
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

export default reduxForm({form: "login"})(LoginForm);