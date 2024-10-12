import { NavLink, useNavigate } from 'react-router-dom';
import unknownUserSVG from '../../../../assets/images/unknown-user.svg';
import { TUser } from '../../../../redux';
import { FC } from 'react';
import { Button, CardMedia, Typography } from '@mui/material';
import {
    StyledUserCard,
    UserCardActions,
    UserCardContent,
} from './UserCard.styles';
import { useTranslation } from 'react-i18next';
import { useStartChatMutation } from '../../../../api/dialogsAPI.ts';

type UserCardProps = {
    user: TUser;
    follow: (id: number) => void;
    unfollow: (id: number) => void;
    followingInProgress: number[];
};
export const UserCard: FC<UserCardProps> = ({
    user,
    follow,
    unfollow,
    followingInProgress,
}) => {
    const { t } = useTranslation('users');

    let status = user.status || t('no status available');

    if (status.length > 80) {
        status = status.slice(0, 50) + '...';
    }

    const handleFollowBlock = () => followingInProgress.some((id: number) => id === user.id);

    const handleFollow = () => {
        if (user.followed) {
            unfollow(user.id);
        } else {
            follow(user.id);
        }
    };

    const [ startNewDialog ] = useStartChatMutation();
    const navigate = useNavigate();
    const handleToDialog = (id:number) => {
        startNewDialog(id);
        navigate(`/dialogs/${id}`);
    }

    return (
        <StyledUserCard>
            <NavLink to={`/profile/${user.id}`}>
                <CardMedia
                    component="img"
                    image={user.photos.large || unknownUserSVG}
                    alt="user photo"
                    sx={{ width: 100, height: 100, borderRadius: '50%' }}
                />
            </NavLink>

            <UserCardContent sx={{  flexBasis: '200px' }}>
                <Typography variant="h6" component="div">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {status}
                </Typography>
            </UserCardContent>

            <UserCardActions disableSpacing>
                <Button
                    variant="contained"
                    color={user.followed ? 'error' : 'primary'}
                    size="small"
                    sx={{ width: '130px' }}
                    onClick={handleFollow}
                    disabled={handleFollowBlock()}
                >
                    {user.followed ? t('unfollow') : t('follow')}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ width: '130px' }}
                    onClick={() => handleToDialog(user.id)}
                >
                    {t('message')}
                </Button>
            </UserCardActions>
        </StyledUserCard>
    );
};
