import { FC, memo } from 'react';
import { Photos } from '@/redux';
import { Avatar, Chip, Stack, Typography } from '@mui/material';
import unknownUserSvg from '@/assets/images/unknown-user.svg';
import { formatDate } from '@/utils';
import { DialogItemCard, DialogItemContent, DialogItemUserData } from './DialogItem.styles.tsx';

type DialogItemProps = {
    hasNewMessages: boolean;
    id: number;
    lastDialogActivityDate: string;
    selectedFriendId: number | null;
    lastUserActivityDate: string;
    newMessagesCount: number;
    photos: Photos;
    userName: string;
    setSelectedUser: (selectedUserId: number) => void;
};

export const DialogItem: FC<DialogItemProps> = memo(
    ({
        id,
        photos,
        userName,
        lastDialogActivityDate,
        lastUserActivityDate,
        newMessagesCount,
        hasNewMessages,
        setSelectedUser,
        selectedFriendId
    }) => {
        const lastMessageData = formatDate(lastDialogActivityDate);
        const lastUserActivity = formatDate(lastUserActivityDate);
        const isSelected = selectedFriendId === id;
        return (
            <DialogItemCard isSelected={isSelected}>
                <DialogItemContent onClick={() => setSelectedUser(id)}>
                    <Avatar
                        alt={userName}
                        src={photos.large || unknownUserSvg}
                        sx={{ width: 60, height: 60 }}
                    />
                    <DialogItemUserData>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body1" overflow="clip" component="h3">
                                {userName}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="time">
                                {lastMessageData}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" color="textSecondary" component="time">
                                {lastUserActivity}
                            </Typography>
                            {hasNewMessages && <Chip label={newMessagesCount} color="primary" />}
                        </Stack>
                    </DialogItemUserData>
                </DialogItemContent>
            </DialogItemCard>
        );
    }
);
