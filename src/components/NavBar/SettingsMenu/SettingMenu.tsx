import React, { FC, useState } from 'react';
import { getAuthStatus, useAppSelector } from '@/redux';
import { Box, ListItem, Menu } from '@mui/material';
import { NavBarListItemButton, NavBarListItemIcon, NavBarListItemText } from '../NavBar.styles.tsx';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import { ChangeLangButton, ChangeThemeButton, LogoutButton } from './SettingsMenuItems';

export const SettingsMenu: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const { t, i18n } = useTranslation('navbar');

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    return (
        <ListItem disablePadding sx={{ padding: '7px' }}>
            <Box sx={{ width: '100%' }}>
                <NavBarListItemButton
                    onClick={handleMenuClick}
                    sx={{ paddingLeft: { lg: '15%', md: '16px' } }}
                >
                    <NavBarListItemIcon>
                        <SettingsIcon />
                    </NavBarListItemIcon>
                    <NavBarListItemText primary={t('settings')} />
                </NavBarListItemButton>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setOpen(false)}>
                <ChangeThemeButton t={t} />
                <ChangeLangButton t={t} i18n={i18n} />
                {isAuth && <LogoutButton t={t} />}
            </Menu>
        </ListItem>
    );
};
