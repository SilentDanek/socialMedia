import { Button } from '@mui/material';
import { useStartChatMutation } from '@api/dialogsAPI.ts';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuthStatus, useAppSelector } from '@/redux';

export const MessageButton: FC<MessageButtonProps> = ({ userId }) => {
    const [startNewDialog] = useStartChatMutation();
    const isAuth = useAppSelector(getAuthStatus);
    const { t } = useTranslation('users');

    const navigate = useNavigate();
    const handleToDialog = (id: number) => {
        if (!isAuth) {
            navigate(`/`);
        } else {
            startNewDialog(id);
            navigate(`/dialogs/${id}`);
        }
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ width: '130px' }}
            onClick={() => handleToDialog(userId)}
        >
            {t('message')}
        </Button>
    );
};

type MessageButtonProps = {
    userId: number;
};
