import { FC, memo } from 'react';
import { Photos } from '../../../../redux';
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';
import unknownUserSvg from '../../../../assets/images/unknown-user.svg';
import { formatDate } from '../../../../utils';

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
        const theme = useTheme();
        return (
            <Card
                sx={{
                    cursor: 'pointer',
                    transition: 'background-color 0.4s',
                    borderRadius: '12px',
                    backgroundColor: isSelected
                        ? theme.palette.backgroundColors?.main
                        : theme.palette.background.default,
                    '&:hover': {
                        backgroundColor: isSelected ? 'auto' : theme.palette.backgroundColors.hover
                    }
                }}
            >
                <CardContent
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    onClick={() => setSelectedUser(id)}
                >
                    <Avatar
                        alt={userName}
                        src={photos.large || unknownUserSvg}
                        sx={{ width: 60, height: 60 }}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            paddingLeft: '16px',
                            display: {
                                xs: 'none',
                                md: 'block'
                            }
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body1" overflow="clip">
                                {userName}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {lastMessageData}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" color="textSecondary">
                                {lastUserActivity}
                            </Typography>
                            {hasNewMessages && <Chip label={newMessagesCount} color="primary" />}
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        );
    }
);
