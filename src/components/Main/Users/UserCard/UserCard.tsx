import { NavLink } from 'react-router-dom';
import unknownUserSVG from '@/assets/images/unknown-user.svg';
import { TUser } from '@/redux';
import { FC } from 'react';
import { CardMedia, Typography } from '@mui/material';
import { StyledUserCard, UserCardActions, UserCardContent } from './UserCard.styles.tsx';
import { useTranslation } from 'react-i18next';
import { FollowButton, MessageButton } from '../../../common';

export const UserCard: FC<UserCardProps> = ({ user }) => {
    const { t } = useTranslation('users');

    let status = user.status || t('no status available');

    if (status.length > 80) {
        status = status.slice(0, 50) + '...';
    }

    return (
        <StyledUserCard component="article">
            <NavLink to={`/profile/${user.id}`}>
                <CardMedia
                    component="img"
                    image={user.photos.large || unknownUserSVG}
                    alt="user photo"
                    sx={{ width: 100, height: 100, borderRadius: '50%' }}
                />
            </NavLink>

            <UserCardContent sx={{ flexBasis: '200px' }}>
                <Typography variant="h6" component="h3">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {status}
                </Typography>
            </UserCardContent>

            <UserCardActions disableSpacing>
                <FollowButton userId={user.id} isFollow={user.followed} />
                <MessageButton userId={user.id} />
            </UserCardActions>
        </StyledUserCard>
    );
};

type UserCardProps = { user: TUser };
