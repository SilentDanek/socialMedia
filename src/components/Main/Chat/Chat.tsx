import { Controller, useForm } from "react-hook-form";
import { FC, UIEventHandler, useEffect, useRef, useState } from "react";
import { bindedActions, bindedThunks, getChatMessages, getChatStatus, useAppSelector } from "../../../redux";
import { NavLink } from "react-router-dom";
import unknownUserSVG from "../../../assets/images/unknown-user.svg";
import { useAuthRedirect } from "../../../hooks/useAuthRedirect";
import { Avatar, Box, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { EmojiEmotions, Send } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ThemeBox } from "../../common/ThemeBox";

const Chat = () => {
    const status = useAppSelector(getChatStatus);
    const { startMessagesListening, stopMessagesListening } = bindedThunks.chatThunks;
    const { clearMessages } = bindedActions.chatActions;

    useAuthRedirect();

    useEffect(() => {
        startMessagesListening();

        return () => {
            clearMessages();
            stopMessagesListening();
        };
    }, []);

    return <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-end", height:"100%"}}>
        {status === "error" && <div>Some error occurred. Please refresh the page</div>}
        <Messages />
        <AddNewMessageForm />
    </div>;
};

const Messages: FC = () => {
    const messages = useAppSelector(getChatMessages);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const handleScroll: UIEventHandler<HTMLElement> = (e) => {
        const elem = e.currentTarget;
        if (elem.scrollHeight - elem.scrollTop - 100 < elem.clientHeight) {
            setIsAutoScroll(true);
        } else {
            setIsAutoScroll(false);
        }
    };

    const autoScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAutoScroll) {
            autoScrollRef.current?.scrollIntoView({ behavior: "auto" });
        }
    }, [messages]);

    return <Stack component={"section"} gap="6px" onScroll={handleScroll} sx={{
        overflowY: "auto",
        margin:{
            xs: "0 1% 0 1%",
            md: "0 15% 0 15%",
        }}}
    >
        {messages.map(m => <Message key={m.id} {...m} />)}
        <div ref={autoScrollRef} />
    </Stack>;
};

const Message: FC<Message> = ({ message, photo, userId, userName }) => {
    return (
        <Stack direction={"row"} alignItems={"flex-start"} component={"article"} >
            <NavLink to={`/profile/${userId}`}>
                <Avatar
                    src={photo || unknownUserSVG}
                    alt={userName}
                    sx={{ width: 40, height: 40, mr: 2 }}
                />
            </NavLink>
            <ThemeBox
                sx={{
                    position: 'relative',
                    p: 1,
                    borderRadius: "12px",
                    maxWidth: "70%",
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-10px', // Сместить влево от контейнера (регулируйте по желанию)
                        width: 0,
                        height: 0,
                        border: '10px solid transparent',
                        borderTopColor: '#e8f5e9', // Цвет должен совпадать с фоном сообщения
                        borderBottom: 'none',
                        marginBottom: '-10px', // Поднятие хвостика вверх
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize:"0.8rem", color:"#cb25cb"}}>
                        {userName}
                    </Typography>
                </Box>

                <Typography variant="body1">
                    {message}
                </Typography>
            </ThemeBox>
        </Stack>
    )
};

const AddNewMessageForm: FC = () => {
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
                md: "0 15% 5px 15%",
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


type FieldValues = {
    newMessage: string;
};

type Message = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


export default Chat;