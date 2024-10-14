import { FC, memo } from 'react';
import { Photos } from '../../../../redux';
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';
import unknownUserSvg from '../../../../assets/images/unknown-user.svg';

type DialogItemProps = {
    hasNewMessages: boolean;
    id: number;
    lastDialogActivityDate: string;
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
        setSelectedUser
    }) => {
        const lastMessageData = formatDate(lastDialogActivityDate);
        const lastUserData = formatDate(lastUserActivityDate);
        const theme = useTheme();
        return (
            <Card
                sx={{
                    cursor: 'pointer',
                    transition: 'background-color 0.4s',
                    borderRadius: '12px',
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'light' ? '#e8e8e8' : '#333333'
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
                                {lastUserData}
                            </Typography>
                            {hasNewMessages && <Chip label={newMessagesCount} color="primary" />}
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        );
    }
);

function formatDate(dateString: string, locale: string = 'uk-UA'): string {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() * -1);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    if (diffDays < 7) {
        const shortDaysOfWeek =
            locale === 'uk-UA'
                ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return shortDaysOfWeek[date.getDay()];
    }

    if (diffDays < 365) {
        return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
    }

    const options: Intl.DateTimeFormatOptions = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    return date.toLocaleString(locale, options);
}
