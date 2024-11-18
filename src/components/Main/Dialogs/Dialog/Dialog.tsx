import { FC, memo } from 'react';
import { useChatMessages } from './useChatMessages.ts';
import { Chat, ChatSkeleton } from '@/components/common';
import { Avatar, Stack, Typography } from '@mui/material';
import unknownUserSvg from '@/assets/images/unknown-user.svg';
import { DialogResponse } from '@api/dialogsAPI.ts';
import { formatDate } from '@/utils';
import { ChatHeader, ProfileNavLink } from './Dialog.styles.ts';

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
                    <ChatHeader aria-label={`Chat with ${userName}`}>
                        <ProfileNavLink to={`/profile/${id}`}>
                            <Avatar src={photos.large || unknownUserSvg} />
                            <Stack direction="column">
                                <Typography variant="body1" component="h2">
                                    {userName}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {lastUserActivityDateParsed}
                                </Typography>
                            </Stack>
                        </ProfileNavLink>
                    </ChatHeader>
                }
            />
        );
    }
);

type DialogProps = {
    selectedFriendInfo: DialogResponse;
};
