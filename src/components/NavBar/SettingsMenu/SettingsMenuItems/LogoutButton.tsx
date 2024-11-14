import { FC } from 'react';
import { MenuItem, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { boundThunks } from '@/redux';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
    t: TFunction<'translation', undefined>;
};

export const LogoutButton: FC<Props> = ({ t }) => {
    const { logout } = boundThunks.authThunks;
    return (
        <MenuItem onClick={logout}>
            <LogoutIcon />
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {t('logout')}
            </Typography>
        </MenuItem>
    );
};
