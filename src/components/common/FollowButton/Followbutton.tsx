import { Button } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { boundThunks, getAuthStatus, getFollowingInProgress, useAppSelector } from '@/redux';
import { useNavigate } from 'react-router-dom';

export const FollowButton: FC<FollowButtonProps> = ({ isFollow, userId, onClick }) => {
    const followingInProgress = useAppSelector(getFollowingInProgress);

    const { follow, unfollow } = boundThunks.usersThunks;
    const { t } = useTranslation('users');
    const isAuth = useAppSelector(getAuthStatus);
    const handleFollowBlock = () => followingInProgress.some((id: number) => id === userId);

    const navigate = useNavigate();
    const handleFollow = () => {
        if (!isAuth) {
            navigate(`/`);
        } else {
            if (isFollow) {
                unfollow(userId);
            } else {
                follow(userId);
            }
            if (onClick) {
                onClick();
            }
        }
    };

    return (
        <Button
            variant="contained"
            color={isFollow ? 'error' : 'primary'}
            size="small"
            sx={{ width: '130px' }}
            onClick={handleFollow}
            disabled={handleFollowBlock()}
        >
            {isFollow ? t('unfollow') : t('follow')}
        </Button>
    );
};

type FollowButtonProps = {
    userId: number;
    isFollow: boolean;
    onClick?: () => void;
};
