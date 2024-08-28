import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../../../utils/validators/validators";
import {ValidatedElement} from "../../../../common/FormControls/FormControls";

const maxLengthPost = maxLengthCreator(30);
const minLengthPost = minLengthCreator(3);
const Textarea = ValidatedElement("textarea");


const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name={"newPostText"}
                placeholder={"Enter your post message"}
                validate={[required, minLengthPost, maxLengthPost]}
            />
            <button>Add new post</button>
        </form>
    );
};

export default reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);