import { FC } from "react";
import { useForm } from "react-hook-form";
import { TextareaFL } from "../../../../utils";
import { bindedActions } from "../../../../redux";
import { FormProvider } from "react-hook-form";

type FormValues = {
    newMessageBody: string;
}
export const MessageForm: FC = () => {
    const { sendMessage } = bindedActions.dialogsActions;
    const methods = useForm<FormValues>();

    const handleMessageSubmit = (values: FormValues) => {
        sendMessage(values.newMessageBody);
    };

    return (<FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleMessageSubmit)}>
            <TextareaFL<FormValues>
                name={"newMessageBody"}
                placeholder={"Type message"}
                validateOptions={{ maxLength: { value: 300, message: "Max message length is 300" } }} />
            <div>
                <button>Send</button>
            </div>
        </form>
    </FormProvider>);
};