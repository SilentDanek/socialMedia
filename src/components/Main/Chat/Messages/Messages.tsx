import { FC, UIEventHandler, useEffect, useRef, useState } from "react";
import { getAuthUserId, getChatMessages, useAppSelector } from "../../../../redux";
import { Avatar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg";
import { MessageContent, MessagesWrapper, MessageWrapper } from "./styles";

export const Messages: FC = () => {
    const messages = useAppSelector(getChatMessages);
    const authUserId = useAppSelector(getAuthUserId);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const autoScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAutoScroll) {
            autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleScroll: UIEventHandler<HTMLElement> = (e) => {
        const elem = e.currentTarget;
        if (elem.scrollHeight - elem.scrollTop - 100 < elem.clientHeight) {
            setIsAutoScroll(true);
        } else {
            setIsAutoScroll(false);
        }
    };

    return <MessagesWrapper onScroll={handleScroll}>
        {messages.map(m => <Message key={m.id} authUserId={authUserId} {...m} />)}
        <div ref={autoScrollRef} />
    </MessagesWrapper>;
};

const Message: FC<Message> = ({ message, photo, userId, userName, authUserId }) => {
    const isMessageOwner = userId === authUserId;
    return (
        <MessageWrapper isMessageOwner={isMessageOwner}>
            <NavLink to={`/profile/${userId}`}>
                <Avatar
                    src={photo || unknownUserSVG}
                    alt={userName}
                    sx={{ width: 40, height: 40 }}
                />
            </NavLink>
            <MessageContent isMessageOwner={isMessageOwner}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "#cb25cb" }}>
                    {userName}
                </Typography>
                <Typography variant="body1">
                    {message}
                </Typography>
            </MessageContent>
        </MessageWrapper>
    );
};

type Message = {
    message: string,
    photo: string,
    userId: number,
    userName: string
    authUserId: number | null
}