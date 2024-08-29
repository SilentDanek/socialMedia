import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormError, ValidatedElement} from "../../../../common/FormControls/FormControls";
import {required} from "../../../../../utils/validators/validators";
import {UserProfile} from "../../../../../redux/ducks/profile/types";



const Textarea = ValidatedElement("textarea");
const Input = ValidatedElement("input");


type ProfileDataFormOwnProps ={
    profile:UserProfile;
}
type ProfileDataFormType = FC<InjectedFormProps<LoginFormValuesType, ProfileDataFormOwnProps> & ProfileDataFormOwnProps>;
const ProfileDataForm:ProfileDataFormType = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {
            error && <FormError error={error}/>
        }
        <div>
            <label>Full name:
                <Field component={Input} name={"fullName"} placeholder={"Full name"}/>
            </label>
        </div>
        <div>
            <label>Looking for a job:
                <Field component={Input} name={"lookingForAJob"} type={"checkbox"} validate={[required]}/>
            </label>
        </div>
        <div>
            <label>My professional skills:
                <Field component={Textarea} name={"lookingForAJobDescription"} placeholder={"My professional skills"} validate={[required]}/>
            </label>
        </div>
        <div>
            <label>About me:
                <Field component={Textarea} name={"aboutMe"} placeholder={"About me"} validate={[required]}/>
            </label>
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => <ContactFormElement key={key} mediaName={key}/>)}
        </div>
    </form>
}
type ContactFormElement = {
    mediaName: string
}
const ContactFormElement:FC<ContactFormElement> = ({mediaName}) => {
    return <div key={mediaName} /*className={s.contact}*/>
        <label>{mediaName}: <Field component={Textarea} name={`contacts.${mediaName}`} placeholder={mediaName}/></label>
    </div>
}

type LoginFormValuesType = (formData: UserProfile) => void;
export default reduxForm<LoginFormValuesType, ProfileDataFormOwnProps>({form: 'editProfile'})(ProfileDataForm);