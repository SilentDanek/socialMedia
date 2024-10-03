import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { bindedThunks, getChatStatus, useAppSelector } from "../../../../redux";
import { useTranslation } from "react-i18next";
import { IconButton, Paper, TextField } from "@mui/material";
import { EmojiEmotions, Send } from "@mui/icons-material";


type FieldValues = {
    newMessage: string;
};


export const AddNewMessageForm: FC = () => {
    const { handleSubmit, control, resetField } = useForm<FieldValues>();
    const status = useAppSelector(getChatStatus);
    const { sendMessage } = bindedThunks.chatThunks;
    const { t } = useTranslation("chat");

    const sendMessageHandler = ({ newMessage }: FieldValues) => {
        sendMessage(newMessage);
        resetField("newMessage");
    };

    return <Paper
        elevation={3}
        sx={{
            display: "flex",
            alignItems: "center",
            margin:{
                xs: "0 1% 5px 1%",
                md: "0 25% 5px 15%",
            },
            borderRadius: "25px"
        }}
    >
        <form onSubmit={handleSubmit(sendMessageHandler)} style={{ width: "100%", display: "flex" }}>
            <IconButton>
                <EmojiEmotions />
            </IconButton>
            <Controller
                name="newMessage"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        multiline
                        maxRows={6}
                        autoComplete="off"
                        placeholder={t("message")}
                        fullWidth
                        InputProps={{
                            sx: {
                                '& fieldset': {
                                    border: 'none', // Убираем рамку
                                },
                                minWidth:"150px"
                            },

                        }}
                    />)}
            />
            <IconButton type={"submit"} disabled={status !== "ready"}>
                <Send />
            </IconButton>
        </form>
    </Paper>;
};
