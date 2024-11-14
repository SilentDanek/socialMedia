import { FC, memo } from 'react';
import { useChatMessages } from './useChatMessages.ts';
import { Chat, ChatSkeleton, ThemeBox } from '../../../common';
import { NavLink } from 'react-router-dom';
import { Avatar, Stack, Typography } from '@mui/material';
import unknownUserSvg from '@/assets/images/unknown-user.svg';
import { DialogResponse } from '@api/dialogsAPI.ts';
import { formatDate } from '@/utils';

export const Dialog: FC<DialogProps> = memo(
    ({ selectedFriendInfo: { id, photos, userName, lastUserActivityDate } }) => {
        const {
            chatMessages,
            isError,
            isLoadedDialog,
            isMessageSending,
            handleScroll,
            handleSendMessage
        } = useChatMessages(id);

        const lastUserActivityDateParsed = formatDate(lastUserActivityDate);

        if (!isLoadedDialog) {
            return <ChatSkeleton withAvatar={false} withHeader={true} />;
        }

        return (
            <Chat
                blockSubmitButton={isMessageSending}
                sendMessage={handleSendMessage}
                error={isError}
                messages={chatMessages}
                onScroll={handleScroll}
                chatHeader={
                    <ThemeBox sx={{ p: 1 }}>
                        <NavLink
                            to={`/profile/${id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: 1
                            }}
                        >
                            <Avatar src={photos.large || unknownUserSvg} />
                            <Stack direction="column">
                                <Typography variant="body1">{userName}</Typography>
                                <Typography variant="subtitle2">
                                    {lastUserActivityDateParsed}
                                </Typography>
                            </Stack>
                        </NavLink>
                    </ThemeBox>
                }
            />
        );
    }
);

type DialogProps = {
    selectedFriendInfo: DialogResponse;
};
