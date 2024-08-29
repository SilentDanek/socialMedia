import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../../../utils/validators/validators";
import {ValidatedElement} from "../../../../common/FormControls/FormControls";
import {FC} from "react";

const maxLengthPost = maxLengthCreator(30);
const minLengthPost = minLengthCreator(3);
const Textarea = ValidatedElement("textarea");



const AddNewPostForm:FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
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
type FormDataType = {
    newPostText:string;
}
export default reduxForm<FormDataType>({form: "ProfileAddNewPostForm"})(AddNewPostForm);