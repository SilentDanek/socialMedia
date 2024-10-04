import { styled } from "@mui/material/styles";
import { BorderLessThemeBox } from "../../../common/ThemeBox";
import { FC, ReactNode } from "react";
import { Stack, useTheme } from "@mui/material";

export const MessagesWrapper = styled("section")(({ theme}) => ({
    display:"flex",
    flexDirection:"column",
    gap:"6px",
    overflowY: "auto",
    [theme.breakpoints.up('md')]: {
        padding: '0 25% 0 15%', // Для экранов шире md (960px по умолчанию)
    },
    [theme.breakpoints.down('md')]: {
        padding: "0 1% 0 1%", // Для экранов шире md (960px по умолчанию)
    },
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
                    left: isMessageOwner ? 'auto' : '-12px', // Позиционирование для не владельца
                    right: isMessageOwner ? '-12px' : 'auto', // Позиционирование для владельца
                    width: 0,
                    height: 0,
                    border: '12px solid transparent', // Расширенный треугольник для границы
                    borderTopColor: theme.palette.background.default, // Цвет границы хвостика
                    borderBottom: 'none',
                    marginBottom: '-12px', // Поднимаем хвостик
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