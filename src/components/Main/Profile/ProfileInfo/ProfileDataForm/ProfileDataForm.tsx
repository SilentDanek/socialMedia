import { Dispatch, FC, SetStateAction } from "react";
import { bindedThunks, Contacts, UserProfile } from "../../../../../redux";
import { FormProvider, useForm } from "react-hook-form";
import { InputFL, TextareaFL } from "../../../../../utils";
import { ContactFormError, FormError } from "../../../../../api/Errors";

export type FormFields = UserProfile & { formError: string };
type ProfileDataFormProps = {
    profile: UserProfile;
    setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const ProfileDataForm: FC<ProfileDataFormProps> = ({ profile, setEditMode }) => {

    const methods = useForm<FormFields>({ defaultValues: profile });
    const { handleSubmit, setError, formState: { errors } } = methods;

    const { updateUserProfile } = bindedThunks.profileThunks;
    const handleProfileSubmit = async (formData: UserProfile) => {
        try {
            await updateUserProfile(formData);
            setEditMode(false);
        } catch (error) {
            if (error instanceof ContactFormError) {
                const errorOption = { type: "manual", message: error.message };
                setError(error.getInvalidField<FormFields>(), errorOption, { shouldFocus: true });
            } else if (error instanceof FormError) {

                const errorOption = { type: "manual", message: error.message };
                setError("formError", errorOption);
            } else {
                throw error;
            }
        }
    };

    return <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleProfileSubmit)}>
            <div>
                <button>save</button>
            </div>

            {errors.formError && <p>{errors.formError.message}</p>}

            <InputFL<FormFields>
                name={"fullName"}
                labelText={"Full name:"}
                placeholder={"Full name"}
            />
            <InputFL<FormFields>
                name={"lookingForAJob"}
                labelText={"Looking for a job:"}
                type={"checkbox"}
                validateOptions={{ required: "Field is required" }}
            />
            <TextareaFL<FormFields>
                name={"aboutMe"}
                labelText={"About me:"}
                placeholder={"About me"}
                validateOptions={{ required: "Field is required" }}
            />
            <ul>
                <b>Contacts</b>: {
                (Object.keys(profile.contacts) as Array<keyof Contacts>)
                    .map(key => <ContactFormElement key={key} mediaName={key} />)}
            </ul>
        </form>
    </FormProvider>;
};

type ContactFormElement = {
    mediaName: keyof Contacts;
};

const ContactFormElement: FC<ContactFormElement> = ({ mediaName }) => {
    return <li key={mediaName}>
        <TextareaFL<FormFields>
            name={`contacts.${mediaName}`}
            placeholder={mediaName}
            labelText={`${mediaName}:`}
        />
    </li>;
};