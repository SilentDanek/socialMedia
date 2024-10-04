import { Dispatch, FC, SetStateAction } from "react";
import { bindedThunks, Contacts, UserProfile } from "../../../../../redux";
import { Control, Controller, useForm, useFormState } from "react-hook-form";
import { ContactFormError, FormError } from "../../../../../api/Errors";
import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

export type FormFields = UserProfile & { formError: string };
type ProfileDataFormProps = {
    profile: UserProfile;
    setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const ProfileDataForm: FC<ProfileDataFormProps> = ({ profile, setEditMode }) => {
    const { handleSubmit, setError, control } = useForm<FormFields>({ defaultValues: profile });
    const { errors, isSubmitting } = useFormState({ control });

    const { updateUserProfile } = bindedThunks.profileThunks;
    const handleProfileSubmit = async (formData: UserProfile) => {
        try {
            await updateUserProfile(formData);
            setEditMode(false);
            console.log(formData);
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

    return <form onSubmit={handleSubmit(handleProfileSubmit)}>

        {errors.formError && <Typography color="error">{errors.formError.message}</Typography>}

        <Controller
            name="fullName"
            control={control}

            render={({ field }) => (
                <TextField
                    {...field}
                    label="Full name"
                    margin={"dense"}
                    placeholder="Full name"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    fullWidth
                />
            )}
        />

        <Controller
            name="lookingForAJob"
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={<Checkbox {...field} checked={!!field.value} />}
                    label="Looking for a job"
                />
            )}
        />

        <Controller
            name="lookingForAJobDescription"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label="Skills"
                    placeholder="Skills"
                    margin={"dense"}
                    error={!!errors.lookingForAJobDescription}
                    helperText={errors.lookingForAJobDescription?.message}
                    fullWidth
                />
            )}
        />

        <Controller
            name="aboutMe"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label="About me"
                    placeholder="About me"
                    margin={"dense"}
                    multiline
                    error={!!errors.aboutMe}
                    helperText={errors.aboutMe?.message}
                    fullWidth
                />
            )}
        />

        <Box component={"fieldset"} sx={{ listStyle: "none", padding: 0, margin: 0 }}>
            <Typography
                component="legend"
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
                <b>Contacts</b></Typography>
            {(Object.keys(profile.contacts) as Array<keyof Contacts>).map(key => (
                <ContactFormElement key={key} mediaName={key} control={control} />
            ))}
        </Box>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Edit
        </LoadingButton>
    </form>;
};

type ContactFormElement = {
    mediaName: keyof Contacts;
    control: Control<FormFields, any>
};

const ContactFormElement: FC<ContactFormElement> = ({ mediaName, control }) => {
    return <Controller
        name={`contacts.${mediaName}`}
        control={control}
        render={({ field, fieldState }) => (
            <TextField
                {...field}
                variant={"standard"}
                label={`${mediaName}:`}
                margin={"dense"}
                placeholder={mediaName}
                type={"url"}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
            />
        )}
    />;
};