import { ChangeEvent, FC, useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { getAuthStatus, useAppSelector } from '@/redux';

type ProfileStatusProps = {
    status: string;
    updateStatus: (newStatus: string) => void;
};

export const ProfileStatus: FC<ProfileStatusProps> = ({ status, updateStatus }) => {
    const [isStatusEditMode, setStatusEditMode] = useState(false);
    const [statusText, setStatusText] = useState(status);
    const isAuth = useAppSelector(getAuthStatus);

    useEffect(() => setStatusText(status), [status]);

    const toggleEditMode = () => {
        setStatusEditMode(!isStatusEditMode);
        if (isStatusEditMode && statusText !== status) {
            updateStatus(statusText);
        }
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => setStatusText(e.target.value);

    return (
        <>
            {isStatusEditMode && isAuth ? (
                <TextField
                    autoFocus
                    size="small"
                    type="text"
                    onBlur={toggleEditMode}
                    onChange={onStatusChange}
                    value={statusText}
                />
            ) : (
                <Typography variant="caption" onDoubleClick={toggleEditMode} lineHeight={0.5}>
                    {statusText || 'No status'}
                </Typography>
            )}
        </>
    );
};
