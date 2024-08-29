import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ValidatedElement} from "../../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FC} from "react";

const maxMessageLength = maxLengthCreator(200);
const Textarea = ValidatedElement("textarea");

const AddMessageForm:FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={"newMessageBody"}
                       placeholder={"Enter your message"}
                       validate={[required, maxMessageLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
};
type LoginFormValuesType = {
    newMessageBody: string
}
export default reduxForm<LoginFormValuesType>({form:"DialogAddMessageForm"})(AddMessageForm);