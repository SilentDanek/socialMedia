import { FC } from 'react';
import { MessageContent, MessageWrapper } from '../ChatMessages.styles.tsx';
import { NavLink } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import unknownUserSVG from '../../../../../assets/images/unknown-user.svg';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import { Message } from '../../Chat.tsx';

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
                <Typography variant="subtitle1" fontWeight="bold" fontSize="0.8rem" color="#cb25cb">
                    {isMessageOwner ? 'You' : userName}
                </Typography>

                <Typography variant="body1">{message}</Typography>

                {addedAt && (
                    <Typography variant="body1" fontSize={12}>
                        {date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0')}
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
