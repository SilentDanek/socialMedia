import { TextareaFL } from "../../../../../utils";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { bindedActions } from "../../../../../redux";


type FormValues = {
    newPostText: string;
};
export const NewPostForm: FC = () => {
    const methods = useForm<FormValues,FormValues,FormValues>();
    const { addPost } = bindedActions.profileActions;

    const handleMessageSubmit = (values: FormValues) => {
        addPost(values.newPostText);
    };

    return (<FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleMessageSubmit)}>
            <TextareaFL<FormValues>
                name={"newPostText"}
                placeholder={"Type post message"}
                validateOptions={{ maxLength: { value: 50, message: "Max message length is 50" } }}
            />
            <button>Add new post</button>
        </form>
    </FormProvider>);
};
