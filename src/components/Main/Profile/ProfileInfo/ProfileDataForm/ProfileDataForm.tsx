import React from "react";
import {Field, reduxForm} from "redux-form";
import {FormError, ValidatedElement} from "../../../../common/FormControls/FormControls";
import {required} from "../../../../../utils/validators/validators";

const Textarea = ValidatedElement("textarea");
const Input = ValidatedElement("input");



const ProfileDataForm = ({handleSubmit, profile, error}: any) => {
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

const ContactFormElement = ({mediaName}: any) => {
    return <div key={mediaName} /*className={s.contact}*/>
        <label>{mediaName}: <Field component={Textarea} name={`contacts.${mediaName}`} placeholder={mediaName}/></label>
    </div>
}

export default reduxForm({form: 'editProfile'})(ProfileDataForm);