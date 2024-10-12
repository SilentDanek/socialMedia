import { Dispatch, FC, SetStateAction, useState } from "react";
import { bindedThunks, Contacts, UserProfile } from "../../../../../redux";
import { Control, useForm, useFormState } from "react-hook-form";
import { ContactFormError, FormError } from "../../../../../api/Errors";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { ControlledCheckbox, ControlledTextField, Fieldset, FormErrorMessage, Legend } from "../../../../common";
import { ButtonGroupWrapper } from "./ProfileDataForm.style";
import { useTranslation } from "react-i18next";

export type FormFields = UserProfile & { formError: string };
type ProfileDataFormProps = {
    profile: UserProfile;
    setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const ProfileDataForm: FC<ProfileDataFormProps> = ({ profile, setEditMode }) => {
    const { handleSubmit, setError, control } = useForm<FormFields>({ defaultValues: profile });
    const {t} = useTranslation("profile");
    const { isSubmitting } = useFormState({ control });
    const [formErrorMessage, setFormErrorMessage] = useState("");

    const { updateUserProfile } = bindedThunks.profileThunks;
    const handleProfileSubmit = async (formData: UserProfile) => {
        try {
            await updateUserProfile(formData);
            setEditMode(false);
            setFormErrorMessage("");
        } catch (error) {
            if (error instanceof ContactFormError) {
                const errorOption = { message: error.message };
                setError(error.getInvalidField(), errorOption, { shouldFocus: true });
            } else if (error instanceof FormError) {
                setFormErrorMessage(error.message);
            } else {
                throw error;
            }
        }
    };

    return <form onSubmit={handleSubmit(handleProfileSubmit)} noValidate={true} >
        <ControlledTextField control={control} name={"fullName"} label={t("full name")}/>

        <ControlledTextField control={control} name={"aboutMe"} label={t("about me")} multiline={true}/>

        <ControlledCheckbox control={control} name={"lookingForAJob"} label={t("looking for a job")}/>

        <ControlledTextField control={control} name={"lookingForAJobDescription"} label={t("my professional skills")} multiline={true}/>

        <Fieldset>
            <Legend>{t("contacts")}</Legend>

            {(Object.keys(profile.contacts) as Array<keyof Contacts>).map(key => (
                <ContactFormElement key={key} mediaName={key} control={control} />
            ))}
        </Fieldset>

        <FormErrorMessage>{formErrorMessage}</FormErrorMessage>

        <ButtonGroupWrapper>
            <Button color="secondary" variant="contained" onClick={() => setEditMode(false)} sx={{minWidth:"150px", maxWidth:"250px"}}>
                {t("cancel")}
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{minWidth:"150px", maxWidth:"250px"}}>
                {t("save")}
            </LoadingButton>
        </ButtonGroupWrapper>
    </form>;
};

type ContactFormElement = {
    mediaName: keyof Contacts;
    control: Control<FormFields, any>
};

const ContactFormElement: FC<ContactFormElement> = ({ mediaName, control }) => {
    return <ControlledTextField control={control}
                                name={`contacts.${mediaName}`}
                                type={"url"}
                                label={`${mediaName}:`}
                                placeholder={mediaName}
                                variant={"standard"}/>
};