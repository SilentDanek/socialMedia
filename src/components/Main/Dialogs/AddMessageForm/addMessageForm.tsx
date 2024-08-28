import {Field, reduxForm} from "redux-form";
import {ValidatedElement} from "../../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";

const maxMessageLength = maxLengthCreator(200);
const Textarea = ValidatedElement("textarea");

const AddMessageForm = ({handleSubmit}: any) => {
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

export default reduxForm({form:"DialogAddMessageForm"})(AddMessageForm);