import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import unknownUserSVG from '@assets/images/unknown-user.svg';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import { Message } from '../../Chat.tsx';
import { MessageContent, MessageOwnerWrapper, MessageWrapper } from './ChatMessage.styles.tsx';

export const ChatMessage: FC<MessageProps> = ({
    message,
    photo = '',
    userId,
    userName,
    isMessageOwner,
    addedAt,
    viewed
}) => {
    const date = new Date(addedAt || '');
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() * -1);
    const messageTime = date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0');

    return (
        <MessageWrapper isMessageOwner={isMessageOwner}>
            {photo !== '' && (
                <NavLink to={`/profile/${userId}`}>
                    <Avatar
                        src={photo || unknownUserSVG}
                        alt={userName}
                        sx={{ width: 40, height: 40 }}
                    />
                </NavLink>
            )}

            <MessageContent isMessageOwner={isMessageOwner}>
                <MessageOwnerWrapper>{isMessageOwner ? 'You' : userName}</MessageOwnerWrapper>

                <Typography variant="body1">{message}</Typography>

                {addedAt && (
                    <Typography variant="body1" fontSize={12}>
                        <time>{messageTime}</time>
                        {viewed || !isMessageOwner ? (
                            <DoneAllIcon sx={{ height: 20 }} />
                        ) : (
                            <DoneIcon sx={{ height: 20 }} />
                        )}
                    </Typography>
                )}
            </MessageContent>
        </MessageWrapper>
    );
};

type MessageProps = Message & { isMessageOwner: boolean };
