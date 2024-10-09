import { styled } from "@mui/material/styles";
import { BorderLessThemeBox } from "../../../common";
import { FC, ReactNode } from "react";
import { Stack, useTheme } from "@mui/material";

export const MessagesWrapper = styled("section")(({ }) => ({
    display:"flex",
    flexDirection:"column",
    gap:"6px",
    overflowY: "auto",
}));

export const MessageContent:FC<MessageProps> = ({isMessageOwner, children}) => {
    const theme = useTheme();
    return (
        <BorderLessThemeBox
            sx={{
                position: 'relative',
                p: 1,
                borderRadius: "12px",
                maxWidth: "70%",
                height: "auto",
                wordBreak:"break-word",
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: isMessageOwner ? 'auto' : '-12px',
                    right: isMessageOwner ? '-12px' : 'auto',
                    width: 0,
                    height: 0,
                    border: '12px solid transparent',
                    borderTopColor: theme.palette.background.default,
                    borderBottom: 'none',
                    marginBottom: '-12px',
                },
            }}
        >
            {children}
        </BorderLessThemeBox>
    )
};

export const MessageWrapper:FC<MessageProps> = ({isMessageOwner, children}) => {
    const flexDirection = isMessageOwner? "row-reverse": "row";
    return (
        <Stack direction={flexDirection} alignItems={"flex-start"} component={"article"} gap={"8px"}>
            {children}
        </Stack>
    )
};


type MessageProps = {
    isMessageOwner:boolean;
    children:ReactNode;
}