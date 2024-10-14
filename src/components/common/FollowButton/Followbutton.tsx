import { Button } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { boundThunks, getFollowingInProgress, useAppSelector } from '../../../redux';

export const FollowButton: FC<FollowButtonProps> = ({ isFollow, userId, onClick }) => {
    const followingInProgress = useAppSelector(getFollowingInProgress);

    const { follow, unfollow } = boundThunks.usersThunks;
    const { t } = useTranslation('users');

    const handleFollowBlock = () => followingInProgress.some((id: number) => id === userId);

    const handleFollow = () => {
        if (isFollow) {
            unfollow(userId);
        } else {
            follow(userId);
        }
        if (onClick) {
            onClick();
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
